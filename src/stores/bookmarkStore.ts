import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Bookmark } from '../types';
import { defaultCategories } from '../data/aiTools';

// 数据迁移函数：为旧书签添加 quotaInfo 和 appUrl
const migrateBookmarks = (categories: Category[]): Category[] => {
  return categories.map(category => ({
    ...category,
    bookmarks: category.bookmarks.map(bookmark => {
      // 从 defaultCategories 中查找对应的书签数据
      const defaultCategory = defaultCategories.find(cat => cat.id === category.id);
      const defaultBookmark = defaultCategory?.bookmarks.find(bm => bm.id === bookmark.id);
      
      return {
        ...bookmark,
        // 如果书签已经有 quotaInfo，保持不变，否则从默认数据中获取
        quotaInfo: bookmark.quotaInfo || defaultBookmark?.quotaInfo,
        // 如果书签已经有 appUrl，保持不变，否则从默认数据中获取
        appUrl: bookmark.appUrl || defaultBookmark?.appUrl
      };
    })
  }));
};

interface BookmarkStore {
  categories: Category[];
  addBookmark: (categoryId: string, bookmark: Omit<Bookmark, 'id'>) => void;
  removeBookmark: (categoryId: string, bookmarkId: string) => void;
  moveBookmark: (fromCategoryId: string, toCategoryId: string, bookmarkId: string) => void;
  reorderBookmarks: (categoryId: string, activeId: string, overId: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'bookmarks'>) => void;
  removeCategory: (categoryId: string) => void;
  updateBookmark: (categoryId: string, bookmarkId: string, updates: Partial<Bookmark>) => void;
  getFaviconUrl: (url: string) => string;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      categories: defaultCategories,

      addBookmark: (categoryId, bookmark) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: Date.now().toString(),
          favicon: get().getFaviconUrl(bookmark.url)
        };

        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? { ...category, bookmarks: [...category.bookmarks, newBookmark] }
              : category
          )
        }));
      },

      removeBookmark: (categoryId, bookmarkId) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  bookmarks: category.bookmarks.filter((b) => b.id !== bookmarkId)
                }
              : category
          )
        }));
      },

      moveBookmark: (fromCategoryId, toCategoryId, bookmarkId) => {
        set((state) => {
          const fromCategory = state.categories.find((c) => c.id === fromCategoryId);
          const bookmark = fromCategory?.bookmarks.find((b) => b.id === bookmarkId);
          
          if (!bookmark) return state;

          return {
            categories: state.categories.map((category) => {
              if (category.id === fromCategoryId) {
                return {
                  ...category,
                  bookmarks: category.bookmarks.filter((b) => b.id !== bookmarkId)
                };
              }
              if (category.id === toCategoryId) {
                return {
                  ...category,
                  bookmarks: [...category.bookmarks, bookmark]
                };
              }
              return category;
            })
          };
        });
      },

      reorderBookmarks: (categoryId, activeId, overId) => {
        set((state) => {
          const category = state.categories.find((c) => c.id === categoryId);
          if (!category) return state;

          const bookmarks = [...category.bookmarks];
          const activeIndex = bookmarks.findIndex((b) => b.id === activeId);
          const overIndex = bookmarks.findIndex((b) => b.id === overId);

          if (activeIndex === -1 || overIndex === -1) return state;

          // Move the bookmark
          const [movedBookmark] = bookmarks.splice(activeIndex, 1);
          bookmarks.splice(overIndex, 0, movedBookmark);

          return {
            categories: state.categories.map((cat) =>
              cat.id === categoryId
                ? { ...cat, bookmarks }
                : cat
            )
          };
        });
      },

      addCategory: (category) => {
        const newCategory: Category = {
          ...category,
          id: Date.now().toString(),
          bookmarks: []
        };

        set((state) => ({
          categories: [...state.categories, newCategory]
        }));
      },

      removeCategory: (categoryId) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== categoryId)
        }));
      },

      updateBookmark: (categoryId, bookmarkId, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  bookmarks: category.bookmarks.map((bookmark) =>
                    bookmark.id === bookmarkId
                      ? { ...bookmark, ...updates }
                      : bookmark
                  )
                }
              : category
          )
        }));
      },

      getFaviconUrl: (url) => {
        try {
          const domain = new URL(url).hostname;
          return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch {
          return '';
        }
      }
    }),
    {
      name: 'papaly-bookmarks-v3', // localStorage key - 更新版本以重新加载数据
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 迁移旧数据，添加缺失的 quotaInfo 和 appUrl
          state.categories = migrateBookmarks(state.categories);
        }
      },
    }
  )
);