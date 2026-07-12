"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "../context/FoldersContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();

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
            <Link
              key={folder.id}
              href={href}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {folder.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
