export type Filme = {
  id: number;
  name: string;
  genres: string[];
  premiered: string | null;
  rating: {
    average: number | null;
  };

  image: {
    medium: string;
    original: string;
  } | null;

  summary: string | null;
};
