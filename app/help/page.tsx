import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "帮助中心 - 观影说",
  description: "观影说帮助中心，解答常见问题，提供使用指南",
}

const helpTopics = [
  {
    slug: "getting-started",
    icon: "🚀",
    title: "快速入门",
    desc: "了解观影说的基本功能，开始您的影评之旅",
    details: [
      "注册账号：点击右上角\"登录\"→\"注册账号\"，填写昵称、邮箱和密码即可完成注册",
      "浏览电影：在首页可查看热门电影推荐，在\"电影库\"页面可按类型、年份等筛选电影",
      "搜索电影：在顶部的搜索框中输入电影名称，即可快速找到想看的电影",
      "查看详情：点击电影海报即可进入详情页，查看剧情简介、演员阵容、评分和评论",
    ],
  },
  {
    slug: "account",
    icon: "👤",
    title: "账号管理",
    desc: "注册、登录、修改密码等账号相关操作指南",
    details: [
      "登录/注册：支持邮箱注册和登录，注册成功后自动登录",
      "修改昵称：在个人中心→账号设置→修改昵称，输入新昵称即可修改",
      "修改密码：在个人中心→账号设置→修改密码，输入当前密码和新密码即可",
      "退出登录：在个人中心→账号设置→退出登录",
    ],
  },
  {
    slug: "reviews",
    icon: "✍️",
    title: "发表影评",
    desc: "如何撰写精彩的影评，分享您的观影感受",
    details: [
      "发表评论：在电影详情页的\"发表我的评论\"区域，选择评分（1-10分）并写下评论内容",
      "查看评论：在电影详情页下方可查看该电影的所有用户评论",
      "个人评论管理：在个人中心→我的评论中，可查看您发表过的所有评论",
      "评分标准：1-10分，10分为最高分，系统会计算所有用户的平均评分",
    ],
  },
  {
    slug: "search",
    icon: "🔍",
    title: "搜索与浏览",
    desc: "高效搜索电影和浏览片库的实用技巧",
    details: [
      "关键词搜索：在顶部搜索框输入电影名称，支持中英文搜索",
      "电影分类：在\"电影库\"页面按类型（动作、喜剧、爱情等）筛选电影",
      "排行榜：在\"排行榜\"页面查看高分电影排名和年度榜单",
      "搜索建议：尝试输入电影名的一部分，系统会展示匹配结果",
    ],
  },
  {
    slug: "favorites",
    icon: "⭐",
    title: "收藏与观影",
    desc: "收藏喜欢的电影，记录您的观影足迹",
    details: [
      "收藏电影：在电影详情页点击\"想看\"按钮即可将电影加入收藏列表",
      "管理收藏：在个人中心→我的收藏中浏览和管理所有收藏的电影",
      "观影记录：浏览电影详情页时，系统会自动记录观影足迹",
      "历史回顾：在个人中心→我的观影中查看最近浏览过的电影记录",
    ],
  },
  {
    slug: "troubleshooting",
    icon: "🔧",
    title: "故障排除",
    desc: "常见问题的解决方案和错误排查指南",
    details: [
      "登录失败：请检查邮箱和密码是否正确，或尝试重新注册",
      "图片加载慢：电影图片来自TMDB，加载速度受网络环境影响",
      "数据不显示：刷新页面重试，如持续异常请联系我们",
      "其他问题：通过\"联系我们\"页面提交反馈，我们将尽快回复",
    ],
  },
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            帮助中心
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto text-lg">
            找到您需要的答案，快速解决问题
          </p>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpTopics.map((topic) => (
              <Link key={topic.slug} href={`/help/${topic.slug}`} className="group">
                <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red h-full">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{topic.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {topic.desc}
                  </p>
                  <ul className="space-y-1">
                    {topic.details.slice(0, 2).map((detail, i) => (
                      <li key={i} className="text-gray-500 text-xs flex items-start gap-1">
                        <span className="text-brand-red mt-0.5">·</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            常见问题
          </h2>
          <div className="space-y-6">
            <div className="bg-brand-dark rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">观影说是免费的吗？</h3>
              <p className="text-gray-400 text-sm">是的，观影说完全免费使用。您无需付费即可浏览电影、发表评论和管理收藏。</p>
            </div>
            <div className="bg-brand-dark rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">电影数据从哪里来？</h3>
              <p className="text-gray-400 text-sm">我们的电影数据由 TMDB (The Movie Database) 提供，包括电影信息、海报、演员阵容和评分等。</p>
            </div>
            <div className="bg-brand-dark rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">如何修改已发表的评论？</h3>
              <p className="text-gray-400 text-sm">目前暂不支持修改已发表的评论，建议删除后重新发表。此功能将在后续版本中推出。</p>
            </div>
            <div className="bg-brand-dark rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">我的数据安全吗？</h3>
              <p className="text-gray-400 text-sm">密码经过加密存储，我们不会向第三方共享您的个人信息。详情请查看隐私政策。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            需要更多帮助？
          </h2>
          <p className="text-gray-400 mb-8">
            如果以上文档无法解决您的问题，欢迎联系我们
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-red hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            联系我们
          </Link>
        </div>
      </section>
    </div>
  )
}