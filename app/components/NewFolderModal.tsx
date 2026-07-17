"use client";

import { useState } from "react";
import { useFolders } from "../context/FoldersContext";

type Props = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { addFolder } = useFolders();

  const handleSave = async () => {
    if (isSaving) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    setIsSaving(true);
    await addFolder(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">새 폴더</h2>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="folder-name" className="text-sm font-medium text-gray-700">
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
