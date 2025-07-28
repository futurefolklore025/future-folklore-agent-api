'use client';

import { useState } from 'react';
import ContentForm from '@/components/ContentForm';
import { ContentFormData, ApiResponse } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (data: ContentFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: 'success',
          text: 'Content submitted successfully! Your n8n workflow has been triggered.',
        });
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Failed to submit content. Please try again.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Future Folklore
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Content Creator
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {/* Status Message */}
        {message && (
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <div
              className={`p-4 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        )}

        {/* Form */}
        <ContentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </main>
    </div>
  );
}