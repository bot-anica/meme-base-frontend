import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Meme, UpdateMemeDto } from "@/types/meme";
import { memeApi } from "@/services/memeApi";

interface MemeState {
  memes: Meme[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentMeme: Meme | null;
}

const initialState: MemeState = {
  memes: [],
  status: "idle",
  error: null,
  currentMeme: null,
};

export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  return await memeApi.getAllMemes();
});

export const updateMeme = createAsyncThunk(
  "memes/updateMeme",
  async ({ id, meme }: { id: string; meme: UpdateMemeDto }) => {
    return await memeApi.updateMeme(id, meme);
  },
);

const memeSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setCurrentMeme: (state, action: PayloadAction<Meme | null>) => {
      state.currentMeme = action.payload;
    },
    clearMemeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all memes
      .addCase(fetchMemes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch memes";
      })
      // Update meme
      .addCase(updateMeme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMeme.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.memes.findIndex(
          (meme) => meme.id === action.payload.id,
        );

        if (index !== -1) {
          state.memes[index] = action.payload;
        }
        if (state.currentMeme?.id === action.payload.id) {
          state.currentMeme = action.payload;
        }
      })
      .addCase(updateMeme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update meme";
      });
  },
});

export const { setCurrentMeme, clearMemeError } = memeSlice.actions;
export default memeSlice.reducer;
