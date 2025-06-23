<template>
  <div class="timeline-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">我们的时光轴</h1>
        <p class="page-subtitle">13年来的重要时刻，每一个都值得纪念</p>
      </div>
    </div>
    
    <div class="timeline-container">
      <div class="container">
        <div class="timeline">
          <div 
            v-for="(item, index) in timelineItems" 
            :key="index"
            class="timeline-item"
            :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1 }"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="timeline-content">
              <div class="timeline-date">{{ item.date }}</div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-description">{{ item.description }}</p>
              <div  class="timeline-image">
                <img :src="item.image" :alt="item.title" />
              </div>
            </div>
            <div class="timeline-marker">
              <div class="timeline-icon">{{ item.icon }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      timelineItems: [
        {
          date: '2011年夏天',
          title: '我们的相遇',
          description: '那个春暖花开的日子，我们在公园里第一次相遇。你的笑容如春光般温暖，从那一刻起，我就知道你是那个特别的人。',
          icon: '💕',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/1.png'
        },
        {
          date: '2012年春天',
          title: '确定关系',
          description: '经过几个月的相处，我们正式确定了恋爱关系。那个夏日的黄昏，我鼓起勇气对你表白，你的一声"好"让我的世界瞬间明亮。',
          icon: '❤️',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/2.png'
        },
        {
          date: '2012年',
          title: '第一次旅行',
          description: '我们的第一次双人旅行，虽然预算有限，但那份快乐是无价的。海边的夕阳，山间的清晨，每一个瞬间都成为了珍贵的回忆。',
          icon: '🚗',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/3.png'
        },
        {
          date: '2013年',
          title: '步入大学',
          description: '那几年，我的青春藏在了去你城市的车票里，每一张都是我爱你的证据，异地的风吹不散我对你的思念，每次跨越山海见你，都是我最幸福的奔赴',
          icon: '🎓',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/4.png'
        },
        {
          date: '2016年',
          title: '我的毕业',
          description: '那些年你在廊坊，我在北京，信任动摇过心，却未动摇爱，余生请继续让我宠你。',
          icon: '🎓',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/5.png'
        },
        {
          date: '2017年',
          title: '开始工作',
          description: '步入职场的我，面临着新的挑战。虽然工作忙碌，但我们依然坚持着相互支持，一起为美好的未来努力奋斗。',
          icon: '💼',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/6.png'
        },
        {
          date: '2018年',
          title: '五周年纪念',
          description: '相爱五年，我们已经从青涩的学生变成了成熟的大人。这一年我们学会了更多的包容和理解，爱情也变得更加深刻。',
          icon: '🎉',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/7.png'
        },
        {
          date: '2019年',
          title: '步步高升',
          description: '你在书海泛舟，我在人海沉浮，白日为梦奔忙，夜晚为你赶路。星光不问赶路人，我愿意等待。',
          icon: '🎉',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/8.png'
        },
        {
          date: '2020年',
          title: '疫情期间',
          description: '特殊的一年让我们更加珍惜相聚的时光。居家的日子里，我们一起做饭、看电影、分享彼此的想法，发现爱情的另一种美好。',
          icon: '🏠',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/9.png'
        },
        {
          date: '2021年',
          title: '考公上岸',
          description: '十年的爱情长跑，我们经历了太多的风雨和彩虹。感谢时光见证了我们的成长，也见证了这份不变的真心。',
          icon: '💖',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/10.png'
        },
        {
          date: '2022-2044年',
          title: '梅花香自苦寒来',
          description: '你是我心底最深的佩服，是我愿用生命去守护的人。生日这天，愿你笑得更甜，梦得更远',
          icon: '💖',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/11.png'
        },
        {
          date: '2025年',
          title: '十三年的今天',
          description: '如今的我们，依然像初恋时那样深爱着彼此。这个特别的网站，是我想对你说的千言万语的总结：愿我们的爱情故事永远没有终点。',
          icon: '🎂',
          image: 'http://sy5sby4wj.hb-bkt.clouddn.com/12.jpg'
        }
      ]
    }
  },
  mounted() {
    this.initAOS()
  },
  methods: {
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
.timeline-page {
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

.timeline-container {
  padding: 6rem 0;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  width: 4px;
  background: var(--love-gradient);
  transform: translateX(-50%);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  width: 50%;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.timeline-item.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item.left {
  left: 0;
  padding-right: 3rem;
}

.timeline-item.right {
  left: 50%;
  padding-left: 3rem;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--accent-color);
}

.timeline-item.left .timeline-content::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  border: 10px solid transparent;
  border-left-color: rgba(255, 255, 255, 0.05);
}

.timeline-item.right .timeline-content::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  border: 10px solid transparent;
  border-right-color: rgba(255, 255, 255, 0.05);
}

.timeline-date {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-title {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-decorative);
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.timeline-image {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;
}

.timeline-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.timeline-image:hover img {
  transform: scale(1.05);
}

.timeline-marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: var(--love-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--primary-bg);
  z-index: 2;
}

.timeline-item.left .timeline-marker {
  right: -3rem;
}

.timeline-item.right .timeline-marker {
  left: -3rem;
}

.timeline-icon {
  font-size: 1.5rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item {
    width: 100% !important;
    left: 0 !important;
    padding-left: 4rem !important;
    padding-right: 1rem !important;
  }
  
  .timeline-item .timeline-marker {
    left: 0 !important;
    right: auto !important;
  }
  
  .timeline-content::after {
    display: none !important;
  }
  
  .timeline-content {
    margin-left: 1rem;
  }
}

/* Image placeholder styles for missing images */
.timeline-image {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.timeline-image img {
  max-width: 100%;
  height: auto;
}

/* When image fails to load */
.timeline-image::before {
  content: '📷 添加您的珍贵回忆照片';
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-image:has(img) {
  background: none;
  border: none;
}

.timeline-image:has(img)::before {
  display: none;
}
</style> 