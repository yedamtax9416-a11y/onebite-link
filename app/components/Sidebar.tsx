"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFolders, type Folder } from "../context/FoldersContext";
import DeleteFolderModal from "./DeleteFolderModal";
import EditFolderModal from "./EditFolderModal";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { folders, deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

  const handleConfirmDelete = async () => {
    if (!folderToDelete) return;
    await deleteFolder(folderToDelete.id);
    if (pathname === `/folder/${folderToDelete.id}`) {
      router.push("/");
    }
    setFolderToDelete(null);
  };

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white px-4 py-6 flex flex-col gap-1">
      <Link
        href="/"
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;
          return (
            <div
              key={folder.id}
              className={`group flex items-center rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link href={href} className="flex-1 min-w-0 px-3 py-2 truncate">
                {folder.name}
              </Link>
              <button
                type="button"
                onClick={() => setFolderToEdit(folder)}
                aria-label={`${folder.name} 폴더 수정`}
                className="ml-1 p-1 rounded opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
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
                onClick={() => setFolderToDelete(folder)}
                aria-label={`${folder.name} 폴더 삭제`}
                className="mr-2 p-1 rounded opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
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
          );
        })}
      </div>
      {folderToEdit && (
        <EditFolderModal
          folderId={folderToEdit.id}
          initialName={folderToEdit.name}
          onClose={() => setFolderToEdit(null)}
        />
      )}
      {folderToDelete && (
        <DeleteFolderModal
          folderName={folderToDelete.name}
          onCancel={() => setFolderToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </aside>
  );
}
