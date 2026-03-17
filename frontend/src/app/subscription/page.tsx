'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

const PLANS = [
  {
    id: 'free',
    name: '免费版',
    price: 0,
    period: '永久',
    features: ['每日3次免费咨询', '基础股票信息', '社区支持'],
    current: true,
  },
  {
    id: 'basic',
    name: '基础版',
    price: 29,
    period: '月',
    features: ['无限次咨询', '实时行情分析', '技术指标解读', '微信消息提醒'],
    current: false,
    popular: true,
  },
  {
    id: 'premium',
    name: '高级版',
    price: 99,
    period: '月',
    features: ['基础版全部功能', 'PDF深度研报', '一对一专属客服', '投资策略定制', '早盘晚报推送'],
    current: false,
  },
];

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      alert('请先登录');
      return;
    }
    
    if (planId === 'free') return;

    setLoading(planId);
    try {
      // 创建支付订单
      const res = await fetch('/api/pay/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          amount: planId === 'basic' ? 29 : 99,
        }),
      });

      if (!res.ok) throw new Error('创建订单失败');

      const payParams = await res.json();

      // 调用微信支付JSAPI
      if (typeof window !== 'undefined' && (window as any).WeixinJSBridge) {
        (window as any).WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          payParams,
          (res: any) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              alert('支付成功！');
              window.location.reload();
            } else {
              alert('支付取消或失败');
            }
          }
        );
      } else {
        alert('请在微信内打开进行支付');
      }
    } catch (error) {
      alert('支付失败，请重试');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-2">选择您的套餐</h1>
      <p className="text-gray-600 text-center mb-10">升级解锁更多专业股票分析服务</p>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-xl p-6 relative ${
              plan.popular ? 'border-blue-500 shadow-lg' : ''
            } ${plan.current ? 'bg-gray-50' : 'bg-white'}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                最受欢迎
              </span>
            )}

            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            
            <div className="mb-4">
              <span className="text-4xl font-bold">¥{plan.price}</span>
              <span className="text-gray-500">/{plan.period}</span>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={plan.current || loading === plan.id}
              className={`w-full py-2 rounded-lg font-semibold ${
                plan.current
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {loading === plan.id 
                ? '处理中...' 
                : plan.current 
                ? '当前套餐' 
                : '立即订阅'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        <p>订阅即表示同意服务条款</p>
        <p>高级版订阅后可收到微信推送的PDF深度研报</p>
      </div>
    </div>
  );
}
