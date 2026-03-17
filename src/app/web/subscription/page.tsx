'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const PLANS = [
  {
    id: 'free',
    name: '免费版',
    price: 0,
    period: '永久',
    features: ['每日3次免费咨询', '基础股票信息', '社区支持'],
  },
  {
    id: 'basic',
    name: '基础版',
    price: 29,
    period: '月',
    features: ['无限次咨询', '实时行情分析', '技术指标解读', '邮件通知'],
    popular: true,
  },
  {
    id: 'premium',
    name: '高级版',
    price: 99,
    period: '月',
    features: ['基础版全部功能', 'PDF深度研报', '一对一专属客服', '投资策略定制'],
  },
]

export default function WebSubscriptionPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const currentTier = (session?.user as any)?.subscriptionTier || 'free'

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      router.push('/web/login')
      return
    }
    
    if (planId === 'free') return

    setLoading(planId)
    // 这里会跳转到支付页面
    alert('正在跳转到支付页面...')
    setLoading(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                股票咨询平台
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/web/dashboard" className="text-gray-600 hover:text-gray-900">
                控制台
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-2">选择您的套餐</h1>
        <p className="text-gray-600 text-center mb-10">升级解锁更多专业股票分析服务</p>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white border rounded-xl p-6 relative ${
                plan.popular ? 'border-blue-500 shadow-lg' : ''
              } ${currentTier === plan.id ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  最受欢迎
                </span>
              )}
              
              {currentTier === plan.id && (
                <span className="absolute -top-3 right-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  当前套餐
                </span>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold">¥{plan.price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={currentTier === plan.id || loading === plan.id}
                className={`w-full py-2 rounded-lg font-semibold ${
                  currentTier === plan.id
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : plan.popular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {loading === plan.id 
                  ? '处理中...' 
                  : currentTier === plan.id 
                  ? '当前套餐' 
                  : '立即订阅'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          <p>订阅即表示同意服务条款</p>
          <p>支持支付宝、微信支付</p>
        </div>
      </div>
    </div>
  )
}
