import { folders, links } from "../lib/data";
import LinkCard from "./LinkCard";

type Props = {
  folderId?: number;
};

export default function LinkGrid({ folderId }: Props) {
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
            title={link.title}
            url={link.url}
            description={link.description}
            folder={folder?.name ?? ""}
          />
        );
      })}
    </div>
  );
}
