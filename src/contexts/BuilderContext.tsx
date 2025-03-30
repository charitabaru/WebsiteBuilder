import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { BuilderElement, ElementType, Template, ViewMode, BuilderStage, UserConfig, Industry, BuilderHistory } from '@/types/builder';
import { 
  createNewElement, 
  defaultTemplate,
  getTemplateByIndustry,
  findElementById,
  updateElement,
  addElementToContainer
} from '@/utils/builder';
import { loadState, saveState } from '@/utils/storage';


// Define the state
export interface BuilderState {
  template: Template;
  selectedElementId: string | null;
  viewMode: ViewMode;
  isDragging: boolean;
  stage: BuilderStage;
  userConfig: UserConfig | null;
  history: BuilderHistory;
}

// Define action types
type BuilderAction =
  | { type: 'SET_TEMPLATE'; payload: Template }
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; element: BuilderElement } }
  | { type: 'ADD_ELEMENT'; payload: { type: ElementType; containerId: string } }
  | { type: 'ADD_ROOT_ELEMENT'; payload: BuilderElement }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SAVE_TEMPLATE' }
  | { type: 'SET_STAGE'; payload: BuilderStage }
  | { type: 'SET_USER_CONFIG'; payload: UserConfig }
  | { type: 'REMOVE_ELEMENT'; payload: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'GENERATE_TEMPLATE' };

const initialState: BuilderState = {
  template: defaultTemplate,
  selectedElementId: null,
  viewMode: 'desktop',
  isDragging: false,
  stage: 'registration',
  userConfig: null,
  history: {
    past: [],
    future: []
  }
};

// Create the reducer
const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return {
        ...state,
        template: action.payload,
        history: {
          past: [...state.history.past, state.template],
          future: []
        }
      };
    
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElementId: action.payload,
      };
    
    case 'UPDATE_ELEMENT': {
      const updatedElements = updateElement(
        state.template.elements,
        action.payload.id,
        action.payload.element
      );
      
      const updatedTemplate = {
        ...state.template,
        elements: updatedElements,
      };
      
      return {
        ...state,
        template: updatedTemplate,
        history: {
          past: [...state.history.past, state.template],
          future: []
        }
      };
    }
    
    case 'ADD_ELEMENT': {
      const newElement = createNewElement(action.payload.type);
      const updatedElements = addElementToContainer(
        state.template.elements,
        action.payload.containerId,
        newElement
      );
      
      const updatedTemplate = {
        ...state.template,
        elements: updatedElements,
      };
      
      return {
        ...state,
        template: updatedTemplate,
        selectedElementId: newElement.id,
        history: {
          past: [...state.history.past, state.template],
          future: []
        }
      };
    }
    
    case 'ADD_ROOT_ELEMENT': {
      const updatedTemplate = {
        ...state.template,
        elements: [...state.template.elements, action.payload],
      };
      
      return {
        ...state,
        template: updatedTemplate,
        selectedElementId: action.payload.id,
        history: {
          past: [...state.history.past, state.template],
          future: []
        }
      };
    }
    
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
      };
    
    case 'SET_DRAGGING':
      return {
        ...state,
        isDragging: action.payload,
      };
    
    case 'SAVE_TEMPLATE':
      // In a real app, this would save to a backend
      console.log('Template saved:', state.template);
      return state;
    
    case 'SET_STAGE':
      return {
        ...state,
        stage: action.payload,
      };
      
    case 'SET_USER_CONFIG':
      return {
        ...state,
        userConfig: action.payload,
      };
      
    case 'GENERATE_TEMPLATE': {
      if (!state.userConfig) return state;
      
      const generatedTemplate = getTemplateByIndustry(
        state.userConfig.industry,
        state.userConfig.businessName,
        state.userConfig.colorTheme
      );
      
      return {
        ...state,
        template: generatedTemplate,
      };
    }
    
    case 'REMOVE_ELEMENT': {
      const removeElementById = (elements: BuilderElement[]): BuilderElement[] => {
        return elements.filter(element => {
          // Keep elements that don't match the ID
          if (element.id !== action.payload) {
            // If element has children, filter them recursively
            if (element.children && element.children.length > 0) {
              return {
                ...element,
                children: removeElementById(element.children)
              };
            }
            return element;
          }
          return false;
        });
      };
      
      const updatedElements = removeElementById(state.template.elements);
      
      const updatedTemplate = {
        ...state.template,
        elements: updatedElements,
      };
      
      return {
        ...state,
        template: updatedTemplate,
        selectedElementId: null,
        history: {
          past: [...state.history.past, state.template],
          future: []
        }
      };
    }
    
    case 'UNDO': {
      const { past, future } = state.history;
      if (past.length === 0) return state;
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      return {
        ...state,
        template: previous,
        history: {
          past: newPast,
          future: [state.template, ...future]
        }
      };
    }
    
    case 'REDO': {
      const { past, future } = state.history;
      if (future.length === 0) return state;
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      return {
        ...state,
        template: next,
        history: {
          past: [...past, state.template],
          future: newFuture
        }
      };
    }
    
    default:
      return state;
  }
};

// Create the context
interface BuilderContextType {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  getSelectedElement: () => BuilderElement | null;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// Create the provider
export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(builderReducer, loadState() || initialState);
  
  // Persist state to localStorage on changes
  useEffect(() => {
    saveState(state);
  }, [state]);
  
  const getSelectedElement = (): BuilderElement | null => {
    if (!state.selectedElementId) return null;
    return findElementById(state.template.elements, state.selectedElementId);
  };
  
  return (
    <BuilderContext.Provider value={{ state, dispatch, getSelectedElement }}>
      {children}
    </BuilderContext.Provider>
  );
};
// Create a hook to use the context
export const useBuilder = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
