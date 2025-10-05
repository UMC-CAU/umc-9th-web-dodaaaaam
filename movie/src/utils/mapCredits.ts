import type { CreditsResponse, PersonInfo } from "../types/MovieDetail";

export function mapCredits(data: CreditsResponse): {
  cast: PersonInfo[];
  directors: PersonInfo[];
} {
  const cast = data.cast.map(c => ({
    id: c.id,
    name: c.name,
    profile_path: c.profile_path,
    role: c.character,
  }));

  const directors = data.crew
    .filter(c => c.job === "Director")
    .map(d => ({
      id: d.id,
      name: d.name,
      profile_path: d.profile_path,
      role: d.job,
    }));

  return { cast, directors };
}