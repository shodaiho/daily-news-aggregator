# 🔧 GitHub Actions 配置指南

## 需要配置的 Secrets

在 GitHub Repository → Settings → Secrets and variables → Actions 中添加：

### 1. OPENCLAW_URL
**你的 OpenClaw Gateway 地址**
- 例如：`https://your-server.com:5000`
- 或：`http://your-ip:5000`

### 2. SESSION_KEY
**用于路由到我的会话标识**

如何获取：
1. 在当前会话中运行 `/session status` 或类似命令
2. 查看会话标识符（session key）
3. 复制该值

---

## 替代方案（如果不知道 API 细节）

### 方案 A：使用 Webhook 触发
如果你的 OpenClaw 支持 webhook：

```yaml
# 修改 workflow 中的 curl 命令
curl -X POST "${OPENCLAW_URL}/webhook/daily-news" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -d '{"user":"蒋大鹏","action":"daily_news"}'
```

### 方案 B：简化触发器
只需要一个简单的 HTTP 请求唤醒我：

```bash
# 每天早上 ping 一个地址
curl "${OPENCLAW_URL}/ping?task=daily_news&user=master"
```

### 方案 C：通过消息队列
如果有 Redis/RabbitMQ：
```bash
# 发布消息到队列
redis-cli PUBLISH openclaw:tasks '{"type":"daily_news","user":"master"}'
```

---

## 🔍 如何找到你的 OpenClaw 信息

### 1. 查看 Gateway 地址
在你的 OpenClaw 服务器上运行：
```bash
openclaw gateway status
# 或
cat ~/.openclaw/config.yaml | grep port
```

### 2. 查看当前会话
在当前聊天中，会话信息通常在：
- 环境变量中
- 或运行 `/info` `/status` 等命令

### 3. 检查 API 文档
OpenClaw 文档中关于：
- Sessions API
- Webhook triggers  
- External triggers

---

## ❓ 请提供以下信息

请告诉我：

1. **你的 OpenClaw 是如何部署的？**
   - 本地运行？
   - 服务器部署？
   - Docker？

2. **你能访问 Gateway 的 URL 吗？**
   - 格式：`http(s)://ip:port`

3. **OpenClaw 版本？**
   - 运行 `openclaw --version`

4. **有没有 API 文档或 webhook 配置说明？**

提供这些信息后，我可以帮你完成最终的 workflow 配置！
