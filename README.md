# 📰 每日新闻聚合

根据您的关注主题，每日自动抓取最新资讯，早上8点准时推送到钉钉。

## 🎯 关注主题

| 主题 | 图标 | 说明 |
|------|------|------|
| 人工智能 | 🤖 | AI技术、大模型、教育科技 |
| 中东局势 | 🌍 | 国际新闻、地缘政治 |
| 教育政策 | 📋 | 国家政策、教育改革、新课标 |
| 阅读行业 | 📚 | 儿童阅读、童书出版、行业动态 |

## ⏰ 时间安排

- **06:30** - 开始抓取新闻
- **07:00** - 生成网页
- **07:15** - 部署完成
- **08:00** - 钉钉推送

## 🌐 访问地址

**网站**: https://shodaiho.github.io/daily-news-aggregator/

## 📁 项目结构

```
.
├── .github/workflows/
│   └── daily-update.yml    # GitHub Actions定时任务
├── config/
│   └── topics.json         # 主题配置
├── src/
│   ├── fetch-news.js       # 新闻抓取
│   ├── generate-html.js    # 生成网页
│   └── notify-dingtalk.js  # 钉钉推送
├── docs/                   # 生成的静态网站
│   └── index.html
├── package.json
└── README.md
```

## 🚀 技术栈

- **GitHub Actions** - 定时任务
- **GitHub Pages** - 静态网站托管
- **钉钉机器人** - 消息推送
- **Node.js** - 脚本处理

## ⚙️ 配置说明

### 添加/修改主题

编辑 `config/topics.json`：

```json
{
  "topics": [
    {
      "id": "topic-id",
      "name": "主题名称",
      "icon": "📌",
      "keywords": ["关键词1", "关键词2"],
      "sources": ["来源1", "来源2"],
      "color": "#3b82f6"
    }
  ]
}
```

### 钉钉配置

在 GitHub Repository Settings → Secrets 中设置：

- `DINGTALK_WEBHOOK` - 钉钉机器人Webhook地址
- `DINGTALK_SECRET` - 钉钉机器人密钥

## 📄 License

MIT
