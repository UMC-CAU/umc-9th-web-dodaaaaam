const LpSkeletonCard = () => {
  return (
    <div className="w-full max-w-[200px]">
      <div className="relative overflow-hidden rounded-lg shadow-md aspect-square bg-zinc-300">
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-r
            from-zinc-300
            via-zinc-100
            to-zinc-300
            animate-shimmer
          "
        />
      </div>
    </div>
  );
};

export default LpSkeletonCard;
