import React, { useState, useEffect } from 'react';
import { useBookmarkStore } from '../stores/bookmarkStore';
import { X } from 'lucide-react';

interface AddBookmarkModalProps {
  categoryId: string;
  onClose: () => void;
}

export const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({ categoryId, onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addBookmark, getFaviconUrl } = useBookmarkStore();

  const faviconUrl = url ? getFaviconUrl(url) : '';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) return;

    const finalTitle = title.trim() || extractTitleFromUrl(url);
    
    addBookmark(categoryId, {
      title: finalTitle,
      url: url.trim(),
      description: description.trim() || undefined,
    });

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
    
    if (!title && newUrl) {
      setTitle(extractTitleFromUrl(newUrl));
    }
  };

  const handleUrlBlur = () => {
    if (url && !title) {
      setTitle(extractTitleFromUrl(url));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-gray-800">編輯書籤</h2>
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="w-5 h-5 rounded-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-5 h-5 bg-gray-300 rounded-sm flex items-center justify-center ${faviconUrl ? 'hidden' : ''}`}>
              <span className="text-xs text-gray-600">🌐</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title field */}
          <div>
            <input
              type="text"
              placeholder="kuse.ai"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>

          {/* URL field */}
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="url"
                placeholder="https://app.kuse.ai/"
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="button"
              className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              更多選項
            </button>
          </div>

          {/* Description field */}
          <div>
            <input
              type="text"
              placeholder="描述"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tags field */}
          <div>
            <input
              type="text"
              placeholder="標籤"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="text-xs text-gray-500 mt-1">100 個字元以內</div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              取消編輯
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
              >
                儲存
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};