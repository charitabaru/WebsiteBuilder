
import { useBuilder } from "@/contexts/BuilderContext";
import { Button } from "@/components/ui/button";
import { Save, Smartphone, Tablet, Monitor, Undo, Redo, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  const { state, dispatch } = useBuilder();
  
  const handlePublish = () => {
    dispatch({ type: "SAVE_TEMPLATE" });
    dispatch({ type: "SET_STAGE", payload: "publish" });
  };
  
  const handleSave = () => {
    dispatch({ type: "SAVE_TEMPLATE" });
    toast.success("Your changes have been saved!", {
      description: "Your website design has been successfully saved.",
    });
  };
  
  const handleViewModeChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    dispatch({ type: "SET_VIEW_MODE", payload: mode });
  };
  
  const handleBack = () => {
    dispatch({ type: "SET_STAGE", payload: "preview" });
  };
  
  const handleUndo = () => {
    dispatch({ type: "UNDO" });
    toast.info("Change undone");
  };
  
  const handleRedo = () => {
    dispatch({ type: "REDO" });
    toast.info("Change redone");
  };
  
  const canUndo = state.history.past.length > 0;
  const canRedo = state.history.future.length > 0;
  
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <motion.div 
          whileHover={{ rotate: 5 }}
          className="w-8 h-8 bg-gradient-to-br from-builder-primary to-purple-400 rounded-md flex items-center justify-center text-white font-bold"
        >
          WB
        </motion.div>
        <h1 className="text-xl font-semibold bg-gradient-to-r from-builder-primary to-purple-400 bg-clip-text text-transparent">
          Website Builder
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {state.stage === 'editor' && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={handleBack}
              title="Back to Preview"
            >
              <ArrowLeft size={16} />
            </Button>
          
            <div className="flex items-center gap-1 mx-2 border-r border-l px-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleUndo}
                disabled={!canUndo}
                title="Undo"
                className="text-gray-500"
              >
                <Undo size={16} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleRedo}
                disabled={!canRedo}
                title="Redo"
                className="text-gray-500"
              >
                <Redo size={16} />
              </Button>
            </div>
            
            <div className="bg-gray-100 p-1 rounded-md flex gap-1">
              <Button
                variant={state.viewMode === "desktop" ? "default" : "ghost"}
                size="icon"
                onClick={() => handleViewModeChange("desktop")}
                title="Desktop view"
                className={state.viewMode === "desktop" ? "bg-builder-primary text-white" : "text-gray-500"}
              >
                <Monitor size={16} />
              </Button>
              
              <Button
                variant={state.viewMode === "tablet" ? "default" : "ghost"}
                size="icon"
                onClick={() => handleViewModeChange("tablet")}
                title="Tablet view"
                className={state.viewMode === "tablet" ? "bg-builder-primary text-white" : "text-gray-500"}
              >
                <Tablet size={16} />
              </Button>
              
              <Button
                variant={state.viewMode === "mobile" ? "default" : "ghost"}
                size="icon"
                onClick={() => handleViewModeChange("mobile")}
                title="Mobile view"
                className={state.viewMode === "mobile" ? "bg-builder-primary text-white" : "text-gray-500"}
              >
                <Smartphone size={16} />
              </Button>
            </div>
            
            <Button 
              onClick={handleSave} 
              variant="outline"
              className="border-builder-primary text-builder-primary hover:bg-builder-primary hover:text-white"
            >
              <Save size={16} className="mr-2" />
              Save
            </Button>
            
            <Button 
              onClick={handlePublish} 
              className="bg-gradient-to-r from-builder-primary to-purple-500 hover:bg-builder-primary-hover text-white"
            >
              Publish
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
