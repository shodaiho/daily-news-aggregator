const fs = require('fs');
const path = require('path');

// 读取配置和数据
const config = JSON.parse(fs.readFileSync('./config/topics.json', 'utf-8'));

function generateHTML() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  
  // 模拟新闻数据（实际应从temp/news-data.json读取）
  const newsData = config.topics.map(topic => ({
    ...topic,
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `${topic.id}-${i}`,
      title: `${topic.name} 今日热点 ${i + 1}`,
      summary: `这是关于${topic.name}的最新动态摘要，点击查看详情...`,
      source: topic.sources[i % topic.sources.length],
      time: '2小时前'
    }))
  }));
  
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.settings.siteName} - ${dateStr}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            padding: 40px 20px;
            color: white;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .header .date {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .topics-grid {
            display: grid;
            gap: 20px;
        }
        
        .topic-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .topic-header {
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .topic-icon {
            font-size: 2rem;
        }
        
        .topic-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
        }
        
        .news-list {
            padding: 0 20px 20px;
        }
        
        .news-item {
            padding: 16px;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.3s;
        }
        
        .news-item:last-child {
            border-bottom: none;
        }
        
        .news-item:hover {
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .news-title {
            font-size: 1rem;
            font-weight: 500;
            color: #333;
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .news-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: #999;
        }
        
        .footer {
            text-align: center;
            padding: 40px 20px;
            color: white;
            opacity: 0.8;
        }
        
        .update-time {
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${config.settings.siteName}</h1>
            <p class="date">${dateStr}</p>
        </header>
        
        <div class="topics-grid">
            ${newsData.map(topic => `
            <div class="topic-card">
                <div class="topic-header" style="background: ${topic.color}15; border-left: 4px solid ${topic.color}">
                    <span class="topic-icon">${topic.icon}</span>
                    <h2 class="topic-title">${topic.name}</h2>
                </div>
                <div class="news-list">
                    ${topic.items.map(item => `
                    <div class="news-item">
                        <h3 class="news-title">${item.title}</h3>
                        <div class="news-meta">
                            <span>${item.source}</span>
                            <span>${item.time}</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `).join('')}
        </div>
        
        <footer class="footer">
            <p>${config.settings.siteDescription}</p>
            <div class="update-time">⏰ 每日早上8点更新</div>
        </footer>
    </div>
</body>
</html>`;
  
  // 保存HTML
  fs.writeFileSync('./docs/index.html', html);
  console.log('✅ HTML已生成: docs/index.html');
}

generateHTML();
