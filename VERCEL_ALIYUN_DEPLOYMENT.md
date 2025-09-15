# Vercel部署与阿里云域名配置完整指南

## 📋 前置准备

### 必需账号
- [ ] GitHub账号（用于代码托管）
- [ ] Vercel账号（用于网站部署）
- [ ] 阿里云账号（已购买域名）

### 本地环境
- [ ] Git已安装
- [ ] Node.js已安装（可选，用于本地测试）

## 🚀 第一步：准备代码仓库

### 1.1 创建GitHub仓库

1. 登录GitHub（https://github.com）
2. 点击右上角的 "+" → "New repository"
3. 设置仓库信息：
   - Repository name: `company-website`
   - Description: 公司官网
   - 选择 Public 或 Private
   - 不要初始化README（因为本地已有代码）
4. 点击 "Create repository"

### 1.2 推送本地代码到GitHub

```bash
# 在项目根目录执行
cd /Users/yingapple/Documents/yx_self/company-website

# 初始化Git仓库（如果还没有初始化）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/company-website.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

## 📦 第二步：部署到Vercel

### 2.1 注册/登录Vercel

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Log In"
3. 推荐使用GitHub账号登录（方便后续导入项目）

### 2.2 导入GitHub项目

1. 登录后，点击 "Add New..." → "Project"
2. 在 "Import Git Repository" 页面：
   - 如果是首次使用，需要安装Vercel GitHub App
   - 授权Vercel访问你的GitHub仓库
3. 找到 `company-website` 仓库，点击 "Import"

### 2.3 配置部署设置

在项目配置页面：

1. **Project Name**（项目名称）
   - 默认使用仓库名，可以修改
   - 这将影响默认域名：`项目名.vercel.app`

2. **Framework Preset**（框架预设）
   - 选择 "Other"（因为这是纯静态网站）

3. **Root Directory**（根目录）
   - 保持默认（./）

4. **Build and Output Settings**（构建设置）
   - Build Command: 留空（无需构建）
   - Output Directory: 留空（使用根目录）
   - Install Command: 留空

5. **Environment Variables**（环境变量）
   - 目前不需要设置

6. 点击 "Deploy" 开始部署

### 2.4 等待部署完成

- 部署通常需要1-2分钟
- 完成后会显示 "Congratulations!"
- 你会得到一个默认域名，如：`https://company-website.vercel.app`
- 点击域名即可访问你的网站

## 🌐 第三步：配置阿里云域名

### 3.1 登录阿里云控制台

1. 访问 https://www.aliyun.com
2. 登录你的阿里云账号
3. 进入 "控制台" → "域名"

### 3.2 进入域名解析设置

1. 在域名列表中找到你的域名（例如：elephantfly.tech）
2. 点击 "解析" 或 "解析设置"

### 3.3 添加DNS解析记录

需要添加以下解析记录：

#### 记录1：主域名（elephantfly.tech）
```
记录类型：A
主机记录：@
记录值：76.76.21.21
TTL：10分钟
```

#### 记录2：www子域名
```
记录类型：CNAME
主机记录：www
记录值：cname.vercel-dns.com
TTL：10分钟
```

#### 记录3：通配符子域名（可选）
```
记录类型：CNAME
主机记录：*
记录值：cname.vercel-dns.com
TTL：10分钟
```

### 3.4 保存DNS设置

1. 点击每条记录的 "确认" 或 "添加"
2. 等待DNS生效（通常5-10分钟，最长可能48小时）

## 🔗 第四步：在Vercel中添加自定义域名

### 4.1 进入项目设置

1. 在Vercel Dashboard中找到你的项目
2. 点击项目进入详情页
3. 点击顶部的 "Settings" 标签

### 4.2 添加域名

1. 在左侧菜单选择 "Domains"
2. 在输入框中输入你的域名：
   - 输入 `elephantfly.tech`
   - 点击 "Add"
3. 再次添加www版本：
   - 输入 `www.elephantfly.tech`
   - 点击 "Add"

### 4.3 验证域名配置

1. Vercel会自动检查DNS配置
2. 如果配置正确，会显示绿色勾号 ✓
3. 如果显示错误，检查阿里云的DNS设置

### 4.4 设置主域名

1. 在域名列表中，选择一个作为主域名
2. 点击域名旁边的三个点 "..."
3. 选择 "Set as Primary"
4. 其他域名会自动重定向到主域名

## ✅ 第五步：验证部署

### 5.1 测试访问

1. 打开浏览器，访问：
   - https://elephantfly.tech
   - https://www.elephantfly.tech
   - 两个地址都应该能正常访问

### 5.2 检查HTTPS证书

1. Vercel会自动配置SSL证书
2. 点击浏览器地址栏的锁图标
3. 确认显示 "连接是安全的"

### 5.3 测试功能

- [ ] 首页加载正常
- [ ] 导航菜单工作
- [ ] 应用展示正常
- [ ] 隐私政策页面可访问
- [ ] 响应式布局正常

## 🔄 第六步：后续更新

### 6.1 自动部署设置

Vercel默认已启用自动部署：
- 每次推送到main分支都会自动部署
- Pull Request会创建预览部署

### 6.2 更新网站内容

```bash
# 修改文件后
git add .
git commit -m "更新内容描述"
git push

# Vercel会自动检测并部署更新
```

### 6.3 查看部署历史

1. 在Vercel项目页面
2. 点击 "View Function Logs" 或 "Deployments"
3. 可以查看所有部署记录
4. 可以回滚到之前的版本

## 🛠 常见问题解决

### Q1：域名解析不生效

**症状**：访问域名显示无法访问

**解决方案**：
1. 检查DNS记录是否正确
2. 使用 `nslookup elephantfly.tech` 命令检查解析
3. 清除浏览器DNS缓存
4. 等待更长时间（最长48小时）

### Q2：显示Vercel 404错误

**症状**：域名能访问但显示404

**解决方案**：
1. 检查项目是否部署成功
2. 确认index.html在根目录
3. 检查vercel.json配置

### Q3：HTTPS证书错误

**症状**：浏览器提示不安全

**解决方案**：
1. 等待Vercel自动配置证书（通常几分钟）
2. 在Vercel Domains设置中点击 "Refresh"
3. 确保DNS记录正确

### Q4：部署失败 - "No Output Directory named 'public' found"

**症状**：Vercel显示找不到public目录错误

**解决方案**：
确保vercel.json包含以下配置：
```json
{
  "version": 2,
  "outputDirectory": ".",
  ...
}
```
这告诉Vercel输出目录是项目根目录，而不是默认的public目录。

### Q5：其他部署错误

**症状**：Vercel显示其他部署错误

**解决方案**：
1. 查看部署日志
2. 检查是否有语法错误
3. 确认文件路径正确
4. 检查vercel.json格式

## 📊 性能优化建议

### 1. 启用Vercel Edge Network
- 自动启用，无需配置
- 全球CDN加速

### 2. 图片优化
```bash
# 压缩图片（使用imagemin等工具）
# 建议：
# - Hero图片 < 500KB
# - App图标 < 100KB
# - 使用WebP格式
```

### 3. 缓存配置
已在vercel.json中配置：
- 静态资源缓存1年
- HTML文件不缓存

### 4. 监控性能
1. 使用Vercel Analytics（需要Pro计划）
2. 使用Google Analytics（免费）
3. 定期用Lighthouse测试

## 🔐 安全建议

### 1. 启用双因素认证
- GitHub账号启用2FA
- Vercel账号启用2FA
- 阿里云账号启用2FA

### 2. 定期备份
```bash
# 定期备份代码
git pull
zip -r backup-$(date +%Y%m%d).zip . -x "*.git*"
```

### 3. 监控异常
- 设置Vercel通知
- 定期检查访问日志

## 📞 获取帮助

### Vercel支持
- 文档：https://vercel.com/docs
- 社区：https://github.com/vercel/vercel/discussions
- 状态：https://www.vercel-status.com

### 阿里云支持
- 域名帮助：https://help.aliyun.com/product/35473.html
- 工单系统：控制台内提交
- 电话：95187

### 项目维护
- 技术问题：dev@elephantfly.tech
- 紧急联系：hello@elephantfly.tech

## 📝 部署检查清单

部署前：
- [ ] 代码已提交到GitHub
- [ ] 本地测试通过
- [ ] 图片已优化
- [ ] 配置文件检查

部署中：
- [ ] Vercel项目创建成功
- [ ] 部署状态为Success
- [ ] 默认域名可访问

部署后：
- [ ] DNS记录已添加
- [ ] 自定义域名已验证
- [ ] HTTPS正常工作
- [ ] 所有页面可访问
- [ ] 移动端显示正常

---

**文档版本**：1.0.0  
**最后更新**：2024年12月  
**作者**：ElephantFly Tech Team
