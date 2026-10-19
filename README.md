# Yitao Wang — AI 产品经理个人作品集

一个纯静态的个人作品集网站，展示 AI 产品经理「艺韬」的个人介绍、精选项目、文章与工具。无需后端，所有内容通过一个 `config.js` 配置即可替换，适合快速迭代成自己的主页。

> 🔗 在线访问：<https://a417151573.github.io/yitao-portfolio/>

## 特性

- **零依赖纯静态**：HTML + CSS + 原生 JS，无框架、无构建步骤，打开即用
- **内容与页面分离**：文字、图片、链接、简历全部集中在 `config.js`，改一个文件即可换内容
- **响应式适配**：桌面 / 手机双端首屏图，导航与布局自动适配
- **动效与交互**：项目卡片悬停展开、Logo 跑马灯、滚动进场动画
- **一键部署**：GitHub Actions 自动发布到 GitHub Pages，推送即上线

## 目录结构

```
vscode/
├── README.md
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
└── website/
    └── pamidor-home/              # 网站根目录
        ├── index.html             # 页面结构
        ├── styles.css             # 样式
        ├── config.js              # ★ 所有可替换内容都在这
        ├── app.js                 # 渲染与交互逻辑
        ├── README.md              # 站内说明（旧版）
        └── assets/
            ├── images/            # 图片素材
            ├── videos/            # 视频素材
            └── logos/             # Logo 素材
```

## 本地预览

```bash
cd website/pamidor-home
python3 -m http.server 8000
```

然后打开 <http://localhost:8000> 即可。

## 自定义内容

打开 `website/pamidor-home/config.js`，所有内容都在 `window.SITE` 对象里：

| 字段 | 说明 |
| --- | --- |
| `brand` / `name` / `tagline` / `tags` | 品牌名、姓名、标语、标签 |
| `intro` | 「About」区块的个人介绍 |
| `heroImage` / `heroMobileImage` | 首屏电脑 / 手机背景图 |
| `aboutImage` / `aboutVideo` | 介绍配图与视频 |
| `logos` | 「CONTACT ME」跑马灯 Logo（可留空链接） |
| `projects` | 精选项目列表（名称、介绍、时间、图片、链接） |
| `art` | 精选文章卡片（图片 + 文字） |
| `skills` | 工具区（名称、描述、悬停图、链接） |
| `resume` | 简历标题、个人字段、工作履历（可增删条目） |
| `links` | Studio / Art Lab / 商店 / 联系 / 隐私 / 条款 / 社交链接 |
| `footerLine` / `footerEmail` | 页脚文案与邮箱 |

**图片 / 视频**：把文件放入 `assets/` 对应目录，在 `config.js` 里填相对路径即可（例如 `assets/images/my-photo.jpg`）。

**链接**：留空 `''` 会提示「此入口暂未接入」；填入相对路径（如 `./work/project.html`）或完整 URL（如 `https://example.com`）即可跳转。

## 部署到 GitHub Pages

仓库已配置好自动部署，推送到 `main` 分支即可自动发布。也可以手动在 **Settings → Pages** 里确认 Build and deployment 选的是 **GitHub Actions**。

如需部署到自己的域名，在 **Settings → Pages → Custom domain** 填入域名，并到域名服务商处添加对应的 CNAME / A 记录即可。

---

> 站内文字与素材如涉及版权，请替换为你有使用权限的内容后再对外发布。
