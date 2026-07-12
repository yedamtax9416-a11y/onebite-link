"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "../context/FoldersContext";
import { useLinks } from "../context/LinksContext";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("링크 주소를 입력해주세요.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `/api/opengraph?url=${encodeURIComponent(trimmedUrl)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "링크 정보를 가져오지 못했습니다.");
      }

      addLink({
        title: data.title,
        url: data.url,
        description: data.description,
        thumbnail: data.image,
        folderId: folderId ? Number(folderId) : folders[0]?.id ?? 0,
      });

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "링크 저장 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">새 링크 추가</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            링크
          </label>
          <input
            id="url"
            type="url"
            required
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder" className="text-sm font-medium text-gray-700">
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
          >
            <option value="">폴더 선택</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "확인 중..." : "확인"}
        </button>
      </form>
    </div>
  );
}
