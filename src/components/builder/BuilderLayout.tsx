
import { ElementsPanel } from "./ElementsPanel";
import { PropertyEditor } from "./PropertyEditor";
import { Canvas } from "./Canvas";
import { Header } from "./Header";
import { BuilderProvider } from "@/contexts/BuilderContext";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { useBuilder } from "@/contexts/BuilderContext";
import { RegistrationForm } from "./RegistrationForm";
import { TemplatePreview } from "./TemplatePreview";
import { PublishView } from "./PublishView";
import { useEffect } from "react";

// Main content component to handle different stages
const BuilderContent: React.FC = () => {
  const { state } = useBuilder();
  
  // Set up keyboard shortcuts focus
  useEffect(() => {
    // Make sure the canvas is focusable for keyboard shortcuts
    const handleWindowClick = () => {
      document.getElementById('canvas-wrapper')?.focus();
    };
    
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);
  
  // Render based on the current stage
  switch (state.stage) {
    case "registration":
      return <RegistrationForm />;
      
    case "preview":
      return <TemplatePreview />;
      
    case "publish":
      return <PublishView />;
      
    case "editor":
      return (
        <div className="flex flex-col h-screen bg-builder-background overflow-hidden">
          <Header />
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left sidebar - Elements Panel */}
            <motion.div 
              className="w-72 p-4 border-r border-gray-200 overflow-y-auto bg-white bg-opacity-70 backdrop-blur-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ElementsPanel />
            </motion.div>
            
            {/* Main content - Canvas */}
            <motion.div 
              id="canvas-wrapper"
              className="flex-1 p-4 overflow-y-auto bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              tabIndex={0} // Make it focusable for keyboard shortcuts
            >
              <Canvas />
            </motion.div>
            
            {/* Right sidebar - Property Editor */}
            <motion.div 
              className="w-80 p-4 border-l border-gray-200 overflow-y-auto bg-white bg-opacity-70 backdrop-blur-lg"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <PropertyEditor />
            </motion.div>
          </div>
        </div>
      );
      
    default:
      return <RegistrationForm />;
  }
};

// Wrapper with provider
export const BuilderLayout: React.FC = () => {
  return (
    <BuilderProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50">
        <AnimatePresence mode="wait">
          <BuilderContent />
        </AnimatePresence>
        <Toaster position="top-right" />
      </div>
    </BuilderProvider>
  );
};
