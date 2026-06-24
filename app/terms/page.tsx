import { Metadata } from "next"

export const metadata: Metadata = {
  title: "服务条款 - 观影说",
  description: "观影说服务使用条款",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-dark py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8">服务条款</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-4">最后更新：2026年6月</p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. 接受条款</h2>
          <p className="text-gray-400 mb-4">使用观影说即表示您同意本服务条款。请仔细阅读。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. 服务内容</h2>
          <p className="text-gray-400 mb-4">观影说提供电影信息展示、影评分享、评分系统等服务。所有数据来源于 TMDB API。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. 用户责任</h2>
          <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
            <li>遵守法律法规，不发布违法内容</li>
            <li>尊重知识产权，不侵犯他人权益</li>
            <li>对自己的账号安全负责</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. 禁止行为</h2>
          <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
            <li>发布虚假或误导性信息</li>
            <li>恶意刷评或操纵评分</li>
            <li>骚扰其他用户</li>
            <li>滥用服务进行商业活动</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. 免责声明</h2>
          <p className="text-gray-400 mb-4">观影说不保证服务的绝对可用性，不对因使用服务产生的间接损失承担责任。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. 条款修改</h2>
          <p className="text-gray-400 mb-4">我们保留修改服务条款的权利，重大变更将提前通知用户。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. 联系方式</h2>
          <p className="text-gray-400">如有疑问，请联系：legal@guanyingshuo.com</p>
        </div>
      </div>
    </div>
  )
}
