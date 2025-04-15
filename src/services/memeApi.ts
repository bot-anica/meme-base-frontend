import { api } from "./api";

import { Meme, CreateMemeDto, UpdateMemeDto } from "@/types/meme";

const MEMES_ENDPOINT = "/memes";

export const memeApi = {
  async getAllMemes(): Promise<Meme[]> {
    return api.get<Meme[]>(MEMES_ENDPOINT);
  },

  async getMemeById(id: string): Promise<Meme> {
    return api.getById<Meme>(MEMES_ENDPOINT, id);
  },

  async createMeme(meme: CreateMemeDto): Promise<Meme> {
    return api.post<Meme, CreateMemeDto>(MEMES_ENDPOINT, meme);
  },

  async updateMeme(id: string, meme: UpdateMemeDto): Promise<Meme> {
    return api.patch<Meme, UpdateMemeDto>(MEMES_ENDPOINT, id, meme);
  },

  async deleteMeme(id: string): Promise<void> {
    return api.delete(MEMES_ENDPOINT, id);
  },
};
