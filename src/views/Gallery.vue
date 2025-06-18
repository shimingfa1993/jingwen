<template>
  <div class="gallery-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">我们的相册</h1>
        <p class="page-subtitle">珍贵的回忆，美好的瞬间</p>
      </div>
    </div>
    
    <div class="gallery-container">
      <div class="container">
        <!-- Filter tabs -->
        <div class="filter-tabs">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="filter-btn"
            :class="{ 'active': activeFilter === category.id }"
            @click="setFilter(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- Gallery grid -->
        <div class="gallery-grid">
          <div 
            v-for="(item, index) in filteredItems" 
            :key="index"
            class="gallery-item"
            :class="item.type"
            @click="openModal(item, index)"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <div class="gallery-image">
              <img :src="item.thumbnail || item.url" :alt="item.title" loading="lazy" />
              <div class="gallery-overlay">
                <div class="gallery-info">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.date }}</p>
                </div>
                <div class="gallery-icon">
                  <span v-if="item.type === 'video'">▶️</span>
                  <span v-else>🔍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal for viewing images/videos -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-media">
          <img v-if="currentItem.type === 'image'" :src="currentItem.url" :alt="currentItem.title" />
          <video v-else-if="currentItem.type === 'video'" :src="currentItem.url" controls autoplay></video>
        </div>
        <div class="modal-info">
          <h3>{{ currentItem.title }}</h3>
          <p>{{ currentItem.description }}</p>
          <div class="modal-date">{{ currentItem.date }}</div>
        </div>
        <div class="modal-nav">
          <button @click="prevItem" class="nav-btn">← 上一张</button>
          <button @click="nextItem" class="nav-btn">下一张 →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      activeFilter: 'all',
      showModal: false,
      currentItem: null,
      currentIndex: 0,
      categories: [
        { id: 'all', name: '全部' },
        { id: 'together', name: '我们在一起' },
        { id: 'travel', name: '旅行足迹' },
        { id: 'special', name: '特殊时刻' },
        { id: 'daily', name: '日常生活' },
        { id: 'video', name: '视频回忆' }
      ],
      galleryItems: [
        {
          type: 'image',
          category: 'together',
          title: '第一张合照',
          description: '我们的第一张正式合照，那时候还很青涩，但笑容都是那么真诚。',
          date: '2011年春天',
          url: '/images/gallery/first-photo.jpg',
          thumbnail: '/images/gallery/thumbs/first-photo.jpg'
        },
        {
          type: 'video',
          category: 'special',
          title: '表白视频',
          description: '那个紧张又甜蜜的表白时刻，现在看来还是会脸红心跳。',
          date: '2011年夏天',
          url: '/videos/confession.mp4',
          thumbnail: '/images/gallery/thumbs/confession.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '海边漫步',
          description: '我们的第一次海边旅行，夕阳西下，手牵手走在沙滩上。',
          date: '2012年夏天',
          url: '/images/gallery/beach-walk.jpg',
          thumbnail: '/images/gallery/thumbs/beach-walk.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '大学毕业',
          description: '毕业典礼上的我们，虽然要面临分离，但相信爱情会让我们更加坚强。',
          date: '2014年',
          url: '/images/gallery/graduation.jpg',
          thumbnail: '/images/gallery/thumbs/graduation.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '一起做饭',
          description: '疫情期间在家一起做饭的日子，简单的幸福最珍贵。',
          date: '2020年',
          url: '/images/gallery/cooking.jpg',
          thumbnail: '/images/gallery/thumbs/cooking.jpg'
        },
        {
          type: 'video',
          category: 'special',
          title: '十周年纪念',
          description: '十年爱情的回顾视频，每一个画面都是满满的回忆。',
          date: '2021年',
          url: '/videos/ten-years.mp4',
          thumbnail: '/images/gallery/thumbs/ten-years.jpg'
        }
        // 你可以继续添加更多的照片和视频
      ]
    }
  },
  computed: {
    filteredItems() {
      if (this.activeFilter === 'all') {
        return this.galleryItems
      }
      return this.galleryItems.filter(item => item.category === this.activeFilter)
    }
  },
  mounted() {
    this.initAOS()
  },
  methods: {
    setFilter(filterId) {
      this.activeFilter = filterId
    },
    openModal(item, index) {
      this.currentItem = item
      this.currentIndex = index
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      this.currentItem = null
      document.body.style.overflow = 'auto'
    },
    prevItem() {
      const filteredItems = this.filteredItems
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : filteredItems.length - 1
      this.currentItem = filteredItems[this.currentIndex]
    },
    nextItem() {
      const filteredItems = this.filteredItems
      this.currentIndex = this.currentIndex < filteredItems.length - 1 ? this.currentIndex + 1 : 0
      this.currentItem = filteredItems[this.currentIndex]
    },
    initAOS() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate')
          }
        })
      }, observerOptions)
      
      document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el)
      })
    }
  }
}
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding-top: 80px;
}

.page-header {
  padding: 4rem 0;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1rem;
  background: var(--love-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.gallery-container {
  padding: 4rem 0;
}

/* Filter tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-primary);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--love-gradient);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
}

/* Gallery grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.gallery-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
  cursor: pointer;
}

.gallery-item.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.gallery-image {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.gallery-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.gallery-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-image:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-image:hover .gallery-overlay {
  opacity: 1;
}

.gallery-info h3 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.gallery-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.gallery-icon {
  align-self: flex-end;
  font-size: 1.5rem;
}

/* Video indicator */
.gallery-item.video .gallery-image::before {
  content: '';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.gallery-item.video .gallery-image::after {
  content: '▶️';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: 1rem;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: var(--secondary-bg);
  border-radius: 20px;
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--accent-color);
  transform: scale(1.1);
}

.modal-media {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.modal-media img,
.modal-media video {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}

.modal-info {
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-info h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-decorative);
}

.modal-info p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.modal-date {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.9rem;
}

.modal-nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-btn {
  background: var(--love-gradient);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .filter-tabs {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .modal-info {
    padding: 1rem;
  }
  
  .modal-nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}

/* Placeholder for missing images */
.gallery-image {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image::before {
  content: '📷 添加您的美好回忆';
  color: var(--text-secondary);
  font-size: 0.9rem;
  position: absolute;
  z-index: 1;
}

.gallery-image:has(img) {
  background: none;
  border: none;
}

.gallery-image:has(img)::before {
  display: none;
}
</style> 