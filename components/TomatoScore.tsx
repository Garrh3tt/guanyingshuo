import { getTomatoStatus } from "@/lib/utils";

interface TomatoScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function TomatoScore({ score, size = "md" }: TomatoScoreProps) {
  const status = getTomatoStatus(score);

  const sizeClasses = {
    sm: { container: "gap-1", icon: "w-4 h-4", text: "text-xs" },
    md: { container: "gap-1.5", icon: "w-5 h-5", text: "text-sm" },
    lg: { container: "gap-2", icon: "w-8 h-8", text: "text-lg" },
  };

  const s = sizeClasses[size];

  return (
    <div className={`flex items-center ${s.container}`}>
      {status.icon === "fresh" ? (
        <svg
          className={`${s.icon} shrink-0`}
          viewBox="0 0 24 24"
          fill={status.color}
        >
          <path d="M12 2C8.5 2 5 4.5 5 9c0 4 3.5 8 7 13 3.5-5 7-9 7-13 0-4.5-3.5-7-7-7zm0 2c2.5 0 5 1.8 5 5 0 3-2.5 6.2-5 9.5C9.5 15.2 7 12 7 9c0-3.2 2.5-5 5-5z" />
        </svg>
      ) : (
        <svg
          className={`${s.icon} shrink-0`}
          viewBox="0 0 24 24"
          fill={status.color}
        >
          <path d="M12 2C8.5 2 5 4.5 5 9c0 4 3.5 8 7 13 3.5-5 7-9 7-13 0-4.5-3.5-7-7-7zm0 2c2.5 0 5 1.8 5 5 0 3-2.5 6.2-5 9.5C9.5 15.2 7 12 7 9c0-3.2 2.5-5 5-5z" />
          <line x1="8" y1="8" x2="16" y2="16" stroke={status.color} strokeWidth="2" />
          <line x1="16" y1="8" x2="8" y2="16" stroke={status.color} strokeWidth="2" />
        </svg>
      )}
      <span className={`${s.text} font-bold`} style={{ color: status.color }}>
        {status.percentage}%
      </span>
    </div>
  );
}
