import type { Author } from "./UserDto"

export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;  
  updatedAt: string;  
  tags: Tag[];
  likes: Like[];
  author: Author;
}

export interface CreateLpRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}