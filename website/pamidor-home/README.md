# 首页复刻使用说明

这是根据 Pamidor Studio 首页制作的本地参考稿，仅用于对照和后续替换。首页不包含联系表单，也未制作二级页面；原表单区域改为简历展示区。

## 本地预览

在本目录运行 `python3 -m http.server 8000`，然后打开 http://localhost:8000 。

## 替换内容和接入链接

打开 `config.js`：
- `brand`、`name`、`tagline`、`tags`、`intro`、`skills` 和 `footerLine` 可直接替换文字。
- `heroImage`（电脑首屏）、`heroMobileImage`（手机首屏）、`aboutImage`、`projects` 和 `art` 中的图片路径可替换为自己的文件；把文件放入 `assets/` 后填写相对路径。
- `projects` 每一项的 `url` 用于项目详情页；`links` 中配置 Studio、Art Lab、商店、联系、隐私、条款和社交链接。留空会显示“此入口暂未接入”，填入例如 `./work/project.html` 或 `https://example.com` 即可跳转。
- 项目列表支持鼠标悬停及点击展开；导航菜单内的锚点跳转到首页对应区块。

参考站文字与素材仅作为本地临时占位。对外发布前，请替换为有使用权限的内容。素材路径为本地文件，字体使用 Google Fonts，网络不可用时会回退到系统字体。

- `resume` 用于修改简历标题、个人字段及 `experience` 工作履历列表；可增加或删除履历条目。
