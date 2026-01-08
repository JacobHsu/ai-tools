import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { CategorySection } from './components/CategorySection';
import { BookmarkCard } from './components/BookmarkCard';
import { AddBookmarkModal } from './components/AddBookmarkModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useBookmarkStore } from './stores/bookmarkStore';
import { Bookmark } from './types';

function App() {
  const { categories, moveBookmark, reorderBookmarks } = useBookmarkStore();
  const [activeBookmark, setActiveBookmark] = useState<{
    bookmark: Bookmark;
    categoryId: string;
  } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;
    
    if (data?.type === 'bookmark') {
      setActiveBookmark({
        bookmark: data.bookmark,
        categoryId: data.categoryId,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveBookmark(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'bookmark') {
      const fromCategoryId = activeData.categoryId;
      const bookmarkId = activeData.bookmark.id;

      // Check if dropping on a category (cross-category move)
      if (overData?.type === 'category') {
        const toCategoryId = overData.category.id;
        if (fromCategoryId !== toCategoryId) {
          moveBookmark(fromCategoryId, toCategoryId, bookmarkId);
        }
      }
      // Check if dropping on another bookmark (same category reorder)
      else if (overData?.type === 'bookmark') {
        const toCategoryId = overData.categoryId;
        const overBookmarkId = overData.bookmark.id;
        
        if (fromCategoryId === toCategoryId && bookmarkId !== overBookmarkId) {
          reorderBookmarks(fromCategoryId, bookmarkId, overBookmarkId);
        } else if (fromCategoryId !== toCategoryId) {
          moveBookmark(fromCategoryId, toCategoryId, bookmarkId);
        }
      }
    }

    setActiveBookmark(null);
  };

  const handleAddBookmark = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-0">
            {categories.map((category) => (
              <div key={category.id} className="break-inside-avoid mb-0">
                <CategorySection 
                  category={category}
                  onAddBookmark={() => handleAddBookmark(category.id)}
                />
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeBookmark ? (
              <div className="rotate-3 opacity-90">
                <BookmarkCard
                  bookmark={activeBookmark.bookmark}
                  categoryId={activeBookmark.categoryId}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {showAddModal && (
          <AddBookmarkModal
            categoryId={selectedCategoryId}
            onClose={() => setShowAddModal(false)}
          />
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;