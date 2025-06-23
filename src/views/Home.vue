<template>
  <div class="home">
    <!-- Hero Avatar Announcement -->
    <HeroAvatar 
      v-if="showHeroAvatar" 
      @closed="showHeroAvatar = false" 
      @explore="scrollToFeatures"
    />
    
    <!-- Hero Section -->
    <section class="hero-section section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text" :class="{ 'loaded': isLoaded }">
            <h1 class="hero-title">
              <span class="title-line">致我最爱的</span>
              <span class="title-line highlight">刘静文</span>
              <span class="title-line">生日快乐</span>
            </h1>
            <p class="hero-subtitle">
              十三年零150天的相伴，从青涩到成熟<br>
              4898天，5.29亿次心跳，每一刻都为你而动<br>
              <span class="special-text">静文，你是我生命中最美好的遇见 ❤️</span>
            </p>
            <div class="hero-actions">
              <router-link to="/timeline" class="btn btn-primary">
                我们的十三年
              </router-link>
              <router-link to="/gallery" class="btn btn-outline">
                静文的美丽瞬间
              </router-link>
            </div>
          </div>
          
          <!-- Animated Love Stats -->
          <div class="love-stats" :class="{ 'loaded': isLoaded }">
            <div class="stat-item">
              <div class="stat-number" ref="daysCount">0</div>
              <div class="stat-label">相爱的日子</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" ref="heartbeatsCount">0</div>
              <div class="stat-label">心动时刻</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" ref="hoursCount">0</div>
              <div class="stat-label">陪伴钟表</div>
            </div>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="floating-elements">
          <div class="floating-heart heart-1">💖</div>
          <div class="floating-heart heart-2">💕</div>
          <div class="floating-heart heart-3">💗</div>
          <div class="floating-heart heart-4">💘</div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-text">向下滚动探索更多</div>
        <div class="scroll-arrow">↓</div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="features-section section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">静文，我们的十三年回忆</h2>
        <div class="features-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-icon">⏰</div>
            <h3>时光轴</h3>
            <p>按时间顺序回顾我们的重要时刻，每一个里程碑都值得纪念</p>
            <router-link to="/timeline" class="feature-link">查看时光轴 →</router-link>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon">📷</div>
            <h3>相册集</h3>
            <p>精心收藏的照片和视频，记录我们最美好的瞬间</p>
            <router-link to="/gallery" class="feature-link">浏览相册 →</router-link>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-icon">💌</div>
            <h3>情书档案</h3>
            <p>那些年我们写给彼此的情书，每一封都满含深情</p>
            <router-link to="/letters" class="feature-link">阅读情书 →</router-link>
          </div>
          
          <div class="feature-card special" data-aos="fade-up" data-aos-delay="400">
            <div class="feature-icon">💕</div>
            <h3>爱的告白</h3>
            <p>十三年来想对静文说的每一句情话，愿我们的爱情天长地久</p>
            <router-link to="/wishes" class="feature-link">查看告白 →</router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Quote Section -->
    <section class="quote-section section">
      <div class="container">
        <div class="quote-content" data-aos="fade-up">
          <blockquote class="love-quote">
            "十三年零150天的时光见证了我们的成长，<br>
            从2012年1月25日那个美好的开始，<br>
            静文，你让我的世界变得更加美好。<br>
            愿我们的爱情故事永远没有终点..."
          </blockquote>
          <cite class="quote-author">— 写给我最爱的刘静文</cite>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroAvatar from '@/components/HeroAvatar.vue'

export default {
  name: 'Home',
  components: {
    HeroAvatar
  },
  data() {
    return {
      isLoaded: false,
      showHeroAvatar: true, // Show hero avatar on first load
      stats: {
        days: 4898, // 总天数：4,898天
        heartbeats: 529000000, // 总心跳次数：约5.29亿次心跳
        hours: 117552 // 总小时：117,552小时
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true
      this.animateStats()
    }, 500)
    
    this.initAOS()
  },
  methods: {
    animateStats() {
      // Animate counting up for statistics
      this.animateCounter(this.$refs.daysCount, this.stats.days, 2000)
      setTimeout(() => this.animateCounter(this.$refs.heartbeatsCount, this.stats.heartbeats, 1500), 300)
      setTimeout(() => this.animateCounter(this.$refs.hoursCount, this.stats.hours, 1200), 600)
    },
    
    animateCounter(element, target, duration) {
      if (!element) return
      
      let start = 0
      const startTime = performance.now()
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const current = Math.floor(start + (target - start) * this.easeOutQuart(progress))
        element.textContent = current.toLocaleString()
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    },
    
    easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4)
    },
    
    scrollToFeatures() {
      // Scroll to features section when "explore" is clicked from hero avatar
      const featuresSection = document.querySelector('.features-section')
      if (featuresSection) {
        featuresSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    
    initAOS() {
      // Simple intersection observer for animations
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
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%);
}



.hero-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.hero-text {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-text.loaded {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  margin-bottom: 2rem;
  line-height: 1.1;
}

.title-line {
  display: block;
  animation: slideInLeft 1s ease-out forwards;
  opacity: 0;
}

.title-line:nth-child(1) { animation-delay: 0.2s; }
.title-line:nth-child(2) { animation-delay: 0.4s; }
.title-line:nth-child(3) { animation-delay: 0.6s; }

.title-line.highlight {
  background: var(--love-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.special-text {
  color: var(--accent-color);
  font-weight: 600;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Love Stats */
.love-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  opacity: 0;
  transform: translateX(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s;
}

.love-stats.loaded {
  opacity: 1;
  transform: translateX(0);
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  background: var(--love-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-decorative);
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.floating-heart {
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  animation: floatHeart 6s ease-in-out infinite;
}

.heart-1 { top: 20%; left: 10%; animation-delay: 0s; }
.heart-2 { top: 60%; right: 15%; animation-delay: 2s; }
.heart-3 { bottom: 30%; left: 20%; animation-delay: 4s; }
.heart-4 { top: 40%; right: 30%; animation-delay: 1s; }

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-secondary);
  animation: bounce 2s infinite;
}

.scroll-text {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.scroll-arrow {
  font-size: 1.5rem;
}

/* Features Section */
.features-section {
  background: var(--secondary-bg);
  padding: 8rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--accent-color);
}

.feature-card.special {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
  border-color: var(--accent-color);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.feature-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.feature-link:hover {
  color: #ff5252;
  transform: translateX(5px);
}

/* Quote Section */
.quote-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
}

.quote-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.love-quote {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-family: var(--font-decorative);
  font-style: italic;
  color: var(--text-primary);
  margin-bottom: 2rem;
  line-height: 1.6;
  position: relative;
}

.love-quote::before,
.love-quote::after {
  content: '"';
  font-size: 4rem;
  color: var(--accent-color);
  position: absolute;
  opacity: 0.3;
}

.love-quote::before {
  top: -1rem;
  left: -2rem;
}

.love-quote::after {
  bottom: -2rem;
  right: -2rem;
}

.quote-author {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes floatHeart {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-5deg); }
  75% { transform: translateY(-30px) rotate(3deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* AOS Animation Classes */
[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .love-stats {
    flex-direction: row;
    justify-content: center;
    transform: translateY(30px);
  }
  
  .love-stats.loaded {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-actions {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .love-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-item {
    width: 100%;
    max-width: 300px;
  }
  
  .floating-heart {
    display: none;
  }
}
</style>