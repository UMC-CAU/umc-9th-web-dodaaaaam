export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number;
};

// 감독/출연 정보 (가공 ver)
export type PersonInfo = {
  id: number;
  name: string;
  profile_path: string | null;
  role: string; // cast: character, crew: job
};

// json 응답으로 받을 타입 
export type CreditsResponse = {
  id: number;
  cast: Array<{ id: number; name: string; profile_path: string | null; character: string }>;
  crew: Array<{ id: number; name: string; profile_path: string | null; job: string }>;
};