import { create } from "zustand";

interface LibraryState {
  items: Array<FileData>;
  upsertItem: (item: FileData) => void;
  setItems: (items: Array<FileData>) => void;
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  items: [],
  upsertItem: (item: FileData) =>
    set((state) => {
      const newItems = [...state.items];
      const index = newItems.findIndex((i) => i.filepath === item.filepath);
      if (index > -1) {
        newItems[index] = item;
      } else {
        newItems.push(item);
      }
      return { items: newItems };
    }),
  setItems: (items) => set(() => ({ items })),
}));
