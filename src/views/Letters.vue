<template>
  <div class="letters-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">我们的情书</h1>
        <p class="page-subtitle">那些年写下的情话，字字句句都是真心</p>
      </div>
    </div>
    
    <div class="letters-container">
      <div class="container">
        <div class="letters-grid">
          <div 
            v-for="(letter, index) in letters" 
            :key="index"
            class="letter-card"
            @click="openLetter(letter, index)"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="letter-envelope">
              <div class="letter-seal">💕</div>
              <div class="letter-preview">
                <div class="letter-date">{{ letter.date }}</div>
                <h3 class="letter-title">{{ letter.title }}</h3>
                <p class="letter-excerpt">{{ letter.excerpt }}</p>
                <div class="letter-author">— {{ letter.author }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Letter modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content letter-modal" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        <div class="letter-content">
          <div class="letter-header">
            <h2>{{ currentLetter.title }}</h2>
            <div class="letter-meta">
              <span class="letter-date">{{ currentLetter.date }}</span>
              <span class="letter-author">{{ currentLetter.author }}</span>
            </div>
          </div>
          <div class="letter-body">
            <p v-for="(paragraph, idx) in currentLetter.content" :key="idx">
              {{ paragraph }}
            </p>
          </div>
          <div class="letter-signature">
            <p>{{ currentLetter.signature }}</p>
          </div>
        </div>
        <div class="modal-nav">
          <button @click="prevLetter" class="nav-btn">← 上一封</button>
          <button @click="nextLetter" class="nav-btn">下一封 →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Letters',
  data() {
    return {
      showModal: false,
      currentLetter: null,
      currentIndex: 0,
      letters: [
        {
          title: '致我最爱的你',
          date: '2011年春天',
          author: '我',
          excerpt: '从第一眼见到你开始，我就知道你是那个特别的人...',
          content: [
            '我最亲爱的宝贝，',
            '从第一眼见到你开始，我就知道你是那个特别的人。你的笑容如春光般温暖，眼神如星光般明亮。',
            '也许这听起来很俗套，但我真的觉得遇见你是我这辈子最幸运的事情。你的善良、你的美丽、你的聪慧，都深深地吸引着我。',
            '我想和你一起走过人生的每一个春夏秋冬，想在每个清晨醒来时看到你的睡颜，想在每个夜晚入睡前对你说晚安。',
            '我爱你，不仅仅是因为你的美丽，更因为和你在一起时我成为了更好的自己。'
          ],
          signature: '永远爱你的，我 ❤️'
        },
        {
          title: '回信：我也爱你',
          date: '2011年夏天',
          author: '你',
          excerpt: '收到你的信后，我的心跳得好快，脸颊发烫...',
          content: [
            '我的傻瓜，',
            '收到你的信后，我的心跳得好快，脸颊发烫。没想到平时看起来那么酷的你，写起情书来也会这么肉麻。',
            '但是，我喜欢这样的你。我喜欢你认真的样子，喜欢你温柔的眼神，喜欢你偶尔的幼稚。',
            '你说遇见我是你最幸运的事，可是你知道吗？对我来说，爱上你才是我最勇敢的决定。',
            '让我们一起创造属于我们的美好回忆吧，从今天开始，一直到永远。'
          ],
          signature: '你的小傻瓜 💕'
        },
        {
          title: '一年纪念日快乐',
          date: '2012年',
          author: '我',
          excerpt: '不知不觉我们已经在一起一年了，这一年来的每一天都充满了幸福...',
          content: [
            '我的小公主，',
            '不知不觉我们已经在一起一年了。这一年来的每一天都充满了幸福，每一刻都值得珍藏。',
            '还记得我们第一次约会时你紧张的样子吗？还记得我们第一次牵手时的悸动吗？还记得我们第一次说"我爱你"时的感动吗？',
            '这些美好的回忆就像珍珠一样，串成了我们爱情的项链。每一颗都闪闪发光，每一颗都弥足珍贵。',
            '谢谢你愿意陪我一起走过这一年，也谢谢你让我的生活变得如此精彩。',
            '愿我们的爱情故事能够一直续写下去，直到白头偕老。'
          ],
          signature: '一年纪念日快乐！永远爱你的我 🎉'
        },
        {
          title: '异地恋的思念',
          date: '2014年',
          author: '我',
          excerpt: '最近因为工作的关系，我们要开始异地恋了...',
          content: [
            '我最想念的人，',
            '最近因为工作的关系，我们要开始异地恋了。虽然只是暂时的，但想到要和你分开，心里还是有些不舍。',
            '每天晚上睡觉前，我都会想你。想你的笑声，想你的拥抱，想你在我身边时的安全感。',
            '距离或许会让我们暂时分开，但绝对不会让我们的心分开。无论相隔多远，我对你的爱都不会减少一分一毫。',
            '我会努力工作，尽快回到你身边。等我回来的时候，我们就再也不要分开了。',
            '希望你也要好好照顾自己，记得按时吃饭，记得早点睡觉，记得想我的时候就给我打电话。'
          ],
          signature: '想你想到睡不着的我 😘'
        },
        {
          title: '十年的承诺',
          date: '2021年',
          author: '我',
          excerpt: '十年了，我们从青涩的学生变成了成熟的大人...',
          content: [
            '我生命中最重要的人，',
            '十年了，我们从青涩的学生变成了成熟的大人，从懵懂的恋人变成了默契的伴侣。',
            '这十年来，我们一起经历了太多太多。有过争吵，有过眼泪，但更多的是欢声笑语和甜蜜时光。',
            '感谢你在我最低落的时候陪伴我，感谢你在我最骄傲的时候提醒我，感谢你一直以来对我的包容和理解。',
            '现在的我们已经不再是当初那个只会说"我爱你"的年轻人了，我们学会了用行动去证明爱情，用时间去见证承诺。',
            '下一个十年，下下个十年，我希望都能和你一起度过。让我们一起变老，一起看遍世间的美好。'
          ],
          signature: '十年如一日爱你的我 💖'
        },
        {
          title: '十三年的感谢',
          date: '2024年',
          author: '我',
          excerpt: '十三年了，感谢你一直陪在我身边，感谢你让我成为更好的自己...',
          content: [
            '我此生最爱的人，',
            '十三年了，感谢你一直陪在我身边，感谢你让我成为更好的自己。',
            '回首这十三年的时光，每一个瞬间都是那么珍贵。从校园的青涩岁月到如今的成熟稳重，我们一起成长，一起进步。',
            '你是我的初恋，也是我的最爱。你是我青春的见证者，也是我未来的同行者。',
            '这个网站是我想对你表达爱意的一种方式，希望能通过这些文字和图片，让你感受到我对你深深的爱。',
            '生日快乐，我的宝贝！愿你永远快乐，永远美丽，永远是我心中那个最特别的人。',
            '愿我们的爱情故事永远没有终点，愿我们的幸福能够延续到生命的最后一刻。'
          ],
          signature: '永远永远爱你的我 🎂❤️'
        }
      ]
    }
  },
  mounted() {
    this.initAOS()
  },
  methods: {
    openLetter(letter, index) {
      this.currentLetter = letter
      this.currentIndex = index
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      this.currentLetter = null
      document.body.style.overflow = 'auto'
    },
    prevLetter() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.letters.length - 1
      this.currentLetter = this.letters[this.currentIndex]
    },
    nextLetter() {
      this.currentIndex = this.currentIndex < this.letters.length - 1 ? this.currentIndex + 1 : 0
      this.currentLetter = this.letters[this.currentIndex]
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
.letters-page {
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

.letters-container {
  padding: 6rem 0;
}

.letters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.letter-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
  cursor: pointer;
}

.letter-card.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.letter-envelope {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.letter-envelope::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.letter-envelope:hover::before {
  left: 100%;
}

.letter-envelope:hover {
  transform: translateY(-10px) rotateY(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--accent-color);
}

.letter-seal {
  position: absolute;
  top: -10px;
  right: 2rem;
  background: var(--love-gradient);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 3px solid var(--primary-bg);
  animation: pulse 2s ease-in-out infinite;
}

.letter-preview {
  margin-top: 1rem;
}

.letter-date {
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.letter-title {
  color: var(--text-primary);
  font-family: var(--font-decorative);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.letter-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
}

.letter-author {
  color: var(--accent-color);
  font-weight: 600;
  text-align: right;
  font-size: 0.9rem;
}

/* Modal styles for reading full letters */
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

.letter-modal {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  max-width: 700px;
  max-height: 80vh;
  position: relative;
  backdrop-filter: blur(20px);
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

.letter-content {
  padding: 3rem 2rem 2rem;
  overflow-y: auto;
  max-height: 60vh;
}

.letter-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.letter-header h2 {
  color: var(--text-primary);
  font-family: var(--font-decorative);
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.letter-meta {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.letter-body {
  line-height: 1.8;
  margin-bottom: 2rem;
}

.letter-body p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.letter-body p:first-child {
  color: var(--accent-color);
  font-weight: 600;
}

.letter-signature {
  text-align: right;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.letter-signature p {
  color: var(--accent-color);
  font-style: italic;
  font-weight: 600;
}

.modal-nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
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

/* Scrollbar for letter content */
.letter-content::-webkit-scrollbar {
  width: 6px;
}

.letter-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.letter-content::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
}

.letter-content::-webkit-scrollbar-thumb:hover {
  background: #ff5252;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .letters-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .letter-envelope {
    padding: 1.5rem;
  }
  
  .letter-modal {
    max-width: 95vw;
    max-height: 90vh;
  }
  
  .letter-content {
    padding: 2rem 1rem 1rem;
  }
  
  .letter-header h2 {
    font-size: 1.5rem;
  }
  
  .letter-meta {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .modal-nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}

/* Romantic paper texture effect */
.letter-envelope {
  position: relative;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 30px 30px, 40px 40px;
}

.letter-modal {
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 30px 30px, 40px 40px;
}
</style> 