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
            @click="handleLetterClick(letter, index)"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="letter-envelope">
              <div class="letter-seal">{{ index === letters.length - 1 ? '🎮' : '💕' }}</div>
              <div class="letter-preview">
                <div class="letter-date">{{ letter.date }}</div>
                <h3 class="letter-title">{{ letter.title }}</h3>
                <p class="letter-excerpt">{{ letter.excerpt }}</p>
                <div class="letter-author">— {{ letter.author }}</div>
                <div v-if="index === letters.length - 1" class="special-hint">
                  ✨ 点击开启特别惊喜 ✨
                </div>
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

    <!-- Love Games Component -->
    <LoveGames ref="loveGames" @close="onGamesClose" />
  </div>
</template>

<script>
import LoveGames from '@/components/LoveGames.vue'

export default {
  name: 'Letters',
  components: {
    LoveGames
  },
  data() {
    return {
      showModal: false,
      currentLetter: null,
      currentIndex: 0,
      letters: [
        {
          title: '致我最爱的你',
          date: '2011年夏天',
          author: '我',
          excerpt: '从第一眼见到你开始，我就知道你是那个特别的人...',
          content: [
            '我最亲爱的静文，',
            '提起笔的这一刻，我的心情很激动，因为这是我第一次给你写情书。',
            '从第一眼见到你开始，我就知道你是那个特别的人。你的笑容如春光般温暖，眼神如星光般明亮，就像夏日午后的温柔微风，不经意间就吹进了我的心里。',
            '也许这听起来很俗套，但我真的觉得遇见你是我这辈子最幸运的事情。你的善良、你的美丽、你的聪慧，还有你身上那种独特的气质，都深深地吸引着我。',
            '我想和你一起走过人生的每一个春夏秋冬，想在每个清晨醒来时看到你的睡颜，想在每个夜晚入睡前对你说晚安。想陪你看遍世间的美好，想成为你最可靠的依靠。',
            '我爱你，不仅仅是因为你的美丽，更因为和你在一起时我成为了更好的自己。你让我相信爱情的美好，让我对未来充满期待。',
            '希望你能接受我的心意，也希望我们能一起创造属于我们的美好回忆。'
          ],
          signature: '鼓起勇气写下这封信的我 ❤️'
        },
        {
          title: '谢谢你选择了我',
          date: '2012年冬天',
          author: '我',
          excerpt: '收到你的信后，我的心跳得好快，脸颊发烫...',
          content: [
            '我最亲爱的静文，',
            '你能选择我，我的心跳得好快，脸颊发烫。原来被喜欢的人喜欢是这样的感觉啊！',
            '2012年是我最幸运的一年，因为遇到了你。那时候不知道我们能走多远，但回头看看来时的路，我知道我的选择没有错。',
            '你是那么优秀、坚韧，也那么温柔体贴。因为有你，我的世界不再单调，连平凡的日子都泛着光。',
            '谢谢你选择了我，谢谢你愿意和我一起走这条路。我会珍惜你，保护你，一直一直爱着你。',
            '谢谢你，一直在我身边。'
          ],
          signature: '你的男朋友 💕'
        },
        {
          title: '一年纪念日快乐',
          date: '2013年',
          author: '我',
          excerpt: '不知不觉我们已经在一起一年了，这一年来的每一天都充满了幸福...',
          content: [
            '我的小公主静文，',
            '我在邱县，你在曲周，这段不远不近的路，我已经走得越来越熟了。只要一有时间，我就想去看看你，哪怕只是见上一面，陪你吃顿饭，听你讲几句话，心里也就踏实了。',
            '别人说感情需要仪式感，其实对我来说，每一次去见你，就是我最郑重的仪式。你在的地方，就是我心安的方向。下一次见面，我希望你也能记得，这一路，我是真的在奔向你。',
            '我期待着下一次见面，期待着和你一起走过的每一个瞬间。'
          ],
          signature: '一年纪念日快乐！一年如初见般爱你的我 🎉💕'
        },
        {
          title: '异地恋的思念',
          date: '2014年',
          author: '我',
          excerpt: '上了大学我们距离变远了...',
          content: [
            '我最想念的人，',
            '上了大学，我去了石家庄，我们之间的距离也一下子拉开了。那时候有点不安，总想找你说说话，哪怕只听听你的声音也好。',
            '可我也知道你学习很忙，有时候怕自己打扰到你。现在回头想想，确实影响到你了，我挺后悔的。但喜欢从来都不是借口，做错了就该承担。',
            '我不想说太多好听的，只想以后多做点实在的事，好好待你，不让你为难。',
            '我期待着下一次见面，期待着和你一起走过的每一个瞬间。'
          ],
          signature: '想你想到睡不着的我 😘'
        },
        {
          title: '被困住的恋情',
          date: '2015年',
          author: '我',
          excerpt: '封闭中的你，我...',
          content: [
            '我最想念的人，',
            '你在严格的学校进修一年，对你的思念，迫使我，只要你能放假，我就去你的城市见见你，',
            '但我这次决定不能耽误你的学习，不过还是恭喜你成功达到自己的学习目标，我为你骄傲，要生活气息的过好每一天，',
            '我期待着下一次见面，期待着和你一起走过的每一个瞬间。'
          ],
          signature: 'EMO的我 😘'
        },
        {
          title: '我回来了',
          date: '2016年',
          author: '我',
          excerpt: '危机之后，重归于好',
          content: [
            '犯错及时认错的人，',
            '上半年，对你的粗暴冷落，让你有了离开的念头，谢谢你给我原谅我的机会',
            '下半年去了北京干了房产中介，一份现在看极度不靠谱的工作，累死累活，也没有好好的陪伴你，我的心中满是后悔',
            '如果从一开始，我能找好方向，好好挣钱，不走那么多弯路，我相信，你已经成了小富婆了'
            
          ],
          signature: '愧疚的我 😘' 
        },
        {
          title: '弯路那么多',
          date: '2017年',
          author: '我',
          excerpt: '又为愚蠢买单了',
          content: [
            '做了一分骗人的工作，居然做了3年',
            '以为是朝阳产业，其实各种不正经，各种福利待遇差的工作，但是和你在北京过得挺乐呵呵的，',
            '我不怀念那时候，因为当时心态还是太幼稚，总想一步登天，没有脚踏实地，好好规划自己的人生，而你帮我成长，默默等着那么多年',
            '我挺后悔，当时的固执，不听话，遇到当年的自己，一定好好打他一顿，让他好好听静文的指点'
            
          ],
          signature: '愧疚的我 😘' 
        },
        {
          title: '蜕变',
          date: '2020年',
          author: '我',
          excerpt: '下定决定，转型',
          content: [
    
            '学习原来是简单的',
            '你在步步向前走，虽然我内心要强，觉得不能做别人的绊脚石，但是，我更想和你一起走，',
            '我决定，转型到互联网行业，',
            '我感谢你，在我最低落的时候陪伴我，感谢你在我最骄傲的时候提醒我，感谢你一直以来对我的包容和理解。',
            '现在的我已经不再是当初那个只会说"我爱你"的年轻人了，我学会了用行动去证明爱情，用时间去见证承诺。',
            '我希望都能和你一起度过。让我们一起变老，一起看遍世间的美好。'
            
          ],
          signature: '学习的小发 💖'
        },
        {
          title: '一个愚蠢的人',
          date: '2022年',
          author: '我',
          excerpt: '南辕北辙',
          content: [
    
            '我的傲慢和冲动，终究付出了巨大的代价',
            '谢谢你还爱着我，谢谢你还在等我，谢谢你还在给我机会',
            '你是个善良的姑娘，做事也雷厉风行，但是唯独给了我最大的温柔和包容，我何等的荣幸，虽然我也是一路陪伴你走来',
            '渐渐地我已经掉队很远了，虽然嘴硬，不承认，但是也得尊重客观事实，你愿意跟我一块创业一块经历，',
            '已经超过了很大的承受能力，我很感激你，',
            '我希望的努力能对的起你美丽的你',
            
            
          ],
          signature: '努力发 💖'
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
    handleLetterClick(letter, index) {
      // 如果是最后一个情书，启动游戏
      if (index === this.letters.length - 1) {
        this.startLoveGames()
      } else {
        this.openLetter(letter, index)
      }
    },
    
    startLoveGames() {
      this.$refs.loveGames.show()
    },
    
    onGamesClose() {
      // 游戏关闭后的处理
      console.log('游戏已关闭')
    },
    
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

.special-hint {
  margin-top: 1rem;
  text-align: center;
  color: #ffd700;
  font-weight: bold;
  font-size: 0.9rem;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
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