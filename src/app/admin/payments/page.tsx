import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPaymentsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== 'admin') {
    redirect('/web/login')
  }

  const payments = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  const totalAmount = payments
    .filter(p => p.status === 'SUCCEEDED')
    .reduce((sum, p) => sum + p.amount, 0)

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
            <Link href="/admin/payments" className="block px-4 py-2 bg-gray-700 text-white">
              充值管理
            </Link>
            <Link href="/admin/consultations" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
              咨询记录
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">充值管理</h1>
            <div className="text-right">
              <p className="text-sm text-gray-600">总收入</p>
              <p className="text-2xl font-bold text-green-600">¥{totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订单号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支付方式
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
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.orderNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentMethod === 'WECHAT' ? '微信支付' :
                       payment.paymentMethod === 'ALIPAY' ? '支付宝' : '其他'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {payment.status === 'SUCCEEDED' ? '成功' :
                         payment.status === 'PENDING' ? '待支付' :
                         payment.status === 'FAILED' ? '失败' :
                         payment.status === 'REFUNDED' ? '已退款' : payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleString('zh-CN')}
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
