import { Metadata } from "next"

export const metadata: Metadata = {
  title: "常见问题 - 观影说",
  description: "观影说常见问题解答",
}

const faqs = [
  { q: "什么是观影说？", a: "观影说是一个电影评论聚合平台，提供电影信息、评分、影评等服务，帮助用户发现好电影。" },
  { q: "如何注册账号？", a: "点击右上角'登录'按钮，选择'立即注册'，填写邮箱和密码即可完成注册。" },
  { q: "评分系统是如何工作的？", a: "我们使用番茄评分系统，将 TMDB 的 0-10 分转换为 0-100% 的百分比显示。新鲜（≥60%）为红色，腐烂（<60%）为灰色。" },
  { q: "可以删除自己的影评吗？", a: "目前暂不支持删除功能，但您可以联系管理员处理不当内容。" },
  { q: "数据从哪里来？", a: "所有电影数据均来自 The Movie Database (TMDB) API，我们会注明数据来源。" },
  { q: "如何搜索电影？", a: "点击导航栏的搜索图标，输入电影名称、演员或导演即可搜索。" },
  { q: "支持移动端吗？", a: "是的，观影说采用响应式设计，完美适配手机、平板和电脑。" },
  { q: "如何反馈问题？", a: "您可以通过'联系我们'页面发送邮件，或在帮助中心提交工单。" },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-brand-dark py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">常见问题</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-brand-card rounded-lg group">
              <summary className="p-6 cursor-pointer list-none flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                <span className="text-brand-gold text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-400">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">没有找到答案？</p>
          <a href="/contact" className="inline-block bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            联系我们
          </a>
        </div>
      </div>
    </div>
  )
}
