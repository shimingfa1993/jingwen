// 部署配置
const DEPLOY_CONFIG = {
  // 开发环境配置
  development: {
    useLocalMedia: true,
    mediaBaseUrl: '',
    enableLazyLoading: false
  },
  
  // 生产环境配置
  production: {
    useLocalMedia: false,
    mediaBaseUrl: 'https://cdn.jsdelivr.net/gh/yourusername/your-project-media@main',
    enableLazyLoading: true,
    // 备用CDN地址
    fallbackUrls: [
      'https://fastly.jsdelivr.net/gh/yourusername/your-project-media@main',
      'https://gcore.jsdelivr.net/gh/yourusername/your-project-media@main'
    ]
  }
}

// 获取当前环境
const getCurrentEnv = () => {
  return process.env.NODE_ENV || 'development'
}

// 获取当前配置
export const getDeployConfig = () => {
  const env = getCurrentEnv()
  return DEPLOY_CONFIG[env] || DEPLOY_CONFIG.development
}

// 获取媒体文件URL（带容错处理）
export const getMediaUrlWithFallback = (path, quality = 'medium') => {
  const config = getDeployConfig()
  
  if (config.useLocalMedia) {
    return `/${path}`
  }
  
  const qualityParam = quality !== 'original' ? `?quality=${quality}` : ''
  return `${config.mediaBaseUrl}/${path}${qualityParam}`
}

// 预加载关键资源
export const preloadCriticalMedia = () => {
  const criticalImages = [
    'hero-video.mp4', // 首页视频
    '1.png', '2.png', '3.png', // 前几张图片
  ]
  
  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = src.endsWith('.mp4') ? 'video' : 'image'
    link.href = getMediaUrlWithFallback(src, 'high')
    document.head.appendChild(link)
  })
}

export default DEPLOY_CONFIG 