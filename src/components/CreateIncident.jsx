import React, { useState } from 'react';
import { 
  Trash2, Plus, Send, Shield, Building2, Image as ImageIcon, 
  AlertTriangle, Globe, ServerIcon, Calendar, Link2, CheckCircle2
} from 'lucide-react';

// Custom Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Custom Input Component
const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
    {...props}
  />
);

// Custom Button Component
const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-200 bg-white hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-gray-50',
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Alert Component
const Alert = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-700',
    destructive: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const ThreatIntelForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    status: true,
    url: '',
    threatActor: {
      name: '',
      type: ''
    },
    rawContent: '',
    publicationDate: '',
    plannedPublicationDate: '',
    category: '',
    network: '',
    victims: [
      {
        country: '',
        industry: '',
        organization: '',
        site: ''
      }
    ],
    images: [
      {
        description: '',
        url: ''
      }
    ]
  });

  const [activeSection, setActiveSection] = useState('basic');
  const [submitStatus, setSubmitStatus] = useState({ show: false, error: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, section = null, index = null, subfield = null) => {
    const { name, value } = e.target;
    
    if (section && index !== null && subfield) {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [subfield]: value } : item
        )
      }));
    } else if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addArrayItem = (section) => {
    const newItem = section === 'victims' 
      ? { country: '', industry: '', organization: '', site: '' }
      : { description: '', url: '' };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        show: true,
        error: false,
        message: 'Threat intelligence data submitted successfully!'
      });
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus({ show: false, error: false, message: '' });
        setActiveSection('basic');
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        show: true,
        error: true,
        message: 'Error submitting data. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, active, onClick, completed }) => (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all
        ${active ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
      `}
    >
      <div className={`
        p-2 rounded-lg relative
        ${active ? 'bg-blue-100' : 'bg-gray-100'}
      `}>
        <Icon className="h-5 w-5" />
        {completed && (
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
            <CheckCircle2 className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
      <span className="font-medium">{title}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <h1 className="text-3xl font-bold">
            Threat Intelligence Submission
          </h1>
          <p className="text-blue-100 mt-2">
            Submit detailed cyber threat intelligence data for analysis
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <Card className="md:col-span-3">
          <CardContent className="p-4 space-y-2">
            <SectionHeader
              icon={Shield}
              title="Basic Information"
              active={activeSection === 'basic'}
              onClick={() => setActiveSection('basic')}
              completed={formData.title && formData.category}
            />
            <SectionHeader
              icon={AlertTriangle}
              title="Threat Actor"
              active={activeSection === 'threat'}
              onClick={() => setActiveSection('threat')}
              completed={formData.threatActor.name && formData.threatActor.type}
            />
            <SectionHeader
              icon={Building2}
              title="Victims"
              active={activeSection === 'victims'}
              onClick={() => setActiveSection('victims')}
              completed={formData.victims[0].organization}
            />
            <SectionHeader
              icon={ImageIcon}
              title="Evidence"
              active={activeSection === 'evidence'}
              onClick={() => setActiveSection('evidence')}
              completed={formData.images[0].url}
            />
          </CardContent>
        </Card>

        {/* Main Form Content */}
        <Card className="md:col-span-9">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Evidence Section */}
              <div className={`space-y-6 transition-opacity duration-300 ${activeSection === 'evidence' ? 'opacity-100' : 'hidden'}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Evidence Images</h3>
                  <Button 
                    type="button" 
                    onClick={() => addArrayItem('images')}
                    variant="outline"
                    className="text-purple-600 hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4" /> Add Image
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-gray-500" />
                          Image {index + 1}
                        </h4>
                        <Button
                          type="button"
                          onClick={() => removeArrayItem('images', index)}
                          variant="ghost"
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <Input
                          placeholder="Image Description"
                          value={image.description}
                          onChange={(e) => handleChange(e, 'images', index, 'description')}
                        />
                        <Input
                          placeholder="Image URL"
                          value={image.url}
                          onChange={(e) => handleChange(e, 'images', index, 'url')}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Submit Threat Intelligence
                    </>
                  )}
                </Button>
              </div>

              {/* Status Message */}
              {submitStatus.show && (
                <Alert 
                  variant={submitStatus.error ? "destructive" : "default"}
                  className="transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center gap-2">
                    {submitStatus.error ? (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                    {submitStatus.message}
                  </div>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatIntelForm;