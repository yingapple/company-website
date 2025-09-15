# 快速部署指南 - 5分钟上线

## 🎯 极速部署步骤

### 1️⃣ 推送代码到GitHub（2分钟）
```bash
# 在项目目录执行
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/company-website.git
git push -u origin main
```

### 2️⃣ 部署到Vercel（2分钟）
1. 访问 [vercel.com](https://vercel.com) → 用GitHub登录
2. 点击 "Add New Project" → 选择你的仓库
3. 直接点击 "Deploy"（使用默认设置）
4. 等待部署完成，获得域名：`xxx.vercel.app`

### 3️⃣ 配置阿里云域名（1分钟）

登录[阿里云控制台](https://dc.console.aliyun.com) → 域名 → 解析设置

添加两条记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | @ | 76.76.21.21 | 10分钟 |
| CNAME | www | cname.vercel-dns.com | 10分钟 |

### 4️⃣ Vercel绑定域名（30秒）
1. Vercel项目 → Settings → Domains
2. 输入你的域名（如：elephantfly.tech）→ Add
3. 再输入www版本（www.elephantfly.tech）→ Add

### ✅ 完成！
等待5-10分钟DNS生效，即可通过你的域名访问网站。

---

## 🔧 一键部署脚本

创建文件 `deploy.sh`：

```bash
#!/bin/bash

# 配置变量
GITHUB_USERNAME="YOUR_USERNAME"
DOMAIN="elephantfly.tech"

echo "🚀 开始快速部署..."

# 1. Git初始化和推送
echo "📦 Step 1: 推送到GitHub..."
git init
git add .
git commit -m "Deploy to Vercel"
git branch -M main
git remote add origin https://github.com/$GITHUB_USERNAME/company-website.git || true
git push -u origin main --force

# 2. 安装Vercel CLI（如果没有）
if ! command -v vercel &> /dev/null; then
    echo "📥 安装Vercel CLI..."
    npm i -g vercel
fi

# 3. 部署到Vercel
echo "🎯 Step 2: 部署到Vercel..."
vercel --prod --yes

# 4. 添加域名
echo "🌐 Step 3: 配置域名..."
vercel domains add $DOMAIN
vercel domains add www.$DOMAIN

echo "✅ 部署完成！"
echo "⏰ 请在阿里云添加DNS记录："
echo "   A记录: @ → 76.76.21.21"
echo "   CNAME: www → cname.vercel-dns.com"
echo "🔗 访问: https://$DOMAIN"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 📱 部署后验证清单

```bash
# 快速检查命令
curl -I https://你的域名.com
curl -I https://www.你的域名.com

# 应该看到 HTTP/2 200 状态码
```

- [ ] 主域名可访问
- [ ] www域名可访问
- [ ] HTTPS锁标志显示
- [ ] 首页正常加载
- [ ] 手机端正常显示

## 🆘 遇到问题？

### 最常见的4个问题：

1. **域名无法访问** → 等待10分钟DNS生效
2. **显示404** → 检查index.html是否在根目录
3. **部署失败：找不到public目录** → vercel.json需要添加 `"outputDirectory": "."`
4. **其他部署失败** → 查看Vercel部署日志

### 快速调试命令：
```bash
# 检查DNS解析
nslookup 你的域名.com

# 检查文件结构
ls -la

# 验证Git状态
git status
```

---

💡 **提示**：首次部署通常10分钟内完成。如果超过30分钟仍有问题，请检查DNS设置。

📧 需要帮助？联系 dev@elephantfly.tech
