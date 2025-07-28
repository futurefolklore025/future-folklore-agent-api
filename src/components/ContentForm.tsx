'use client';

import { useState } from 'react';
import { ContentFormData } from '@/types';

interface ContentFormProps {
  onSubmit: (data: ContentFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ContentForm({ onSubmit, isLoading = false }: ContentFormProps) {
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    corePrompt: '',
    subPrompts: {
      linkedin: '',
      instagram: '',
      threads: '',
      twitter: '',
      newsletter: '',
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof ContentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubPromptChange = (platform: keyof ContentFormData['subPrompts'], value: string) => {
    setFormData(prev => ({
      ...prev,
      subPrompts: {
        ...prev.subPrompts,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const platforms = [
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'threads', label: 'Threads' },
    { key: 'twitter', label: 'Twitter' },
    { key: 'newsletter', label: 'Newsletter' },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Future Folklore Content Creator
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., IKEA Work in 3D"
              required
            />
          </div>

          {/* Core Prompt Field */}
          <div>
            <label htmlFor="corePrompt" className="block text-sm font-medium text-gray-700 mb-2">
              Core Prompt *
            </label>
            <textarea
              id="corePrompt"
              value={formData.corePrompt}
              onChange={(e) => handleInputChange('corePrompt', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe what this post is about..."
              required
            />
          </div>

          {/* Sub Prompts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Platform-Specific Prompts
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div key={platform.key}>
                  <label htmlFor={platform.key} className="block text-sm font-medium text-gray-600 mb-2">
                    {platform.label}
                  </label>
                  <textarea
                    id={platform.key}
                    value={formData.subPrompts[platform.key]}
                    onChange={(e) => handleSubPromptChange(platform.key, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`${platform.label} specific content...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showPreview ? 'Hide' : 'Show'} JSON Preview
            </button>
          </div>

          {/* JSON Preview */}
          {showPreview && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">JSON Preview:</h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}