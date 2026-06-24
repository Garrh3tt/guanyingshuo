import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-red mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">页面未找到</h2>
        <p className="text-gray-400 mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-red text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
