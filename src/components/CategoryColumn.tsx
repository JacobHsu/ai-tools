import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Category } from '../types';
import { BookmarkCard } from './BookmarkCard';
import { AddBookmarkForm } from './AddBookmarkForm';
import { Plus } from 'lucide-react';

interface CategoryColumnProps {
  category: Category;
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({ category }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { setNodeRef } = useDroppable({
    id: category.id,
    data: {
      type: 'category',
      category,
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[400px] w-64 flex-shrink-0">
      {/* Header */}
      <div className={`${category.color} text-white p-3 rounded-t-lg`}>
        <h3 className="font-medium text-sm">{category.title}</h3>
      </div>

      {/* Drag hint */}
      <div className="p-2 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="text-blue-500">↗</span>
          <span>Drag me to other columns</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          🔄 Drag me to other categories
        </div>
      </div>

      {/* Bookmarks */}
      <div
        ref={setNodeRef}
        className="p-2 space-y-1 min-h-[200px]"
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
            />
          ))}
        </SortableContext>

        {/* Add bookmark button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
          >
            <Plus size={16} />
            <span className="text-sm">Add bookmark</span>
          </button>
        )}

        {/* Add bookmark form */}
        {showAddForm && (
          <AddBookmarkForm
            categoryId={category.id}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
};