'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import {
  Home,
  Users,
  MessageSquare,
  User,
  Menu,
  X,
  LayoutDashboard,
} from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">股票咨询平台</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
              <Home className="w-4 h-4" />
              <span>首页</span>
            </Link>
            <Link href="/advisors" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
              <Users className="w-4 h-4" />
              <span>咨询师</span>
            </Link>

            {status === 'authenticated' ? (
              <>
                <Link href="/consultations" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span>我的咨询</span>
                </Link>
                {session.user.role === 'ADVISOR' && (
                  <Link href="/advisor/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>咨询师中心</span>
                  </Link>
                )}
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>后台管理</span>
                  </Link>
                )}
                <Link href="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                  <User className="w-4 h-4" />
                  <span>{session.user.name || '个人中心'}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  退出登录
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">登录</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">注册</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" className="block text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              首页
            </Link>
            <Link href="/advisors" className="block text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              咨询师
            </Link>
            {status === 'authenticated' ? (
              <>
                <Link href="/consultations" className="block text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  我的咨询
                </Link>
                <Link href="/profile" className="block text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  个人中心
                </Link>
                <Button variant="outline" size="sm" className="w-full" onClick={() => signOut()}>
                  退出登录
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">登录</Button>
                </Link>
                <Link href="/auth/register" className="flex-1">
                  <Button size="sm" className="w-full">注册</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
