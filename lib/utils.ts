/**
 * 根据 TMDB vote_average (0-10) 获取番茄评分状态
 */
export function getTomatoStatus(score: number): {
  label: string;
  color: string;
  icon: "fresh" | "rotten";
  percentage: number;
} {
  const percentage = Math.round(score * 10);
  if (percentage >= 60) {
    return { label: "新鲜", color: "#FA320A", icon: "fresh", percentage };
  }
  if (percentage >= 40) {
    return { label: "一般", color: "#F5C518", icon: "fresh", percentage };
  }
  return { label: "腐烂", color: "#6B7280", icon: "rotten", percentage };
}

/**
 * 格式化日期
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "未知";
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 获取年份
 */
export function getYear(dateStr: string): string {
  if (!dateStr) return "未知";
  return new Date(dateStr).getFullYear().toString();
}

/**
 * 格式化分钟为小时分钟
 */
export function formatRuntime(minutes: number): string {
  if (!minutes) return "未知";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}小时${mins}分钟`;
  }
  return `${mins}分钟`;
}

/**
 * 格式化数字 (票房等)
 */
export function formatNumber(num: number): string {
  if (!num) return "未知";
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}亿`;
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return num.toLocaleString("zh-CN");
}

/**
 * 格式化金额 (美元)
 */
export function formatCurrency(amount: number): string {
  if (!amount) return "未知";
  if (amount >= 100000000) {
    return `$${(amount / 100000000).toFixed(1)}亿`;
  }
  if (amount >= 10000) {
    return `$${(amount / 10000).toFixed(1)}万`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
