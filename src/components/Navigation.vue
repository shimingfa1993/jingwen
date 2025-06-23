<template>
  <nav class="navigation" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo/Brand -->
      <router-link to="/" class="nav-brand">
        <span class="heart-icon">💕</span>
        <span class="brand-text">静文.生日快乐</span>
      </router-link>
      
      <!-- Desktop Menu -->
      <ul class="nav-menu" :class="{ 'active': isMenuOpen }">
        <li class="nav-item">
          <router-link to="/" class="nav-link" @click="closeMenu">
            <span class="nav-text">首页</span>
            <span class="nav-indicator"></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/timeline" class="nav-link" @click="closeMenu">
            <span class="nav-text">时光轴</span>
            <span class="nav-indicator"></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/gallery" class="nav-link" @click="closeMenu">
            <span class="nav-text">相册</span>
            <span class="nav-indicator"></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/letters" class="nav-link" @click="closeMenu">
            <span class="nav-text">情书</span>
            <span class="nav-indicator"></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/wishes" class="nav-link special" @click="closeMenu">
            <span class="nav-text">爱的告白</span>
            <span class="nav-indicator"></span>
          </router-link>
        </li>
      </ul>
      
      <!-- Mobile Menu Toggle -->
      <button class="menu-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // Close menu when clicking outside
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isMenuOpen = false
      }
    }
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 107, 107, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navigation.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(30px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.heart-icon {
  font-size: 1.8rem;
  margin-right: 0.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.brand-text {
  background: var(--bright-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(255, 107, 107, 0.1);
}

.nav-link.router-link-active {
  color: var(--accent-color);
}

.nav-link.special {
  background: var(--bright-gradient);
  color: white;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
}

.nav-link.special:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.nav-indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover .nav-indicator,
.nav-link.router-link-active .nav-indicator {
  width: 100%;
}

/* Mobile Menu Toggle */
.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: var(--text-primary);
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    height: 70px;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(30px);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid rgba(255, 107, 107, 0.1);
  }
  
  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    padding: 1rem;
    text-align: center;
    font-size: 1.1rem;
  }
  
  .nav-link.special {
    margin-top: 1rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .heart-icon {
    font-size: 2rem;
  }
}

/* Extra animations */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Smooth entry animation */
.nav-item {
  animation: slideInDown 0.6s ease-out;
  animation-fill-mode: both;
}

.nav-item:nth-child(1) { animation-delay: 0.1s; }
.nav-item:nth-child(2) { animation-delay: 0.2s; }
.nav-item:nth-child(3) { animation-delay: 0.3s; }
.nav-item:nth-child(4) { animation-delay: 0.4s; }
.nav-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 