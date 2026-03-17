import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== 'admin') {
    redirect('/web/login')
  }

  // 获取统计数据
  const totalUsers = await prisma.user.count()
  const todayUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    }
  })
  const totalConsultations = await prisma.consultation.count()
  const totalPayments = await prisma.payment.count({
    where: { status: 'paid' }
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">管理后台</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">{session.user?.email}</span>
              <Link href="/" className="text-sm text-gray-300 hover:text-white">
                退出
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className="w-64 bg-gray-800 min-h-screen">
          <div className="py-4">
            <Link href="/admin" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              仪表盘
            </Link>
            <Link href="/admin/users" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              用户管理
            </Link>
            <Link href="/admin/payments" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              充值管理
            </Link>
            <Link href="/admin/consultations" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              咨询记录
            </Link>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">仪表盘</h1>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">总用户数</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">今日新增</p>
              <p className="text-3xl font-bold text-green-600">+{todayUsers}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">总咨询数</p>
              <p className="text-3xl font-bold text-blue-600">{totalConsultations}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">总订单数</p>
              <p className="text-3xl font-bold text-purple-600">{totalPayments}</p>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">快速操作</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/users"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
              >
                <span className="text-blue-600 font-medium">管理用户 →</span>
              </Link>
              <Link
                href="/admin/payments"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100"
              >
                <span className="text-green-600 font-medium">查看充值 →</span>
              </Link>
              <Link
                href="/admin/consultations"
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
              >
                <span className="text-purple-600 font-medium">咨询记录 →</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
