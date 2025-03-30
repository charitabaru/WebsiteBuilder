
import { useBuilder } from '@/contexts/BuilderContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BuilderElement } from '@/types/builder';
import { stylesToString } from '@/utils/builder';
import { ArrowLeft, Edit, Smartphone, Tablet, Monitor, Eye } from 'lucide-react';

interface ElementProps {
  element: BuilderElement;
}

const PreviewElement: React.FC<ElementProps> = ({ element }) => {
  const renderElement = () => {
    switch (element.type) {
      case 'heading':
        return <h2 style={stylesToString(element.styles)}>{element.content}</h2>;
      
      case 'paragraph':
        return <p style={stylesToString(element.styles)}>{element.content}</p>;
      
      case 'button':
        return (
          <button
            style={stylesToString(element.styles)}
            className="cursor-pointer"
          >
            {element.content}
          </button>
        );
      
      case 'image':
        return (
          <img
            src={element.src}
            alt={element.alt || ''}
            style={stylesToString(element.styles)}
          />
        );
      
      case 'container':
        return (
          <div style={stylesToString(element.styles)}>
            {element.children?.map((child) => (
              <PreviewElement key={child.id} element={child} />
            ))}
          </div>
        );
      
      case 'divider':
        return <div style={stylesToString(element.styles)}></div>;
        
      default:
        return null;
    }
  };
  
  return renderElement();
};

export const TemplatePreview: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const { template, userConfig, viewMode } = state;
  
  const handleBack = () => {
    dispatch({ type: 'SET_STAGE', payload: 'registration' });
  };
  
  const handleEdit = () => {
    dispatch({ type: 'SET_STAGE', payload: 'editor' });
  };
  
  const viewModeClasses = {
    desktop: 'w-full max-w-4xl mx-auto',
    tablet: 'w-[768px] mx-auto border-8 border-white rounded-xl',
    mobile: 'w-[375px] mx-auto border-8 border-white rounded-3xl shadow-lg'
  };

  // Dynamic background classes based on industry
  const getIndustryBackground = () => {
    switch(userConfig?.industry) {
      case 'restaurant': return 'bg-gradient-to-br from-amber-50 to-orange-50';
      case 'fashion': return 'bg-gradient-to-br from-pink-50 to-purple-50';
      case 'technology': return 'bg-gradient-to-br from-blue-50 to-indigo-50';
      default: return 'bg-gradient-to-br from-gray-50 to-indigo-50';
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-builder-primary to-purple-500 bg-clip-text text-transparent">
            Template Preview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-1 rounded-md flex gap-1">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'desktop' })}
              className={viewMode === 'desktop' ? 'bg-builder-primary text-white' : ''}
            >
              <Monitor size={16} className="mr-2" />
              Desktop
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'tablet' })}
              className={viewMode === 'tablet' ? 'bg-builder-primary text-white' : ''}
            >
              <Tablet size={16} className="mr-2" />
              Tablet
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'mobile' })}
              className={viewMode === 'mobile' ? 'bg-builder-primary text-white' : ''}
            >
              <Smartphone size={16} className="mr-2" />
              Mobile
            </Button>
          </div>
          <Button 
            onClick={handleEdit} 
            className="bg-gradient-to-r from-builder-primary to-purple-500 hover:bg-builder-primary-hover text-white"
          >
            <Edit size={18} className="mr-2" />
            Edit Template
          </Button>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-medium bg-gradient-to-r from-builder-primary to-purple-500 bg-clip-text text-transparent">
                  Website Preview
                </h2>
                <p className="text-gray-600 mt-1">
                  Your template is ready! Preview how it looks across different devices.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 py-2 px-4 rounded-full">
                <Eye size={18} className="text-purple-500" />
                <span className="text-sm font-medium text-purple-700">Preview Mode</span>
              </div>
            </div>
            
            {userConfig && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md text-sm">
                <h3 className="font-semibold mb-3 text-gray-700">Site Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded shadow-sm flex flex-col">
                    <span className="text-xs text-gray-500">Business Name</span>
                    <span className="font-medium text-gray-800">{userConfig.businessName}</span>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm flex flex-col">
                    <span className="text-xs text-gray-500">Industry</span>
                    <span className="font-medium text-gray-800 capitalize">{userConfig.industry}</span>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm flex items-center">
                    <div className="mr-3">
                      <span className="text-xs text-gray-500">Theme Color</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: userConfig.colorTheme }}
                        ></div>
                        <span className="font-medium text-xs text-gray-800">{userConfig.colorTheme}</span>
                      </div>
                    </div>
                    {userConfig.logo && (
                      <div className="ml-auto">
                        <img
                          src={userConfig.logo}
                          alt="Business logo"
                          className="h-8 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`bg-white rounded-lg shadow-md border border-purple-100 overflow-hidden transition-all ${
              viewModeClasses[viewMode] || viewModeClasses.desktop
            }`}
          >
            <div className="preview-container p-4">
              {template.elements.map((element) => (
                <PreviewElement key={element.id} element={element} />
              ))}
            </div>
          </motion.div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Ready to start editing? Click the "Edit Template" button to customize your website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
