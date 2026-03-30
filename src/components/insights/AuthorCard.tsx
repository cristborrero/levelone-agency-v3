import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Author } from "@/sanity/lib/types";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex items-center gap-4">
      {author.image?.asset && (
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={urlFor(author.image).width(80).height(80).url()}
            alt={author.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-body text-sm font-medium text-brand-white">
          {author.name}
        </span>
        {author.role && (
          <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-500">
            {author.role}
          </span>
        )}
      </div>
    </div>
  );
}
