<template>
  <div id="app">
    <!-- Particle background -->
    <div id="particles-js" class="particles-container"></div>
    
    <!-- Navigation -->
    <Navigation />
    
    <!-- Router view with page transitions -->
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
    
    <!-- Floating hearts -->
    <FloatingHearts />
    
    <!-- Music player -->
    <MusicPlayer />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import FloatingHearts from './components/FloatingHearts.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    FloatingHearts,
    MusicPlayer
  },
  mounted() {
    this.initParticles()
    this.initSmoothScroll()
  },
  methods: {
    initParticles() {
      // Initialize particles.js for background effect
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ['#ff6b9d', '#c44569', '#f8b500', '#667eea', '#4ecdc4']
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.2,
                sync: false
              }
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#ff6b9d',
              opacity: 0.3,
              width: 1.5
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 0.5
                }
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        })
      } else {
        // Fallback to load particles.js if not available
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
        script.onload = () => {
          this.initParticles()
        }
        document.head.appendChild(script)
      }
    },
    initSmoothScroll() {
      // Add smooth scroll behavior for internal links
      document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
          e.preventDefault()
          const target = document.querySelector(e.target.getAttribute('href'))
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}

.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* App layout */
#app {
  position: relative;
  min-height: 100vh;
}

/* Ensure proper layering */
.particles-container {
  z-index: -1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-enter,
  .page-leave-to {
    transform: translateY(20px);
  }
}
</style> 