"use client";

import { useState } from "react";
import { useLinks } from "../context/LinksContext";
import DeleteLinkModal from "./DeleteLinkModal";
import EditLinkModal from "./EditLinkModal";

type Props = {
  id: number;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  folder: string;
  folderId: number;
};

export default function LinkCard({
  id,
  title,
  url,
  description,
  thumbnail,
  folder,
  folderId,
}: Props) {
  const { updateLink, deleteLink } = useLinks();
  const [imageFailed, setImageFailed] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showThumbnail = Boolean(thumbnail) && !imageFailed;

  const handleConfirmDelete = async () => {
    await deleteLink(id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative group">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3"
      >
        <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {showThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="text-4xl">🔗</span>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          )}
          <p className="text-xs text-gray-400 truncate mt-auto pt-1">{url}</p>
        </div>
        <span className="self-start text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
          {folder}
        </span>
      </a>
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          aria-label={`${title} 링크 수정`}
          className="p-1.5 rounded-lg bg-white/90 text-gray-400 hover:text-blue-600 hover:bg-blue-50 shadow-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label={`${title} 링크 삭제`}
          className="p-1.5 rounded-lg bg-white/90 text-gray-400 hover:text-red-600 hover:bg-red-50 shadow-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482 41.03 41.03 0 0 0-2.365-.298V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isEditModalOpen && (
        <EditLinkModal
          initialTitle={title}
          initialDescription={description}
          initialFolderId={folderId}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(input) => updateLink(id, input)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteLinkModal
          linkTitle={title}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
