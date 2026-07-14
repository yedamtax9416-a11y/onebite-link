"use client";

import { useFolders } from "../context/FoldersContext";
import { useLinks } from "../context/LinksContext";
import LinkCard from "./LinkCard";

type Props = {
  folderId?: number;
};

export default function LinkGrid({ folderId }: Props) {
  const { folders } = useFolders();
  const { links } = useLinks();
  const filtered = folderId
    ? links.filter((link) => link.folderId === folderId)
    : links;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {filtered.map((link) => {
        const folder = folders.find((f) => f.id === link.folderId);
        return (
          <LinkCard
            key={link.id}
            id={link.id}
            title={link.title}
            url={link.url}
            description={link.description}
            thumbnail={link.thumbnail}
            folder={folder?.name ?? ""}
            folderId={link.folderId}
          />
        );
      })}
    </div>
  );
}
