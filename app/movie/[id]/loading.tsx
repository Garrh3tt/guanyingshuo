export default function Loading() {
  return (
    <div>
      {/* 英雄区骨架 */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-brand-card animate-pulse" />

      {/* 详情骨架 */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* 简介骨架 */}
        <div>
          <div className="h-6 w-32 bg-brand-card rounded animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-brand-card rounded animate-pulse" />
            <div className="h-4 bg-brand-card rounded animate-pulse w-3/4" />
          </div>
        </div>

        {/* 信息骨架 */}
        <div>
          <div className="h-6 w-32 bg-brand-card rounded animate-pulse mb-4" />
          <div className="bg-brand-card rounded-lg p-6 h-40 animate-pulse" />
        </div>

        {/* 演员骨架 */}
        <div>
          <div className="h-6 w-32 bg-brand-card rounded animate-pulse mb-4" />
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="shrink-0 w-[120px]">
                <div className="w-20 h-20 rounded-full bg-brand-card animate-pulse mx-auto mb-2" />
                <div className="h-3 bg-brand-card rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
