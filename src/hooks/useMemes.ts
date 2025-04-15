import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMemes } from "@/store/memeSlice";

export const useMemes = () => {
  const dispatch = useAppDispatch();
  const { memes, status, error } = useAppSelector((state) => state.memes);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMemes = async () => {
      if (memes.length > 0 && status !== "loading") {
        return;
      }

      if (status !== "loading" && status !== "succeeded") {
        setIsLoading(true);
        await dispatch(fetchMemes());
        setIsLoading(false);
      }
    };

    loadMemes();
  }, [dispatch]);

  const loading = isLoading || status === "loading";

  return {
    memes,
    loading,
    error,
  };
};
