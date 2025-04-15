import { useMemes } from "@/hooks/useMemes";
import { Loading, Error, MemeCard } from "@/components/meme";

export default function MemesCardsPage() {
  const { memes, loading, error } = useMemes();

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Каталог мемів</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
}
