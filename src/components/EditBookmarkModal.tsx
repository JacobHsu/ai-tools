import React, { useState, useEffect } from 'react';
import { useBookmarkStore } from '../stores/bookmarkStore';
import { Bookmark } from '../types';
import { X, Trash2 } from 'lucide-react';

interface EditBookmarkModalProps {
  bookmark: Bookmark;
  categoryId: string;
  onClose: () => void;
}

export const EditBookmarkModal: React.FC<EditBookmarkModalProps> = ({ bookmark, categoryId, onClose }) => {
  const [url, setUrl] = useState(bookmark.url);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description || '');
  const [appUrl, setAppUrl] = useState(bookmark.appUrl || '');
  const { updateBookmark, removeBookmark, getFaviconUrl } = useBookmarkStore();

  const faviconUrl = getFaviconUrl(url);

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

    updateBookmark(categoryId, bookmark.id, {
      title: title.trim() || extractTitleFromUrl(url),
      url: url.trim(),
      description: description.trim() || undefined,
      appUrl: appUrl.trim() || undefined,
    });

    onClose();
  };

  const handleDelete = () => {
    if (confirm('確定要刪除這個書籤嗎？')) {
      removeBookmark(categoryId, bookmark.id);
      onClose();
    }
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
              title="刪除書籤"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">標題</label>
            <input
              type="text"
              placeholder="書籤標題"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>

          {/* URL field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">網址</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={handleUrlChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <input
              type="text"
              placeholder="書籤描述（可選）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* App URL field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">應用連結</label>
            <input
              type="url"
              placeholder="https://example.com/app（可選）"
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">額外的應用或示例連結，會顯示為藍色按鈕</p>
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