import { useBuilder } from "@/contexts/BuilderContext";
import { BuilderElement, TextAlignment } from "@/types/builder";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

// Predefined color palettes
const colorPalettes = [
  // Modern
  ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
  // Earthy
  ["#166534", "#15803d", "#16a34a", "#4ade80", "#86efac"],
  // Warm
  ["#b91c1c", "#dc2626", "#ef4444", "#f87171", "#fca5a5"],
  // Cool
  ["#075985", "#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc"],
  // Neutral
  ["#374151", "#4b5563", "#6b7280", "#9ca3af", "#d1d5db"],
  // Vibrant
  ["#4f46e5", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
  // Natural
  ["#65a30d", "#84cc16", "#a3e635", "#d9f99d", "#78350f"],
  // Pastel
  ["#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b"],
];

// Stock images by category
const stockImages = {
  business: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
    "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=500&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80",
  ],
  product: [
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
  ],
  people: [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80",
    "https://images.unsplash.com/photo-1516178151140-1a27a1faaaed?w=500&q=80",
    "https://images.unsplash.com/photo-1609349717652-49c7038ef42e?w=500&q=80",
  ],
  nature: [
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=500&q=80",
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=500&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80",
  ],
};

// Font options with nice pairing suggestions
const fontOptions = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: '"Times New Roman", Times, serif', label: "Times New Roman" },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
  { value: "Tahoma, Geneva, sans-serif", label: "Tahoma" },
  { value: '"Trebuchet MS", Helvetica, sans-serif', label: "Trebuchet MS" },
  { value: 'Palatino, "Palatino Linotype", serif', label: "Palatino" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: '"Courier New", Courier, monospace', label: "Courier New" },
  { value: '"Segoe UI", Tahoma, Geneva, sans-serif', label: "Segoe UI" },
  { value: '"Roboto", Arial, sans-serif', label: "Roboto" },
  { value: '"Open Sans", Arial, sans-serif', label: "Open Sans" },
  { value: '"Lato", Arial, sans-serif', label: "Lato" },
  { value: '"Montserrat", Arial, sans-serif', label: "Montserrat" },
];

export const PropertyEditor: React.FC = () => {
  const { getSelectedElement, dispatch } = useBuilder();
  const selectedElement = getSelectedElement();

  const [properties, setProperties] = useState<BuilderElement | null>(null);
  const [activeColorPalette, setActiveColorPalette] = useState(0);
  const [selectedImageCategory, setSelectedImageCategory] =
    useState<keyof typeof stockImages>("business");
    
  useEffect(() => {
    if (
      selectedElement &&
      JSON.stringify(selectedElement) !== JSON.stringify(properties)
    ) {
      setProperties({ ...selectedElement });
    } else if (!selectedElement) {
      setProperties(null);
    }
  }, [selectedElement]);

  if (!properties) {
    return (
      <div className="bg-gradient-to-b from-white to-purple-50 p-4 rounded-md shadow-sm h-full">
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">👆</span>
          </div>
          <p className="font-medium mb-2">No Element Selected</p>
          <p className="text-sm">
            Select an element on the canvas to edit its properties
          </p>
          <div className="mt-6 p-4 bg-gray-50 rounded-md text-left text-xs">
            <p className="font-medium mb-1">Keyboard Shortcuts:</p>
            <ul className="space-y-1">
              <li>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                  Delete
                </kbd>{" "}
                - Remove selected element
              </li>
              <li>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                  Ctrl+Z
                </kbd>{" "}
                - Undo last action
              </li>
              <li>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                  Ctrl+Y
                </kbd>{" "}
                - Redo last action
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const handleContentChange = (value: string) => {
    setProperties({
      ...properties,
      content: value,
    });
  };

  const handleStyleChange = (property: string, value: string) => {
    setProperties({
      ...properties,
      styles: {
        ...properties.styles,
        [property]: value,
      },
    });
  };

  const handleImageChange = (property: "src" | "alt", value: string) => {
    setProperties({
      ...properties,
      [property]: value,
    });
  };

  const handleAlignmentChange = (alignment: TextAlignment) => {
    handleStyleChange("textAlign", alignment);
  };

  const handleFontWeightToggle = () => {
    const currentWeight = properties.styles.fontWeight || "normal";
    const newWeight = currentWeight === "bold" ? "normal" : "bold";
    handleStyleChange("fontWeight", newWeight);
  };

  const handleItalicToggle = () => {
    const currentStyle = properties.styles.fontStyle || "normal";
    const newStyle = currentStyle === "italic" ? "normal" : "italic";
    handleStyleChange("fontStyle", newStyle);
  };

  const handleColorSelection = (color: string) => {
    handleStyleChange("color", color);
  };

  const handleBgColorSelection = (color: string) => {
    handleStyleChange("backgroundColor", color);
  };

  const handleSaveChanges = () => {
    if (properties && selectedElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: selectedElement.id,
          element: properties,
        },
      });
    }
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      dispatch({
        type: "REMOVE_ELEMENT",
        payload: selectedElement.id,
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-purple-50 p-4 rounded-md shadow-sm h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-purple-100">
        <h2 className="font-semibold text-lg flex items-center">
          <span className="mr-2 text-transparent bg-clip-text bg-gradient-to-r from-builder-primary to-purple-600">
            Properties
          </span>
          <span className="text-xs py-1 px-2 bg-purple-100 text-purple-800 rounded-full">
            {properties.type.charAt(0).toUpperCase() + properties.type.slice(1)}
          </span>
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          title="Delete element"
          onClick={handleDeleteElement}
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-3 bg-purple-100">
          <TabsTrigger value="content" className="data-[state=active]:bg-white">
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="data-[state=active]:bg-white">
            Style
          </TabsTrigger>
          <TabsTrigger value="layout" className="data-[state=active]:bg-white">
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {properties.type === "heading" ||
          properties.type === "paragraph" ||
          properties.type === "button" ? (
            <div className="space-y-2">
              <Label htmlFor="content">Text</Label>
              {properties.type === "paragraph" ? (
                <Textarea
                  id="content"
                  value={properties.content || ""}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleContentChange(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="min-h-[100px] resize-y"
                  placeholder="Enter your text content..."
                />
              ) : (
                <Input
                  id="content"
                  value={properties.content || ""}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleContentChange(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={
                    properties.type === "heading"
                      ? "Enter heading text..."
                      : "Enter button text..."
                  }
                />
              )}
            </div>
          ) : null}

          {properties.type === "image" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="src">Image URL</Label>
                <Input
                  id="src"
                  value={properties.src || ""}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleImageChange("src",e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={properties.alt || ""}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleImageChange("alt",e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Describe the image for accessibility"
                />
              </div>
              {properties.src && (
                <div className="mt-2 p-2 border rounded">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <img
                    src={properties.src}
                    alt={properties.alt || "Preview"}
                    className="max-h-32 max-w-full object-contain mx-auto"
                  />
                </div>
              )}

              <div className="mt-4 space-y-2">
                <Label className="block text-sm font-medium">
                  Image Categories
                </Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(
                    Object.keys(stockImages) as Array<keyof typeof stockImages>
                  ).map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedImageCategory === category
                          ? "secondary"
                          : "outline"
                      }
                      size="sm"
                      className="text-xs capitalize"
                      onClick={() => setSelectedImageCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {stockImages[selectedImageCategory].map((imageSrc, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded border cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageChange("src", imageSrc)}
                    >
                      <img
                        src={imageSrc}
                        alt={`${selectedImageCategory} image ${idx + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {properties.type === "icon" ? (
            <div className="space-y-2 relative">
              <Label htmlFor="iconType">Icon Type</Label>
              <select
                id="iconType"
                className="w-full p-2 border rounded-md bg-white"
                value={properties.content || "facebook"}
                onChange={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  handleContentChange(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()} // Add this line
              >
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">Youtube</option>
                <option value="linkedin">LinkedIn</option>
                <option value="mail">Email</option>
                <option value="phone">Phone</option>
                <option value="map">Map</option>
                <option value="heart">Heart</option>
                <option value="star">Star</option>
                <option value="calendar">Calendar</option>
                <option value="home">Home</option>
                <option value="settings">Settings</option>
                <option value="message">Message</option>
                <option value="user">User</option>
                <option value="users">Users</option>
              </select>
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          {properties.type !== "container" && properties.type !== "divider" ? (
            <>
              <div className="space-y-2 relative">
                <Label htmlFor="fontFamily">Font Family</Label>
                <select
                  id="fontFamily"
                  className="w-full border rounded-md p-2 bg-white"
                  value={properties.styles.fontFamily || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleStyleChange("fontFamily", e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="">Select Font</option>
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={properties.styles.color || "#000000"}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStyleChange("color", e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-9 p-1"
                  />
                  <Input
                    value={properties.styles.color || "#000000"}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStyleChange("color", e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1"
                  />
                </div>

                <div className="mt-2">
                  <Label className="text-xs text-gray-500 mb-1 block">
                    Color Palette
                  </Label>
                  <div className="flex gap-2 mb-2">
                    {colorPalettes.map((_, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full ${
                          activeColorPalette === index
                            ? "ring-2 ring-offset-2 ring-purple-500"
                            : ""
                        }`}
                        style={{
                          background: `linear-gradient(45deg, ${colorPalettes[index][0]} 0%, ${colorPalettes[index][4]} 100%)`,
                        }}
                        onClick={() => setActiveColorPalette(index)}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 mt-2">
                    {colorPalettes[activeColorPalette].map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                          properties.styles.color === color
                            ? "ring-2 ring-offset-1 ring-gray-400"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelection(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={properties.styles.backgroundColor || "#FFFFFF"}
                onChange={(e) => {
                  e.stopPropagation();
                  handleStyleChange("backgroundColor", e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-9 p-1"
              />
              <Input
                value={properties.styles.backgroundColor || "#FFFFFF"}
                onChange={(e) => {
                  e.stopPropagation();
                  handleStyleChange("backgroundColor", e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                className="flex-1"
              />
            </div>

            <div className="mt-2">
              <Label className="text-xs text-gray-500 mb-1 block">
                Color Palette
              </Label>
              <div className="flex gap-2 mt-2">
                {colorPalettes[activeColorPalette].map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                      properties.styles.backgroundColor === color
                        ? "ring-2 ring-offset-1 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleBgColorSelection(color)}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3">
                <button
                  className="p-2 bg-white border rounded text-xs"
                  onClick={() => handleBgColorSelection("transparent")}
                >
                  Transparent
                </button>
                <button
                  className="p-2 bg-white border rounded text-xs"
                  onClick={() => handleBgColorSelection("white")}
                >
                  White
                </button>
                <button
                  className="p-2 bg-gray-900 text-white border rounded text-xs"
                  onClick={() => handleBgColorSelection("#111111")}
                >
                  Black
                </button>
              </div>
            </div>
          </div>

          {properties.type !== "image" && properties.type !== "divider" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  id="fontSize"
                  value={properties?.styles?.fontSize || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleStyleChange("fontSize", e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="16px"
                />

                <div className="grid grid-cols-4 gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleStyleChange("fontSize", "12px")}
                  >
                    Small
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleStyleChange("fontSize", "16px")}
                  >
                    Default
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleStyleChange("fontSize", "24px")}
                  >
                    Large
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleStyleChange("fontSize", "32px")}
                  >
                    XL
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Text Formatting</Label>
                <div className="flex gap-1 mt-1">
                  <Button
                    type="button"
                    variant={
                      properties.styles.fontWeight === "bold"
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    onClick={handleFontWeightToggle}
                  >
                    <Bold size={16} />
                  </Button>

                  <Button
                    type="button"
                    variant={
                      properties.styles.fontStyle === "italic"
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    onClick={handleItalicToggle}
                  >
                    <Italic size={16} />
                  </Button>

                  <Button
                    type="button"
                    variant={
                      properties.styles.textAlign === "left"
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    onClick={() => handleAlignmentChange("left")}
                  >
                    <AlignLeft size={16} />
                  </Button>

                  <Button
                    type="button"
                    variant={
                      properties.styles.textAlign === "center"
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    onClick={() => handleAlignmentChange("center")}
                  >
                    <AlignCenter size={16} />
                  </Button>

                  <Button
                    type="button"
                    variant={
                      properties.styles.textAlign === "right"
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    onClick={() => handleAlignmentChange("right")}
                  >
                    <AlignRight size={16} />
                  </Button>
                </div>
              </div>
            </>
          ) : null}

          {properties.type === "button" ||
          properties.type === "image" ||
          properties.type === "container" ? (
            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                id="borderRadius"
                value={properties?.styles?.borderRadius || ""}
                onChange={(e) => {
                  e.stopPropagation();
                  handleStyleChange("borderRadius", e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder="e.g. 4px"
              />

              <div className="grid grid-cols-4 gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleStyleChange("borderRadius", "0")}
                >
                  None
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleStyleChange("borderRadius", "4px")}
                >
                  Small
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleStyleChange("borderRadius", "8px")}
                >
                  Medium
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs rounded-full"
                  onClick={() => handleStyleChange("borderRadius", "9999px")}
                >
                  Full
                </Button>
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="boxShadow">Box Shadow</Label>
            <Input
              id="boxShadow"
              value={properties?.styles?.boxShadow || ""}
              onChange={(e) => {
                e.stopPropagation();
                handleStyleChange("boxShadow", e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="e.g. 0 2px 5px rgba(0,0,0,0.1)"
            />
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() =>
                  handleStyleChange("boxShadow", "0 2px 5px rgba(0,0,0,0.1)")
                }
              >
                Light
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() =>
                  handleStyleChange("boxShadow", "0 5px 15px rgba(0,0,0,0.2)")
                }
              >
                Medium
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() =>
                  handleStyleChange("boxShadow", "0 10px 25px rgba(0,0,0,0.3)")
                }
              >
                Heavy
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("boxShadow", "")}
              >
                None
              </Button>
            </div>
          </div>

          {properties.type === "button" || properties.type === "container" ? (
            <div className="space-y-2">
              <Label htmlFor="border">Border</Label>
              <Input
                id="border"
                value={properties?.styles?.border || ""}
                onChange={(e) => {
                  e.stopPropagation();
                  handleStyleChange("border", e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder="e.g. 1px solid #000000"
              />
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() =>
                    handleStyleChange("border", "1px solid #e5e7eb")
                  }
                >
                  Light
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() =>
                    handleStyleChange("border", "2px solid #d1d5db")
                  }
                >
                  Medium
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() =>
                    handleStyleChange("border", "2px solid #7C3AED")
                  }
                >
                  Accent
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleStyleChange("border", "")}
                >
                  None
                </Button>
              </div>
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={properties?.styles?.padding || ""}
              onChange={(e) => {
                e.stopPropagation();
                handleStyleChange("padding", e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="e.g. 10px or 10px 20px"
            />
            <div className="grid grid-cols-4 gap-2 mt-1">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("padding", "0px")}
              >
                None
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("padding", "10px")}
              >
                Small
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("padding", "20px")}
              >
                Medium
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("padding", "40px")}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="margin">Margin</Label>
            <Input
              id="margin"
              value={properties?.styles?.margin || ""}
              onChange={(e) => {
                e.stopPropagation();
                handleStyleChange("margin", e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="e.g. 10px or 10px 20px"
            />
            <div className="grid grid-cols-4 gap-2 mt-1">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("margin", "0px")}
              >
                None
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("margin", "10px")}
              >
                Small
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("margin", "20px")}
              >
                Medium
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("margin", "40px")}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              value={properties?.styles?.margin || ""}
              onChange={(e) => {
                e.stopPropagation();
                handleStyleChange("width", e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="e.g. 100% or 300px"
            />
            <div className="grid grid-cols-3 gap-2 mt-1">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("width", "100%")}
              >
                Full
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("width", "50%")}
              >
                Half
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("width", "auto")}
              >
                Auto
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              value={properties?.styles?.margin || ""}
              onChange={(e) => {
                e.stopPropagation();
                handleStyleChange("height", e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="e.g. auto or 200px"
            />
            <div className="grid grid-cols-3 gap-2 mt-1">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("height", "100%")}
              >
                Full
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("height", "300px")}
              >
                Fixed
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleStyleChange("height", "auto")}
              >
                Auto
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full bg-gradient-to-r from-builder-primary to-purple-600 hover:from-builder-primary-hover hover:to-purple-700 text-white"
            onClick={handleSaveChanges}
          >
            Apply Changes
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
