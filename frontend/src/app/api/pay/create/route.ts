import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// 微信支付配置
const WECHAT_CONFIG = {
  appId: process.env.WECHAT_APPID!,
  mchId: process.env.WECHAT_MCHID!,
  apiKey: process.env.WECHAT_API_KEY!,
  notifyUrl: process.env.WECHAT_NOTIFY_URL!,
};

// 生成签名
function generateSign(params: Record<string, string>, key: string): string {
  const sorted = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== '' && k !== 'sign')
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('md5').update(sorted + '&key=' + key).digest('hex').toUpperCase();
}

// 统一下单
export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { openid, amount, description, outTradeNo } = body;

    const params = {
      appid: WECHAT_CONFIG.appId,
      mch_id: WECHAT_CONFIG.mchId,
      nonce_str: crypto.randomBytes(16).toString('hex'),
      body: description,
      out_trade_no: outTradeNo,
      total_fee: Math.round(amount * 100).toString(), // 分
      spbill_create_ip: '127.0.0.1',
      notify_url: WECHAT_CONFIG.notifyUrl,
      trade_type: 'JSAPI',
      openid: openid,
    };

    const sign = generateSign(params, WECHAT_CONFIG.apiKey);
    
    const xml = `
      <xml>
        ${Object.entries({ ...params, sign }).map(([k, v]) => `<${k}>${v}</${k}>`).join('')}
      </xml>
    `;

    const response = await fetch('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      method: 'POST',
      body: xml,
      headers: { 'Content-Type': 'text/xml' },
    });

    const result = await response.text();
    
    // 解析XML并返回前端JSAPI参数
    const prepayId = result.match(/<prepay_id><!\[CDATA\[(.*?)\]\]><\/prepay_id>/)?.[1];
    
    if (!prepayId) {
      return NextResponse.json({ error: '创建订单失败', raw: result }, { status: 500 });
    }

    const timeStamp = Math.floor(Date.now() / 1000).toString();
    const nonceStr = params.nonce_str;
    const package_str = `prepay_id=${prepayId}`;
    
    const paySign = generateSign({
      appId: WECHAT_CONFIG.appId,
      timeStamp,
      nonceStr,
      package: package_str,
      signType: 'MD5',
    }, WECHAT_CONFIG.apiKey);

    return NextResponse.json({
      appId: WECHAT_CONFIG.appId,
      timeStamp,
      nonceStr,
      package: package_str,
      signType: 'MD5',
      paySign,
    });
  } catch (error) {
    console.error('[微信支付] 错误:', error);
    return NextResponse.json({ error: '支付请求失败' }, { status: 500 });
  }
}
