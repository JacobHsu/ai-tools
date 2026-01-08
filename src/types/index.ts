export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  description?: string;
  quotaInfo?: string; // 添加配额信息字段
  appUrl?: string; // 添加应用链接字段
}

export interface Category {
  id: string;
  title: string;
  color: string;
  bookmarks: Bookmark[];
}

export interface DragItem {
  id: string;
  type: 'bookmark' | 'category';
  categoryId?: string;
}