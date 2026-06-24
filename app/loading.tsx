export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* 轮播骨架 */}
      <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-brand-card rounded-lg animate-pulse mb-10" />

      {/* 区块骨架 */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="mb-10">
          <div className="h-8 w-40 bg-brand-card rounded animate-pulse mb-4" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div
                key={card}
                className="shrink-0 w-[150px] sm:w-[180px]"
              >
                <div className="aspect-[2/3] bg-brand-card rounded-lg animate-pulse" />
                <div className="h-4 bg-brand-card rounded mt-2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
