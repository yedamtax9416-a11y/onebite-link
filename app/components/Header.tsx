import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
      <span className="text-xl font-bold text-gray-900">한입 링크</span>
      <Link
        href="/new"
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        + 새 링크
      </Link>
    </header>
  );
}
