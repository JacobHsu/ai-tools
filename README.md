# AI Tools Dashboard

類似 Papaly 的 AI 工具書籤管理應用，用來整理各種 AI 工具的連結。

## 功能

- 分類管理：將工具按類別整理
- 拖拽排序：調整書籤和分類的順序
- 新增編輯：管理書籤資訊
- 本地儲存：資料存在瀏覽器本地
- 配額顯示：顯示免費版使用限制
- 響應式介面：支援各種螢幕尺寸

## 技術

- React 18 + TypeScript
- Vite 5
- Zustand（狀態管理）
- @dnd-kit（拖拽）
- Tailwind CSS
- Lucide React（圖示）

## 使用

安裝依賴：

```bash
npm install
# 或
pnpm install
```

啟動開發伺服器：

```bash
npm run dev
# 或
pnpm dev
```

會在 `http://localhost:5173` 運行。

打包建置：

```bash
npm run build
# 或
pnpm build
```

預覽建置結果：

```bash
npm run preview
# 或
pnpm preview
```

檢查程式碼：

```bash
npm run lint
# 或
pnpm lint
```

## 專案結構

```
ai-tools/
├── src/
│   ├── components/          # React 元件
│   │   ├── BookmarkCard.tsx
│   │   ├── CategoryColumn.tsx
│   │   ├── CategorySection.tsx
│   │   ├── AddBookmarkModal.tsx
│   │   └── EditBookmarkModal.tsx
│   ├── data/
│   │   └── aiTools.ts      # 預設資料
│   ├── stores/
│   │   └── bookmarkStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── favicon.png
└── index.html
```

## 操作方式

- 新增工具：點擊分類右上角的 + 按鈕
- 編輯工具：點擊書籤卡片上的編輯圖示
- 刪除工具：在編輯視窗中刪除
- 調整順序：拖拽書籤或分類標題
- 開啟工具：點擊書籤卡片

## License

MIT
