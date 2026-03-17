export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">股票咨询平台</h3>
            <p className="text-gray-600 text-sm">
              专业的股票投资咨询服务平台，连接投资者与专业分析师。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">平台服务</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/advisors" className="hover:text-primary">找咨询师</a></li>
              <li><a href="/services" className="hover:text-primary">服务套餐</a></li>
              <li><a href="/how-it-works" className="hover:text-primary">如何使用</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">支持</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/help" className="hover:text-primary">帮助中心</a></li>
              <li><a href="/contact" className="hover:text-primary">联系我们</a></li>
              <li><a href="/faq" className="hover:text-primary">常见问题</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">法律</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/privacy" className="hover:text-primary">隐私政策</a></li>
              <li><a href="/terms" className="hover:text-primary">服务条款</a></li>
              <li><a href="/disclaimer" className="hover:text-primary">免责声明</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} 股票咨询平台. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
