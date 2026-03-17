import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

// 微信 OAuth Provider
const WechatProvider = {
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
      state: 'STATE',
    },
  },
  token: {
    url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    async request({ params }: any) {
      const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APPID}&secret=${process.env.WECHAT_SECRET}&code=${params.code}&grant_type=authorization_code`;
      const response = await fetch(url);
      const tokens = await response.json();
      return { tokens };
    },
  },
  userinfo: {
    url: 'https://api.weixin.qq.com/sns/userinfo',
    async request({ tokens }: any) {
      const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${tokens.access_token}&openid=${tokens.openid}`;
      const response = await fetch(url);
      return await response.json();
    },
  },
  profile(profile: any) {
    return {
      id: profile.unionid || profile.openid,
      name: profile.nickname,
      email: `${profile.openid}@wechat.user`,
      image: profile.headimgurl,
      openid: profile.openid,
    };
  },
};

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [WechatProvider],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.openid = (user as any).openid;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
