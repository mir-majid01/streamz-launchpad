export type PosterSource = {
  articleUrl: string;
  fileUrl: string;
  credit: string;
  rights: string;
};

export type CatalogItem = {
  id: string;
  title: string;
  kind: "movie" | "series";
  year: string;
  genre: string;
  poster: string;
  alt: string;
  sourceKey: PosterSourceKey;
};

// Distributor-owned promotional key art, stored locally under public/catalog/trending.
// See public/catalog/ATTRIBUTIONS.md: displaying this art needs publisher permission, so
// every record keeps its source page for a licensed swap.
export const posterSources = {
  "spider-man-brand-new-day": {
    articleUrl: "https://en.wikipedia.org/wiki/Spider-Man:_Brand_New_Day",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Spider-Man_Brand_New_Day_poster.jpg",
    credit: "Marvel Studios / Sony Pictures",
    rights: "Copyright held by the distributor",
  },
  "the-odyssey": {
    articleUrl: "https://en.wikipedia.org/wiki/The_Odyssey_(2026_film)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/The_Odyssey_%282026_film%29_poster.jpg",
    credit: "Universal Pictures",
    rights: "Copyright held by the distributor",
  },
  "toy-story-5": {
    articleUrl: "https://en.wikipedia.org/wiki/Toy_Story_5",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/0/08/Toy_Story_5_poster.jpg",
    credit: "Pixar / Disney",
    rights: "Copyright held by the distributor",
  },
  "super-mario-galaxy": {
    articleUrl: "https://en.wikipedia.org/wiki/The_Super_Mario_Galaxy_Movie",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/b/bf/The_Super_Mario_Galaxy_Movie_poster.jpeg",
    credit: "Nintendo / Universal Pictures",
    rights: "Copyright held by the distributor",
  },
  "project-hail-mary": {
    articleUrl: "https://en.wikipedia.org/wiki/Project_Hail_Mary_(film)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Project_Hail_Mary_poster.jpg",
    credit: "Amazon MGM Studios",
    rights: "Copyright held by the distributor",
  },
  "evil-dead-burn": {
    articleUrl: "https://en.wikipedia.org/wiki/Evil_Dead_Burn",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/a/a4/Evil_Dead_Burn_poster.jpeg",
    credit: "Ghost House Pictures / Universal",
    rights: "Copyright held by the distributor",
  },
  michael: {
    articleUrl: "https://en.wikipedia.org/wiki/Michael_(2026_film)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/3/37/Michael_%282026_film_poster%29.png",
    credit: "Lionsgate",
    rights: "Copyright held by the distributor",
  },
  "avatar-fire-and-ash": {
    articleUrl: "https://en.wikipedia.org/wiki/Avatar:_Fire_and_Ash",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/9/95/Avatar_Fire_and_Ash_poster.jpeg",
    credit: "20th Century Studios / Disney",
    rights: "Copyright held by the distributor",
  },
  sinners: {
    articleUrl: "https://en.wikipedia.org/wiki/Sinners_(2025_film)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Sinners_%282025_film%29_poster.jpg",
    credit: "Warner Bros. Pictures",
    rights: "Copyright held by the distributor",
  },
  superman: {
    articleUrl: "https://en.wikipedia.org/wiki/Superman_(2025_film)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/3/32/Superman_%282025_film%29_poster.jpg",
    credit: "DC Studios / Warner Bros. Pictures",
    rights: "Copyright held by the distributor",
  },
  "tron-ares": {
    articleUrl: "https://en.wikipedia.org/wiki/Tron:_Ares",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/0/06/Tron_Ares_poster.jpg",
    credit: "Disney",
    rights: "Copyright held by the distributor",
  },
  "kpop-demon-hunters": {
    articleUrl: "https://en.wikipedia.org/wiki/KPop_Demon_Hunters",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/9/93/KPDHposter.jpeg",
    credit: "Sony Pictures Animation / Netflix",
    rights: "Copyright held by the distributor",
  },
  below: {
    articleUrl: "https://en.wikipedia.org/wiki/Below_(TV_series)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/7/73/Below_%282026%29_poster.jpg",
    credit: "Netflix",
    rights: "Copyright held by the distributor",
  },
  "nobody-wants-this": {
    articleUrl: "https://en.wikipedia.org/wiki/Nobody_Wants_This",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/3/3d/Nobody_Wants_This_Season_1_%282024%29_poster.jpg",
    credit: "Netflix",
    rights: "Copyright held by the distributor",
  },
  "his-and-hers": {
    articleUrl: "https://en.wikipedia.org/wiki/His_%26_Hers_(TV_series)",
    fileUrl: "https://upload.wikimedia.org/wikipedia/en/3/3e/His_And_Hers_Netflix_series_poster.jpeg",
    credit: "Netflix",
    rights: "Copyright held by the distributor",
  },
} satisfies Record<string, PosterSource>;

export type PosterSourceKey = keyof typeof posterSources;

export const catalog = [
  {
    id: "spider-man-brand-new-day",
    title: "Spider-Man: Brand New Day",
    kind: "movie",
    year: "2026",
    genre: "Action",
    poster: "/catalog/trending/spider-man-brand-new-day.jpg",
    alt: "Poster artwork for Spider-Man: Brand New Day",
    sourceKey: "spider-man-brand-new-day",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey",
    kind: "movie",
    year: "2026",
    genre: "Epic",
    poster: "/catalog/trending/the-odyssey.jpg",
    alt: "Poster artwork for The Odyssey",
    sourceKey: "the-odyssey",
  },
  {
    id: "toy-story-5",
    title: "Toy Story 5",
    kind: "movie",
    year: "2026",
    genre: "Animation",
    poster: "/catalog/trending/toy-story-5.jpg",
    alt: "Poster artwork for Toy Story 5",
    sourceKey: "toy-story-5",
  },
  {
    id: "super-mario-galaxy",
    title: "The Super Mario Galaxy Movie",
    kind: "movie",
    year: "2026",
    genre: "Animation",
    poster: "/catalog/trending/super-mario-galaxy.jpg",
    alt: "Poster artwork for The Super Mario Galaxy Movie",
    sourceKey: "super-mario-galaxy",
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    kind: "movie",
    year: "2026",
    genre: "Sci-fi",
    poster: "/catalog/trending/project-hail-mary.jpg",
    alt: "Poster artwork for Project Hail Mary",
    sourceKey: "project-hail-mary",
  },
  {
    id: "evil-dead-burn",
    title: "Evil Dead Burn",
    kind: "movie",
    year: "2026",
    genre: "Horror",
    poster: "/catalog/trending/evil-dead-burn.jpg",
    alt: "Poster artwork for Evil Dead Burn",
    sourceKey: "evil-dead-burn",
  },
  {
    id: "michael",
    title: "Michael",
    kind: "movie",
    year: "2026",
    genre: "Biopic",
    poster: "/catalog/trending/michael.png",
    alt: "Poster artwork for Michael",
    sourceKey: "michael",
  },
  {
    id: "avatar-fire-and-ash",
    title: "Avatar: Fire and Ash",
    kind: "movie",
    year: "2025",
    genre: "Sci-fi",
    poster: "/catalog/trending/avatar-fire-and-ash.jpg",
    alt: "Poster artwork for Avatar: Fire and Ash",
    sourceKey: "avatar-fire-and-ash",
  },
  {
    id: "sinners",
    title: "Sinners",
    kind: "movie",
    year: "2025",
    genre: "Horror",
    poster: "/catalog/trending/sinners.jpg",
    alt: "Poster artwork for Sinners",
    sourceKey: "sinners",
  },
  {
    id: "superman",
    title: "Superman",
    kind: "movie",
    year: "2025",
    genre: "Action",
    poster: "/catalog/trending/superman.jpg",
    alt: "Poster artwork for Superman",
    sourceKey: "superman",
  },
  {
    id: "tron-ares",
    title: "Tron: Ares",
    kind: "movie",
    year: "2025",
    genre: "Sci-fi",
    poster: "/catalog/trending/tron-ares.jpg",
    alt: "Poster artwork for Tron: Ares",
    sourceKey: "tron-ares",
  },
  {
    id: "kpop-demon-hunters",
    title: "KPop Demon Hunters",
    kind: "movie",
    year: "2025",
    genre: "Animation",
    poster: "/catalog/trending/kpop-demon-hunters.jpg",
    alt: "Poster artwork for KPop Demon Hunters",
    sourceKey: "kpop-demon-hunters",
  },
  {
    id: "below",
    title: "Below",
    kind: "series",
    year: "2026",
    genre: "Thriller",
    poster: "/catalog/trending/below.jpg",
    alt: "Poster artwork for the series Below",
    sourceKey: "below",
  },
  {
    id: "nobody-wants-this",
    title: "Nobody Wants This",
    kind: "series",
    year: "2024",
    genre: "Comedy",
    poster: "/catalog/trending/nobody-wants-this.jpg",
    alt: "Poster artwork for the series Nobody Wants This",
    sourceKey: "nobody-wants-this",
  },
  {
    id: "his-and-hers",
    title: "His & Hers",
    kind: "series",
    year: "2026",
    genre: "Thriller",
    poster: "/catalog/trending/his-and-hers.jpg",
    alt: "Poster artwork for the series His & Hers",
    sourceKey: "his-and-hers",
  },
] satisfies CatalogItem[];

export type CatalogId = (typeof catalog)[number]["id"];

export function catalogById(id: CatalogId): CatalogItem {
  return catalog.find((item) => item.id === id) ?? catalog[0]!;
}
