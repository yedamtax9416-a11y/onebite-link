"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "../../utils/supabase/client";

export type Folder = {
  id: number;
  name: string;
};

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  updateFolder: (id: number, name: string) => void;
  deleteFolder: (id: number) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data);
      });
  }, []);

  const addFolder = async (name: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();

    if (error || !data) return;
    setFolders((prev) => [...prev, data]);
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
