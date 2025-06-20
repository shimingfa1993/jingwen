<template>
  <div class="gallery-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">我们的相册</h1>
        <p class="page-subtitle">珍贵的回忆，美好的瞬间</p>
      </div>
    </div>
    
    <div class="gallery-container">
      <div class="container">
        <!-- Filter tabs -->
        <div class="filter-tabs">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="filter-btn"
            :class="{ 'active': activeFilter === category.id }"
            @click="setFilter(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- Gallery grid -->
        <div class="gallery-grid">
          <div 
            v-for="(item, index) in filteredItems" 
            :key="index"
            class="gallery-item"
            :class="item.type"
            @click="openModal(item, index)"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <div class="gallery-image">
              <!-- 图片类型 -->
              <img 
                v-if="item.type === 'image'" 
                :src="item.thumbnail || item.url" 
                :alt="item.title" 
                loading="lazy" 
              />
              <!-- 视频类型 - 使用video元素显示首帧 -->
              <video 
                v-else-if="item.type === 'video'"
                :src="item.url"
                poster="http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg"
                preload="metadata"
                muted
                playsinline
                @loadedmetadata="setVideoTime"
                class="video-thumbnail"
              >
              </video>
              <div class="gallery-overlay">
                <div class="gallery-info">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.date }}</p>
                </div>
                <div class="gallery-icon">
                  <span v-if="item.type === 'video'">▶️</span>
                  <span v-else>🔍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal for viewing images/videos -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-media">
          <img v-if="currentItem.type === 'image'" :src="currentItem.url" :alt="currentItem.title" />
          <video 
            v-else-if="currentItem.type === 'video'" 
            :src="currentItem.url" 
            controls 
            autoplay 
            muted
            preload="metadata"
            playsinline
            @error="handleVideoError"
            @loadeddata="handleVideoLoaded"
          >
            您的浏览器不支持视频播放。
          </video>
          <div v-if="videoError" class="video-error">
            <p>😔 视频加载失败</p>
            <p>{{ currentItem.title }}</p>
          </div>
        </div>
        <div class="modal-info">
          <h3>{{ currentItem.title }}</h3>
          <p>{{ currentItem.description }}</p>
          <div class="modal-date">{{ currentItem.date }}</div>
        </div>
        <div class="modal-nav">
          <button @click="prevItem" class="nav-btn">← 上一张</button>
          <button @click="nextItem" class="nav-btn">下一张 →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      activeFilter: 'all',
      showModal: false,
      currentItem: null,
      currentIndex: 0,
      videoError: false,
      categories: [
        { id: 'all', name: '全部' },
        { id: 'together', name: '我们在一起' },
        { id: 'travel', name: '旅行足迹' },
        { id: 'special', name: '特殊时刻' },
        { id: 'daily', name: '日常生活' },
        { id: 'video', name: '视频回忆' }
      ],
      galleryItems: [
        // 从14开始的图片 - 特殊时刻系列 (14-20)
        // {
        //   type: 'image',
        //   category: 'special',
        //   title: '特殊时刻 14',
        //   description: '珍贵的纪念时刻，每一张都充满着特殊的意义。',
        //   date: '2023年',
        //   url: '/images/14.jpg',
        //   thumbnail: '/images/14.jpg'
        // },
        // {
        //   type: 'image',
        //   category: 'special',
        //   title: '特殊时刻 15',
        //   description: '值得铭记的美好瞬间。',
        //   date: '2023年',
        //   url: '/images/15.jpg',
        //   thumbnail: '/images/15.jpg'
        // },
        // {
        //   type: 'image',
        //   category: 'special',
        //   title: '特殊时刻 16',
        //   description: '难忘的记忆片段。',
        //   date: '2023年',
        //   url: '/images/16.jpg',
        //   thumbnail: '/images/16.jpg'
        // },
        // {
        //   type: 'image',
        //   category: 'special',
        //   title: '特殊时刻 17',
        //   description: '心动的瞬间定格。',
        //   date: '2023年',
        //   url: '/images/17.jpg',
        //   thumbnail: '/images/17.jpg'
        // },
        {
          type: 'image',
          category: 'special',
          title: '特殊时刻 18',
          description: '温馨的回忆时光。',
          date: '2023年',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/18.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/18.jpg'
        },
        
        // 旅行足迹系列 (30-45)
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 30',
          description: '美丽的旅行足迹，记录我们走过的每一个地方。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/30.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/30.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 31',
          description: '山水之间的美好时光。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/31.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/31.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 32',
          description: '探索未知的精彩旅程。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/32.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/32.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 33',
          description: '风景如画的美好时刻。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/33.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/33.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 34',
          description: '一起看过的美丽风景。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/34.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/34.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 35',
          description: '难忘的旅行经历。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/35.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/35.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 36',
          description: '共同的冒险时光。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/36.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/36.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 37',
          description: '夏日旅行的美好记忆。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/37.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/37.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 38',
          description: '阳光下的快乐时光。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/38.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/38.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 39',
          description: '海边的浪漫时光。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/39.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/39.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 40',
          description: '山间的清新空气。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/40.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/40.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 41',
          description: '探索新地方的兴奋。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/41.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/41.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 42',
          description: '一起走过的美丽小径。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/42.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/42.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 43',
          description: '日落时分的温柔时光。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/43.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/43.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 44',
          description: '城市街头的漫步。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/44.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/44.jpg'
        },
        {
          type: 'image',
          category: 'travel',
          title: '旅行回忆 45',
          description: '古建筑前的合影。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/45.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/45.jpg'
        },

        // 我们在一起系列 (46-60)
        {
          type: 'image',
          category: 'together',
          title: '在一起 46',
          description: '甜蜜的相伴时光，记录我们在一起的每一个瞬间。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/46.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/46.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 47',
          description: '温馨的拥抱时刻。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/47.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/47.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 48',
          description: '相视而笑的甜蜜。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/48.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/48.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 49',
          description: '手牵手的美好时光。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/49.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/49.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 50',
          description: '默契的眼神交流。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/50.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/50.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 51',
          description: '秋日里的温暖相伴。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/51.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/51.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 52',
          description: '彼此依靠的安全感。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/52.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/52.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 53',
          description: '分享快乐的时刻。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/53.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/53.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 54',
          description: '一起度过的美好时光。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/54.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/54.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 55',
          description: '特别的纪念照片。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/55.png',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/55.png'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 56',
          description: '互相照顾的温馨。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/56.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/56.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 57',
          description: '共同的兴趣爱好。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/57.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/57.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 58',
          description: '自然流露的幸福。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/58.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/58.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 59',
          description: '心有灵犀的默契。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/59.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/59.jpg'
        },
        {
          type: 'image',
          category: 'together',
          title: '在一起 60',
          description: '无言的深情凝视。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/60.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/60.jpg'
        },

        // 日常生活系列 (61-85)
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 61',
          description: '平凡日子里的小确幸，记录我们的日常美好。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/61.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/61.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 62',
          description: '一起做家务的温馨时光。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/62.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/62.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 63',
          description: '早晨的美好开始。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/63.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/63.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 64',
          description: '午后的慵懒时光。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/64.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/64.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 65',
          description: '一起看书的安静时刻。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/65.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/65.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 66',
          description: '厨房里的欢声笑语。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/66.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/66.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 67',
          description: '沙发上的拥抱时光。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/67.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/67.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 68',
          description: '窗边的温柔时光。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/68.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/68.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 69',
          description: '一起看电视的悠闲。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/69.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/69.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 70',
          description: '平凡中的不平凡。',
          date: '2023年冬',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/70.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/70.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 71',
          description: '简单生活的幸福。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/71.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/71.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 72',
          description: '共同完成的小任务。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/72.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/72.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 73',
          description: '阳台上的休闲时光。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/73.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/73.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 74',
          description: '一起整理房间。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/74.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/74.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 75',
          description: '睡前的温柔时光。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/75.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/75.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 76',
          description: '周末的慢节奏生活。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/76.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/76.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 77',
          description: '一起计划未来。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/77.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/77.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 78',
          description: '互相分享的小秘密。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/78.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/78.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 79',
          description: '一起准备晚餐。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/79.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/79.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 80',
          description: '安静的相伴时光。',
          date: '2024年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/80.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/80.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 81',
          description: '生活中的小浪漫。',
          date: '2024年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/81.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/81.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 82',
          description: '一起享受美食。',
          date: '2024年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/82.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/82.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 83',
          description: '夏日里的清凉时光。',
          date: '2024年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/83.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/83.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 84',
          description: '一起运动健身。',
          date: '2024年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/84.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/84.jpg'
        },
        {
          type: 'image',
          category: 'daily',
          title: '日常生活 85',
          description: '夏夜的温馨对话。',
          date: '2024年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/85.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/85.jpg'
        },

        // 特殊回忆系列 (86-95)
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 86',
          description: '值得珍藏的特殊时刻，每一张都有独特的故事。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/86.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/86.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 87',
          description: '纪念日的美好庆祝。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/87.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/87.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 88',
          description: '重要场合的珍贵合影。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/88.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/88.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 89',
          description: '感动的瞬间定格。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/89.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/89.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 90',
          description: '难忘的生日庆祝。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/90.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/90.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 91',
          description: '节日里的温馨时光。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/91.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/91.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '特殊回忆 92',
          description: '成就时刻的共同庆祝。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/92.jpg',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/92.jpg'
        },
        {
          type: 'image',
          category: 'special',
          title: '有趣动图 93',
          description: '记录下来的有趣瞬间，让回忆更加生动。',
          date: '2024年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/93.gif',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/93.gif'
        },
        // {
        //   type: 'image',
        //   category: 'special',
        //   title: '特殊回忆 94',
        //   description: '深刻印象的特别时刻。',
        //   date: '2024年秋',
        //   url: 'http://sy5sby4wj.hb-bkt.clouddn.com/94.jpg',
        //   thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/94.jpg'
        // },
        // {
        //   type: 'image',
        //   category: 'special',
        //   title: '特殊回忆 95',
        //   description: '最新的美好回忆，故事还在继续。',
        //   date: '2024年冬',
        //   url: 'http://sy5sby4wj.hb-bkt.clouddn.com/95.jpeg',
        //   thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/95.jpeg'
        // },

        // 视频回忆系列 - 使用视频首帧作为封面
        {
          type: 'video',
          category: 'video',
          title: '美好回忆 14',
          description: '记录下我们美好时光的珍贵视频片段。',
          date: '2023年',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/14.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '温馨时刻 15',
          description: '甜蜜瞬间的动态记录。',
          date: '2023年',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/15.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '快乐时光 16',
          description: '欢声笑语的美好回忆。',
          date: '2023年',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/16.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '浪漫瞬间 17',
          description: '浪漫时刻的珍贵记录。',
          date: '2023年',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/17.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '深情回忆 18',
          description: '深情凝视的温柔时光。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/18.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '春日时光 19',
          description: '春天里的美好时光记录。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/19.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '阳光日记 20',
          description: '阳光下的幸福时刻。',
          date: '2023年春',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/20.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '甜蜜记录 21',
          description: '记录下甜蜜时光的视频日记。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/21.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '夏日回忆 22',
          description: '夏天的美好回忆片段。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/22.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '特别时刻 24',
          description: '特别的纪念时刻动态记录。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/24.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '温馨日常 25',
          description: '日常生活中的温馨时刻。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/25.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '美好时光 26',
          description: '一起度过的美好时光记录。',
          date: '2023年夏',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/26.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '快乐回忆 27',
          description: '快乐时光的珍贵记录。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/27.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '秋日物语 28',
          description: '秋天里的温柔时光。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/28.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'video',
          title: '爱的记录 29',
          description: '爱情故事的动态记录。',
          date: '2023年秋',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/29.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        },
        {
          type: 'video',
          category: 'special',
          title: '主题视频',
          description: '我们爱情故事的主题视频，满载着所有美好回忆。',
          date: '2024年',
          url: 'http://sy5sby4wj.hb-bkt.clouddn.com/hero-video.mp4',
          thumbnail: 'http://sy5sby4wj.hb-bkt.clouddn.com/one.jpg'
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      if (this.activeFilter === 'all') {
        return this.galleryItems
      }
      return this.galleryItems.filter(item => item.category === this.activeFilter)
    }
  },
  mounted() {
    this.initAOS()
  },
  methods: {
    setFilter(filterId) {
      this.activeFilter = filterId
    },
    openModal(item, index) {
      this.currentItem = item
      this.currentIndex = index
      this.showModal = true
      this.videoError = false
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      this.currentItem = null
      this.videoError = false
      document.body.style.overflow = 'auto'
    },
    handleVideoError(event) {
      console.error('视频加载失败:', event)
      this.videoError = true
    },
    handleVideoLoaded() {
      console.log('视频加载成功')
      this.videoError = false
    },
    setVideoTime(event) {
      // 设置视频时间为第1秒，以获取更好的首帧预览
      const video = event.target
      if (video.duration > 1) {
        video.currentTime = 1
      }
    },
    prevItem() {
      const filteredItems = this.filteredItems
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : filteredItems.length - 1
      this.currentItem = filteredItems[this.currentIndex]
    },
    nextItem() {
      const filteredItems = this.filteredItems
      this.currentIndex = this.currentIndex < filteredItems.length - 1 ? this.currentIndex + 1 : 0
      this.currentItem = filteredItems[this.currentIndex]
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
.gallery-page {
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

.gallery-container {
  padding: 4rem 0;
}

/* Filter tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-primary);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--love-gradient);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
}

/* Gallery grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.gallery-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
  cursor: pointer;
}

.gallery-item.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.gallery-image {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.gallery-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.gallery-image img,
.gallery-image .video-thumbnail {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-thumbnail {
  pointer-events: none; /* 防止在缩略图状态下播放 */
}

.gallery-image:hover img,
.gallery-image:hover .video-thumbnail {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-image:hover .gallery-overlay {
  opacity: 1;
}

.gallery-info h3 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.gallery-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.gallery-icon {
  align-self: flex-end;
  font-size: 1.5rem;
}

/* Video indicator */
.gallery-item.video .gallery-image::before {
  content: '';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.gallery-item.video .gallery-image::after {
  content: '▶️';
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: 1rem;
}

/* Modal styles */
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

.modal-content {
  background: var(--secondary-bg);
  border-radius: 20px;
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
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

.modal-media {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.modal-media img,
.modal-media video {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}

.video-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  text-align: center;
}

.video-error p:first-child {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.video-error p:last-child {
  font-size: 1rem;
  opacity: 0.8;
}

.modal-info {
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-info h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-decorative);
}

.modal-info p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.modal-date {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.9rem;
}

.modal-nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

/* Mobile responsiveness */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .filter-tabs {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .modal-info {
    padding: 1rem;
  }
  
  .modal-nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}

/* Placeholder for missing images */
.gallery-image {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image::before {
  content: '📷 添加您的美好回忆';
  color: var(--text-secondary);
  font-size: 0.9rem;
  position: absolute;
  z-index: 1;
}

.gallery-image:has(img) {
  background: none;
  border: none;
}

.gallery-image:has(img)::before {
  display: none;
}
</style> 