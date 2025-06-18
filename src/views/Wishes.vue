<template>
  <div class="wishes-page">
    <!-- Hero Section with Birthday Animation -->
    <section class="birthday-hero">
      <div class="container">
        <div class="hero-content">
          <div class="birthday-animation">
            <div class="fireworks">
              <div v-for="n in 6" :key="'firework-' + n" class="firework" :style="{ animationDelay: (n * 0.5) + 's' }"></div>
            </div>
            <div class="cake-container">
              <div class="birthday-cake">🎂</div>
              <div class="candles">
                <div v-for="n in 5" :key="'candle-' + n" class="candle"></div>
              </div>
            </div>
          </div>
          
          <div class="birthday-message">
            <h1 class="birthday-title">
              <span class="title-line">生日快乐</span>
              <span class="title-line highlight">我最爱的你</span>
            </h1>
            <p class="birthday-subtitle">
              愿这个特殊的日子为你带来无尽的快乐<br>
              愿你的每一天都充满阳光与笑容<br>
              <span class="special-wish">愿我们的爱情永远甜蜜美好 💕</span>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Falling confetti -->
      <div class="confetti-container">
        <div v-for="n in 50" :key="'confetti-' + n" class="confetti" :style="getConfettiStyle(n)"></div>
      </div>
    </section>
    
    <!-- Birthday Wishes -->
    <section class="wishes-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">我的生日祝福</h2>
        <div class="wishes-content">
          <div class="wish-card main-wish" data-aos="fade-up" data-aos-delay="100">
            <div class="wish-icon">🎉</div>
            <h3>我最真挚的祝福</h3>
            <div class="wish-text">
              <p>亲爱的宝贝，今天是你的生日，也是我最想对你表达爱意的特殊日子。</p>
              <p>十三年来，你给我的生活带来了无数的惊喜和感动。你的笑容是我最美好的风景，你的拥抱是我最温暖的港湾。</p>
              <p>在这个属于你的日子里，我想对你说：感谢你选择了我，感谢你陪伴我走过了这么多美好的岁月。</p>
              <p>愿你永远保持那份纯真的美好，愿你的心中永远住着一个小公主。</p>
              <p>愿我们的爱情之花永远绽放，愿我们的幸福故事永远没有终点。</p>
              <p class="signature">生日快乐，我的小公主！💖</p>
            </div>
          </div>
          
          <div class="wishes-grid">
            <div v-for="(wish, index) in birthdayWishes" :key="index" class="wish-item" data-aos="fade-up" :data-aos-delay="(index + 2) * 100">
              <div class="wish-emoji">{{ wish.emoji }}</div>
              <h4>{{ wish.title }}</h4>
              <p>{{ wish.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Future Dreams -->
    <section class="dreams-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">我们的未来</h2>
        <div class="dreams-content" data-aos="fade-up" data-aos-delay="200">
          <div class="dream-item">
            <div class="dream-icon">🏠</div>
            <h3>我们的小家</h3>
            <p>希望有一天我们能有一个温馨的小家，有你有我，还有我们共同的梦想。</p>
          </div>
          <div class="dream-item">
            <div class="dream-icon">✈️</div>
            <h3>环游世界</h3>
            <p>想和你去看遍世界的美景，在每一个美丽的地方留下我们的足迹和笑声。</p>
          </div>
          <div class="dream-item">
            <div class="dream-icon">👶</div>
            <h3>小小的我们</h3>
            <p>也许未来会有一个小小的我们，继承你的美丽和我的幽默，成为我们爱的结晶。</p>
          </div>
          <div class="dream-item">
            <div class="dream-icon">👵👴</div>
            <h3>白头偕老</h3>
            <p>最美好的愿望就是我们能一起变老，一起回忆这些美好的年华。</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Interactive Birthday Card -->
    <section class="birthday-card-section">
      <div class="container">
        <div class="birthday-card" data-aos="flip-up">
          <div class="card-front" :class="{ 'flipped': cardFlipped }" @click="flipCard">
            <div class="card-content">
              <h3>点击打开你的生日卡片 💌</h3>
              <div class="card-decoration">
                <div class="heart">💕</div>
                <div class="star">⭐</div>
                <div class="heart">💖</div>
              </div>
            </div>
          </div>
          <div class="card-back" :class="{ 'flipped': cardFlipped }">
            <div class="card-content">
              <h3>我对你的承诺</h3>
              <div class="promise-text">
                <p>我承诺会一直爱你，保护你，陪伴你</p>
                <p>我承诺会在你难过的时候给你拥抱</p>
                <p>我承诺会在你开心的时候和你一起笑</p>
                <p>我承诺会永远把你当作我的小公主</p>
                <p class="final-promise">我承诺，我们的爱情会是最美的童话 ✨</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Wishes',
  data() {
    return {
      cardFlipped: false,
      birthdayWishes: [
        {
          emoji: '🌟',
          title: '闪耀如星',
          content: '愿你永远像星星一样闪闪发光，照亮我的世界，也照亮自己的人生道路。'
        },
        {
          emoji: '🌸',
          title: '花开不败',
          content: '愿你的美丽如花朵般永远绽放，愿你的青春永远不会凋零。'
        },
        {
          emoji: '🦋',
          title: '自由飞翔',
          content: '愿你像蝴蝶一样自由自在，追求自己的梦想，活出最真实的自己。'
        },
        {
          emoji: '🌈',
          title: '彩虹人生',
          content: '愿你的人生像彩虹一样多彩绚烂，每一天都有新的惊喜和收获。'
        },
        {
          emoji: '💎',
          title: '珍贵如钻',
          content: '你在我心中比钻石还要珍贵，愿你永远知道自己的价值和美好。'
        },
        {
          emoji: '🎵',
          title: '快乐旋律',
          content: '愿你的生活充满快乐的旋律，每一天都像美妙的音乐一样动听。'
        }
      ]
    }
  },
  mounted() {
    this.initAOS()
    this.startBirthdayAnimation()
  },
  methods: {
    flipCard() {
      this.cardFlipped = !this.cardFlipped
    },
    getConfettiStyle(index) {
      return {
        left: (index * 20 + Math.random() * 20) % 100 + '%',
        animationDelay: (index * 0.2 + Math.random() * 3) + 's',
        animationDuration: (Math.random() * 3 + 2) + 's',
        backgroundColor: this.getRandomColor()
      }
    },
    getRandomColor() {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']
      return colors[Math.floor(Math.random() * colors.length)]
    },
    startBirthdayAnimation() {
      // Add some interactive animations
      setInterval(() => {
        this.createFloatingHeart()
      }, 2000)
    },
    createFloatingHeart() {
      const heart = document.createElement('div')
      heart.innerHTML = '💕'
      heart.style.position = 'fixed'
      heart.style.left = Math.random() * window.innerWidth + 'px'
      heart.style.bottom = '-50px'
      heart.style.fontSize = '2rem'
      heart.style.pointerEvents = 'none'
      heart.style.zIndex = '1000'
      heart.style.animation = 'floatUp 4s ease-out forwards'
      
      document.body.appendChild(heart)
      
      setTimeout(() => {
        heart.remove()
      }, 4000)
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
.wishes-page {
  min-height: 100vh;
}

/* Birthday Hero Section */
.birthday-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  z-index: 2;
}

.birthday-animation {
  position: relative;
  text-align: center;
}

.fireworks {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
}

.firework {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff 0%, #ff6b6b 50%, transparent 70%);
  animation: explode 2s ease-out infinite;
}

.firework:nth-child(1) { top: 20%; left: 20%; }
.firework:nth-child(2) { top: 30%; right: 20%; }
.firework:nth-child(3) { bottom: 40%; left: 30%; }
.firework:nth-child(4) { bottom: 30%; right: 30%; }
.firework:nth-child(5) { top: 50%; left: 50%; }
.firework:nth-child(6) { bottom: 20%; left: 60%; }

.cake-container {
  position: relative;
  margin-top: 100px;
}

.birthday-cake {
  font-size: 8rem;
  animation: bounce 2s ease-in-out infinite;
}

.candles {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.candle {
  width: 4px;
  height: 20px;
  background: linear-gradient(to top, #8B4513 0%, #FFD700 100%);
  border-radius: 2px;
  position: relative;
}

.candle::after {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #FF4500 0%, #FFD700 50%, transparent 80%);
  border-radius: 50%;
  animation: flicker 1s ease-in-out infinite alternate;
}

.birthday-message {
  text-align: center;
}

.birthday-title {
  margin-bottom: 2rem;
  line-height: 1.1;
}

.title-line {
  display: block;
  font-size: clamp(3rem, 8vw, 6rem);
  animation: slideInRight 1s ease-out forwards;
  opacity: 0;
}

.title-line:nth-child(1) { animation-delay: 0.5s; }
.title-line:nth-child(2) { animation-delay: 0.8s; }

.title-line.highlight {
  background: linear-gradient(45deg, #fff 0%, #ff6b6b 50%, #4ecdc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.birthday-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.special-wish {
  color: #FFD700;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

/* Confetti Animation */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  animation: confetti-fall linear infinite;
}

/* Wishes Section */
.wishes-section {
  padding: 8rem 0;
  background: var(--primary-bg);
}

.wishes-content {
  max-width: 1000px;
  margin: 0 auto;
}

.main-wish {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.wish-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.main-wish h3 {
  color: var(--text-primary);
  font-family: var(--font-decorative);
  font-size: 2rem;
  margin-bottom: 2rem;
}

.wish-text p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.signature {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.wish-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.wish-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--accent-color);
}

.wish-emoji {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.wish-item h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-decorative);
}

.wish-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Dreams Section */
.dreams-section {
  padding: 8rem 0;
  background: var(--secondary-bg);
}

.dreams-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.dream-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.dream-item:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.dream-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.dream-item h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-decorative);
}

.dream-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Birthday Card Section */
.birthday-card-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
}

.birthday-card {
  position: relative;
  width: 400px;
  height: 300px;
  margin: 0 auto;
  perspective: 1000px;
  cursor: pointer;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.8s ease-in-out;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.card-back {
  transform: rotateY(180deg);
}

.card-front.flipped {
  transform: rotateY(-180deg);
}

.card-back.flipped {
  transform: rotateY(0deg);
}

.card-content {
  text-align: center;
  padding: 2rem;
}

.card-content h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-family: var(--font-decorative);
}

.card-decoration {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 2rem;
  margin-top: 1rem;
}

.card-decoration .heart,
.card-decoration .star {
  animation: float 2s ease-in-out infinite;
}

.card-decoration .heart:nth-child(2) { animation-delay: 0.5s; }
.card-decoration .star { animation-delay: 1s; }

.promise-text p {
  color: var(--text-secondary);
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.final-promise {
  color: var(--accent-color);
  font-weight: 600;
  margin-top: 1rem;
}

/* Animations */
@keyframes explode {
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes flicker {
  0% { transform: translateX(-50%) scale(1); }
  100% { transform: translateX(-50%) scale(1.2); }
}

@keyframes confetti-fall {
  0% { transform: translateY(-100vh) rotateZ(0deg); }
  100% { transform: translateY(100vh) rotateZ(360deg); }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes floatUp {
  0% {
    bottom: -50px;
    opacity: 1;
  }
  100% {
    bottom: 100vh;
    opacity: 0;
  }
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

[data-aos="flip-up"] {
  transform: rotateX(90deg);
}

[data-aos="flip-up"].aos-animate {
  transform: rotateX(0deg);
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .birthday-cake {
    font-size: 6rem;
  }
  
  .wishes-grid {
    grid-template-columns: 1fr;
  }
  
  .dreams-content {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  .birthday-card {
    width: 320px;
    height: 240px;
  }
  
  .main-wish {
    padding: 2rem;
  }
  
  .wish-text p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .birthday-card {
    width: 280px;
    height: 200px;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .promise-text p {
    font-size: 0.8rem;
  }
}
</style> 