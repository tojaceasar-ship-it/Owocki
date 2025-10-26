import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SubmissionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    character: '',
    category: '',
    tags: '',
    image: null
  });
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const characterOptions = [
    { value: 'watermelon', label: 'Watermelon Crew' },
    { value: 'banana', label: 'Banana Squad' },
    { value: 'apple', label: 'Apple Gang' },
    { value: 'orange', label: 'Orange Collective' },
    { value: 'grape', label: 'Grape Mob' },
    { value: 'strawberry', label: 'Berry Bunch' },
    { value: 'pineapple', label: 'Pineapple Posse' }
  ];

  const categoryOptions = [
    { value: 'street', label: 'Street Style' },
    { value: 'casual', label: 'Casual Flex' },
    { value: 'formal', label: 'Elevated Look' },
    { value: 'creative', label: 'Creative Expression' },
    { value: 'fanart', label: 'Fan Art' },
    { value: 'photography', label: 'Photography' }
  ];

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type?.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card/95 backdrop-blur-md border border-border rounded-xl overflow-hidden neon-glow-primary">
        <div className="concrete-texture absolute inset-0 opacity-5"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
              <Icon name="Upload" size={20} className="text-black" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-primary">
                Submit Your Style
              </h2>
              <p className="font-body text-sm text-text-secondary">
                Share your look with the community
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-primary"
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative max-h-[70vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block font-cta font-semibold text-sm text-foreground mb-3">
                Upload Image *
              </label>
              
              {!imagePreview ? (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-primary bg-primary/10 neon-glow-primary' :'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Icon name="Upload" size={48} className="text-text-secondary mx-auto mb-4" />
                  <p className="font-cta font-medium text-foreground mb-2">
                    Drag & drop your image here
                  </p>
                  <p className="font-body text-sm text-text-secondary mb-4">
                    or click to browse files
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    iconName="Image"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    Choose File
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/70 text-white hover:bg-black/90"
                    iconName="X"
                    iconSize={16}
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <Input
              label="Title *"
              type="text"
              placeholder="Give your submission a catchy title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
            />

            {/* Description */}
            <div>
              <label className="block font-cta font-semibold text-sm text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell us about your style, inspiration, or story behind this look..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-sm text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Character & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Character Crew *"
                placeholder="Choose your crew"
                options={characterOptions}
                value={formData?.character}
                onChange={(value) => handleInputChange('character', value)}
                required
              />
              
              <Select
                label="Style Category *"
                placeholder="Select category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                required
              />
            </div>

            {/* Tags */}
            <Input
              label="Tags"
              type="text"
              placeholder="streetwear, urban, creative (separate with commas)"
              description="Add relevant tags to help others discover your style"
              value={formData?.tags}
              onChange={(e) => handleInputChange('tags', e?.target?.value)}
            />

            {/* Guidelines */}
            <div className="p-4 bg-surface/50 rounded-lg border border-border">
              <h3 className="font-cta font-semibold text-sm text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span>Submission Guidelines</span>
              </h3>
              <ul className="space-y-1 text-xs text-text-secondary">
                <li>• High-quality images only (min 1080px width)</li>
                <li>• Original content featuring Fruits From Da Hood apparel</li>
                <li>• Respectful and authentic representation of street culture</li>
                <li>• No inappropriate or offensive content</li>
                <li>• By submitting, you grant us rights to feature your content</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-text-secondary" />
                <span className="font-body text-xs text-text-secondary">
                  Your submission will be reviewed before going live
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-text-secondary hover:text-primary"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="default"
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                  iconName="Send"
                  iconPosition="left"
                  iconSize={16}
                  disabled={!formData?.title || !formData?.character || !formData?.category || !formData?.image}
                >
                  Submit Style
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionModal;