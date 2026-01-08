import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bookmark } from '../types';
import { useBookmarkStore } from '../stores/bookmarkStore';
import { Pencil, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface BookmarkCardProps {
  bookmark: Bookmark;
  categoryId: string;
  onEdit?: () => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, categoryId, onEdit }) => {
  const { getFaviconUrl } = useBookmarkStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: bookmark.id,
    data: {
      type: 'bookmark',
      bookmark,
      categoryId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const faviconUrl = bookmark.favicon || getFaviconUrl(bookmark.url);

  // AI 工具免費版額度資訊
  const getQuotaInfo = (bookmark: Bookmark): string => {
    return bookmark.quotaInfo || '請查看官網了解額度限制';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative hover:bg-gray-50 cursor-pointer group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Main bookmark row */}
      <div 
        className="flex items-center gap-2 py-2 px-1"
        onClick={() => window.open(bookmark.url, '_blank')}
      >
        <div className="flex-shrink-0 w-5 h-5">
          {faviconUrl ? (
            <img
              src={faviconUrl}
              alt=""
              className="w-5 h-5 rounded-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-5 h-5 bg-gray-300 rounded-sm flex items-center justify-center">
              <span className="text-xs text-gray-600">🌐</span>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-700 truncate flex-1">
          {bookmark.title}
        </span>
        
        {/* App link button - only show if appUrl exists and on hover */}
        {bookmark.appUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(bookmark.appUrl, '_blank');
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 rounded"
            title="開啟應用"
          >
            <ExternalLink size={14} className="text-blue-500" />
          </button>
        )}
        
        {/* Edit button - only show on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
        >
          <Pencil size={14} className="text-gray-500" />
        </button>

        {/* Expand/Collapse button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
        >
          {isExpanded ? (
            <ChevronUp size={14} className="text-gray-400" />
          ) : (
            <ChevronDown size={14} className="text-gray-400" />
          )}
        </button>
      </div>

      {/* Expanded info */}
      {isExpanded && (
        <div className="px-6 pb-2 space-y-1">
          {bookmark.description && (
            <div className="text-xs text-gray-600">
              {bookmark.description}
            </div>
          )}
          <div className="text-xs text-gray-500">
            {getQuotaInfo(bookmark)}
          </div>
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && !isExpanded && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap max-w-xs">
          <div className="font-medium">{bookmark.title}</div>
          {bookmark.description && (
            <div className="text-gray-200 truncate">{bookmark.description}</div>
          )}
          <div className="text-gray-300">{getQuotaInfo(bookmark)}</div>
        </div>
      )}
    </div>
  );
};