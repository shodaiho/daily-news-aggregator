const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

// 从环境变量读取配置
const WEBHOOK = process.env.DINGTALK_WEBHOOK;
const SECRET = process.env.DINGTALK_SECRET;

// 生成钉钉签名
function generateSign(timestamp) {
  const stringToSign = `${timestamp}\n${SECRET}`;
  const sign = crypto
    .createHmac('sha256', SECRET)
    .update(stringToSign)
    .digest('base64');
  return encodeURIComponent(sign);
}

// 发送钉钉消息
async function sendDingTalk(message) {
  const timestamp = Date.now();
  const sign = generateSign(timestamp);
  const url = `${WEBHOOK}&timestamp=${timestamp}&sign=${sign}`;
  
  const data = JSON.stringify(message);
  
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let response = '';
      res.on('data', (chunk) => response += chunk);
      res.on('end', () => {
        console.log('✅ 钉钉推送成功:', response);
        resolve(response);
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ 钉钉推送失败:', error.message);
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
}

// 主函数
async function main() {
  const config = JSON.parse(fs.readFileSync('./config/topics.json', 'utf-8'));
  const today = new Date().toLocaleDateString('zh-CN');
  const siteUrl = 'https://shodaiho.github.io/daily-news-aggregator/';
  
  const message = {
    msgtype: 'markdown',
    markdown: {
      title: '每日资讯聚合',
      text: `## 📰 每日资讯聚合 [${today}]

### 📌 今日主题
${config.topics.map(t => `- ${t.icon} **${t.name}**`).join('\n')}

---

### 🔗 点击查看详情
[${siteUrl}](${siteUrl})

---

⏰ 每天早上8点自动推送
🤖 由 OpenClaw 自动生成`
    }
  };
  
  await sendDingTalk(message);
}

main().catch(console.error);
