# 股票咨询平台 - SuperDesign 设计系统

## 布局线框图

### 首页 (Landing Page)
```
┌─────────────────────────────────────────────────────────┐
│  LOGO        首页  功能  价格  关于        登录  注册    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│           AI驱动的股票分析平台                         │
│    专业的投资建议，助您在股市中把握机会                │
│                                                         │
│         [免费开始]        [查看功能 →]                 │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ 实时分析 │  │ 专家咨询 │  │ 智能预警 │            │
│  │   🎯     │  │   💬     │  │   🔔     │            │
│  └──────────┘  └──────────┘  └──────────┘            │
├─────────────────────────────────────────────────────────┤
│  免费 │ 基础版 │ 高级版                                  │
│   ¥0   │  ¥29   │  ¥99                                   │
├─────────────────────────────────────────────────────────┤
│                    页脚                                │
└─────────────────────────────────────────────────────────┘
```

### 用户控制台 (Dashboard)
```
┌─────────────────────────────────────────────────────────┐
│  📊 股票咨询平台                    用户 │ 退出         │
├──────────┬──────────────────────────────────────────────┤
│          │  欢迎回来，张三                              │
│  控制台  │  ┌────────┐ ┌────────┐ ┌────────┐          │
│  咨询    │  │咨询次数│ │剩余额度│ │当前套餐│          │
│  订阅    │  │   15   │ │  无限  │ │ 基础版 │          │
│  设置    │  └────────┘ └────────┘ └────────┘          │
│          │                                              │
│          │  [开始新咨询]      [升级套餐]                │
│          │                                              │
│          │  最近咨询记录                                │
│          │  ┌────────────────────────────────────────┐ │
│          │  │ 2024-01-15  贵州茅台走势分析    查看  │ │
│          │  │ 2024-01-14  科技股投资建议      查看  │ │
│          │  └────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────┘
```

### 咨询页面 (Chat)
```
┌─────────────────────────────────────────────────────────┐
│  ← 返回      股票AI助手              在线               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🤖 您好！我是您的股票分析助手...                      │
│                                                         │
│                       帮我分析一下贵州茅台的后市      👤 │
│                                                         │
│  🤖 根据最新数据，贵州茅台...                          │
│      • 当前趋势: 震荡上行                               │
│      • 支撑位: 1680元                                  │
│      • 压力位: 1850元                                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [输入您的问题...                    ] [发送]           │
└─────────────────────────────────────────────────────────┘
```

## 2. 主题设计 (Theme)

### 颜色系统 - 金融专业蓝
```css
:root {
  /* 主色调 - 专业金融蓝 */
  --primary: oklch(55% 0.2 250);
  --primary-foreground: oklch(100% 0 0);
  
  /* 背景 */
  --background: oklch(100% 0 0);
  --foreground: oklch(20% 0 0);
  
  /* 卡片/表面 */
  --card: oklch(100% 0 0);
  --card-foreground: oklch(20% 0 0);
  
  /* 次要色 */
  --secondary: oklch(96% 0.01 250);
  --secondary-foreground: oklch(20% 0 0);
  
  /* 强调色 - 增长绿 */
  --accent: oklch(65% 0.25 145);
  --accent-foreground: oklch(100% 0 0);
  
  /* 警示色 - 警告橙 */
  --warning: oklch(70% 0.18 65);
  --warning-foreground: oklch(20% 0 0);
  
  /* 危险色 - 下跌红 */
  --destructive: oklch(55% 0.22 25);
  --destructive-foreground: oklch(100% 0 0);
  
  /* 中性色 */
  --muted: oklch(96% 0 0);
  --muted-foreground: oklch(50% 0 0);
  --border: oklch(90% 0 0);
  
  /* 圆角 */
  --radius: 0.75rem;
  
  /* 字体 */
  --font-sans: 'Inter', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
}

/* 深色模式 */
.dark {
  --background: oklch(15% 0.02 250);
  --foreground: oklch(95% 0 0);
  --card: oklch(20% 0.02 250);
  --card-foreground: oklch(95% 0 0);
  --muted: oklch(25% 0.02 250);
  --muted-foreground: oklch(60% 0 0);
  --border: oklch(30% 0.02 250);
}
```

### 字体系统
```
标题: Inter Bold 700
   H1: 2.5rem (40px)  lh: 1.2
   H2: 2rem (32px)    lh: 1.3
   H3: 1.5rem (24px)  lh: 1.4

正文: Inter Regular 400
   Body: 1rem (16px)  lh: 1.6
   Small: 0.875rem    lh: 1.5

标签: Inter Medium 500
   Label: 0.75rem     lh: 1.4
```

### 间距系统
```
4px  (0.25rem)  - xs
8px  (0.5rem)   - sm
16px (1rem)     - base
24px (1.5rem)   - lg
32px (2rem)     - xl
48px (3rem)     - 2xl
64px (4rem)     - 3xl
```

## 3. 动画设计 (Animation)

```
/* 页面进入 */
fadeInUp: 500ms cubic-bezier(0.16, 1, 0.3, 1)
  [Y: 30px → 0, opacity: 0 → 1]

/* 卡片悬停 */
cardHover: 200ms ease-out
  [Y: 0 → -4px, shadow: sm → lg]

/* 按钮点击 */
buttonPress: 150ms ease-out
  [scale: 1 → 0.97 → 1]

/* 消息气泡 */
messageSlide: 300ms ease-out
  [X: -20px → 0, opacity: 0 → 1]

/* 加载动画 */
loadingPulse: 1500ms ease-in-out infinite
  [opacity: 0.5 ↔ 1]

/* 成功反馈 */
successBounce: 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)
  [scale: 0 → 1.1 → 1]
```

## 4. 组件设计

### 按钮
```
Primary:   bg-primary text-white hover:brightness-110
Secondary: bg-secondary text-foreground border
Ghost:     transparent hover:bg-muted

Size:
  sm: px-3 py-1.5 text-sm
  md: px-4 py-2 text-base
  lg: px-6 py-3 text-lg
```

### 卡片
```
Card:
  bg-card
  rounded-xl (0.75rem)
  shadow-sm
  hover:shadow-md hover:-translate-y-1
  transition: 200ms ease-out
  border: 1px solid border
```

### 输入框
```
Input:
  bg-background
  border: 1px solid border
  rounded-lg
  px-4 py-2
  focus:ring-2 focus:ring-primary/20 focus:border-primary
  transition: 150ms
```

### 标签
```
Badge:
  free:     bg-gray-100 text-gray-700
  basic:    bg-blue-100 text-blue-700
  premium:  bg-purple-100 text-purple-700
  success:  bg-green-100 text-green-700
  warning:  bg-orange-100 text-orange-700
```
