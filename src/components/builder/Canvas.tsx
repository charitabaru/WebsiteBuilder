
import { useBuilder } from "@/contexts/BuilderContext";
import { BuilderElement } from "@/types/builder";
import { stylesToString } from "@/utils/builder";
import { createNewElement } from "@/utils/builder";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ElementProps {
  element: BuilderElement;
}

const Element: React.FC<ElementProps> = ({ element }) => {
  const { dispatch, state } = useBuilder();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "SELECT_ELEMENT", payload: element.id });
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const elementType = e.dataTransfer.getData("elementType");
    if (elementType && element.type === "container") {
      dispatch({
        type: "ADD_ELEMENT",
        payload: {
          type: elementType as any,
          containerId: element.id,
        },
      });
    }
  };
  
  const isSelected = state.selectedElementId === element.id;
  
  const renderElement = () => {
    switch (element.type) {
      case "heading":
        return <h2 style={stylesToString(element.styles)}>{element.content}</h2>;
      
      case "paragraph":
        return <p style={stylesToString(element.styles)}>{element.content}</p>;
      
      case "button":
        return (
          <button
            style={stylesToString(element.styles)}
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {element.content}
          </button>
        );
      
      case "image":
        return (
          <img
            src={element.src}
            alt={element.alt || ""}
            style={stylesToString(element.styles)}
          />
        );
      
      case "container":
        return (
          <div
            style={stylesToString(element.styles)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`min-h-[50px] transition-colors ${isDragOver ? 'bg-builder-primary bg-opacity-10' : ''}`}
          >
            {element.children?.map((child) => (
              <Element key={child.id} element={child} />
            ))}
            {isDragOver && (
              <div className="absolute inset-0 border-2 border-dashed border-builder-primary rounded-md pointer-events-none"></div>
            )}
          </div>
        );
      
      case "divider":
        return <div style={stylesToString(element.styles)}></div>;
      
      case "gallery":
        return (
          <div style={stylesToString(element.styles)}>
            {element.children?.map((child) => (
              <Element key={child.id} element={child} />
            ))}
          </div>
        );
      
      case "icon":
        return (
          <div style={stylesToString(element.styles)}>
            {element.content === 'facebook' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
              </svg>
            )}
            {element.content === 'twitter' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.2401 3.74901C18.334 4.10947 17.3833 4.35997 16.4134 4.49901C17.4104 3.88232 18.1699 2.88836 18.5284 1.72901C17.5709 2.30071 16.5307 2.71625 15.4504 2.95801C14.8553 2.32961 14.0951 1.88911 13.2599 1.68341C12.4246 1.47771 11.5494 1.51731 10.7381 1.7972C9.92673 2.0771 9.21469 2.58675 8.6853 3.26289C8.15592 3.93903 7.83115 4.75111 7.7501 5.60901C7.73413 5.9097 7.7501 6.21134 7.7501 6.51301C5.96019 6.43117 4.21168 5.98037 2.61858 5.19213C1.02547 4.4039 1.61368 3.3088 0.779841 1.99901C-0.083007 3.82501 0.503992 6.26001 2.2701 7.46301C1.50519 7.44211 0.757051 7.2352 0.0900879 6.85901V6.91501C0.0900879 8.77401 1.5241 10.335 3.3271 10.705C2.91712 10.8278 2.49234 10.8502 2.0741 10.772C2.32022 11.83 2.89932 12.7706 3.71736 13.443C4.53541 14.1153 5.54855 14.4759 6.5971 14.464C5.55274 15.2915 4.35469 15.8957 3.07309 16.243C1.79148 16.5902 0.458852 16.6733 -0.850098 16.487C1.46817 17.961 4.17381 18.7553 6.9591 18.754C14.2611 18.754 18.2611 12.8761 18.2611 7.81801L18.2481 7.28201C19.2016 6.58803 20.0239 5.7365 20.6781 4.76301C19.7701 5.19001 18.7931 5.48001 17.7681 5.62001L19.2401 3.74901Z"></path>
              </svg>
            )}
            {element.content === 'instagram' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      onClick={handleClick}
      className={`relative ${isSelected ? "outline outline-2 outline-builder-primary" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {renderElement()}
    </motion.div>
  );
};

// Define Layer Panel component
const LayerPanel: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const { template, selectedElementId } = state;
  const [expandedContainers, setExpandedContainers] = useState<Record<string, boolean>>({});

  // Helper function to get display name
  const getElementDisplayName = (element: BuilderElement): string => {
    switch (element.type) {
      case "heading":
        return `${element.content?.substring(0, 20)}${element.content && element.content.length > 20 ? '...' : ''}`;
      case "paragraph":
        return `${element.content?.substring(0, 20)}${element.content && element.content.length > 20 ? '...' : ''}`;
      case "button":
        return `Button: ${element.content}`;
      case "image":
        return element.alt || 'Image';
      case "container":
        return `Container`;
      case "divider":
        return "Divider";
      case "gallery":
        return `Gallery`;
      case "icon":
        return `${element.content} Icon`;
      default:
        return element.type;
    }
  };

  // Helper function to get icon
  const getElementIcon = (type: string) => {
    const icons: Record<string, string> = {
      heading: 'H',
      paragraph: 'P',
      button: 'B',
      image: '🖼️',
      container: '📦',
      divider: '―',
      gallery: '🖼️',
      icon: '⚡'
    };
    return <span className="inline-block w-4 mr-2">{icons[type] || '•'}</span>;
  };

  const toggleContainer = (id: string) => {
    setExpandedContainers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderElement = (element: BuilderElement, depth = 0) => {
    const isContainer = element.type === "container" || element.type === "gallery";
    const isExpanded = expandedContainers[element.id] ?? true;

    return (
      <div key={element.id} className="space-y-1">
        <motion.div
          className={`flex items-center p-2 rounded-md text-sm cursor-pointer ${
            selectedElementId === element.id
              ? "bg-builder-primary/10 text-builder-primary"
              : "hover:bg-gray-100"
          }`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "SELECT_ELEMENT", payload: element.id });
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isContainer ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleContainer(element.id);
              }}
              className="mr-1 text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span className="w-5"></span>
          )}
          {getElementIcon(element.type)}
          <span className="truncate">
            {getElementDisplayName(element)}
          </span>
        </motion.div>

        <AnimatePresence>
          {isContainer && isExpanded && element.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {element.children.map(child => renderElement(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-700">Layers</h3>
        <button 
          onClick={() => {
            const allExpanded = Object.values(expandedContainers).every(Boolean);
            const newState = {} as Record<string, boolean>;
            template.elements.forEach(el => {
              if (el.type === "container" || el.type === "gallery") {
                newState[el.id] = !allExpanded;
              }
            });
            setExpandedContainers(newState);
          }}
          className="text-xs text-builder-primary hover:underline"
        >
          {Object.values(expandedContainers).every(Boolean) ? "Collapse All" : "Expand All"}
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto thin-scrollbar">
        {template.elements.map(element => renderElement(element))}
      </div>
    </div>
  );
};

export const Canvas: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const { template, viewMode } = state;
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Handle delete key to remove selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedElementId) {
        dispatch({ type: "REMOVE_ELEMENT", payload: state.selectedElementId });
      }
      
      // Handle undo (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        dispatch({ type: "UNDO" });
      }
      
      // Handle redo (Ctrl/Cmd + Shift + Z) or (Ctrl/Cmd + Y)
      if ((e.ctrlKey || e.metaKey) && ((e.shiftKey && e.key === 'z') || e.key === 'y')) {
        e.preventDefault();
        dispatch({ type: "REDO" });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElementId, dispatch]);
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas
    if (e.currentTarget === e.target) {
      dispatch({ type: "SELECT_ELEMENT", payload: null });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const elementType = e.dataTransfer.getData("elementType");
    if (elementType) {
      const newElement = createNewElement(elementType as any);
      dispatch({
        type: "ADD_ROOT_ELEMENT",
        payload: newElement,
      });
    }
  };

  const viewModeClasses = {
    desktop: 'w-full max-w-4xl mx-auto',
    tablet: 'w-[768px] mx-auto border-8 border-white rounded-xl',
    mobile: 'w-[375px] mx-auto border-8 border-white rounded-3xl shadow-lg'
  };

  return (
    <div className="space-y-4">
      <div 
        className={`bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden transition-all ${
          viewModeClasses[viewMode] || viewModeClasses.desktop
        }`}
      >
        <div 
          className={`min-h-[600px] relative ${isDragOver ? 'bg-builder-primary bg-opacity-5' : ''}`}
          onClick={handleCanvasClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {template.elements.map((element) => (
            <Element key={element.id} element={element} />
          ))}
          {isDragOver && (
            <div className="absolute inset-0 border-2 border-dashed border-builder-primary rounded-md pointer-events-none"></div>
          )}
        </div>
      </div>
      
      <LayerPanel />
    </div>
  );
};
