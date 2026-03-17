import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminConsultationsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== 'admin') {
    redirect('/web/login')
  }

  const consultations = await prisma.consultation.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      user: { select: { name: true, email: true } },
      advisor: { select: { user: { select: { name: true } } } }
    }
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
            <Link href="/admin/users" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              用户管理
            </Link>
            <Link href="/admin/payments" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              充值管理
            </Link>
            <Link href="/admin/consultations" className="block px-4 py-2 bg-gray-700 text-white">
              咨询记录
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">咨询记录</h1>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    咨询师
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    类型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {consultations.map((consultation) => (
                  <tr key={consultation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {consultation.user?.name || '未知用户'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {consultation.advisor?.user?.name || '系统'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {consultation.type === 'SINGLE' ? '单次咨询' :
                       consultation.type === 'HOURLY' ? '按小时' : '套餐'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        consultation.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        consultation.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        consultation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {consultation.status === 'COMPLETED' ? '已完成' :
                         consultation.status === 'IN_PROGRESS' ? '进行中' :
                         consultation.status === 'PENDING' ? '待确认' :
                         consultation.status === 'CANCELLED' ? '已取消' : consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(consultation.createdAt).toLocaleString('zh-CN')}
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
