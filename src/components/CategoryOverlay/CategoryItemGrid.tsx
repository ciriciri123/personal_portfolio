import Image from "next/image";
import type { CategoryItem } from "@/data/portfolioContent";

export function CategoryItemGrid({ items }: { items: CategoryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="font-inter text-black/50 mt-8 text-sm text-center">
        Nothing here yet — check back soon.
      </p>
    );
  }

  return (
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link ?? undefined}
          target={item.link ? "_blank" : undefined}
          rel={item.link ? "noopener noreferrer" : undefined}
          className="block rounded-xl p-5 transition-colors hover:bg-black/5 border border-black/8"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          {item.imageSrc && (
            <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
              <Image src={item.imageSrc} alt="" fill style={{ objectFit: "cover" }} />
            </div>
          )}
          <h3 className="font-inter font-semibold text-black/90 text-sm">{item.title}</h3>
          {item.meta && (
            <p className="font-inter text-xs text-black/50 mt-1">{item.meta}</p>
          )}
          <p className="font-inter text-sm text-black/70 mt-2">{item.description}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-inter text-[11px] px-2 py-1 rounded-full text-black/70 border border-black/10"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
