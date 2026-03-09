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

// 主函数 - 简洁版，只发送链接
async function main() {
  const today = new Date().toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  
  const siteUrl = 'https://shodaiho.github.io/daily-news-aggregator/';
  
  // 简洁版消息 - 只包含链接和基本说明
  const message = {
    msgtype: 'markdown',
    markdown: {
      title: '每日资讯聚合',
      text: `## 📰 ${today} 资讯聚合

**🔗 [点击查看今日新闻](${siteUrl})**

---

📌 **今日主题**
- 🤖 人工智能
- 🌍 中东局势  
- 📋 教育政策
- 📚 阅读行业

---

⏰ 每天早上8点自动更新`
    }
  };
  
  await sendDingTalk(message);
  console.log(`\n✅ 已推送: ${today}`);
  console.log(`🔗 网页地址: ${siteUrl}`);
}

main().catch(console.error);
