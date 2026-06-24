import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "观影说 - 你的电影评论聚合平台",
    template: "%s | 观影说",
  },
  description:
    "观影说是一个电影评分与评论聚合平台，提供最新的电影资讯、专业的评分和真实的观众评论。",
  keywords: ["电影", "影评", "评分", "观影说", "电影推荐"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-brand-dark text-white min-h-screen">
        <Providers>
          <Header />
          <main className="pt-16 min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
