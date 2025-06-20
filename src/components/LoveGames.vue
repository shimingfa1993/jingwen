<template>
  <div v-if="isVisible" class="love-games-overlay">
    <div class="games-container">
      <div class="game-header">
        <h2>❤️ 十三年·十三个爱的小游戏 ❤️</h2>
        <p>亲爱的静文，为你准备了13个特别的小游戏，完成它们解锁我们的美好回忆～</p>
        <div class="progress-bar">
          <div class="progress" :style="{width: (completedGames.length / 13 * 100) + '%'}"></div>
        </div>
        <span class="progress-text">{{ completedGames.length }}/13</span>
        <div class="debug-controls" v-if="getGameAttempts(currentGame) > getMaxAttempts(currentGame)">
          <button @click="forceCompleteCurrentGame" class="emergency-btn">
            🚑 强制完成当前游戏
          </button>
        </div>
      </div>

      <!-- 游戏1: 数字转盘 -->
      <div v-if="currentGame === 1" class="game-content">
        <h3>🎯 第一关：幸运数字</h3>
        <p>点击停止转盘，选中我们在一起的日期：31号！</p>
        <div class="number-wheel">
          <div class="wheel" :class="{spinning: isSpinning}">
            <div class="number" :class="{changing: isSpinning}">{{ currentNumber }}</div>
          </div>
          <button @click="stopWheel" :disabled="!isSpinning" class="game-btn">停止</button>
          <div v-if="gameAttempts[1] > 0" class="attempt-hint">
            尝试次数: {{ gameAttempts[1] }}/{{ getMaxAttempts(1) }}
          </div>
        </div>
      </div>

      <!-- 游戏2: 爱心拼图 -->
      <div v-if="currentGame === 2" class="game-content">
        <h3>💝 第二关：爱心拼图</h3>
        <p>将爱心碎片拖拽到正确位置，拼成完整的爱心！</p>
        <div class="puzzle-area">
          <div class="puzzle-target">
            <div v-for="i in 4" :key="i" 
                 class="puzzle-slot" 
                 :data-slot="i"
                 @dragover.prevent
                 @drop="dropPuzzlePiece($event, i)">
              <div v-if="puzzlePieces[i-1].placed" class="puzzle-piece placed" :data-piece="i">{{ i }}</div>
              <div v-else class="slot-hint">{{ i }}</div>
            </div>
          </div>
          <div class="puzzle-pieces">
            <div v-for="piece in availablePuzzlePieces" :key="piece" 
                 class="puzzle-piece" 
                 :data-piece="piece"
                 draggable="true"
                 @dragstart="startPuzzleDrag"
                 @dragend="endPuzzleDrag">
              {{ piece }}
            </div>
          </div>
          <div v-if="gameAttempts[2] > 0" class="attempt-hint">
            尝试次数: {{ gameAttempts[2] }}/{{ getMaxAttempts(2) }}
          </div>
          <div class="puzzle-hint">
            提示：将数字拖拽到对应的位置（1→1, 2→2, 3→3, 4→4）
          </div>
        </div>
      </div>

      <!-- 游戏3: 情话配对 -->
      <div v-if="currentGame === 3" class="game-content">
        <h3>💌 第三关：情话配对</h3>
        <p>将情话的上下句正确配对！</p>
        <div class="love-quotes-game">
          <div class="quotes-left">
            <div v-for="(quote, index) in loveQuotes" :key="'left-'+index" 
                 class="quote-item" 
                 :class="{selected: selectedLeft === index, matched: quote.matched}"
                 @click="selectLeft(index)">
              {{ quote.first }}
            </div>
          </div>
          <div class="quotes-right">
            <div v-for="(quote, index) in shuffledSecondParts" :key="'right-'+index" 
                 class="quote-item" 
                 :class="{selected: selectedRight === index, matched: secondPartsMatched[index]}"
                 @click="selectRight(index)">
              {{ quote.second }}
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏4: 日期记忆 -->
      <div v-if="currentGame === 4" class="game-content">
        <h3>📅 第四关：重要日期</h3>
        <p>选择我们第一次见面的年份！</p>
        <div class="date-game">
          <div class="date-options">
            <button v-for="year in [2010, 2011, 2012, 2013]" :key="year" 
                    class="date-btn" 
                    :class="{ correct: year === correctYear && completedGames.includes(4) }"
                    :disabled="completedGames.includes(4)"
                    @click="selectYear(year)">
              {{ year }}年
            </button>
          </div>
          <div v-if="gameAttempts[4] > 0 && !completedGames.includes(4)" class="attempt-hint">
            尝试次数: {{ gameAttempts[4] }}/{{ getMaxAttempts(4) }}
          </div>
          <div v-if="completedGames.includes(4)" class="success-hint">
            ✅ 游戏已完成！正确答案是2012年
          </div>
        </div>
      </div>

      <!-- 游戏5: 照片记忆 -->
      <div v-if="currentGame === 5" class="game-content">
        <h3>📷 第五关：美好回忆</h3>
        <p>点击翻开卡片，找到两张相同的照片！</p>
        <div class="memory-game">
          <div v-for="(card, index) in memoryCards" :key="index" 
               class="memory-card" 
               :class="{flipped: card.flipped, matched: card.matched}"
               @click="flipCard(index)">
            <div class="card-front">❤️</div>
            <div class="card-back">{{ card.emoji }}</div>
          </div>
        </div>
      </div>

      <!-- 游戏6: 字母游戏 -->
      <div v-if="currentGame === 6" class="game-content">
        <h3>🔤 第六关：爱的密码</h3>
        <p>按正确顺序点击字母，拼出"LOVE"！</p>
        <div class="letter-game">
          <div class="target-word">{{ targetWord }}</div>
          <div class="letter-buttons">
            <button v-for="letter in shuffledLetters" :key="letter" 
                    class="letter-btn" 
                    :disabled="selectedLetters.includes(letter)"
                    @click="selectLetter(letter)">
              {{ letter }}
            </button>
          </div>
          <div class="selected-letters">{{ selectedLetters.join('') }}</div>
          <div v-if="gameAttempts[6] > 0" class="attempt-hint">
            尝试次数: {{ gameAttempts[6] }}/{{ getMaxAttempts(6) }}
          </div>
        </div>
      </div>

      <!-- 游戏7: 颜色记忆 -->
      <div v-if="currentGame === 7" class="game-content">
        <h3>🌈 第七关：彩虹记忆</h3>
        <p>记住颜色闪烁的顺序，然后按相同顺序点击！</p>
        <div class="color-game">
          <div class="color-buttons">
            <button v-for="(color, index) in colors" :key="index" 
                    class="color-btn" 
                    :style="{backgroundColor: color}"
                    :class="{active: activeColor === index}"
                    @click="clickColor(index)"
                    :disabled="!gameStarted"></button>
          </div>
          <button v-if="!sequenceShowing && !gameStarted" @click="startColorGame" class="game-btn">开始</button>
        </div>
      </div>

      <!-- 游戏8: 时间轴排序 -->
      <div v-if="currentGame === 8" class="game-content">
        <h3>⏰ 第八关：时光排序</h3>
        <p>将我们的重要时刻按时间顺序排列！</p>
        <div class="timeline-game">
          <div class="timeline-events">
            <div v-for="(event, index) in timelineEvents" :key="index" 
                 class="timeline-event" 
                 draggable="true"
                 @dragstart="startTimelineDrag(index)"
                 @dragover.prevent
                 @drop="dropTimelineEvent(index)">
              {{ event.title }}
            </div>
          </div>
          <button @click="checkTimelineOrder" class="game-btn">检查顺序</button>
        </div>
      </div>

      <!-- 游戏9: 找茬游戏 -->
      <div v-if="currentGame === 9" class="game-content">
        <h3>🔍 第九关：火眼金睛</h3>
        <p>找出两幅图中的3个不同之处！</p>
        <div class="spot-difference-game">
          <div class="image-pair">
            <div class="game-image">
              <div v-for="diff in differences" :key="'left-'+diff.id" 
                   class="difference-spot left" 
                   :style="{top: diff.y + 'px', left: diff.x + 'px'}"
                   :class="{found: diff.found}"
                   @click="foundDifference(diff.id)"></div>
              图片1
            </div>
            <div class="game-image">
              <div v-for="diff in differences" :key="'right-'+diff.id" 
                   class="difference-spot right" 
                   :style="{top: diff.y + 'px', left: diff.x + 20 + 'px'}"
                   :class="{found: diff.found}"
                   @click="foundDifference(diff.id)"></div>
              图片2
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏10: 密码锁 -->
      <div v-if="currentGame === 10" class="game-content">
        <h3>🔐 第十关：爱的密码</h3>
        <p>输入我们第一次牵手的月份（两位数字）！</p>
        <div class="password-game">
          <div class="password-display">
            <span v-for="(digit, index) in passwordInput" :key="index" class="password-digit">
              {{ digit || '_' }}
            </span>
          </div>
          <div class="number-pad">
            <button v-for="num in [1,2,3,4,5,6,7,8,9,0]" :key="num" 
                    class="number-btn" @click="inputPassword(num)">
              {{ num }}
            </button>
            <button class="clear-btn" @click="clearPassword">清除</button>
          </div>
          <div v-if="gameAttempts[10] > 0" class="attempt-hint">
            尝试次数: {{ gameAttempts[10] }}/{{ getMaxAttempts(10) }}
          </div>
        </div>
      </div>

      <!-- 游戏11: 音乐节拍 -->
      <div v-if="currentGame === 11" class="game-content">
        <h3>🎵 第十一关：爱的节拍</h3>
        <p>跟着节拍点击，完成13下！</p>
        <div class="rhythm-game">
          <div class="beat-circle" :class="{active: beatActive}"></div>
          <div class="beat-counter">{{ beatCount }}/13</div>
          <button @click="startRhythmGame" v-if="!rhythmGameStarted" class="game-btn">开始</button>
        </div>
      </div>

      <!-- 游戏12: 星座连线 -->
      <div v-if="currentGame === 12" class="game-content">
        <h3>⭐ 第十二关：星空爱语</h3>
        <p>连接星星，组成爱心形状！</p>
        <div class="constellation-game">
          <svg class="star-canvas" @mousedown="startStarConnection" @mousemove="drawStarLine" @mouseup="endStarConnection">
            <circle v-for="(star, index) in stars" :key="index" 
                    :cx="star.x" :cy="star.y" r="8" 
                    class="star" 
                    :class="{connected: star.connected}"
                    @click="clickStar(index)"></circle>
            <path v-if="currentPath" :d="currentPath" stroke="#ff69b4" stroke-width="2" fill="none"></path>
            <path v-for="(line, index) in starLines" :key="index" 
                  :d="line" stroke="#ff69b4" stroke-width="2" fill="none"></path>
          </svg>
        </div>
      </div>

      <!-- 游戏13: 最终告白 -->
      <div v-if="currentGame === 13" class="game-content">
        <h3>💖 第十三关：最终告白</h3>
        <p>输入那句最重要的话："静文我爱你"</p>
        <div class="confession-game">
          <input v-model="confessionInput" 
                 class="confession-input" 
                 placeholder="请输入..." 
                 @keyup.enter="checkConfession">
          <button @click="checkConfession" class="game-btn">确认</button>
          <div v-if="gameAttempts[13] > 0" class="attempt-hint">
            尝试次数: {{ gameAttempts[13] }}/{{ getMaxAttempts(13) }}
          </div>
        </div>
      </div>

      <!-- 游戏完成庆祝 -->
      <div v-if="allGamesCompleted" class="completion-celebration">
        <h2>🎉 恭喜！所有游戏完成！🎉</h2>
        <p>静文，这十三个游戏代表我们十三年的美好时光</p>
        <p>每一关都充满了我对你的爱意</p>
        <p>愿我们的爱情故事永远精彩下去！</p>
        <div class="celebration-hearts">
          <span v-for="i in 13" :key="i" class="floating-heart">💖</span>
        </div>
      </div>

      <div class="game-controls">
        <button v-if="!allGamesCompleted" @click="nextGame" 
                :disabled="!currentGameCompleted" 
                class="next-btn">
          {{ currentGameCompleted ? '下一关' : '完成当前游戏' }}
        </button>
        <button @click="closeGames" class="close-btn">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoveGames',
  data() {
    return {
      isVisible: false,
      currentGame: 1,
      completedGames: [],
      gameAttempts: {}, // 记录每个游戏的尝试次数
      
      // 游戏1: 数字转盘
      currentNumber: 0,
      isSpinning: false,
      wheelInterval: null,
      
      // 游戏2: 爱心拼图
      puzzlePieces: [
        {placed: false},
        {placed: false},
        {placed: false},
        {placed: false}
      ],
      shuffledPieces: [4, 2, 1, 3],
      
      // 游戏3: 情话配对
      loveQuotes: [
        {first: "山有木兮木有枝", second: "心悦君兮君不知", matched: false},
        {first: "愿得一心人", second: "白头不相离", matched: false},
        {first: "执子之手", second: "与子偕老", matched: false}
      ],
      shuffledSecondParts: [],
      selectedLeft: -1,
      selectedRight: -1,
      secondPartsMatched: [false, false, false],
      
      // 游戏4: 日期记忆
      correctYear: 2012,
      
      // 游戏5: 照片记忆
      memoryCards: [],
      flippedCards: [],
      
      // 游戏6: 字母游戏
      targetWord: "LOVE",
      shuffledLetters: ['E', 'V', 'O', 'L'],
      selectedLetters: [],
      
      // 游戏7: 颜色记忆
      colors: ['#ff4757', '#2ed573', '#1e90ff', '#ffa502'],
      colorSequence: [],
      playerSequence: [],
      activeColor: -1,
      sequenceShowing: false,
      gameStarted: false,
      
      // 游戏8: 时间轴
      timelineEvents: [
        {title: "2012年相识", order: 1},
        {title: "2013年在一起", order: 2},
        {title: "2015年异地恋", order: 3},
        {title: "2020年决定转型", order: 4}
      ],
      draggedEventIndex: -1,
      
      // 游戏9: 找茬
      differences: [
        {id: 1, x: 50, y: 50, found: false},
        {id: 2, x: 100, y: 80, found: false},
        {id: 3, x: 75, y: 120, found: false}
      ],
      
      // 游戏10: 密码锁
      passwordInput: ['', ''],
      correctPassword: ['0', '8'], // 8月
      
      // 游戏11: 音乐节拍
      beatCount: 0,
      beatActive: false,
      rhythmGameStarted: false,
      beatInterval: null,
      
      // 游戏12: 星座连线
      stars: [
        {x: 100, y: 100, connected: false},
        {x: 150, y: 80, connected: false},
        {x: 200, y: 100, connected: false},
        {x: 125, y: 150, connected: false},
        {x: 175, y: 150, connected: false}
      ],
      starLines: [],
      currentPath: '',
      connectingStars: false,
      
      // 游戏13: 最终告白
      confessionInput: '',
      correctConfession: '静文我爱你'
    }
  },
  computed: {
    currentGameCompleted() {
      return this.completedGames.includes(this.currentGame)
    },
    allGamesCompleted() {
      return this.completedGames.length === 13
    },
    availablePuzzlePieces() {
      return this.shuffledPieces.filter(piece => !this.puzzlePieces[piece-1].placed)
    }
  },
  mounted() {
    this.initializeGames()
  },
  methods: {
    getMaxAttempts(gameNumber) {
      // 前5个游戏最多3次尝试，后8个游戏最多2次尝试
      return gameNumber <= 5 ? 3 : 2
    },
    
    getGameAttempts(gameNumber) {
      return this.gameAttempts[gameNumber] || 0
    },
    
    incrementAttempts(gameNumber) {
      if (!this.gameAttempts[gameNumber]) {
        this.gameAttempts[gameNumber] = 0
      }
      this.gameAttempts[gameNumber]++
    },
    
    shouldAutoPass(gameNumber) {
      const attempts = this.getGameAttempts(gameNumber)
      const maxAttempts = this.getMaxAttempts(gameNumber)
      return attempts >= maxAttempts // 当尝试次数达到最大次数时就自动通过
    },
    show() {
      this.isVisible = true
      this.startNumberWheel()
    },
    
    closeGames() {
      this.isVisible = false
      this.$emit('close')
    },
    
    initializeGames() {
      // 初始化游戏2的拼图
      this.shufflePuzzlePieces()
      
      // 初始化游戏3的情话配对
      this.shuffleQuotes()
      
      // 初始化游戏5的记忆卡片
      this.initMemoryCards()
      
      // 初始化游戏8的时间轴
      this.shuffleTimelineEvents()
    },
    
    // 游戏1: 数字转盘
    startNumberWheel() {
      if (this.currentGame === 1 && !this.completedGames.includes(1)) {
        this.isSpinning = true
        this.wheelInterval = setInterval(() => {
          this.currentNumber = Math.floor(Math.random() * 32)
        }, 80) // 调整间隔时间，让数字变化清晰可见
      }
    },
    
    stopWheel() {
      this.isSpinning = false
      clearInterval(this.wheelInterval)
      
      // 检查是否应该自动通过
      if (this.shouldAutoPass(1)) {
        this.currentNumber = 31 // 自动设置为正确答案
        setTimeout(() => {
          this.completeGame(1, "太棒了！31号正是我们在一起的日子！💕（系统自动帮助通过）")
        }, 500)
      } else if (this.currentNumber === 31) {
        this.completeGame(1, "太棒了！31号正是我们在一起的日子！💕")
      } else {
        this.incrementAttempts(1)
        setTimeout(() => {
          this.startNumberWheel()
        }, 1000)
      }
    },
    
    // 游戏2: 拼图相关方法
    shufflePuzzlePieces() {
      // 重新洗牌，确保拼图块不是按顺序排列
      this.shuffledPieces = [1, 2, 3, 4].sort(() => Math.random() - 0.5)
    },
    
    startPuzzleDrag(event) {
      event.dataTransfer.setData('text/plain', event.target.dataset.piece)
    },
    
    endPuzzleDrag() {
      // 拖拽结束
    },
    
    dropPuzzlePiece(event, slotIndex) {
      event.preventDefault()
      const pieceNumber = parseInt(event.dataTransfer.getData('text/plain'))
      
      // 检查是否拖拽到正确位置
      if (pieceNumber === slotIndex) {
        this.puzzlePieces[slotIndex - 1].placed = true
        
        // 检查是否完成拼图
        if (this.puzzlePieces.every(piece => piece.placed)) {
          this.completeGame(2, "太棒了！爱心拼图完成，就像我们的爱情一样完整！💕")
        }
      } else {
        // 拖拽到错误位置
        this.incrementAttempts(2)
        if (this.shouldAutoPass(2)) {
          // 自动完成拼图
          this.puzzlePieces.forEach(piece => piece.placed = true)
          setTimeout(() => {
            this.completeGame(2, "太棒了！爱心拼图完成，就像我们的爱情一样完整！💕（系统自动帮助通过）")
          }, 500)
        } else {
          // 显示错误提示
          alert(`数字${pieceNumber}应该放到位置${pieceNumber}哦！再试试看～`)
        }
      }
    },
    
    // 游戏3: 情话配对
    shuffleQuotes() {
      this.shuffledSecondParts = [...this.loveQuotes].sort(() => Math.random() - 0.5)
    },
    
    selectLeft(index) {
      this.selectedLeft = index
      this.checkQuoteMatch()
    },
    
    selectRight(index) {
      this.selectedRight = index
      this.checkQuoteMatch()
    },
    
    checkQuoteMatch() {
      if (this.selectedLeft >= 0 && this.selectedRight >= 0) {
        const leftQuote = this.loveQuotes[this.selectedLeft]
        const rightQuote = this.shuffledSecondParts[this.selectedRight]
        
        if (leftQuote.second === rightQuote.second) {
          leftQuote.matched = true
          this.secondPartsMatched[this.selectedRight] = true
          
          if (this.loveQuotes.every(q => q.matched)) {
            this.completeGame(3, "完美！情话配对成功！你懂我的心💕")
          }
        }
        
        this.selectedLeft = -1
        this.selectedRight = -1
      }
    },
    
    // 游戏4: 日期记忆
    selectYear(year) {
      // 防止游戏已完成后继续点击
      if (this.completedGames.includes(4)) {
        return
      }
      
      // 如果尝试次数已经超过限制，直接完成游戏
      if (this.getGameAttempts(4) >= this.getMaxAttempts(4)) {
        this.completeGame(4, "答对了！2012年我们相识，那是最美好的开始！💕（系统自动帮助通过）")
        return
      }
      
      if (year === this.correctYear) {
        this.completeGame(4, "答对了！2012年我们相识，那是最美好的开始！💕")
      } else {
        this.incrementAttempts(4)
        if (this.shouldAutoPass(4)) {
          setTimeout(() => {
            this.completeGame(4, "答对了！2012年我们相识，那是最美好的开始！💕（系统自动帮助通过）")
          }, 500)
        } else {
          // 显示错误提示
          alert(`不对哦，再想想我们是哪一年相遇的～ (${this.getGameAttempts(4)}/${this.getMaxAttempts(4)})`)
        }
      }
    },
    
    // 游戏5: 记忆卡片
    initMemoryCards() {
      const emojis = ['💕', '💖', '💝', '💗', '💕', '💖', '💝', '💗']
      this.memoryCards = emojis.map(emoji => ({
        emoji,
        flipped: false,
        matched: false
      })).sort(() => Math.random() - 0.5)
    },
    
    flipCard(index) {
      if (this.memoryCards[index].flipped || this.memoryCards[index].matched) return
      
      this.memoryCards[index].flipped = true
      this.flippedCards.push(index)
      
      if (this.flippedCards.length === 2) {
        setTimeout(() => {
          this.checkMemoryMatch()
        }, 500)
      }
    },
    
    checkMemoryMatch() {
      const [first, second] = this.flippedCards
      if (this.memoryCards[first].emoji === this.memoryCards[second].emoji) {
        this.memoryCards[first].matched = true
        this.memoryCards[second].matched = true
        
        if (this.memoryCards.every(card => card.matched)) {
          this.completeGame(5, "记忆力超棒！找到了所有配对！💕")
        }
      } else {
        this.memoryCards[first].flipped = false
        this.memoryCards[second].flipped = false
      }
      this.flippedCards = []
    },
    
    // 游戏6: 字母游戏
    selectLetter(letter) {
      this.selectedLetters.push(letter)
      if (this.selectedLetters.join('') === this.targetWord) {
        this.completeGame(6, "LOVE！你拼出了我想说的话！💕")
      } else if (this.selectedLetters.length === 4) {
        this.incrementAttempts(6)
        if (this.shouldAutoPass(6)) {
          this.selectedLetters = ['L', 'O', 'V', 'E']
          setTimeout(() => {
            this.completeGame(6, "LOVE！你拼出了我想说的话！💕（系统自动帮助通过）")
          }, 500)
        } else {
          this.selectedLetters = []
        }
      }
    },
    
    // 游戏7: 颜色记忆
    startColorGame() {
      this.gameStarted = true
      this.colorSequence = []
      this.playerSequence = []
      
      // 生成5个随机颜色序列
      for (let i = 0; i < 5; i++) {
        this.colorSequence.push(Math.floor(Math.random() * 4))
      }
      
      this.showColorSequence()
    },
    
    showColorSequence() {
      this.sequenceShowing = true
      this.colorSequence.forEach((color, index) => {
        setTimeout(() => {
          this.activeColor = color
          setTimeout(() => {
            this.activeColor = -1
            if (index === this.colorSequence.length - 1) {
              this.sequenceShowing = false
            }
          }, 500)
        }, index * 1000)
      })
    },
    
    clickColor(colorIndex) {
      if (this.sequenceShowing) return
      
      this.playerSequence.push(colorIndex)
      
      if (this.playerSequence.length === this.colorSequence.length) {
        if (JSON.stringify(this.playerSequence) === JSON.stringify(this.colorSequence)) {
          this.completeGame(7, "颜色记忆完美！你的记忆力真棒！💕")
        } else {
          this.playerSequence = []
        }
      }
    },
    
    // 游戏8: 时间轴排序
    shuffleTimelineEvents() {
      this.timelineEvents.sort(() => Math.random() - 0.5)
    },
    
    startTimelineDrag(index) {
      this.draggedEventIndex = index
    },
    
    dropTimelineEvent(targetIndex) {
      if (this.draggedEventIndex !== -1) {
        const draggedEvent = this.timelineEvents[this.draggedEventIndex]
        this.timelineEvents.splice(this.draggedEventIndex, 1)
        this.timelineEvents.splice(targetIndex, 0, draggedEvent)
        this.draggedEventIndex = -1
      }
    },
    
    checkTimelineOrder() {
      const isCorrect = this.timelineEvents.every((event, index) => event.order === index + 1)
      if (isCorrect) {
        this.completeGame(8, "时间轴排序正确！你记得我们的每个重要时刻！💕")
      }
    },
    
    // 游戏9: 找茬
    foundDifference(diffId) {
      const diff = this.differences.find(d => d.id === diffId)
      if (diff && !diff.found) {
        diff.found = true
        if (this.differences.every(d => d.found)) {
          this.completeGame(9, "火眼金睛！所有不同之处都被你找到了！💕")
        }
      }
    },
    
    // 游戏10: 密码锁
    inputPassword(num) {
      if (this.passwordInput[0] === '') {
        this.passwordInput[0] = num.toString()
      } else if (this.passwordInput[1] === '') {
        this.passwordInput[1] = num.toString()
        this.checkPassword()
      }
    },
    
    clearPassword() {
      this.passwordInput = ['', '']
    },
    
    checkPassword() {
      if (JSON.stringify(this.passwordInput) === JSON.stringify(this.correctPassword)) {
        this.completeGame(10, "密码正确！8月，我们第一次牵手的美好时光！💕")
      } else {
        this.incrementAttempts(10)
        if (this.shouldAutoPass(10)) {
          this.passwordInput = ['0', '8']
          setTimeout(() => {
            this.completeGame(10, "密码正确！8月，我们第一次牵手的美好时光！💕（系统自动帮助通过）")
          }, 500)
        } else {
          setTimeout(() => {
            this.clearPassword()
          }, 1000)
        }
      }
    },
    
    // 游戏11: 音乐节拍
    startRhythmGame() {
      this.rhythmGameStarted = true
      this.beatInterval = setInterval(() => {
        this.beatActive = true
        setTimeout(() => {
          this.beatActive = false
        }, 200)
      }, 800)
      
      // 监听点击
      document.addEventListener('click', this.handleBeatClick)
    },
    
    handleBeatClick() {
      if (this.beatActive) {
        this.beatCount++
        if (this.beatCount === 13) {
          clearInterval(this.beatInterval)
          document.removeEventListener('click', this.handleBeatClick)
          this.completeGame(11, "节拍完美！13下代表我们13年的爱情！💕")
        }
      }
    },
    
    // 游戏12: 星座连线
    clickStar(index) {
      this.stars[index].connected = !this.stars[index].connected
      if (this.stars.every(star => star.connected)) {
        this.completeGame(12, "星星连线成功！组成了爱的形状！💕")
      }
    },
    
    // 游戏13: 最终告白
    checkConfession() {
      if (this.confessionInput.trim() === this.correctConfession) {
        this.completeGame(13, "完美告白！静文我爱你，永远爱你！💕")
      } else {
        this.incrementAttempts(13)
        if (this.shouldAutoPass(13)) {
          this.confessionInput = this.correctConfession
          setTimeout(() => {
            this.completeGame(13, "完美告白！静文我爱你，永远爱你！💕（系统自动帮助通过）")
          }, 500)
        }
      }
    },
    
    // 通用方法
    completeGame(gameNumber, message) {
      if (!this.completedGames.includes(gameNumber)) {
        this.completedGames.push(gameNumber)
        alert(message)
      }
    },
    
    forceCompleteCurrentGame() {
      const gameMessages = {
        1: "太棒了！31号正是我们在一起的日子！💕",
        2: "太棒了！爱心拼图完成，就像我们的爱情一样完整！💕",
        3: "完美！情话配对成功！你懂我的心💕",
        4: "答对了！2012年我们相识，那是最美好的开始！💕",
        5: "记忆力超棒！找到了所有配对！💕",
        6: "LOVE！你拼出了我想说的话！💕",
        7: "颜色记忆完美！你的记忆力真棒！💕",
        8: "时间轴排序正确！你记得我们的每个重要时刻！💕",
        9: "火眼金睛！所有不同之处都被你找到了！💕",
        10: "密码正确！8月，我们第一次牵手的美好时光！💕",
        11: "节拍完美！13下代表我们13年的爱情！💕",
        12: "星星连线成功！组成了爱的形状！💕",
        13: "完美告白！静文我爱你，永远爱你！💕"
      }
      
      const message = gameMessages[this.currentGame] + "（紧急修复通过）"
      this.completeGame(this.currentGame, message)
    },
    
    nextGame() {
      if (this.currentGame < 13) {
        this.currentGame++
        if (this.currentGame === 1) {
          this.startNumberWheel()
        }
      }
    }
  }
}
</script>

<style scoped>
.love-games-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.games-container {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.game-header h2 {
  color: #fff;
  margin-bottom: 1rem;
}

.debug-controls {
  margin-top: 1rem;
}

.emergency-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.emergency-btn:hover {
  background: #ff2222;
  transform: scale(1.05);
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  transition: width 0.3s ease;
}

.game-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  text-align: center;
}

.game-content h3 {
  color: #333;
  margin-bottom: 1rem;
}

/* 游戏1: 数字转盘 */
.number-wheel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.wheel {
  width: 120px;
  height: 120px;
  border: 4px solid #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  background: #fff;
}

.wheel.spinning {
  animation: spin 0.1s linear infinite;
}

.number.changing {
  color: #ff6b6b;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
  transform: scale(1.2);
  transition: all 0.1s ease;
}

.attempt-hint {
  margin-top: 1rem;
  color: #ffa502;
  font-weight: bold;
  text-align: center;
}

/* 游戏2: 拼图 */
.puzzle-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.puzzle-target {
  display: grid;
  grid-template-columns: repeat(2, 100px);
  grid-template-rows: repeat(2, 100px);
  gap: 8px;
  justify-content: center;
  margin-bottom: 1rem;
}

.puzzle-slot {
  width: 100px;
  height: 100px;
  border: 3px dashed #ff6b6b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.puzzle-slot:hover {
  border-color: #4ecdc4;
  background: rgba(78, 205, 196, 0.1);
}

.slot-hint {
  color: #ccc;
  font-size: 2rem;
  font-weight: bold;
}

.puzzle-pieces {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.puzzle-piece {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.puzzle-piece:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.puzzle-piece:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.puzzle-piece.placed {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  border-color: #4ecdc4;
}

.puzzle-hint {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

/* 游戏3: 情话配对 */
.love-quotes-game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.quote-item {
  padding: 1rem;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quote-item.selected {
  border-color: #ff6b6b;
  background: #ffe6e6;
}

.quote-item.matched {
  background: #e6ffe6;
  border-color: #4ecdc4;
}

/* 游戏4: 日期选择 */
.date-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.date-btn {
  padding: 1rem;
  background: #fff;
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date-btn:hover:not(:disabled) {
  background: #ff6b6b;
  color: white;
}

.date-btn:disabled {
  background: #ccc;
  color: #666;
  cursor: not-allowed;
}

.date-btn.correct {
  background: #4ecdc4;
  color: white;
  border-color: #4ecdc4;
}

.success-hint {
  margin-top: 1rem;
  color: #4ecdc4;
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
  background: rgba(78, 205, 196, 0.1);
  border-radius: 5px;
}

/* 游戏5: 记忆卡片 */
.memory-game {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
}

.memory-card {
  width: 80px;
  height: 80px;
  perspective: 1000px;
  cursor: pointer;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.5rem;
}

.card-front {
  background: #ff6b6b;
  color: white;
}

.card-back {
  background: #4ecdc4;
  color: white;
  transform: rotateY(180deg);
}

.memory-card.flipped .card-front {
  transform: rotateY(180deg);
}

.memory-card.flipped .card-back {
  transform: rotateY(0deg);
}

/* 游戏6: 字母游戏 */
.letter-game {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.target-word {
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
}

.letter-buttons {
  display: flex;
  gap: 1rem;
}

.letter-btn {
  width: 60px;
  height: 60px;
  background: #fff;
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}

.letter-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 游戏7: 颜色记忆 */
.color-game {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.color-buttons {
  display: grid;
  grid-template-columns: repeat(2, 80px);
  gap: 10px;
}

.color-btn {
  width: 80px;
  height: 80px;
  border: 3px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-btn.active {
  border-color: #333;
  transform: scale(1.1);
}

/* 游戏8: 时间轴 */
.timeline-events {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.timeline-event {
  padding: 1rem;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 10px;
  cursor: grab;
}

/* 游戏9: 找茬 */
.image-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.game-image {
  position: relative;
  width: 200px;
  height: 150px;
  background: #f0f0f0;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.difference-spot {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid red;
  border-radius: 50%;
  cursor: pointer;
}

.difference-spot.found {
  background: rgba(255, 0, 0, 0.3);
}

/* 游戏10: 密码锁 */
.password-display {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.password-digit {
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: #fff;
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  max-width: 300px;
}

.number-btn, .clear-btn {
  padding: 1rem;
  background: #fff;
  border: 2px solid #ff6b6b;
  border-radius: 5px;
  cursor: pointer;
}

/* 游戏11: 节拍游戏 */
.rhythm-game {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.beat-circle {
  width: 120px;
  height: 120px;
  border: 4px solid #ccc;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.beat-circle.active {
  border-color: #ff6b6b;
  background: rgba(255, 107, 107, 0.2);
  transform: scale(1.1);
}

/* 游戏12: 星座连线 */
.star-canvas {
  width: 300px;
  height: 200px;
  background: #000;
  border-radius: 10px;
}

.star {
  fill: #ffd700;
  cursor: pointer;
}

.star.connected {
  fill: #ff69b4;
}

/* 游戏13: 告白 */
.confession-game {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.confession-input {
  padding: 1rem;
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  font-size: 1rem;
  width: 200px;
  text-align: center;
}

/* 完成庆祝 */
.completion-celebration {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
}

.celebration-hearts {
  margin-top: 1rem;
}

.floating-heart {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
  margin: 0 0.2rem;
}

.floating-heart:nth-child(even) {
  animation-delay: 1s;
}

/* 控制按钮 */
.game-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.game-btn, .next-btn, .close-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.game-btn, .next-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.close-btn {
  background: #ff6b6b;
  color: white;
}

.game-btn:hover, .next-btn:hover, .close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.next-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .games-container {
    margin: 1rem;
    padding: 1rem;
    max-height: 90vh;
  }
  
  .game-content {
    padding: 1rem;
  }
  
  .love-quotes-game {
    grid-template-columns: 1fr;
  }
  
  .image-pair {
    grid-template-columns: 1fr;
  }
  
  .game-image {
    width: 100%;
    max-width: 250px;
  }
}
</style> 