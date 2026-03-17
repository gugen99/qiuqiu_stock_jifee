import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const LOCAL_BOT_URL = process.env.LOCAL_BOT_URL || 'http://localhost:3001';
const BOT_API_TOKEN = process.env.BOT_API_TOKEN!;

// 与本地股票机器人通信
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { message } = await req.json();
    const userId = session.user.id;
    const tier = (session.user as any).subscriptionTier || 'free';

    // 检查用户是否有权限咨询
    if (tier === 'free') {
      // 检查免费次数
      const canAsk = await checkFreeQuota(userId);
      if (!canAsk) {
        return NextResponse.json({ 
          error: '免费次数已用完，请订阅套餐',
          needUpgrade: true 
        }, { status: 403 });
      }
    }

    // 转发到本地机器人
    const response = await fetch(`${LOCAL_BOT_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bot-Token': BOT_API_TOKEN,
      },
      body: JSON.stringify({
        userId,
        message,
        tier,
      }),
    });

    if (!response.ok) {
      throw new Error(`本地机器人返回错误: ${response.status}`);
    }

    const data = await response.json();
    
    // 记录咨询历史
    await recordConsultation(userId, message, data.reply);

    // 如果是高级订阅且内容足够重要，生成PDF并推送
    if (tier === 'premium' && shouldGeneratePDF(message, data.reply)) {
      await generateAndPushPDF(userId, message, data.reply);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[咨询] 错误:', error);
    return NextResponse.json({ 
      error: '咨询服务暂时不可用，请稍后重试' 
    }, { status: 500 });
  }
}

// 检查免费额度
async function checkFreeQuota(userId: string): Promise<boolean> {
  // TODO: 从数据库查询今日免费次数
  return true; // 临时放行
}

// 记录咨询
async function recordConsultation(userId: string, question: string, answer: string) {
  // TODO: 写入数据库
  console.log(`[记录] 用户${userId}咨询已记录`);
}

// 判断是否需要生成PDF
function shouldGeneratePDF(question: string, answer: string): boolean {
  // 简单判断：回复长度超过一定阈值或包含关键词
  return answer.length > 200 || answer.includes('详细分析') || answer.includes('研报');
}

// 生成PDF并推送到微信
async function generateAndPushPDF(userId: string, question: string, answer: string) {
  try {
    // TODO: 生成PDF文件
    // TODO: 上传到云存储
    // TODO: 发送微信模板消息推送
    console.log(`[PDF推送] 用户${userId}的研报已生成并推送`);
  } catch (error) {
    console.error('[PDF推送] 失败:', error);
  }
}
