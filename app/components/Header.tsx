"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "./NewFolderModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
      <span className="text-xl font-bold text-gray-900">한입 링크</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + 새 폴더
        </button>
        <Link
          href="/new"
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + 새 링크
        </Link>
      </div>
      {isModalOpen && (
        <NewFolderModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
}
