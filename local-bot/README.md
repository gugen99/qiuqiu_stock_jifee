# 本地股票分析机器人

## 功能
- 接收来自阿里云前台的咨询请求
- 股票数据分析和回复生成
- 与 OpenClaw 集成，提供智能客服

## 运行
```bash
cd local-bot
npm install
npm run dev
```

## API
- `POST /api/chat` - 接收咨询消息
- `WebSocket /ws` - 实时通信
