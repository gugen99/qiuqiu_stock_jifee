import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // 网页版账号密码登录
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user || !user.password) return null
        
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionTier: user.subscriptionTier
        }
      }
    }),
    // 微信登录（原有）
    {
      id: 'wechat',
      name: 'WeChat',
      type: 'oauth' as const,
      authorization: {
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
        params: {
          appid: process.env.WECHAT_APPID,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/wechat`,
          response_type: 'code',
          scope: 'snsapi_userinfo',
        },
      },
      token: {
        async request({ params }: any) {
          const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APPID}&secret=${process.env.WECHAT_SECRET}&code=${params.code}&grant_type=authorization_code`
          const response = await fetch(url)
          const tokens = await response.json()
          return { tokens }
        },
      },
      userinfo: {
        async request({ tokens }: any) {
          const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${tokens.access_token}&openid=${tokens.openid}`
          const response = await fetch(url)
          return await response.json()
        },
      },
      profile(profile: any) {
        return {
          id: profile.unionid || profile.openid,
          name: profile.nickname,
          email: `${profile.openid}@wechat.user`,
          image: profile.headimgurl,
          openid: profile.openid,
        }
      },
    }
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id
        ;(session.user as any).role = (user as any).role
        ;(session.user as any).subscriptionTier = (user as any).subscriptionTier
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.subscriptionTier = (user as any).subscriptionTier
      }
      return token
    }
  },
  pages: {
    signIn: '/web/login',
    error: '/web/login',
  },
  session: {
    strategy: 'jwt'
  }
}
