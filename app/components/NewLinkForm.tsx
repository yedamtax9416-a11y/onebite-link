"use client";

const folders = ["개발", "디자인", "뉴스", "영상"];

export default function NewLinkForm() {
  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">새 링크 추가</h2>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            링크
          </label>
          <input
            id="url"
            type="url"
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
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
          >
            <option value="">폴더 선택</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          저장
        </button>
      </form>
    </div>
  );
}
