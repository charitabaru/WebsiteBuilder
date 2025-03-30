
export type ElementType = 'heading' | 'paragraph' | 'button' | 'image' | 'container' | 'divider' | 'gallery' | 'icon';

export type ViewMode = 'desktop' | 'tablet' | 'mobile';

export type TextAlignment = 'left' | 'center' | 'right';

export type BuilderStage = 'registration' | 'preview' | 'editor' | 'publish';

export type Industry = 'restaurant' | 'retail' | 'professional' | 'technology' | 'healthcare' | 'fashion' | 'education' | 'other';

export interface UserConfig {
  businessName: string;
  industry: Industry;
  colorTheme: string;
  logo?: string;
}

export interface BuilderElement {
  id: string;
  type: ElementType;
  content?: string;
  src?: string;
  alt?: string;
  styles: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string; // Added fontStyle property
    textAlign?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    boxShadow?: string;
    border?: string;
    fontFamily?: string;
    display?: string; // Added display property
    gridTemplateColumns?: string; // Added for gallery layout
    gap?: string; // Added for spacing in layouts
    position?: string; // Added for positioning elements
    top?: string;
    left?: string;
    transform?: string;
    transition?: string;
    objectFit?: string; // Added for image sizing
    cursor?: string; // Added for cursor styling
    maxWidth?: string; // Added for limiting widths
    marginLeft?: string; // Added for specific margin directions
    marginRight?: string;
    justifyContent?: string; // Added for flex layouts
    alignItems?: string; // Added for flex layouts
  };
  children?: BuilderElement[];
}

export interface Template {
  id: string;
  name: string;
  industry: Industry;
  elements: BuilderElement[];
  thumbnail?: string;
}

export interface BuilderHistory {
  past: Template[];
  future: Template[];
}
