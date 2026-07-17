"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "../../utils/supabase/client";

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
  addLink: (input: NewLinkInput) => Promise<void>;
  updateLink: (id: number, input: LinkUpdateInput) => Promise<void>;
  deleteLink: (id: number) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setLinks(
            data.map((link) => ({
              id: link.id,
              title: link.title,
              url: link.url,
              description: link.description ?? undefined,
              thumbnail: link.thumbnail_url ?? undefined,
              folderId: link.folder_id,
            }))
          );
        }
      });
  }, []);

  const addLink = async (input: NewLinkInput) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: input.url,
        title: input.title,
        description: input.description,
        thumbnail_url: input.thumbnail,
        folder_id: input.folderId,
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) {
      throw new Error("링크 저장에 실패했습니다.");
    }

    setLinks((prev) => [
      ...prev,
      {
        id: data.id,
        title: data.title,
        url: data.url,
        description: data.description ?? undefined,
        thumbnail: data.thumbnail_url ?? undefined,
        folderId: data.folder_id,
      },
    ]);
  };

  const updateLink = async (id: number, input: LinkUpdateInput) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update({
        title: input.title,
        description: input.description,
        folder_id: input.folderId,
      })
      .eq("id", id);

    if (error) {
      throw new Error("링크 수정에 실패했습니다.");
    }

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
