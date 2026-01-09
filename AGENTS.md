# AGENTS.md

This document provides guidance for AI agents working on this codebase.

## Project Overview

A React + TypeScript bookmark management application for AI tools, featuring drag-and-drop organization using @dnd-kit and Zustand for state management with localStorage persistence.

## Build Commands

```bash
# Install dependencies
pnpm install
# or
npm install

# Start development server (http://localhost:5173)
pnpm dev
# or
npm run dev

# Build for production (TypeScript compilation + Vite build)
pnpm build
# or
npm run build

# Preview production build
pnpm preview
# or
npm run preview

# Run ESLint with TypeScript
pnpm lint
# or
npm run lint
```

**No test framework is currently configured.** If adding tests, prefer Vitest and React Testing Library.

## Code Style Guidelines

### TypeScript Configuration

- Strict mode enabled in `tsconfig.json`
- `noUnusedLocals` and `noUnusedParameters` are true - remove unused code
- `noFallthroughCasesInSwitch` is true - always use break or return

### Imports

- Use absolute imports from `src/` (e.g., `import { Bookmark } from '../types'`)
- Group imports in this order:
  1. React imports
  2. Library imports (@dnd-kit, zustand, lucide-react, etc.)
  3. Local imports (types, stores, components, data)
- Sort alphabetically within groups

### Components

- Use TypeScript interfaces for props (e.g., `interface BookmarkCardProps`)
- Use `React.FC<Props>` for functional components
- Destructure props in component signatures
- Prefer named exports for components

### State Management (Zustand)

- Main store: `src/stores/bookmarkStore.ts`
- Persistence key: `papaly-bookmarks-v3`
- Include `migrateBookmarks` function for data migration on rehydration
- Use `Date.now().toString()` for simple ID generation
- Handle null/undefined checks before array operations

### Drag-and-Drop (@dnd-kit)

- Two drag types: `bookmark` and `category`
- `useSortable` for draggable items (bookmarks)
- `useDroppable` for drop zones (categories)
- Use `PointerSensor` with 8px activation distance
- Include `data` property with `type`, `bookmark`, and `categoryId`

### UI and Styling

- Use Tailwind CSS for all styling
- Responsive columns: `columns-1 md:columns-2 lg:columns-3 xl:columns-4`
- Category colored left borders via `color` field in category data
- Hover states reveal action buttons
- Use `clsx` for conditional class names when needed

### Error Handling

- Wrap potentially throwing code in try/catch (e.g., URL parsing in `getFaviconUrl`)
- Return safe defaults on error (empty string, existing state)
- No error boundaries currently implemented

### Naming Conventions

- **Interfaces**: PascalCase with descriptive names (`Bookmark`, `Category`, `DragItem`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for config values, camelCase otherwise
- **Component files**: PascalCase matching component name (`BookmarkCard.tsx`)
- **Store hook**: `use[Name]Store` pattern

### Data Model (src/types/index.ts)

```typescript
interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  description?: string;
  quotaInfo?: string;     // Free tier limits
  appUrl?: string;        // Direct app link
}

interface Category {
  id: string;
  title: string;
  color: string;          // Tailwind color class
  bookmarks: Bookmark[];
}
```

### Favicon Handling

Favicons are fetched via Google's favicon service:
```
https://www.google.com/s2/favicons?domain=${domain}&sz=32
```

Handle image load errors gracefully with fallback UI.

### Key Files

| File | Purpose |
|------|---------|
| `src/stores/bookmarkStore.ts` | Zustand store with persistence |
| `src/App.tsx` | Root component with DndContext |
| `src/components/CategorySection.tsx` | Category drop zones + SortableContext |
| `src/components/BookmarkCard.tsx` | Draggable bookmark cards |
| `src/data/aiTools.ts` | Default bookmarks/categories |
| `src/types/index.ts` | TypeScript interfaces |

### Development Workflow

1. Make changes to components or store
2. Run `pnpm lint` to check for issues
3. Run `pnpm build` to verify TypeScript compilation
4. Test drag-and-drop functionality manually

### Common Patterns

- **Adding new fields**: Update types, add migration logic in `migrateBookmarks`, update default data
- **Store actions**: Always use immutable updates with spread operators
- **Component updates**: Use functional components with hooks, avoid class components
