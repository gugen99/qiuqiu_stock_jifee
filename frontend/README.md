# 股票咨询前台系统

## 部署到阿里云

### 1. 环境变量
```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-domain.com"

# 微信支付
WECHAT_APPID="wx..."
WECHAT_MCHID="..."
WECHAT_API_KEY="..."
WECHAT_NOTIFY_URL="https://your-domain.com/api/pay/notify"

# 本地机器人通信
LOCAL_BOT_URL="http://your-local-server:3001"
BOT_API_TOKEN="your-secure-token"
```

### 2. 构建部署
```bash
npm install
npm run build
# 上传到阿里云服务器
```

## 功能
- 微信 OAuth 登录
- 微信支付（JSAPI）
- 订阅套餐管理
- 与本地 Bot 通信
- PDF 推送（高级订阅）
