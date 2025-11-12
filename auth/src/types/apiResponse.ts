/** 서버 공통 래퍼 */
export interface ApiEnvelope<T> {
  status: boolean;         // true/false
  statusCode: number;      // 200, 201, 400...
  message: string;         // "요청이 성공했습니다."
  data: T;                 // 실제 페이로드
}

/** 커서 기반 페이지 페이로드 공통 */
export interface CursorPayload<T> {
  data: T[];               // 아이템 배열
  nextCursor: number | null;
  hasNext: boolean;
}

export type AuthPayload = { 
  id: number;
  name: string;
  accessToken: string; 
  refreshToken: string; 
};

export type User = {
  id: number;
  name: string;
}