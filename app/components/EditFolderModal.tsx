"use client";

import { useState } from "react";
import { useFolders } from "../context/FoldersContext";

type Props = {
  folderId: number;
  initialName: string;
  onClose: () => void;
};

export default function EditFolderModal({ folderId, initialName, onClose }: Props) {
  const [name, setName] = useState(initialName);
  const { updateFolder } = useFolders();

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await updateFolder(folderId, trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">폴더 이름 수정</h2>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="folder-edit-name" className="text-sm font-medium text-gray-700">
            폴더 이름
          </label>
          <input
            id="folder-edit-name"
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
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
