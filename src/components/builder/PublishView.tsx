
import { useBuilder } from '@/contexts/BuilderContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Copy, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const PublishView: React.FC = () => {
  const { state, dispatch } = useBuilder();
  const { userConfig } = state;
  const [isAnimating, setIsAnimating] = useState(false);
  const [publishCompleted, setPublishCompleted] = useState(false);
  
  // The fake publish URL
  const publishURL = `https://${userConfig?.businessName?.toLowerCase().replace(/\s+/g, "-")}.example.com`;
  
  // Handle the back button
  const handleBack = () => {
    dispatch({ type: 'SET_STAGE', payload: 'editor' });
  };
  
  // Copy URL to clipboard
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publishURL);
    toast.success('URL copied to clipboard!');
  };
  
  // Animation to simulate publishing
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setPublishCompleted(true);
        
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#8B5CF6', '#C4B5FD'],
        });
        
        setIsAnimating(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  
  // Start the publishing animation
  const handlePublish = () => {
    if (isAnimating || publishCompleted) return;
    
    setIsAnimating(true);
    toast.info('Publishing your website...');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
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
          <h1 className="text-xl font-semibold bg-gradient-to-r from-builder-primary to-purple-400 bg-clip-text text-transparent">
            Publish Website
          </h1>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
        >
          {!publishCompleted ? (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={isAnimating ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <svg 
                      className={`w-10 h-10 ${isAnimating ? 'text-indigo-600' : 'text-gray-400'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Ready to Publish Your Website?</h2>
                <p className="text-gray-600 mb-6">
                  Your website is ready to go live! Click the button below to publish it.
                </p>
                <Button 
                  onClick={handlePublish}
                  disabled={isAnimating}
                  className="bg-gradient-to-r from-builder-primary to-purple-500 hover:from-builder-primary-hover hover:to-purple-600 text-white text-lg py-6 px-8"
                  size="lg"
                >
                  {isAnimating ? (
                    <>
                      <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Publishing...
                    </>
                  ) : (
                    'Publish Now'
                  )}
                </Button>
                
                <div className="mt-10 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-semibold text-gray-700 mb-2">What happens when you publish?</h3>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <li>✓ Your website becomes live and accessible online</li>
                    <li>✓ You get a unique URL to share with others</li>
                    <li>✓ Your site is optimized for desktop, tablet, and mobile</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-6">
                Your website has been successfully published and is now live.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="mb-2 text-sm font-medium text-gray-700">Your website URL</p>
                <div className="flex">
                  <Input value={publishURL} readOnly className="bg-white border-r-0 rounded-r-none" />
                  <Button onClick={handleCopyUrl} className="rounded-l-none">
                    <Copy size={18} />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">Share your new website:</p>
              <div className="flex justify-center gap-3 mb-8">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-blue-500 text-white hover:bg-blue-600 border-0">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-blue-400 text-white hover:bg-blue-500 border-0">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-blue-700 text-white hover:bg-blue-800 border-0">
                  <Linkedin size={18} />
                </Button>
              </div>
              
              <Button 
                onClick={handleBack}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
              >
                Back to Editor
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
