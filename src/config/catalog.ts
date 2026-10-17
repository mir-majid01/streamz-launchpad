export type CatalogAttribution = {
  filePage: string;
  sourceUrl: string;
  rights: string;
  credit: string;
};

export const catalogAttributions = {
  metropolis: {
    filePage:
      "https://commons.wikimedia.org/wiki/File:Boris_Bilinski_(1900-1948)_Plakat_f%C3%BCr_den_Film_Metropolis_(1).jpg",
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Boris_Bilinski_%281900-1948%29_Plakat_f%C3%BCr_den_Film_Metropolis_%281%29.jpg",
    rights: "Public domain",
    credit: "Boris Konstantinovitch Bilinsky",
  },
  general: {
    filePage: "https://commons.wikimedia.org/wiki/File:The_General_(1926)_-_Movie_Poster.png",
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/The_General_%281926%29_-_Movie_Poster.png",
    rights: "Public domain / PD US expired",
    credit: "United Artists Corporation",
  },
  sherlockJr: {
    filePage: "https://commons.wikimedia.org/wiki/File:Sherlock_jr_poster.jpg",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Sherlock_jr_poster.jpg",
    rights: "Public domain / PD US expired",
    credit: "Unknown author",
  },
  tripToTheMoon: {
    filePage: "https://commons.wikimedia.org/wiki/File:Trip-to-moon-1902.jpg",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Trip-to-moon-1902.jpg",
    rights: "Public domain / PD-Art / CC-PD-Mark",
    credit: "Georges Méliès",
  },
  greatTrainRobbery: {
    filePage:
      "https://commons.wikimedia.org/wiki/File:The_Great_Train_Robbery,_Edwin_S._Porter,_Edison_Films,_1903_Poster.jpg",
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/The_Great_Train_Robbery%2C_Edwin_S._Porter%2C_Edison_Films%2C_1903_Poster.jpg",
    rights: "Public domain / PD-old-80-expired / CC-PD-Mark",
    credit: "Unknown author",
  },
  dressmakerFromParis: {
    filePage: "https://commons.wikimedia.org/wiki/File:Dressmaker_From_Paris_poster.jpg",
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6c/Dressmaker_From_Paris_poster.jpg",
    rights: "Public domain / PD US expired",
    credit: "Paramount Pictures",
  },
} satisfies Record<string, CatalogAttribution>;

export type CatalogAttributionKey = keyof typeof catalogAttributions;

export type CatalogItem = {
  id: string;
  title: string;
  kind: "movie" | "series";
  year: string;
  genre: string;
  poster: string;
  alt: string;
  attributionKey: CatalogAttributionKey;
};

export const catalog = [
  {
    id: "metropolis",
    title: "Metropolis",
    kind: "movie",
    year: "1927",
    genre: "Science fiction",
    poster: "/catalog/metropolis.jpg",
    alt: "Public-domain poster artwork for Metropolis",
    attributionKey: "metropolis",
  },
  {
    id: "the-general",
    title: "The General",
    kind: "movie",
    year: "1926",
    genre: "Silent comedy",
    poster: "/catalog/the-general.png",
    alt: "Public-domain poster artwork for The General",
    attributionKey: "general",
  },
  {
    id: "sherlock-jr",
    title: "Sherlock Jr.",
    kind: "movie",
    year: "1924",
    genre: "Silent comedy",
    poster: "/catalog/sherlock-jr.jpg",
    alt: "Public-domain poster artwork for Sherlock Jr.",
    attributionKey: "sherlockJr",
  },
  {
    id: "trip-to-the-moon",
    title: "A Trip to the Moon",
    kind: "movie",
    year: "1902",
    genre: "Fantasy adventure",
    poster: "/catalog/trip-to-the-moon.jpg",
    alt: "Public-domain poster artwork for A Trip to the Moon",
    attributionKey: "tripToTheMoon",
  },
  {
    id: "great-train-robbery",
    title: "The Great Train Robbery",
    kind: "movie",
    year: "1903",
    genre: "Western drama",
    poster: "/catalog/great-train-robbery.jpg",
    alt: "Public-domain poster artwork for The Great Train Robbery",
    attributionKey: "greatTrainRobbery",
  },
  {
    id: "dressmaker-from-paris",
    title: "The Dressmaker from Paris",
    kind: "movie",
    year: "1925",
    genre: "Romantic comedy",
    poster: "/catalog/dressmaker-from-paris.jpg",
    alt: "Public-domain poster artwork for The Dressmaker from Paris",
    attributionKey: "dressmakerFromParis",
  },
] satisfies CatalogItem[];

export type CatalogId = (typeof catalog)[number]["id"];

export function catalogById(id: CatalogId): CatalogItem {
  return catalog.find((item) => item.id === id) ?? catalog[0]!;
}
