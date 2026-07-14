"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { links as initialLinks } from "../lib/data";

export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  folderId: number;
};

type NewLinkInput = {
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  folderId: number;
};

type LinkUpdateInput = {
  title: string;
  description?: string;
  folderId: number;
};

type LinksContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => void;
  updateLink: (id: number, input: LinkUpdateInput) => void;
  deleteLink: (id: number) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = (input: NewLinkInput) => {
    setLinks((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((l) => l.id)) + 1 : 1;
      return [...prev, { id: nextId, ...input }];
    });
  };

  const updateLink = (id: number, input: LinkUpdateInput) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...input } : link))
    );
  };

  const deleteLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
