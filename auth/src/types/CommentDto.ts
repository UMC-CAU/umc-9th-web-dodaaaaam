import type { Author } from "./UserDto"

export interface LPComment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface createCommentRequest {
  lpId: number;
  content: string;
}

export interface updateCommentRequest {
  lpId: number;
  commentId: number;
  content: string;
}

export interface deleteCommentRequest{
  lpId: number;
  commentId: number;
}