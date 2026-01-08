import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Category } from '../types';
import { BookmarkCard } from './BookmarkCard';
import { EditBookmarkModal } from './EditBookmarkModal';
import { Link, MoreHorizontal } from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  onAddBookmark: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, onAddBookmark }) => {
  const [editingBookmark, setEditingBookmark] = useState<string | null>(null);
  
  const { setNodeRef } = useDroppable({
    id: category.id,
    data: {
      type: 'category',
      category,
    },
  });

  const handleEditBookmark = (bookmarkId: string) => {
    setEditingBookmark(bookmarkId);
  };

  const editingBookmarkData = editingBookmark 
    ? category.bookmarks.find(b => b.id === editingBookmark)
    : null;

  return (
    <>
      <div className="bg-white border-r border-b border-gray-200 border-l-0 border-t-0">
        {/* Header with vertical color bar */}
        <div className="relative group">
          <div className="flex">
            {/* Vertical color bar */}
            <div className={`${category.color} w-1 flex-shrink-0`}></div>
            
            {/* Content */}
            <div className="flex-1 p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700 text-sm">{category.title}</h3>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={onAddBookmark}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Add bookmark"
                  >
                    <Link size={14} className="text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks */}
        <div
          ref={setNodeRef}
          className="pl-4 pr-3 pb-3 space-y-1"
        >
          <SortableContext
            items={category.bookmarks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {category.bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                categoryId={category.id}
                onEdit={() => handleEditBookmark(bookmark.id)}
              />
            ))}
          </SortableContext>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBookmark && editingBookmarkData && (
        <EditBookmarkModal
          bookmark={editingBookmarkData}
          categoryId={category.id}
          onClose={() => setEditingBookmark(null)}
        />
      )}
    </>
  );
};