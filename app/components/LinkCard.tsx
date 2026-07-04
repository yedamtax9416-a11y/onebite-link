type Props = {
  title: string;
  url: string;
  description?: string;
  folder: string;
};

export default function LinkCard({ title, url, description, folder }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3">
      <div className="w-full h-36 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-4xl">🔗</span>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{title}</h3>
        {description && (
          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
        )}
        <p className="text-xs text-gray-400 truncate mt-auto pt-1">{url}</p>
      </div>
      <span className="self-start text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
        {folder}
      </span>
    </div>
  );
}
