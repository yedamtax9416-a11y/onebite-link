"use client";

type Props = {
  linkTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteLinkModal({ linkTitle, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">링크 삭제</h2>
        <p className="text-sm text-gray-600 mb-6">
          &lsquo;{linkTitle}&rsquo; 링크를 삭제하시겠습니까?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
