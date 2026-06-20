import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, Heart, Download } from "lucide-react";

const CLAN_NAME = "The Anderson Clan";
const SHOOT_DATE = "June 2025";
const STUDIO = "Maison Portrait Studio";

type Category = "All" | "Full Family" | "Parents" | "Kids" | "Portraits";

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  names: string;
  category: Category;
  span: "normal" | "tall";
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1760328249117-18488466e34c?w=800&h=1000&fit=crop&auto=format",
    alt: "Family of five posing for a studio portrait",
    caption: "The Whole Clan",
    names: "Marcus, Diana, Tyler, Zoe & Leo",
    category: "Full Family",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1763013259097-ed4d8f95504f?w=800&h=700&fit=crop&auto=format",
    alt: "A happy family of four with two young children",
    caption: "Pure Joy",
    names: "James & Keisha with Oliver & Mia",
    category: "Full Family",
    span: "normal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1772723246504-698d53af365f?w=800&h=900&fit=crop&auto=format",
    alt: "Three women smiling together",
    caption: "The Sisters",
    names: "Grandma Ruth, Diana & Keisha",
    category: "Portraits",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1760328249115-b66560f89840?w=800&h=1000&fit=crop&auto=format",
    alt: "Father and two sons in matching suits",
    caption: "Suited & Ready",
    names: "Marcus with Tyler & Oliver",
    category: "Kids",
    span: "tall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1763013259096-65ff66387a73?w=800&h=700&fit=crop&auto=format",
    alt: "Family with two babies on plain background",
    caption: "Tiny Blessings",
    names: "James & Keisha with the littles",
    category: "Full Family",
    span: "normal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1760328249118-d4fb01eb119c?w=800&h=900&fit=crop&auto=format",
    alt: "Mother adjusts son's suit jacket",
    caption: "A Mother's Touch",
    names: "Diana & Tyler",
    category: "Parents",
    span: "normal",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1768657891755-8dbf6de5f2f5?w=800&h=1000&fit=crop&auto=format",
    alt: "Older brother holds his baby sibling",
    caption: "Big Brother",
    names: "Tyler & baby Leo",
    category: "Kids",
    span: "tall",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1758513359805-21892ae01928?w=800&h=700&fit=crop&auto=format",
    alt: "Family with two babies on white backdrop",
    caption: "Brand New Love",
    names: "Keisha, James, Oliver & Mia",
    category: "Full Family",
    span: "normal",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1760328249114-48aa9d9e490f?w=800&h=900&fit=crop&auto=format",
    alt: "Woman and two boys in suits",
    caption: "My Boys",
    names: "Diana, Tyler & Oliver",
    category: "Parents",
    span: "normal",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1763013259000-da8b5c45ed64?w=800&h=700&fit=crop&auto=format",
    alt: "Family of four with two babies",
    caption: "Growing Up Fast",
    names: "The Johnson Branch",
    category: "Full Family",
    span: "normal",
  },
];

const CATEGORIES: Category[] = ["All", "Full Family", "Parents", "Kids", "Portraits"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered =
    activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  const currentIndex = openPhoto ? filtered.findIndex((p) => p.id === openPhoto.id) : -1;

  const navigate = (dir: 1 | -1) => {
    if (currentIndex === -1) return;
    const next = (currentIndex + dir + filtered.length) % filtered.length;
    setOpenPhoto(filtered[next]);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {/* Hero */}
      <header className="relative pt-24 pb-16 px-8 text-center border-b border-border">
        {/* Thin decorative rule */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <div className="h-px w-20 bg-accent" />
          <span
            className="text-xs tracking-[0.35em] uppercase text-muted-foreground"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            {STUDIO}
          </span>
          <div className="h-px w-20 bg-accent" />
        </div>

        <h1
          className="text-5xl md:text-7xl font-black tracking-tight leading-none text-foreground mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}
        >
          {CLAN_NAME}
        </h1>

        <p
          className="italic text-accent text-lg mt-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A portrait of family
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 text-xs tracking-[0.25em] uppercase text-muted-foreground">
          <span>{SHOOT_DATE}</span>
          <span className="w-1 h-1 rounded-full bg-accent inline-block" />
          <span>{photos.length} Portraits</span>
          <span className="w-1 h-1 rounded-full bg-accent inline-block" />
          <span>{liked.size > 0 ? `${liked.size} Favourites` : "Add Favourites"}</span>
        </div>
      </header>

      {/* Filter row */}
      <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-8 flex gap-0 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex-shrink-0 px-5 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-colors duration-200 ${
                activeCategory === cat
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Gallery */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gridAutoRows: "250px",
          }}
        >
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden bg-muted"
              style={{ gridRow: photo.span === "tall" ? "span 2" : "span 1" }}
              onClick={() => setOpenPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover veil */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500" />

              {/* Like */}
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(photo.id);
                }}
                aria-label="Favourite"
              >
                <Heart
                  size={15}
                  className={
                    liked.has(photo.id)
                      ? "fill-primary text-primary"
                      : "text-foreground"
                  }
                />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p
                  className="text-white text-lg font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {photo.caption}
                </p>
                <p className="text-white/70 text-xs tracking-widest uppercase mt-1 font-light">
                  {photo.names}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-muted-foreground tracking-widest text-sm uppercase">
            No portraits in this collection
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-8 text-center">
        <p
          className="text-foreground text-base mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {CLAN_NAME}
        </p>
        <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
          {STUDIO} · {SHOOT_DATE}
        </p>
      </footer>

      {/* Lightbox */}
      <Dialog.Root open={!!openPhoto} onOpenChange={(o) => !o && setOpenPhoto(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-foreground/80 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            aria-describedby={undefined}
          >
            {openPhoto && (
              <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-card shadow-2xl overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                  <div>
                    <Dialog.Title
                      className="text-lg font-bold leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {openPhoto.caption}
                    </Dialog.Title>
                    <p className="text-muted-foreground text-xs tracking-widest uppercase mt-0.5">
                      {openPhoto.names}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleLike(openPhoto.id)}
                      className="p-2.5 hover:bg-muted rounded transition-colors"
                      aria-label="Favourite"
                    >
                      <Heart
                        size={16}
                        className={
                          liked.has(openPhoto.id)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </button>
                    <a
                      href={openPhoto.src}
                      download
                      className="p-2.5 hover:bg-muted rounded transition-colors text-muted-foreground"
                      aria-label="Download"
                    >
                      <Download size={16} />
                    </a>
                    <Dialog.Close className="p-2.5 hover:bg-muted rounded transition-colors text-muted-foreground ml-1">
                      <X size={16} />
                    </Dialog.Close>
                  </div>
                </div>

                {/* Image */}
                <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center">
                  <img
                    src={openPhoto.src}
                    alt={openPhoto.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                  {filtered.length > 1 && (
                    <>
                      <button
                        onClick={() => navigate(-1)}
                        className="absolute left-4 p-2.5 bg-background/90 hover:bg-background text-foreground rounded shadow transition-all"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => navigate(1)}
                        className="absolute right-4 p-2.5 bg-background/90 hover:bg-background text-foreground rounded shadow transition-all"
                        aria-label="Next"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom strip */}
                <div className="flex items-center justify-between px-6 py-3 border-t border-border flex-shrink-0">
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {openPhoto.category}
                  </span>
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">
                    {currentIndex + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
