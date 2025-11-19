export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

export interface updateProfileRequest{
  name: string;
  bio?: string;
  avatar?: string;
}

export interface signinRequest{
  email: string;
  password: string;
}