export interface Meme {
  id: string;
  name: string;
  imageUrl: string;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMemeDto {
  name: string;
  imageUrl: string;
  likes: number;
}

export interface UpdateMemeDto {
  name?: string;
  imageUrl?: string;
  likes?: number;
}