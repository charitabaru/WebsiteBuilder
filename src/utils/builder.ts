
import { BuilderElement, ElementType, Industry, Template } from "@/types/builder";

// Generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Create a new element with default properties
export const createNewElement = (type: ElementType): BuilderElement => {
  const id = generateId();
  
  const baseElement: BuilderElement = {
    id,
    type,
    styles: {},
  };
  
  switch (type) {
    case 'heading':
      return {
        ...baseElement,
        content: 'Heading',
        styles: {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000000',
          padding: '10px',
          margin: '0',
        },
      };
    case 'paragraph':
      return {
        ...baseElement,
        content: 'This is a paragraph of text. Click to edit this text.',
        styles: {
          fontSize: '16px',
          color: '#333333',
          padding: '10px',
          margin: '0',
        },
      };
    case 'button':
      return {
        ...baseElement,
        content: 'Button',
        styles: {
          backgroundColor: '#7C3AED',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: '16px',
        },
      };
    case 'image':
      return {
        ...baseElement,
        src: 'https://via.placeholder.com/400x200',
        alt: 'Placeholder image',
        styles: {
          width: '100%',
          height: 'auto',
          padding: '10px',
          margin: '0',
        },
      };
    case 'container':
      return {
        ...baseElement,
        children: [],
        styles: {
          backgroundColor: '#FFFFFF',
          padding: '20px',
          margin: '10px 0',
          borderRadius: '4px',
        },
      };
    case 'divider':
      return {
        ...baseElement,
        styles: {
          height: '1px',
          backgroundColor: '#E5E7EB',
          width: '100%',
          margin: '20px 0',
        },
      };
    case 'gallery':
      return {
        ...baseElement,
        children: [
          createNewElement('image'),
          createNewElement('image'),
          createNewElement('image'),
        ],
        styles: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          width: '100%',
          padding: '10px',
        },
      };
    case 'icon':
      return {
        ...baseElement,
        content: 'facebook',
        styles: {
          fontSize: '24px',
          color: '#4267B2',
          padding: '10px',
          margin: '0',
        },
      };
    default:
      return baseElement;
  }
};

// Default template
export const defaultTemplate = {
  id: generateId(),
  name: 'Default Template',
  industry: 'other' as Industry,
  elements: [
    {
      id: generateId(),
      type: 'container' as ElementType,
      styles: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        margin: '0 0 20px 0',
      },
      children: [
        {
          id: generateId(),
          type: 'heading' as ElementType,
          content: 'Welcome to Website Builder',
          styles: {
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333333',
            margin: '0 0 20px 0',
          },
        },
        {
          id: generateId(),
          type: 'paragraph' as ElementType,
          content: 'This is a sample website. Drag elements from the sidebar to build your own page.',
          styles: {
            fontSize: '16px',
            textAlign: 'center',
            color: '#666666',
            margin: '0 0 20px 0',
          },
        },
        {
          id: generateId(),
          type: 'button' as ElementType,
          content: 'Get Started',
          styles: {
            backgroundColor: '#7C3AED',
            color: '#FFFFFF',
            padding: '10px 25px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '16px',
            margin: '0 auto',
            display: 'block',
          },
        },
      ],
    },
    {
      id: generateId(),
      type: 'container' as ElementType,
      styles: {
        backgroundColor: '#F9FAFB',
        padding: '30px',
        margin: '0 0 20px 0',
      },
      children: [
        {
          id: generateId(),
          type: 'heading' as ElementType,
          content: 'Main Content Section',
          styles: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333333',
            margin: '0 0 20px 0',
          },
        },
        {
          id: generateId(),
          type: 'paragraph' as ElementType,
          content: 'This is the main content area. You can add more elements here by dragging them from the elements panel.',
          styles: {
            fontSize: '16px',
            color: '#666666',
            margin: '0 0 20px 0',
          },
        },
        {
          id: generateId(),
          type: 'image' as ElementType,
          src: 'https://via.placeholder.com/800x400',
          alt: 'Placeholder image',
          styles: {
            width: '100%',
            height: 'auto',
            margin: '0 0 20px 0',
          },
        },
      ],
    },
    {
      id: generateId(),
      type: 'container' as ElementType,
      styles: {
        backgroundColor: '#333333',
        padding: '20px',
        color: '#FFFFFF',
      },
      children: [
        {
          id: generateId(),
          type: 'paragraph' as ElementType,
          content: '© 2023 Website Builder. All rights reserved.',
          styles: {
            fontSize: '14px',
            textAlign: 'center',
            color: '#FFFFFF',
          },
        },
      ],
    },
  ],
};

// Create templates based on industry
export const getTemplateByIndustry = (industry: Industry, businessName: string, primaryColor: string): Template => {
  // Create a new template ID
  const templateId = generateId();
  
  // Base styles and structure will be similar
  const headerContainerId = generateId();
  const mainContainerId = generateId();
  const footerContainerId = generateId();
  
  // Default base template
  const baseTemplate: Template = {
    id: templateId,
    name: `${businessName} Website`,
    industry,
    elements: [
      // Header
      {
        id: headerContainerId,
        type: 'container',
        styles: {
          backgroundColor: '#FFFFFF',
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        children: [
          {
            id: generateId(),
            type: 'heading',
            content: businessName,
            styles: {
              fontSize: '24px',
              fontWeight: 'bold',
              color: primaryColor,
              margin: '0',
            },
          },
          {
            id: generateId(),
            type: 'button',
            content: 'Contact Us',
            styles: {
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
            },
          },
        ],
      },
      
      // Footer
      {
        id: footerContainerId,
        type: 'container',
        styles: {
          backgroundColor: '#333333',
          padding: '30px',
          color: '#FFFFFF',
        },
        children: [
          {
            id: generateId(),
            type: 'paragraph',
            content: `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
            styles: {
              fontSize: '14px',
              textAlign: 'center',
              color: '#FFFFFF',
            },
          },
        ],
      },
    ],
  };

  // Customize based on industry
  switch (industry) {
    case 'restaurant': {
      const heroContainer = {
        id: generateId(),
        type: 'container' as ElementType,
        styles: {
          padding: '0',
          margin: '0',
          position: 'relative',
        },
        children: [
          {
            id: generateId(),
            type: 'image' as ElementType,
            src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
            alt: 'Restaurant hero image',
            styles: {
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              margin: '0',
              padding: '0',
            },
          },
          {
            id: generateId(),
            type: 'container' as ElementType,
            styles: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '30px',
              textAlign: 'center',
              borderRadius: '8px',
              maxWidth: '80%',
            },
            children: [
              {
                id: generateId(),
                type: 'heading' as ElementType,
                content: businessName,
                styles: {
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  margin: '0 0 15px 0',
                },
              },
              {
                id: generateId(),
                type: 'paragraph' as ElementType,
                content: 'Delicious food made with care',
                styles: {
                  fontSize: '18px',
                  color: '#FFFFFF',
                  margin: '0 0 20px 0',
                },
              },
              {
                id: generateId(),
                type: 'button' as ElementType,
                content: 'View Menu',
                styles: {
                  backgroundColor: primaryColor,
                  color: '#FFFFFF',
                  padding: '12px 30px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  margin: '0 auto',
                  display: 'inline-block',
                },
              },
            ],
          },
        ],
      };

      const menuSection = {
        id: mainContainerId,
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#FFFFFF',
          padding: '60px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: 'Our Menu',
            styles: {
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#333333',
              margin: '0 0 40px 0',
            },
          },
          {
            id: generateId(),
            type: 'container' as ElementType,
            styles: {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '30px',
              maxWidth: '900px',
              margin: '0 auto',
            },
            children: [
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#F9FAFB',
                  padding: '25px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Appetizers',
                    styles: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: primaryColor,
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Start your meal with our delicious appetizers.',
                    styles: {
                      fontSize: '16px',
                      color: '#666666',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'image' as ElementType,
                    src: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                    alt: 'Appetizers',
                    styles: {
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      margin: '0',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#F9FAFB',
                  padding: '25px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Main Courses',
                    styles: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: primaryColor,
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Explore our selection of expertly crafted main dishes.',
                    styles: {
                      fontSize: '16px',
                      color: '#666666',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'image' as ElementType,
                    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                    alt: 'Main Courses',
                    styles: {
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      margin: '0',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      
      baseTemplate.elements.splice(1, 0, heroContainer, menuSection);
      return baseTemplate;
    }
    
    case 'retail': {
      const heroContainer = {
        id: generateId(),
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#f5f5f7',
          padding: '60px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: 'Quality Products for Every Need',
            styles: {
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#333333',
              margin: '0 0 15px 0',
            },
          },
          {
            id: generateId(),
            type: 'paragraph' as ElementType,
            content: `Shop the latest collection at ${businessName}`,
            styles: {
              fontSize: '18px',
              color: '#666666',
              margin: '0 0 30px 0',
            },
          },
          {
            id: generateId(),
            type: 'button' as ElementType,
            content: 'Shop Now',
            styles: {
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              padding: '14px 35px',
              borderRadius: '40px',
              fontWeight: 'bold',
              fontSize: '16px',
              margin: '0 10px 20px 0',
              display: 'inline-block',
            },
          },
          {
            id: generateId(),
            type: 'button' as ElementType,
            content: 'Learn More',
            styles: {
              backgroundColor: 'transparent',
              color: primaryColor,
              padding: '12px 30px',
              borderRadius: '40px',
              fontWeight: 'bold',
              fontSize: '16px',
              margin: '0 0 20px 0',
              display: 'inline-block',
              border: `2px solid ${primaryColor}`,
            },
          },
          {
            id: generateId(),
            type: 'image' as ElementType,
            src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
            alt: 'Featured product',
            styles: {
              width: '100%',
              maxWidth: '900px',
              height: 'auto',
              margin: '30px auto 0 auto',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            },
          },
        ],
      };

      const productsSection = {
        id: mainContainerId,
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#FFFFFF',
          padding: '60px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: 'Featured Products',
            styles: {
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#333333',
              margin: '0 0 40px 0',
            },
          },
          {
            id: generateId(),
            type: 'container' as ElementType,
            styles: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px',
              maxWidth: '1200px',
              margin: '0 auto',
            },
            children: [
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'image' as ElementType,
                    src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                    alt: 'Product 1',
                    styles: {
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Product Name',
                    styles: {
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#333333',
                      margin: '0 0 5px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: '$99.99',
                    styles: {
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: primaryColor,
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'button' as ElementType,
                    content: 'Add to Cart',
                    styles: {
                      backgroundColor: primaryColor,
                      color: '#FFFFFF',
                      padding: '8px 20px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      margin: '0 auto',
                      display: 'block',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'image' as ElementType,
                    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                    alt: 'Product 2',
                    styles: {
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Product Name',
                    styles: {
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#333333',
                      margin: '0 0 5px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: '$79.99',
                    styles: {
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: primaryColor,
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'button' as ElementType,
                    content: 'Add to Cart',
                    styles: {
                      backgroundColor: primaryColor,
                      color: '#FFFFFF',
                      padding: '8px 20px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      margin: '0 auto',
                      display: 'block',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'image' as ElementType,
                    src: 'https://images.unsplash.com/photo-1523275335684-37898b6bab30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                    alt: 'Product 3',
                    styles: {
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Product Name',
                    styles: {
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#333333',
                      margin: '0 0 5px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: '$129.99',
                    styles: {
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: primaryColor,
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'button' as ElementType,
                    content: 'Add to Cart',
                    styles: {
                      backgroundColor: primaryColor,
                      color: '#FFFFFF',
                      padding: '8px 20px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      margin: '0 auto',
                      display: 'block',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      
      baseTemplate.elements.splice(1, 0, heroContainer, productsSection);
      return baseTemplate;
    }
    
    case 'professional': {
      const heroContainer = {
        id: generateId(),
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#f8fafc',
          padding: '80px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: `Welcome to ${businessName}`,
            styles: {
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 15px 0',
            },
          },
          {
            id: generateId(),
            type: 'paragraph' as ElementType,
            content: 'Professional services tailored to your needs',
            styles: {
              fontSize: '20px',
              color: '#64748b',
              margin: '0 auto 30px auto',
              maxWidth: '700px',
            },
          },
          {
            id: generateId(),
            type: 'button' as ElementType,
            content: 'Book a Consultation',
            styles: {
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              padding: '14px 32px',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '16px',
              margin: '0 auto 50px auto',
              display: 'inline-block',
            },
          },
        ],
      };

      const servicesSection = {
        id: mainContainerId,
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#FFFFFF',
          padding: '80px 30px',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: 'Our Services',
            styles: {
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1e293b',
              textAlign: 'center',
              margin: '0 0 60px 0',
            },
          },
          {
            id: generateId(),
            type: 'container' as ElementType,
            styles: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px',
              maxWidth: '1200px',
              margin: '0 auto',
            },
            children: [
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#f8fafc',
                  padding: '40px 30px',
                  borderRadius: '8px',
                  textAlign: 'center',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Service 1',
                    styles: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna.',
                    styles: {
                      fontSize: '16px',
                      color: '#64748b',
                      margin: '0 0 20px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'button' as ElementType,
                    content: 'Learn More',
                    styles: {
                      backgroundColor: 'transparent',
                      color: primaryColor,
                      padding: '10px 20px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      border: `2px solid ${primaryColor}`,
                      margin: '0 auto',
                      display: 'inline-block',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: primaryColor,
                  padding: '40px 30px',
                  borderRadius: '8px',
                  textAlign: 'center',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Service 2',
                    styles: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna.',
                    styles: {
                      fontSize: '16px',
                      color: '#FFFFFF',
                      margin: '0 0 20px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'button' as ElementType,
                    content: 'Learn More',
                    styles: {
                      backgroundColor: '#FFFFFF',
                      color: primaryColor,
                      padding: '10px 20px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      margin: '0 auto',
                      display: 'inline-block',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  backgroundColor: '#f8fafc',
                  padding: '40px 30px',
                  borderRadius: '8px',
                  textAlign: 'center',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Service 3',
                    styles: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna.',
                    styles: {
                      fontSize: '16px',
                      color: '#64748b',
                      margin: '0 0 20px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'button' as ElementType,
                    content: 'Learn More',
                    styles: {
                      backgroundColor: 'transparent',
                      color: primaryColor,
                      padding: '10px 20px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      border: `2px solid ${primaryColor}`,
                      margin: '0 auto',
                      display: 'inline-block',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      
      const testimonialsSection = {
        id: generateId(),
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#f8fafc',
          padding: '80px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: 'What Our Clients Say',
            styles: {
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 40px 0',
            },
          },
          {
            id: generateId(),
            type: 'container' as ElementType,
            styles: {
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            },
            children: [
              {
                id: generateId(),
                type: 'paragraph' as ElementType,
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna. Integer ullamcorper neque eu purus euismod, ac faucibus mauris posuere."',
                styles: {
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: '#1e293b',
                  margin: '0 0 20px 0',
                },
              },
              {
                id: generateId(),
                type: 'heading' as ElementType,
                content: 'John Doe',
                styles: {
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: primaryColor,
                  margin: '0 0 5px 0',
                },
              },
              {
                id: generateId(),
                type: 'paragraph' as ElementType,
                content: 'CEO, Company Name',
                styles: {
                  fontSize: '14px',
                  color: '#64748b',
                  margin: '0',
                },
              },
            ],
          },
        ],
      };
      
      baseTemplate.elements.splice(1, 0, heroContainer, servicesSection, testimonialsSection);
      return baseTemplate;
    }
    
    // Default/generic template for other industries
    default: {
      const heroContainer = {
        id: generateId(),
        type: 'container' as ElementType,
        styles: {
          backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
          padding: '100px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: businessName,
            styles: {
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              margin: '0 0 20px 0',
            },
          },
          {
            id: generateId(),
            type: 'paragraph' as ElementType,
            content: 'Welcome to our website',
            styles: {
              fontSize: '22px',
              color: '#FFFFFF',
              margin: '0 0 30px 0',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          },
          {
            id: generateId(),
            type: 'button' as ElementType,
            content: 'Learn More',
            styles: {
              backgroundColor: '#FFFFFF',
              color: primaryColor,
              padding: '14px 32px',
              borderRadius: '40px',
              fontWeight: 'bold',
              fontSize: '16px',
              margin: '0 auto',
              display: 'inline-block',
            },
          },
        ],
      };

      const featuresSection = {
        id: mainContainerId,
        type: 'container' as ElementType,
        styles: {
          backgroundColor: '#FFFFFF',
          padding: '80px 30px',
          textAlign: 'center',
        },
        children: [
          {
            id: generateId(),
            type: 'heading' as ElementType,
            content: 'What We Offer',
            styles: {
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#333333',
              margin: '0 0 60px 0',
            },
          },
          {
            id: generateId(),
            type: 'container' as ElementType,
            styles: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px',
              maxWidth: '1200px',
              margin: '0 auto',
            },
            children: [
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  padding: '30px 20px',
                  borderRadius: '8px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  backgroundColor: '#FFFFFF',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Feature 1',
                    styles: {
                      fontSize: '22px',
                      fontWeight: 'bold',
                      color: '#333333',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    styles: {
                      fontSize: '16px',
                      color: '#666666',
                      margin: '0',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  padding: '30px 20px',
                  borderRadius: '8px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  backgroundColor: '#FFFFFF',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Feature 2',
                    styles: {
                      fontSize: '22px',
                      fontWeight: 'bold',
                      color: '#333333',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    styles: {
                      fontSize: '16px',
                      color: '#666666',
                      margin: '0',
                    },
                  },
                ],
              },
              {
                id: generateId(),
                type: 'container' as ElementType,
                styles: {
                  padding: '30px 20px',
                  borderRadius: '8px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  backgroundColor: '#FFFFFF',
                },
                children: [
                  {
                    id: generateId(),
                    type: 'heading' as ElementType,
                    content: 'Feature 3',
                    styles: {
                      fontSize: '22px',
                      fontWeight: 'bold',
                      color: '#333333',
                      margin: '0 0 15px 0',
                    },
                  },
                  {
                    id: generateId(),
                    type: 'paragraph' as ElementType,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    styles: {
                      fontSize: '16px',
                      color: '#666666',
                      margin: '0',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      
      baseTemplate.elements.splice(1, 0, heroContainer, featuresSection);
      return baseTemplate;
    }
  }
};

// Helper function to find an element by ID in the nested structure
export const findElementById = (elements: BuilderElement[], id: string): BuilderElement | null => {
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }
    
    if (element.children) {
      const found = findElementById(element.children, id);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
};

// Update or replace an element in the structure
export const updateElement = (elements: BuilderElement[], id: string, updatedElement: BuilderElement): BuilderElement[] => {
  return elements.map(element => {
    if (element.id === id) {
      return updatedElement;
    }
    
    if (element.children) {
      return {
        ...element,
        children: updateElement(element.children, id, updatedElement),
      };
    }
    
    return element;
  });
};

// Add an element to a container
export const addElementToContainer = (
  elements: BuilderElement[],
  containerId: string,
  newElement: BuilderElement
): BuilderElement[] => {
  return elements.map(element => {
    if (element.id === containerId && element.children) {
      return {
        ...element,
        children: [...element.children, newElement],
      };
    }
    
    if (element.children) {
      return {
        ...element,
        children: addElementToContainer(element.children, containerId, newElement),
      };
    }
    
    return element;
  });
};

// Convert styles object to inline style string
export const stylesToString = (styles: BuilderElement['styles']): React.CSSProperties => {
  return styles as React.CSSProperties;
};
