// 媒体文件配置
// 可以使用免费的图床服务或云存储

// 媒体文件CDN配置
const MEDIA_CONFIG = {
  // 部署方式配置
  deployment: {
    // 当前使用的方案 ('local' | 'github-jsdelivr' | 'custom')
    mode: 'custom',
    
    // GitHub + jsDelivr CDN配置 (推荐)
    github: {
      // 请替换为您的GitHub用户名和仓库名
      username: 'YOUR_USERNAME',
      repository: 'love-game-media',
      branch: 'main',
      // 自动生成的CDN URL
      get baseUrl() {
        return `https://cdn.jsdelivr.net/gh/${this.username}/${this.repository}@${this.branch}`
      }
    },
    
    // 自定义CDN配置
    custom: {
      baseUrl: 'http://sy5sby4wj.hb-bkt.clouddn.com'
    },
    
    // 本地开发配置
    local: {
      baseUrl: ''
    }
  },
  
  // 获取当前CDN基础URL
  getCdnBaseUrl() {
    switch (this.deployment.mode) {
      case 'github-jsdelivr':
        return this.deployment.github.baseUrl
      case 'custom':
        return this.deployment.custom.baseUrl
      case 'local':
      default:
        return this.deployment.local.baseUrl
    }
  },
  
  // 获取完整的媒体文件URL
  getMediaUrl(type, filename) {
    const baseUrl = this.getCdnBaseUrl()
    
    if (!baseUrl) {
      // 本地模式
      if (type === 'images') {
        return `/images/${filename}`
      } else if (type === 'videos') {
        return `/videos/${filename}`
      }
    }
    
    // CDN模式
    return `${baseUrl}/${type}/${filename}`
  },
  
  // 检查CDN是否可用
  async checkCdnAvailability() {
    const baseUrl = this.getCdnBaseUrl()
    if (!baseUrl) return true // 本地模式总是可用
    
    try {
      // 测试一个小文件是否可以访问
      const testUrl = this.getMediaUrl('images', '1.png')
      const response = await fetch(testUrl, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      console.warn('CDN availability check failed:', error)
      return false
    }
  },
  
  // 配置验证
  validateConfig() {
    const mode = this.deployment.mode
    
    if (mode === 'github-jsdelivr') {
      const { username, repository } = this.deployment.github
      if (username === 'YOUR_USERNAME' || !username || !repository) {
        console.warn('⚠️ GitHub CDN配置不完整，请更新用户名和仓库名')
        return false
      }
    }
    
    return true
  }
}

// 自动验证配置
if (typeof window !== 'undefined') {
  // 只在浏览器环境中运行
  MEDIA_CONFIG.validateConfig()
}

export default MEDIA_CONFIG

// CDN媒体资源配置
export const CDN_BASE_URL = 'https://sy5sby4wj.hb-bkt.clouddn.com'

// 获取CDN完整URL的辅助函数
export function getCDNUrl(path) {
  return `${CDN_BASE_URL}/${path}`
}

// 时光轴图片
export const timelineImages = {
  1: getCDNUrl('1.png'),
  2: getCDNUrl('2.png'),
  3: getCDNUrl('3.png'),
  4: getCDNUrl('4.png'),
  5: getCDNUrl('5.png'),
  6: getCDNUrl('6.png'),
  7: getCDNUrl('7.png'),
  8: getCDNUrl('8.png'),
  9: getCDNUrl('9.png'),
  10: getCDNUrl('10.png'),
  11: getCDNUrl('11.png'),
  12: getCDNUrl('12.jpg')
}

// 视频资源
export const videos = {
  hero: getCDNUrl('hero-video.mp4')
}

// 相册图片 - 生成函数
export function getGalleryImageUrl(number, extension = 'jpg') {
  return getCDNUrl(`${number}.${extension}`)
}

// 默认海报图片
export const defaultPoster = getCDNUrl('one.jpg')

// 导出CDN基础URL供其他地方使用
// export default CDN_BASE_URL 