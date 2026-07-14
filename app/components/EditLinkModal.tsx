"use client";

import { useState } from "react";
import { useFolders } from "../context/FoldersContext";

type Props = {
  initialTitle: string;
  initialDescription?: string;
  initialFolderId: number;
  onClose: () => void;
  onSave: (input: { title: string; description?: string; folderId: number }) => void;
};

export default function EditLinkModal({
  initialTitle,
  initialDescription,
  initialFolderId,
  onClose,
  onSave,
}: Props) {
  const { folders } = useFolders();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [folderId, setFolderId] = useState(String(initialFolderId));

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onSave({
      title: trimmedTitle,
      description: description.trim(),
      folderId: Number(folderId),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">링크 수정</h2>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="link-edit-folder" className="text-sm font-medium text-gray-700">
              폴더
            </label>
            <select
              id="link-edit-folder"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="link-edit-title" className="text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              id="link-edit-title"
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="링크 제목을 입력하세요"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="link-edit-description" className="text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              id="link-edit-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="링크 설명을 입력하세요"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
            />
          </div>
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
