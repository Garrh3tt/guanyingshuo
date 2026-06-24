import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "联系我们 - 观影说",
  description: "联系观影说团队，获取帮助和支持",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-dark py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">联系我们</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-brand-card rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4"> 邮箱联系</h2>
            <p className="text-gray-400 mb-2">support@guanyingshuo.com</p>
            <p className="text-sm text-gray-500">工作日24小时内回复</p>
          </div>
          
          <div className="bg-brand-card rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">💬 在线客服</h2>
            <p className="text-gray-400 mb-2">工作时间：周一至周五 9:00-18:00</p>
            <button className="mt-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
              开始聊天
            </button>
          </div>
        </div>

        <div className="bg-brand-card rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">发送消息</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">姓名</label>
              <input type="text" className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red" placeholder="您的姓名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
              <input type="email" className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">主题</label>
              <select className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red">
                <option>产品建议</option>
                <option>问题反馈</option>
                <option>商务合作</option>
                <option>其他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">内容</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red" placeholder="请详细描述您的问题..."></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-red hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
              发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
