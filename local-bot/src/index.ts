import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(cors());
app.use(express.json());

// 阿里云前台认证中间件
const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers['x-bot-token'];
  if (token !== process.env.BOT_API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// HTTP API - 接收前台咨询请求
app.post('/api/chat', verifyToken, async (req, res) => {
  const { userId, message, tier } = req.body;
  
  console.log(`[咨询] 用户:${userId} 等级:${tier} 消息:${message}`);
  
  // 调用 OpenClaw/龙虾机器人进行分析
  const response = await generateStockAdvice(message, tier);
  
  res.json({ 
    success: true, 
    reply: response,
    timestamp: new Date().toISOString()
  });
});

// 生成股票建议 (集成 OpenClaw)
async function generateStockAdvice(message: string, tier: string): Promise<string> {
  // TODO: 调用 OpenClaw Agent 进行股票分析
  // 这里先用模拟回复
  const isPremium = tier === 'premium';
  
  const baseReply = `收到您的咨询："${message}"\n\n`;
  
  if (isPremium) {
    return baseReply + 
      "【高级分析】\n" +
      "基于当前市场数据和技术指标分析：\n" +
      "1. 趋势判断：震荡上行\n" +
      "2. 支撑位：XXXX\n" +
      "3. 压力位：XXXX\n" +
      "详细研报已生成PDF，请查收微信推送。";
  }
  
  return baseReply + 
    "【基础分析】\n" +
    "简要建议：建议关注该板块近期走势，注意风险控制。\n" +
    "升级高级订阅可获取详细技术分析报告。";
}

// WebSocket - 实时通信
wss.on('connection', (ws, req) => {
  console.log('[WS] 前台服务器已连接');
  
  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      
      if (msg.type === 'chat') {
        const reply = await generateStockAdvice(msg.message, msg.tier);
        ws.send(JSON.stringify({
          type: 'reply',
          id: msg.id,
          content: reply,
          timestamp: new Date().toISOString()
        }));
      }
    } catch (err) {
      console.error('[WS] 处理消息失败:', err);
    }
  });
  
  ws.on('close', () => {
    console.log('[WS] 前台服务器断开');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🤖 股票分析机器人运行在端口 ${PORT}`);
  console.log(`   HTTP API: http://localhost:${PORT}/api/chat`);
  console.log(`   WebSocket: ws://localhost:${PORT}/ws`);
});
