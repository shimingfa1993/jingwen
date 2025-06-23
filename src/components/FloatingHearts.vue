<template>
  <div class="floating-hearts">
    <div 
      v-for="heart in hearts" 
      :key="heart.id"
      class="heart"
      :style="{
        left: heart.x + '%',
        animationDelay: heart.delay + 's',
        animationDuration: heart.duration + 's'
      }"
    >
      {{ heart.emoji }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingHearts',
  data() {
    return {
      hearts: []
    }
  },
  mounted() {
    this.generateHearts()
    // Regenerate hearts periodically
    setInterval(this.generateHearts, 10000)
  },
  methods: {
    generateHearts() {
      const heartEmojis = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🌈', '✨', '💫', '⭐', '🌟']
      this.hearts = []
      
      for (let i = 0; i < 12; i++) {
        this.hearts.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 6 + Math.random() * 4,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
        })
      }
    }
  }
}
</script>

<style scoped>
.floating-hearts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.heart {
  position: absolute;
  bottom: -50px;
  font-size: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.6));
  animation: float-up linear infinite;
  user-select: none;
}

@keyframes float-up {
  0% {
    bottom: -50px;
    opacity: 0;
    transform: translateX(0) rotate(0deg) scale(0.5);
  }
  10% {
    opacity: 1;
    transform: translateX(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateX(10px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translateX(-10px) rotate(180deg) scale(1);
  }
  75% {
    transform: translateX(15px) rotate(270deg) scale(0.9);
  }
  90% {
    opacity: 1;
    transform: translateX(-5px) rotate(360deg) scale(1);
  }
  100% {
    bottom: 110vh;
    opacity: 0;
    transform: translateX(0) rotate(360deg) scale(0.5);
  }
}

/* Different heart sizes */
.heart:nth-child(2n) {
  font-size: 1.2rem;
}

.heart:nth-child(3n) {
  font-size: 1.8rem;
}

.heart:nth-child(4n) {
  font-size: 1rem;
}

/* Only show on larger screens to avoid performance issues */
@media (max-width: 768px) {
  .floating-hearts {
    display: none;
  }
}
</style> 