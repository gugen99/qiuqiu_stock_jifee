'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [loading, setLoading] = useState(false);

  if (status === 'loading') {
    return <div className="flex justify-center p-10">加载中...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">股票智能咨询平台</h1>
          <p className="text-gray-600 mb-8">专业股票分析，随时随地为您服务</p>
          <button
            onClick={() => signIn('wechat')}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            微信登录
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) {
        if (res.status === 403) {
          setMessages(prev => [...prev, { 
            role: 'system', 
            content: '您的免费次数已用完，请订阅套餐继续咨询。' 
          }]);
          return;
        }
        throw new Error('请求失败');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: '服务暂时不可用，请稍后重试。' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img 
            src={session.user?.image || '/avatar.png'} 
            alt="头像" 
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{session.user?.name}</p>
            <p className="text-sm text-gray-500">
              {(session.user as any).subscriptionTier === 'premium' ? '高级会员' : 
               (session.user as any).subscriptionTier === 'basic' ? '基础会员' : '免费用户'}
            </p>
          </div>
        </div>
        <a href="/subscription" className="text-blue-500 text-sm">
          升级套餐 →
        </a>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            您好！我是您的股票咨询助手，请问有什么可以帮您？
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 ${
                msg.role === 'user' 
                  ? 'text-right' 
                  : msg.role === 'system'
                  ? 'text-center text-red-500'
                  : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : msg.role === 'system'
                    ? 'bg-red-100'
                    : 'bg-white'
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))
        )}
        {loading && (
          <div className="text-left">
            <span className="inline-block p-3 rounded-lg bg-white">
              思考中...
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="请输入您的股票咨询问题..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          发送
        </button>
      </form>
    </div>
  );
}
