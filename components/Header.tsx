"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-darker/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/images/favicon.svg" alt="观影说" width={32} height={32} className="rounded-full" />
          <span className="text-xl font-bold text-white">
            观影<span className="text-brand-red">说</span>
          </span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">首页</Link>
          <Link href="/movie" className="text-gray-300 hover:text-white transition-colors">电影</Link>
          <Link href="/ranking" className="text-gray-300 hover:text-white transition-colors">排行榜</Link>
          <details className="relative group">
            <summary className="text-gray-300 hover:text-white transition-colors cursor-pointer list-none flex items-center gap-1">
              类型
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="absolute top-full left-0 mt-2 w-48 bg-brand-card border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link href="/genre/action" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">动作片</Link>
                <Link href="/genre/comedy" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">喜剧片</Link>
                <Link href="/genre/scifi" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">科幻片</Link>
                <Link href="/genre/romance" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">爱情片</Link>
                <Link href="/genre/horror" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">恐怖片</Link>
                <Link href="/genre/animation" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">动画片</Link>
                <Link href="/genre/documentary" className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">纪录片</Link>
              </div>
            </div>
          </details>
          <Link href="/help" className="text-gray-300 hover:text-white transition-colors">帮助</Link>
        </nav>

        {/* 搜索和菜单按钮 */}
        <div className="flex items-center gap-4">
          {/* 搜索框 */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索电影..."
                className="bg-brand-card text-white px-3 py-1.5 rounded-l-lg border border-gray-600 focus:border-brand-red focus:outline-none text-sm w-40 md:w-56"
                autoFocus
              />
              <button
                type="submit"
                className="bg-brand-red text-white px-3 py-1.5 rounded-r-lg hover:bg-red-700 transition-colors"
              >
                搜索
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="ml-2 text-gray-400 hover:text-white md:hidden"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {/* 用户菜单 */}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-brand-red to-brand-gold rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="hidden md:inline text-sm">{session.user?.name}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-brand-card border border-gray-700 rounded-lg shadow-xl py-2">
                  <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">个人中心</Link>
                  <button onClick={() => { signOut({ callbackUrl: "/" }); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-brand-red/10 hover:text-white transition-colors">退出登录</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="bg-brand-red hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
              登录
            </Link>
          )}

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-darker border-t border-gray-800">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>首页</Link>
            <Link href="/movie" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>电影</Link>
            <Link href="/ranking" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>排行榜</Link>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-500 mb-2">电影类型</p>
              <Link href="/genre/action" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>动作片</Link>
              <Link href="/genre/comedy" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>喜剧片</Link>
              <Link href="/genre/scifi" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>科幻片</Link>
              <Link href="/genre/romance" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>爱情片</Link>
              <Link href="/genre/horror" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>恐怖片</Link>
              <Link href="/genre/animation" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>动画片</Link>
              <Link href="/genre/documentary" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>纪录片</Link>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>帮助中心</Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>常见问题</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>联系我们</Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>隐私政策</Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>服务条款</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
