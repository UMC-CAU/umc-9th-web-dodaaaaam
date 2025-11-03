import { useEffect, useState } from "react";
import axios from "axios";
import type { CreditsResponse, MovieDetail, PersonInfo } from "../types/MovieDetail";
import { mapCredits } from "../utils/mapCredits";
import { useParams } from "react-router-dom";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU4YzE1M2Q4YWE3NTg3YTM2ZjZjNDEyYmYxYjJkYiIsIm5iZiI6MTc1OTMwMjQ2MC42NjMsInN1YiI6IjY4ZGNkMzNjMWRkM2FjMWMzNWJiMWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRrFaWC_OMP4AwW6aqBRmNUJdv4J1Ta-YulFGWBUwLQ",
};

type CreditsVM = { cast: PersonInfo[]; directors: PersonInfo[] };

export function useMovie() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<MovieDetail | undefined>(undefined);          // 영화 상세정보
  const [credits, setCredits] = useState<CreditsVM>({ cast: [], directors: [] });    // 감독/출연진 정보 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const detail = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,    // 영화 상세 정보 api
          { headers }
        );
        setDetail(detail.data);

        const crewData = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,   // 감독/출연진 정보 api 
          { headers }
        );
        setCredits(mapCredits(crewData.data));
      } catch (err) {
        console.error("영화 데이터를 불러오는 중 오류:", err);
        setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
        setDetail(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { detail, credits, loading, error };
}