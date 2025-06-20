<template>
  <div v-if="isVisible" class="music-player" :class="{ 'minimized': isMinimized }">
    <div class="player-container">
      <!-- Album Art -->
      <div class="album-art" @click="toggleMinimize">
        <div class="vinyl" :class="{ 'spinning': isPlaying }">
          <div class="vinyl-center"></div>
        </div>
      </div>
      
      <!-- Player Info -->
      <div class="player-info" v-show="!isMinimized">
        <div class="song-title">{{ currentSong.title }}</div>
        <div class="artist">{{ currentSong.artist }}</div>
      </div>
      
      <!-- Player Controls -->
      <div class="player-controls" v-show="!isMinimized">
        <button class="control-btn" @click="previousSong">
          <span>⏮️</span>
        </button>
        <button class="play-btn" @click="togglePlay">
          <span>{{ isPlaying ? '⏸️' : '▶️' }}</span>
        </button>
        <button class="control-btn" @click="nextSong">
          <span>⏭️</span>
        </button>
      </div>
      
      <!-- Volume Control -->
      <div class="volume-control" v-show="!isMinimized">
        <span class="volume-icon">🔊</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="volume" 
          class="volume-slider"
          @input="updateVolume"
        />
      </div>
      
      <!-- Minimize/Close Controls -->
      <div class="window-controls" v-show="!isMinimized">
        <button class="window-btn" @click="toggleMinimize">−</button>
        <button class="window-btn close" @click="closePlayer">×</button>
      </div>
    </div>
    
    <!-- Hidden audio element -->
    <audio 
      ref="audioPlayer"
      @ended="nextSong"
      @loadedmetadata="updateDuration"
      @timeupdate="updateProgress"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      isMinimized: false,
      isVisible: true,
      volume: 50,
      currentSongIndex: 0,
      currentTime: 0,
      duration: 0,
      playlist: [
        {
          title: "致刘静文",
          artist: "十三年纪念版",
          url: "/music/love-song-jingwen.mp3"
        },
        {
          title: "我们的十三年",
          artist: "爱情回忆录",
          url: "/music/thirteen-years.mp3"
        },
        {
          title: "静文，我爱你",
          artist: "真心告白",
          url: "/music/love-confession.mp3"
        }
      ]
    }
  },
  computed: {
    currentSong() {
      return this.playlist[this.currentSongIndex] || this.playlist[0]
    }
  },
  mounted() {
    this.initializePlayer()
    // 添加键盘快捷键重新显示音乐播放器 (Ctrl+M)
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    initializePlayer() {
      if (this.$refs.audioPlayer) {
        this.$refs.audioPlayer.volume = this.volume / 100
        this.$refs.audioPlayer.src = this.currentSong.url
      }
    },
    togglePlay() {
      if (!this.$refs.audioPlayer) return
      
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause()
      } else {
        this.$refs.audioPlayer.play().catch(e => {
          console.log('Auto-play prevented:', e)
          // Show user interaction required message
        })
      }
      this.isPlaying = !this.isPlaying
    },
    previousSong() {
      this.currentSongIndex = this.currentSongIndex > 0 
        ? this.currentSongIndex - 1 
        : this.playlist.length - 1
      this.loadCurrentSong()
    },
    nextSong() {
      this.currentSongIndex = this.currentSongIndex < this.playlist.length - 1 
        ? this.currentSongIndex + 1 
        : 0
      this.loadCurrentSong()
    },
    loadCurrentSong() {
      if (this.$refs.audioPlayer) {
        this.$refs.audioPlayer.src = this.currentSong.url
        if (this.isPlaying) {
          this.$refs.audioPlayer.play().catch(e => console.log('Play error:', e))
        }
      }
    },
    updateVolume() {
      if (this.$refs.audioPlayer) {
        this.$refs.audioPlayer.volume = this.volume / 100
      }
    },
    updateDuration() {
      if (this.$refs.audioPlayer) {
        this.duration = this.$refs.audioPlayer.duration
      }
    },
    updateProgress() {
      if (this.$refs.audioPlayer) {
        this.currentTime = this.$refs.audioPlayer.currentTime
      }
    },
    toggleMinimize() {
      this.isMinimized = !this.isMinimized
    },
    closePlayer() {
      this.isVisible = false
      if (this.isPlaying) {
        this.togglePlay()
      }
    },
    handleKeydown(event) {
      // Ctrl+M 重新显示音乐播放器
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault()
        this.isVisible = true
        this.isMinimized = false
      }
    }
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid rgba(255, 107, 157, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 320px;
}

.music-player.minimized {
  min-width: auto;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.player-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.minimized .player-container {
  padding: 0;
  justify-content: center;
  align-items: center;
  height: 60px;
}

/* Album Art */
.album-art {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.vinyl {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #333, #666);
  border-radius: 50%;
  position: relative;
  transition: transform 0.3s ease;
  border: 2px solid var(--accent-color);
}

.vinyl.spinning {
  animation: spin 3s linear infinite;
}

.vinyl-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #000;
  border-radius: 50%;
}

.vinyl-center::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: var(--accent-color);
  border-radius: 50%;
}

/* Player Info */
.player-info {
  text-align: center;
}

.song-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.artist {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Player Controls */
.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.control-btn,
.play-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  background: var(--love-gradient);
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
}

.control-btn:hover,
.play-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
}

.play-btn:hover {
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
}

/* Volume Control */
.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-icon {
  font-size: 1rem;
}

.volume-slider {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: var(--accent-color);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--accent-color);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* Window Controls */
.window-controls {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.window-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.window-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.window-btn.close:hover {
  background: #ff4444;
  color: white;
}

/* Animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .music-player {
    bottom: 1rem;
    right: 1rem;
    min-width: 280px;
  }
  
  .player-container {
    padding: 1rem;
  }
  
  .control-btn,
  .play-btn {
    font-size: 1rem;
  }
  
  .play-btn {
    width: 40px;
    height: 40px;
  }
}

/* Hide on very small screens */
@media (max-width: 480px) {
  .music-player:not(.minimized) {
    transform: scale(0.9);
  }
}
</style> 