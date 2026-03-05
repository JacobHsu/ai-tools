import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Bookmark } from '../types';
import { defaultCategories } from '../data/aiTools';

const migrateBookmarks = (categories: Category[]): Category[] => {
  return categories.map(category => {
    const defaultCategory = defaultCategories.find(cat => cat.id === category.id);

    const savedMap = new Map(category.bookmarks.map(bm => [bm.id, bm]));

    const mergedByDefault = (defaultCategory?.bookmarks ?? []).map(defaultBm => {
      const saved = savedMap.get(defaultBm.id);
      if (saved) {
        return {
          ...saved,
          quotaInfo: saved.quotaInfo || defaultBm.quotaInfo,
          appUrl: saved.appUrl || defaultBm.appUrl
        };
      }
      return defaultBm;
    });

    const defaultIds = new Set((defaultCategory?.bookmarks ?? []).map(bm => bm.id));
    const userAdded = category.bookmarks.filter(bm => !defaultIds.has(bm.id));

    return {
      ...category,
      bookmarks: [...mergedByDefault, ...userAdded]
    };
  });
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
      name: 'papaly-bookmarks-v3',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.categories = migrateBookmarks(state.categories);
        }
      },
    }
  )
);