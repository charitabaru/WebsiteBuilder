
import React, { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Industry, UserConfig } from '@/types/builder';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brush, Building, Upload } from 'lucide-react';
import { toast } from 'sonner';

export const RegistrationForm: React.FC = () => {
  const { dispatch } = useBuilder();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<UserConfig>({
    businessName: '',
    industry: 'other',
    colorTheme: '#7C3AED',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    dispatch({ type: 'SET_USER_CONFIG', payload: formData });
    dispatch({ type: 'GENERATE_TEMPLATE' });
    dispatch({ type: 'SET_STAGE', payload: 'preview' });
    
    toast.success('Website template created!', {
      description: 'Your template has been generated based on your inputs.',
    });
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i === step
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : i < step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? '✓' : i}
            </div>
            {i < 3 && (
              <div
                className={`w-20 h-1 mx-1 ${
                  i < step ? 'bg-green-500' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                <Building className="h-6 w-6 inline-block mr-2" /> 
                Business Information
              </CardTitle>
              <CardDescription>
                Let's get to know your business to create a personalized website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="e.g., Acme Corporation"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  name="industry"
                  className="w-full p-2 border rounded-md"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                >
                  <option value="restaurant">Restaurant / Food Service</option>
                  <option value="retail">Retail / E-commerce</option>
                  <option value="professional">Professional Services</option>
                  <option value="technology">Technology</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                <Brush className="h-6 w-6 inline-block mr-2" />
                Color Theme
              </CardTitle>
              <CardDescription>
                Choose a color theme that represents your brand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="colorTheme">Primary Color</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="colorTheme"
                    name="colorTheme"
                    type="color"
                    value={formData.colorTheme}
                    onChange={handleInputChange}
                    className="w-16 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.colorTheme}
                    onChange={handleInputChange}
                    name="colorTheme"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Label className="block mb-2">Preview</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    style={{ backgroundColor: formData.colorTheme }}
                    className="h-20 rounded-md flex items-center justify-center text-white font-bold"
                  >
                    Primary
                  </div>
                  <div className="space-y-2">
                    <div 
                      className="h-9 rounded-md flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: formData.colorTheme }}
                    >
                      Button
                    </div>
                    <div className="h-9 rounded-md border-2 flex items-center justify-center font-medium"
                      style={{ borderColor: formData.colorTheme, color: formData.colorTheme }}
                    >
                      Outline Button
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Suggested Color Combinations:</p>
                <div className="flex flex-wrap gap-2">
                  {['#7C3AED', '#3B82F6', '#10B981', '#F97316', '#EF4444', '#8B5CF6', '#14B8A6'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-8 h-8 rounded-full border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData((prev) => ({ ...prev, colorTheme: color }))}
                    ></button>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                <Upload className="h-6 w-6 inline-block mr-2" />
                Upload Logo (Optional)
              </CardTitle>
              <CardDescription>
                Add your business logo to personalize your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {formData.logo ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={formData.logo}
                      alt="Uploaded logo preview"
                      className="max-h-48 mb-4 object-contain"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData((prev) => ({ ...prev, logo: undefined }))}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-16 w-16 text-gray-400 mb-2" />
                    <p className="text-sm mb-4">
                      Drag and drop your logo here, or click to browse
                    </p>
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="logo"
                      className="bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-700 transition"
                    >
                      Select Logo
                    </label>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                <p>Recommended logo format:</p>
                <ul className="list-disc list-inside">
                  <li>PNG or JPG format</li>
                  <li>Square or horizontal orientation</li>
                  <li>At least 400x200 pixels for best quality</li>
                </ul>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Website Builder
          </h1>
          <p className="text-gray-600 mt-2">Create your professional website in minutes</p>
        </div>
        
        {renderStepIndicator()}
        
        <Card>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            <CardFooter className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                {step === 3 ? 'Create Website' : 'Continue'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
