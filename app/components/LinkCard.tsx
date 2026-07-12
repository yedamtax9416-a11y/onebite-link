"use client";

import { useState } from "react";

type Props = {
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  folder: string;
};

export default function LinkCard({
  title,
  url,
  description,
  thumbnail,
  folder,
}: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showThumbnail = Boolean(thumbnail) && !imageFailed;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3"
    >
      <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {showThumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="text-4xl">🔗</span>
        )}
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
    </a>
  );
}
