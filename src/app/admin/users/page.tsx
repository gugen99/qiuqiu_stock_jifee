import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== 'admin') {
    redirect('/web/login')
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">管理后台</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-sm text-gray-300 hover:text-white">
                返回仪表盘
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-gray-800 min-h-screen">
          <div className="py-4">
            <Link href="/admin" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              仪表盘
            </Link>
            <Link href="/admin/users" className="block px-4 py-2 bg-gray-700 text-white">
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

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">用户管理</h1>
            <div className="text-sm text-gray-600">
              共 {users.length} 位用户
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    套餐
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    剩余额度
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          {user.name?.[0] || user.email?.[0] || '?'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || '未设置'}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.subscriptionTier === 'premium' ? 'bg-purple-100 text-purple-800' :
                        user.subscriptionTier === 'basic' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.subscriptionTier === 'premium' ? '高级版' :
                         user.subscriptionTier === 'basic' ? '基础版' : '免费版'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.freeQuota - user.dailyUsed} / {user.freeQuota}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        详情
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
