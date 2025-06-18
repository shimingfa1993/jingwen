<template>
  <div class="hero-avatar-overlay" v-if="isVisible" @click="closeAvatar">
    <div class="hero-avatar-container" :class="{ 'show': animationStart }" @click.stop>
      <!-- Main Avatar Video -->
      <div class="avatar-wrapper">
        <div class="avatar-glow"></div>
        <div class="avatar-video" ref="avatarContainer">
          <video 
            ref="heroVideo"
            src="/videos/hero-video.mp4" 
            autoplay 
            muted 
            loop 
            playsinline
            @error="setDefaultVideo"
            @loadeddata="onVideoLoaded"
            @click="toggleVideo"
          ></video>
          <div class="video-overlay" v-if="!isVideoLoaded">
            <div class="loading-spinner"></div>
            <p>加载中...</p>
          </div>
          <div class="video-controls" v-if="isVideoLoaded">
            <button @click="toggleVideo" class="play-pause-btn">
              {{ isVideoPlaying ? '⏸️' : '▶️' }}
            </button>
            <button @click="toggleMute" class="mute-btn">
              {{ isVideoMuted ? '🔇' : '🔊' }}
            </button>
          </div>
          <div class="avatar-border"></div>
        </div>
      </div>
      
      <!-- Floating decorations -->
      <div class="decoration-hearts">
        <div class="floating-decoration heart-1">💖</div>
        <div class="floating-decoration heart-2">💕</div>
        <div class="floating-decoration heart-3">💗</div>
        <div class="floating-decoration heart-4">💘</div>
        <div class="floating-decoration star-1">⭐</div>
        <div class="floating-decoration star-2">✨</div>
        <div class="floating-decoration star-3">🌟</div>
      </div>
      
      <!-- Welcome Message -->
      <div class="welcome-message">
        <h1 class="welcome-title">
          <span class="title-word">欢迎来到</span>
          <span class="title-word highlight">我们的</span>
          <span class="title-word">爱情世界</span>
        </h1>
        <p class="welcome-subtitle">
          这里记录着13年来最珍贵的回忆
        </p>
        <div class="sparkle-line"></div>
      </div>
      
      <!-- Action Buttons -->
      <div class="avatar-actions">
        <button @click="exploreMemories" class="btn-explore">
          <span>开始探索</span>
          <div class="btn-shine"></div>
        </button>
        <button @click="closeAvatar" class="btn-close">
          稍后再看
        </button>
      </div>
      
      <!-- Background Effects -->
      <div class="background-effects">
        <div class="particle-bg"></div>
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
    </div>
    
    <!-- Close indicator -->
    <div class="close-hint">点击空白处或稍后再看关闭</div>
  </div>
</template>

<script>
export default {
  name: 'HeroAvatar',
  data() {
    return {
      isVisible: true,
      animationStart: false,
      isVideoLoaded: false,
      isVideoPlaying: false,
      isVideoMuted: true
    }
  },
  mounted() {
    // Trigger animation after mount
    setTimeout(() => {
      this.animationStart = true
    }, 100)
    
    // Auto close after 10 seconds if user doesn't interact
    setTimeout(() => {
      if (this.isVisible) {
        this.closeAvatar()
      }
    }, 10000)
  },
  methods: {
    closeAvatar() {
      this.animationStart = false
      setTimeout(() => {
        this.isVisible = false
        this.$emit('closed')
      }, 500)
    },
    exploreMemories() {
      this.$emit('explore')
      this.closeAvatar()
    },
    onVideoLoaded() {
      this.isVideoLoaded = true
      this.isVideoPlaying = true
      // Try to play video with sound after user interaction
      this.tryPlayWithSound()
    },
    toggleVideo() {
      const video = this.$refs.heroVideo
      if (!video) return
      
      if (this.isVideoPlaying) {
        video.pause()
        this.isVideoPlaying = false
      } else {
        video.play().then(() => {
          this.isVideoPlaying = true
        }).catch(e => {
          console.log('Video play failed:', e)
        })
      }
    },
    toggleMute() {
      const video = this.$refs.heroVideo
      if (!video) return
      
      video.muted = !video.muted
      this.isVideoMuted = video.muted
    },
    tryPlayWithSound() {
      // After initial load, try to unmute and play with sound
      setTimeout(() => {
        const video = this.$refs.heroVideo
        if (video && this.isVideoLoaded) {
          video.muted = false
          this.isVideoMuted = false
          video.play().catch(() => {
            // If fails, keep muted
            video.muted = true
            this.isVideoMuted = true
          })
        }
      }, 1000)
    },
    setDefaultVideo(event) {
      // If video fails to load, set a default animated gradient
      this.isVideoLoaded = false
      const container = this.$refs.avatarContainer
      if (container) {
        container.style.background = 'var(--bright-gradient)'
        container.style.display = 'flex'
        container.style.alignItems = 'center'
        container.style.justifyContent = 'center'
        container.innerHTML = `
          <div style="font-size: 4rem; color: white; animation: pulse 2s ease-in-out infinite;">
            👩‍❤️‍👨
          </div>
          <div style="position: absolute; bottom: 10px; font-size: 0.9rem; color: rgba(255,255,255,0.8);">
            视频加载失败
          </div>
        `
      }
    }
  }
}
</script>

<style scoped>
.hero-avatar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.8s ease-out;
}

.hero-avatar-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 2px solid rgba(255, 107, 157, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: scale(0.8) translateY(50px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

.hero-avatar-container.show {
  transform: scale(1) translateY(0);
  opacity: 1;
}

/* Avatar Styles */
.avatar-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.avatar-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: conic-gradient(from 0deg, #ff6b9d, #c44569, #f8b500, #667eea, #4ecdc4, #ff6b9d);
  border-radius: 50%;
  animation: rotateGlow 3s linear infinite;
  filter: blur(20px);
  opacity: 0.7;
}

.avatar-video {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--bright-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: floatAvatar 3s ease-in-out infinite;
  cursor: pointer;
}

.avatar-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.avatar-video:hover video {
  transform: scale(1.05);
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  z-index: 2;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.video-controls {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}

.avatar-video:hover .video-controls {
  opacity: 1;
}

.play-pause-btn,
.mute-btn {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.play-pause-btn:hover,
.mute-btn:hover {
  background: white;
  transform: scale(1.1);
}

.avatar-border {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 4px solid transparent;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b9d, #c44569, #f8b500, #667eea) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
}

/* Floating Decorations */
.decoration-hearts {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-decoration {
  position: absolute;
  font-size: 2rem;
  animation: floatAround 4s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.6));
}

.heart-1 { top: 10%; left: 15%; animation-delay: 0s; }
.heart-2 { top: 20%; right: 15%; animation-delay: 1s; }
.heart-3 { bottom: 30%; left: 10%; animation-delay: 2s; }
.heart-4 { bottom: 20%; right: 20%; animation-delay: 0.5s; }
.star-1 { top: 15%; left: 50%; animation-delay: 1.5s; }
.star-2 { top: 40%; right: 10%; animation-delay: 2.5s; }
.star-3 { bottom: 40%; left: 60%; animation-delay: 3s; }

/* Welcome Message */
.welcome-message {
  margin-bottom: 2rem;
  z-index: 2;
}

.welcome-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-family: var(--font-decorative);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.title-word {
  display: inline-block;
  margin: 0 0.3rem;
  animation: slideInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.title-word:nth-child(1) { animation-delay: 0.5s; }
.title-word:nth-child(2) { animation-delay: 0.7s; }
.title-word:nth-child(3) { animation-delay: 0.9s; }

.title-word.highlight {
  background: var(--bright-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease-out 1.2s forwards;
  opacity: 0;
}

.sparkle-line {
  width: 100px;
  height: 2px;
  background: var(--bright-gradient);
  margin: 0 auto 2rem;
  border-radius: 2px;
  animation: expandLine 0.8s ease-out 1.4s forwards;
  transform: scaleX(0);
}

/* Action Buttons */
.avatar-actions {
  display: flex;
  gap: 1rem;
  animation: fadeInUp 0.8s ease-out 1.6s forwards;
  opacity: 0;
}

.btn-explore {
  position: relative;
  padding: 1rem 2rem;
  background: var(--bright-gradient);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
}

.btn-explore:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 107, 157, 0.6);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.btn-explore:hover .btn-shine {
  left: 100%;
}

.btn-close {
  padding: 1rem 2rem;
  background: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--text-muted);
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

/* Background Effects */
.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.6;
  animation: floatOrb 6s ease-in-out infinite;
}

.orb-1 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #ff6b9d, #c44569);
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  top: 60%;
  right: -10%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #f8b500, #4ecdc4);
  bottom: 20%;
  left: 50%;
  animation-delay: 4s;
}

/* Close Hint */
.close-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  animation: fadeInUp 0.8s ease-out 2s forwards;
  opacity: 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandLine {
  to { transform: scaleX(1); }
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes floatAvatar {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes floatAround {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(90deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
  75% { transform: translateY(-20px) rotate(270deg); }
}

@keyframes floatOrb {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-20px) translateX(20px); }
  66% { transform: translateY(20px) translateX(-20px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-avatar-container {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .avatar-video {
    width: 180px;
    height: 180px;
  }
  
  .video-controls {
    bottom: 10px;
  }
  
  .play-pause-btn,
  .mute-btn {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
  }
  
  .welcome-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
  }
  
  .avatar-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-explore,
  .btn-close {
    width: 100%;
  }
  
  .floating-decoration {
    font-size: 1.5rem;
  }
}
</style> 