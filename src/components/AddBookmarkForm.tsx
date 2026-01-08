import React, { useState } from 'react';
import { useBookmarkStore } from '../stores/bookmarkStore';
import { X, Plus } from 'lucide-react';

interface AddBookmarkFormProps {
  categoryId: string;
  onClose: () => void;
}

export const AddBookmarkForm: React.FC<AddBookmarkFormProps> = ({ categoryId, onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const { addBookmark } = useBookmarkStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) return;

    // Auto-generate title from URL if not provided
    const finalTitle = title.trim() || extractTitleFromUrl(url);
    
    addBookmark(categoryId, {
      title: finalTitle,
      url: url.trim(),
    });

    setUrl('');
    setTitle('');
    onClose();
  };

  const extractTitleFromUrl = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Auto-fill title if empty
    if (!title && newUrl) {
      setTitle(extractTitleFromUrl(newUrl));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-3 rounded border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Add Bookmark</span>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        <input
          type="url"
          placeholder="Paste URL here..."
          value={url}
          onChange={handleUrlChange}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        
        <input
          type="text"
          placeholder="Title (auto-filled)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
          >
            <Plus size={14} />
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};