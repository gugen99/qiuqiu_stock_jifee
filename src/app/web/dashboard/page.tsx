'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

const stats = [
  { 
    name: '咨询次数', 
    value: '12', 
    icon: '💬',
    trend: '+3',
    color: 'blue'
  },
  { 
    name: '剩余额度', 
    value: '无限', 
    icon: '🎯',
    trend: '基础版',
    color: 'green'
  },
  { 
    name: '当前套餐', 
    value: '基础版', 
    icon: '⭐',
    trend: '¥29/月',
    color: 'purple'
  },
]

const recentConsultations = [
  { id: 1, question: '贵州茅台走势分析', date: '2024-01-15', status: 'completed' },
  { id: 2, question: '科技股投资建议', date: '2024-01-14', status: 'completed' },
  { id: 3, question: '新能源板块分析', date: '2024-01-13', status: 'completed' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/web/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="font-semibold text-slate-900">股票智投</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                基础版
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {(session.user?.name?.[0] || session.user?.email?.[0] || 'U').toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎语 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            欢迎回来，{session.user?.name || '用户'}
          </h1>
          <p className="text-slate-500 mt-1">
            今天有什么股票问题需要咨询？
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div 
              key={stat.name}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-blue-600'
                  }`}>
                    {stat.trend}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 主要操作 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Link 
            href="/web/chat"
            className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white hover:shadow-xl transition-all hover:-translate-y-1"
003e
            <div className="flex items-start justify-between">
              <div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">开始咨询</h3>
                <p className="text-blue-100">向AI分析师提问，获取专业的股票分析建议</p>
              </div>
              <svg className="w-6 h-6 text-blue-200 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link 
            href="/web/subscription"
            className="group bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1"
003e
            <div className="flex items-start justify-between">
              <div>
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">升级套餐</h3>
                <p className="text-slate-500">解锁更多功能：无限咨询、PDF研报、专属客服</p>
              </div>
              <svg className="w-6 h-6 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* 最近咨询 */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">最近咨询</h3>
              <Link href="/web/chat" className="text-sm text-blue-600 hover:text-blue-700">
                查看全部 →
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-slate-100">
            {recentConsultations.map((consultation) => (
              <div key={consultation.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{consultation.question}</p>
                      <p className="text-sm text-slate-500">{consultation.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                    已完成
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
