<template>
  <div 
    class="lazy-image-container"
    :style="{ width, height }"
    ref="container"
  >
    <!-- 加载占位符 -->
    <div 
      v-if="!loaded && !error" 
      class="lazy-placeholder"
      :style="{ width, height }"
    >
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
    
    <!-- 错误占位符 -->
    <div 
      v-if="error" 
      class="lazy-error"
      :style="{ width, height }"
    >
      <span>❌ 图片加载失败</span>
      <button @click="retry" class="retry-btn">重试</button>
    </div>
    
    <!-- 实际图片 -->
    <img
      v-if="!error"
      :src="currentSrc"
      :alt="alt"
      :class="{ 'loaded': loaded }"
      @load="onLoad"
      @error="onError"
      :style="imageStyle"
    />
  </div>
</template>

<script>
import MEDIA_CONFIG from '@/config/mediaConfig.js'

export default {
  name: 'LazyImage',
  props: {
    // 图片文件名
    src: {
      type: String,
      required: true
    },
    // 媒体类型 ('images' | 'videos')
    type: {
      type: String,
      default: 'images'
    },
    // 替代文本
    alt: {
      type: String,
      default: ''
    },
    // 容器宽度
    width: {
      type: String,
      default: '100%'
    },
    // 容器高度
    height: {
      type: String,
      default: 'auto'
    },
    // 是否立即加载
    eager: {
      type: Boolean,
      default: false
    },
    // 图片样式
    objectFit: {
      type: String,
      default: 'cover'
    }
  },
  
  data() {
    return {
      loaded: false,
      error: false,
      observer: null,
      retryCount: 0,
      maxRetries: 3
    }
  },
  
  computed: {
    currentSrc() {
      return MEDIA_CONFIG.getMediaUrl(this.type, this.src)
    },
    
    imageStyle() {
      return {
        width: this.width,
        height: this.height,
        objectFit: this.objectFit,
        opacity: this.loaded ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }
    }
  },
  
  mounted() {
    if (this.eager) {
      this.loadImage()
    } else {
      this.setupIntersectionObserver()
    }
  },
  
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  
  methods: {
    setupIntersectionObserver() {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
              this.loadImage()
              this.observer.disconnect()
            }
          },
          {
            rootMargin: '50px'
          }
        )
        
        this.observer.observe(this.$refs.container)
      } else {
        // 不支持IntersectionObserver时直接加载
        this.loadImage()
      }
    },
    
    loadImage() {
      // 重置状态
      this.error = false
      
      // 预加载图片
      const img = new Image()
      img.onload = () => {
        this.loaded = true
        this.$emit('load')
      }
      
      img.onerror = () => {
        this.onError()
      }
      
      img.src = this.currentSrc
    },
    
    onLoad() {
      this.loaded = true
      this.$emit('load')
    },
    
    onError() {
      this.retryCount++
      
      if (this.retryCount <= this.maxRetries) {
        console.warn(`图片加载失败，尝试重试 (${this.retryCount}/${this.maxRetries}):`, this.currentSrc)
        // 延迟重试
        setTimeout(() => {
          this.loadImage()
        }, 1000 * this.retryCount)
      } else {
        this.error = true
        this.$emit('error', new Error(`图片加载失败: ${this.currentSrc}`))
      }
    },
    
    retry() {
      this.retryCount = 0
      this.error = false
      this.loaded = false
      this.loadImage()
    }
  }
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.lazy-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #999;
  font-size: 14px;
}

.lazy-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffe6e6;
  color: #d32f2f;
  font-size: 14px;
  padding: 10px;
}

.retry-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.retry-btn:hover {
  background-color: #cc3333;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ff69b4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

img.loaded {
  opacity: 1;
}
</style> 