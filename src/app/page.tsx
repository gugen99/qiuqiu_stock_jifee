import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">股票智投</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">功能</Link>
              <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">价格</Link>
              <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">关于</Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/web/login" className="text-slate-600 hover:text-slate-900 transition-colors">
                登录
              </Link>
              <Link 
                href="/web/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                免费注册
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            AI驱动的智能分析
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            专业的股票投资
            <span className="text-blue-600">智能助手</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            基于AI技术提供实时行情分析、投资建议和风险预警，
            助您在股市中把握每一个机会
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/web/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              免费开始
            </Link>
            <Link 
              href="#features"
              className="bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all"
            >
              查看功能 →
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              无需绑定微信
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              每日免费3次咨询
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              专业AI分析
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">强大功能，助您投资</h2>
            <p className="text-slate-600">为您提供全方位的股票投资分析服务</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: '实时分析',
                desc: '基于最新市场数据，提供即时的股票走势分析和买卖建议'
              },
              {
                icon: '💬',
                title: '智能咨询',
                desc: 'AI助手24小时在线，随时解答您的投资疑问'
              },
              {
                icon: '📊',
                title: '风险预警',
                desc: '智能监控持仓风险，及时推送重要市场动态'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">选择适合您的套餐</h2>
            <p className="text-slate-600">灵活的定价方案，满足不同投资需求</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '免费版',
                price: 0,
                period: '永久',
                features: ['每日3次免费咨询', '基础股票信息', '社区支持'],
                cta: '立即开始',
                popular: false
              },
              {
                name: '基础版',
                price: 29,
                period: '月',
                features: ['无限次咨询', '实时行情分析', '技术指标解读', '邮件通知'],
                cta: '立即订阅',
                popular: true
              },
              {
                name: '高级版',
                price: 99,
                period: '月',
                features: ['基础版全部功能', 'PDF深度研报', '一对一专属客服', '投资策略定制'],
                cta: '立即订阅',
                popular: false
              }
            ].map((plan, i) => (
              <div 
                key={i}
                className={`bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular ? 'border-blue-600 relative' : 'border-slate-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    最受欢迎
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">¥{plan.price}</span>
                  <span className="text-slate-500">/{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/web/subscription"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">股票智投</span>
            </div>
            <p>© 2024 股票智投. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
