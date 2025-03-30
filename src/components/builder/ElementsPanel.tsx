
import { useBuilder } from "@/contexts/BuilderContext";
import { ElementType } from "@/types/builder";
import { 
  AlignLeft, Image, Square, Type, LayoutGrid,
  Minus, Images, Facebook, Twitter, Instagram,
  ChevronDown, ChevronRight, Youtube, Linkedin, Mail,
  Phone, Map, Heart, Star, Calendar, Home, Settings,
  MessageSquare, User, Users, Clock, Search
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface DraggableElementProps {
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, label, icon, description }) => {
  const { dispatch } = useBuilder();
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("elementType", type);
    dispatch({ type: "SET_DRAGGING", payload: true });
  };
  
  const handleDragEnd = () => {
    dispatch({ type: "SET_DRAGGING", payload: false });
  };

  return (
    <div
      className="flex p-3 mb-2 bg-builder-element hover:bg-builder-element-hover rounded cursor-move transition-all shadow-sm hover:shadow border border-transparent hover:border-gray-200"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <motion.div 
        className="mr-3 text-builder-primary p-2 bg-builder-primary bg-opacity-10 rounded-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <div>
        <span className="font-medium block">{label}</span>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
    </div>
  );
};

interface ElementCategoryProps {
  title: string;
  elements: Array<{
    type: ElementType;
    label: string;
    icon: React.ReactNode;
    description: string;
  }>;
  searchTerm: string;
  defaultOpen?: boolean;
}

const ElementCategory: React.FC<ElementCategoryProps> = ({ title, elements, searchTerm, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const filteredElements = elements.filter((element) =>
    element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (filteredElements.length === 0) {
    return null;
  }
  
  return (
    <Collapsible open={searchTerm ? true : isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gradient-to-r from-purple-50 to-white text-sm font-semibold text-gray-700 uppercase rounded hover:bg-purple-100 transition-colors">
        <div className="flex items-center">
          {title}
          <span className="ml-2 bg-gray-100 text-xs px-2 py-0.5 rounded-full">
            {filteredElements.length}
          </span>
        </div>
        {searchTerm ? null : isOpen ? (
          <ChevronDown size={16} className="text-gray-500" />
        ) : (
          <ChevronRight size={16} className="text-gray-500" />
        )}
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2">
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredElements.map((element) => (
              <DraggableElement
                key={element.type + element.label}
                type={element.type}
                label={element.label}
                icon={element.icon}
                description={element.description}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const ElementsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const textElements = [
    { 
      type: "heading" as ElementType, 
      label: "Heading", 
      icon: <Type size={18} />,
      description: "Add a title or subtitle" 
    },
    { 
      type: "paragraph" as ElementType, 
      label: "Paragraph", 
      icon: <AlignLeft size={18} />,
      description: "Add a block of text" 
    },
  ];
  
  const mediaElements = [
    { 
      type: "image" as ElementType, 
      label: "Image", 
      icon: <Image size={18} />,
      description: "Upload or embed an image" 
    },
    { 
      type: "gallery" as ElementType, 
      label: "Gallery", 
      icon: <Images size={18} />,
      description: "Add multiple images" 
    },
  ];
  
  const layoutElements = [
    { 
      type: "container" as ElementType, 
      label: "Container", 
      icon: <LayoutGrid size={18} />,
      description: "Group elements together" 
    },
    { 
      type: "divider" as ElementType, 
      label: "Divider", 
      icon: <Minus size={18} />,
      description: "Add a horizontal line" 
    },
  ];
  
  const interactiveElements = [
    { 
      type: "button" as ElementType, 
      label: "Button", 
      icon: <Square size={18} />,
      description: "Add a clickable button" 
    },
  ];
  
  const socialElements = [
    { 
      type: "icon" as ElementType, 
      label: "Facebook Icon", 
      icon: <Facebook size={18} />,
      description: "Add Facebook social icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Twitter Icon", 
      icon: <Twitter size={18} />,
      description: "Add Twitter social icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Instagram Icon", 
      icon: <Instagram size={18} />,
      description: "Add Instagram social icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Youtube Icon", 
      icon: <Youtube size={18} />,
      description: "Add Youtube social icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "LinkedIn Icon", 
      icon: <Linkedin size={18} />,
      description: "Add LinkedIn social icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Email Icon", 
      icon: <Mail size={18} />,
      description: "Add Email icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Phone Icon", 
      icon: <Phone size={18} />,
      description: "Add Phone icon" 
    },
  ];
  
  const additionalElements = [
    { 
      type: "icon" as ElementType, 
      label: "Map Icon", 
      icon: <Map size={18} />,
      description: "Add Map location icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Heart Icon", 
      icon: <Heart size={18} />,
      description: "Add Heart/Like icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Star Icon", 
      icon: <Star size={18} />,
      description: "Add Star/Rating icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Calendar Icon", 
      icon: <Calendar size={18} />,
      description: "Add Calendar/Date icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Home Icon", 
      icon: <Home size={18} />,
      description: "Add Home icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Settings Icon", 
      icon: <Settings size={18} />,
      description: "Add Settings icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Message Icon", 
      icon: <MessageSquare size={18} />,
      description: "Add Message/Chat icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "User Icon", 
      icon: <User size={18} />,
      description: "Add User/Profile icon" 
    },
    { 
      type: "icon" as ElementType, 
      label: "Users Icon", 
      icon: <Users size={18} />,
      description: "Add Users/Team icon" 
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-purple-50 p-4 rounded-md shadow-sm h-full overflow-y-auto">
      <h2 className="font-semibold text-lg mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-builder-primary to-purple-600">Elements</h2>
      
      {/* Search for elements */}
      <div className="mb-5">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-purple-200 focus-visible:ring-builder-primary"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      {searchTerm.length === 0 && (
        <p className="text-sm text-gray-500 mb-4 bg-purple-50 p-2 rounded-md border border-purple-100 text-center">
          Drag elements to add them to your page
        </p>
      )}
      
      <div>
        <ElementCategory title="Layout" elements={layoutElements} searchTerm={searchTerm} defaultOpen={true} />
        <ElementCategory title="Text" elements={textElements} searchTerm={searchTerm} defaultOpen={true} />
        <ElementCategory title="Media" elements={mediaElements} searchTerm={searchTerm} defaultOpen={false} />
        <ElementCategory title="Interactive" elements={interactiveElements} searchTerm={searchTerm} defaultOpen={false} />
        <ElementCategory title="Social Media" elements={socialElements} searchTerm={searchTerm} defaultOpen={false} />
        <ElementCategory title="Additional Icons" elements={additionalElements} searchTerm={searchTerm} defaultOpen={false} />
      </div>
    </div>
  );
};
