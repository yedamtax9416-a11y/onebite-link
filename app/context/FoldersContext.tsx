"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { folders as initialFolders } from "../lib/data";

export type Folder = {
  id: number;
  name: string;
};

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  updateFolder: (id: number, name: string) => void;
  deleteFolder: (id: number) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    setFolders((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((f) => f.id)) + 1 : 1;
      return [...prev, { id: nextId, name }];
    });
  };

  const updateFolder = (id: number, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
    );
  };

  const deleteFolder = (id: number) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, updateFolder, deleteFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
