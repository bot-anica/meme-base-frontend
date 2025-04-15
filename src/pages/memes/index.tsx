import { useState } from "react";

import { useMemes } from "@/hooks/useMemes";
import { Loading, Error, MemeEditModal, MemeTable } from "@/components/meme";
import { Meme } from "@/types/meme";

export default function MemesPage() {
  const { memes, loading, error } = useMemes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);

  const handleEditClick = (meme: Meme) => {
    setCurrentMeme(meme);
    setIsModalOpen(true);
  };

  if (loading && memes.length === 0) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Каталог мемів</h1>
      </div>

      <MemeTable memes={memes} onEditClick={handleEditClick} />

      <MemeEditModal
        currentMeme={currentMeme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
}
