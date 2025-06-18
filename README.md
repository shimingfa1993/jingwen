# 💕 Love Memory Site - 我们的爱情故事

一个专为纪念13年恋爱时光而创建的浪漫网站，参考了 [Cuberto.com](https://www.cuberto.com/) 的现代化设计风格，融入了丰富的动画效果和交互体验。

## ✨ 网站特色

### 🎨 设计风格
- **现代化 UI/UX**: 参考 Cuberto 设计风格，简约而不失优雅
- **炫酷动画**: 丰富的 CSS 动画和 JavaScript 交互效果
- **响应式设计**: 完美适配桌面、平板和移动设备
- **浪漫主题**: 专为恋爱回忆定制的颜色搭配和视觉元素

### 🚀 功能亮点
- **首页**: 大气的 Hero 区域，爱情数据统计，导航功能
- **时光轴**: 按时间顺序展示恋爱历程的重要时刻
- **相册集**: 分类展示照片和视频，支持模态框浏览
- **情书档案**: 收录那些年写下的情书，支持全文阅读
- **生日祝福**: 特别的生日页面，包含烟花动画和交互卡片
- **音乐播放器**: 浮动式播放器，为浏览增添浪漫氛围
- **粒子背景**: 动态粒子效果营造梦幻氛围
- **漂浮爱心**: 随机生成的爱心动画

## 🛠️ 技术栈

- **Frontend Framework**: Vue 2.6.14
- **Router**: Vue Router 3.2.0
- **Animation Library**: GSAP 3.12.2
- **Particle Effects**: Particles.js 2.0.0
- **Smooth Scrolling**: Locomotive Scroll 4.1.4
- **HTTP Client**: Axios 1.6.0
- **Build Tool**: Vue CLI 5.0.0

## 📦 安装与运行

### 环境要求
- Node.js 14+ 
- npm 6+ 或 yarn 1.22+

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run serve
```
访问 http://localhost:8080

### 生产构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 📁 项目结构

```
love-memory-site/
├── public/
│   ├── index.html           # HTML 模板
│   ├── images/              # 图片资源目录
│   │   ├── timeline/        # 时光轴图片
│   │   └── gallery/         # 相册图片
│   ├── videos/              # 视频资源目录
│   └── music/               # 音乐资源目录
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Navigation.vue   # 导航栏
│   │   ├── FloatingHearts.vue # 漂浮爱心
│   │   └── MusicPlayer.vue  # 音乐播放器
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── Timeline.vue     # 时光轴页面
│   │   ├── Gallery.vue      # 相册页面
│   │   ├── Letters.vue      # 情书页面
│   │   └── Wishes.vue       # 生日祝福页面
│   ├── assets/
│   │   └── styles/
│   │       └── global.css   # 全局样式
│   ├── router/
│   │   └── index.js         # 路由配置
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── package.json
└── README.md
```

## 🎨 自定义指南

### 1. 替换内容

#### 个人信息
在 `src/views/Home.vue` 中修改：
```javascript
stats: {
  days: 4745, // 修改为你们相爱的天数
  photos: 1337, // 修改为照片数量
  memories: 999 // 修改为回忆数量
}
```

#### 时光轴内容
在 `src/views/Timeline.vue` 中的 `timelineItems` 数组中修改：
```javascript
{
  date: '2011年春天', // 修改日期
  title: '我们的相遇', // 修改标题
  description: '...', // 修改描述
  icon: '💕', // 修改图标
  image: '/images/timeline/first-meet.jpg' // 添加图片路径
}
```

#### 相册内容
在 `src/views/Gallery.vue` 中的 `galleryItems` 数组中添加你们的照片：
```javascript
{
  type: 'image', // 或 'video'
  category: 'together', // 分类
  title: '照片标题',
  description: '照片描述',
  date: '拍摄日期',
  url: '/images/gallery/photo.jpg',
  thumbnail: '/images/gallery/thumbs/photo.jpg'
}
```

#### 情书内容
在 `src/views/Letters.vue` 中的 `letters` 数组中添加你们的情书：
```javascript
{
  title: '情书标题',
  date: '写信日期',
  author: '作者',
  excerpt: '预览文字...',
  content: [
    '第一段内容',
    '第二段内容',
    // ...更多段落
  ],
  signature: '署名'
}
```

### 2. 添加媒体资源

#### 图片
将照片放入以下目录：
- `public/images/timeline/` - 时光轴图片
- `public/images/gallery/` - 相册原图
- `public/images/gallery/thumbs/` - 相册缩略图

#### 视频
将视频文件放入：
- `public/videos/` - 视频文件

#### 音乐
将音乐文件放入：
- `public/music/` - 背景音乐

### 3. 颜色主题自定义

在 `src/assets/styles/global.css` 中修改 CSS 变量：
```css
:root {
  --primary-bg: #0a0a0a;           /* 主背景色 */
  --secondary-bg: #1a1a1a;         /* 次要背景色 */
  --accent-color: #ff6b6b;         /* 强调色 */
  --love-gradient: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #4ecdc4 100%); /* 爱情渐变 */
  --text-primary: #ffffff;         /* 主要文字色 */
  --text-secondary: #cccccc;       /* 次要文字色 */
}
```

### 4. 添加新页面

1. 在 `src/views/` 中创建新的 Vue 组件
2. 在 `src/router/index.js` 中添加路由：
```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('../views/NewPage.vue'),
  meta: {
    title: '新页面标题'
  }
}
```
3. 在 `src/components/Navigation.vue` 中添加导航链接

## 🎵 音乐播放器使用

音乐播放器支持多首歌曲循环播放：
1. 将音乐文件放入 `public/music/` 目录
2. 在 `src/components/MusicPlayer.vue` 中更新播放列表：
```javascript
playlist: [
  {
    title: "歌曲名称",
    artist: "艺术家",
    url: "/music/song.mp3"
  }
]
```

## 🌟 特殊效果

### 粒子背景
基于 Particles.js 实现，可在 `src/App.vue` 中调整参数：
- 粒子数量
- 连线距离
- 移动速度
- 颜色配置

### 动画效果
使用了多种动画技术：
- CSS Animations（关键帧动画）
- CSS Transitions（过渡效果）
- Intersection Observer（滚动触发动画）
- GSAP（高级动画库，可选）

## 📱 响应式设计

网站已适配多种设备：
- **桌面端**: 1200px+
- **平板端**: 768px - 1199px  
- **移动端**: 320px - 767px

所有组件都支持触摸操作和手势交互。

## 🚀 部署指南

### 1. 静态部署（推荐）
构建后将 `dist` 目录部署到任何静态托管服务：
- Netlify
- Vercel  
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

### 2. 服务器部署
如果需要服务器端功能，可以：
1. 使用 Express 或 Koa 提供静态文件服务
2. 配置 Nginx 反向代理
3. 使用 Docker 容器化部署

## ⚠️ 注意事项

1. **媒体文件大小**: 建议压缩图片和视频以提高加载速度
2. **浏览器兼容性**: 现代浏览器支持较好，IE 需要 polyfill
3. **隐私保护**: 请注意个人信息和照片的隐私安全
4. **版权问题**: 使用的音乐需要确保有合法使用权

## 🎁 给她的惊喜提示

### 发布方式建议
1. **域名选择**: 选择一个有意义的域名，比如包含你们的名字或重要日期
2. **分享方式**: 
   - 制作精美的邀请卡片
   - 设置特殊的访问密码
   - 在特殊的日子（生日、纪念日）分享
3. **互动元素**: 鼓励她点击和探索网站的各个功能
4. **后续更新**: 可以定期添加新的回忆和照片

## 🤝 贡献与支持

如果你想为这个项目贡献代码或有任何建议：

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

## 📄 许可证

MIT License - 请随意使用和修改！

---

💖 **愿天下有情人终成眷属，愿所有的爱情都能像这个网站一样美好永恒！**

如果这个项目对你有帮助，请给它一个 ⭐️！ 