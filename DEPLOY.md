# 🦞 股票咨询收费平台 - 部署指南

## 项目结构

```
stock-advisor-platform/
├── frontend/          # 阿里云前台（收费、计费、微信集成）
├── local-bot/         # 本地股票分析机器人
├── docker-compose.yml # 本地开发一键启动
└── ARCHITECTURE.md    # 架构说明
```

## 🚀 快速启动（本地开发）

### 1. 安装依赖

```bash
cd ~/Projects/stock-advisor-platform

# 前台
cd frontend && npm install && cd ..

# 本地机器人
cd local-bot && npm install && cd ..
```

### 2. 配置环境变量

```bash
# 复制配置模板
cp frontend/.env.example frontend/.env.local

# 编辑 .env.local 填入你的配置
vim frontend/.env.local
```

### 3. 启动数据库和机器人

```bash
# 使用 Docker 一键启动
docker-compose up -d postgres local-bot

# 或者手动启动 PostgreSQL
# 然后初始化数据库
cd frontend && npx prisma migrate dev --name init
```

### 4. 启动前台服务

```bash
cd frontend && npm run dev
```

访问 http://localhost:3000

---

## 🌐 生产部署

### 阿里云前台部署

1. **购买阿里云服务器**（推荐 ECS 2核4G）

2. **部署步骤：**

```bash
# SSH 登录阿里云服务器
ssh root@your-aliyun-ip

# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 克隆项目
git clone https://github.com/your-repo/stock-advisor-platform.git
cd stock-advisor-platform/frontend

# 安装依赖并构建
npm install
npm run build

# 配置环境变量
vim .env.local
# 填入：DATABASE_URL, 微信相关配置, BOT_API_TOKEN 等

# 初始化数据库
npx prisma migrate deploy

# 使用 PM2 启动
npm install -g pm2
pm2 start npm --name "stock-frontend" -- start
pm2 startup
pm2 save
```

3. **配置 Nginx：**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 本地机器人部署

```bash
# 在你本地的服务器/Mac上
cd ~/Projects/stock-advisor-platform/local-bot

# 安装依赖
npm install

# 配置环境变量
vim .env
# BOT_API_TOKEN=your-secure-token
# PORT=3001

# 使用 PM2 后台运行
pm2 start npm --name "stock-bot" -- start
pm2 startup
pm2 save

# 配置内网穿透（ngrok/frp）让阿里云能访问本地机器人
# 或使用 FRP 自建内网穿透
```

---

## 🔧 微信配置

### 1. 微信公众号/小程序

- 登录微信公众平台 https://mp.weixin.qq.com
- 获取 **AppID** 和 **AppSecret**
- 配置网页授权域名

### 2. 微信支付

- 登录微信支付商户平台 https://pay.weixin.qq.com
- 获取 **商户号(mch_id)** 和 **API密钥**
- 配置支付回调 URL

---

## 📋 功能清单

| 功能 | 状态 | 说明 |
|------|------|------|
| 微信登录 | ✅ | OAuth2 授权登录 |
| 微信支付 | ✅ | JSAPI 支付 |
| 免费额度 | ✅ | 每日3次免费咨询 |
| 订阅套餐 | ✅ | 基础版/高级版 |
| 本地Bot通信 | ✅ | WebSocket + HTTP |
| PDF推送 | 🔄 | 高级订阅功能 |
| 微信消息模板 | 🔄 | 待接入 |

---

## 🔐 安全建议

1. **使用 HTTPS**（必须用于微信支付）
2. **配置防火墙**：只开放必要端口
3. **定期备份数据库**
4. **使用强密码**：BOT_API_TOKEN 必须复杂
5. **环境变量不要提交到 Git**

---

## 🐛 常见问题

**Q: 本地机器人如何让阿里云访问？**
A: 使用 FRP 内网穿透或 ngrok，将本地 3001 端口暴露到公网。

**Q: 微信支付报错？**
A: 检查：1) 公众号已认证 2) 商户号已绑定 3) 域名配置正确 4) 使用 HTTPS

**Q: 如何测试？**
A: 关注微信"公众平台测试号"，使用测试号进行开发调试。

---

有问题随时问我！🦞
