import { Metadata } from "next"

export const metadata: Metadata = {
  title: "隐私政策 - 观影说",
  description: "观影说隐私政策说明",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-dark py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8">隐私政策</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-4">最后更新：2026年6月</p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. 信息收集</h2>
          <p className="text-gray-400 mb-4">我们收集以下类型的信息：</p>
          <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
            <li>注册时提供的个人信息（姓名、邮箱）</li>
            <li>使用服务时产生的数据（影评、评分、收藏）</li>
            <li>设备信息和浏览数据</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. 信息使用</h2>
          <p className="text-gray-400 mb-4">我们使用收集的信息用于：</p>
          <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
            <li>提供和改进服务</li>
            <li>个性化用户体验</li>
            <li>发送重要通知</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. 信息安全</h2>
          <p className="text-gray-400 mb-4">我们采取合理的安全措施保护您的个人信息，包括加密传输、访问控制等。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. 第三方共享</h2>
          <p className="text-gray-400 mb-4">我们不会出售或出租您的个人信息。仅在法律要求或服务必要时与可信第三方共享。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Cookie 使用</h2>
          <p className="text-gray-400 mb-4">我们使用 Cookie 改善用户体验，您可以通过浏览器设置管理 Cookie。</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. 联系方式</h2>
          <p className="text-gray-400">如有隐私相关问题，请联系：privacy@guanyingshuo.com</p>
        </div>
      </div>
    </div>
  )
}
