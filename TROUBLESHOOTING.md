# 故障排除指南

## shadowRoot 错误问题

### 问题描述
您可能会遇到以下错误：
```
Uncaught (in promise) TypeError: Cannot read properties of null (reading 'shadowRoot')
    at o.getShadowDomById (content_scripts.umd.min.js:1:926339)
```

### 问题原因
这个错误通常由以下原因引起：

1. **浏览器扩展冲突**: `content_scripts.umd.min.js` 通常是浏览器扩展注入的脚本文件
2. **Shadow DOM 访问问题**: 扩展尝试访问不存在的 Shadow DOM 元素
3. **第三方脚本干扰**: 广告拦截器、隐私扩展等可能与页面脚本冲突

### 解决方案

#### 1. 全局错误处理
项目已配置全局错误处理器来自动抑制这类第三方脚本错误：

- `src/utils/errorHandler.js`: 专门的错误处理工具
- `src/main.js`: 集成错误处理插件

#### 2. 临时解决方法
如果问题持续存在，可以尝试：

1. **禁用浏览器扩展**
   - 在无痕模式下访问网站
   - 逐个禁用扩展以识别冲突的扩展

2. **清除浏览器缓存**
   ```
   - 按 F12 打开开发者工具
   - 右键点击刷新按钮
   - 选择"清空缓存并硬性重新加载"
   ```

3. **尝试不同浏览器**
   - Chrome
   - Firefox
   - Safari
   - Edge

#### 3. 常见冲突扩展
以下扩展可能导致此问题：
- AdBlock Plus
- uBlock Origin
- Privacy Badger
- Ghostery
- LastPass
- 某些翻译扩展

### 开发者注意事项

#### 错误抑制策略
项目使用以下策略处理第三方脚本错误：

```javascript
// 检测第三方错误的指标
const indicators = [
  'content_scripts',
  'shadowRoot',
  'extension',
  'chrome-extension',
  'moz-extension'
]
```

#### 安全DOM操作
使用错误处理工具的安全方法：

```javascript
// 安全执行可能冲突的操作
this.$errorHandler.safeExecute(() => {
  // DOM 操作代码
}, fallbackValue)

// 安全访问DOM元素
const element = this.$errorHandler.safeElementAccess('#myElement')
```

### 监控和调试

#### 启用详细日志
在开发者控制台中，被抑制的错误会显示为警告：
```
[ErrorHandler] Global error from third-party script suppressed: {...}
```

#### 调试第三方冲突
1. 打开开发者工具 (F12)
2. 在 Console 标签中查看警告信息
3. 检查 Sources 标签中的扩展脚本

### 预防措施

#### 1. 组件级错误边界
每个关键组件都应该有错误处理：

```javascript
methods: {
  safeOperation() {
    try {
      // 关键操作
    } catch (error) {
      if (this.isThirdPartyError(error)) {
        console.warn('Third-party conflict detected')
        return
      }
      throw error
    }
  }
}
```

#### 2. 延迟DOM操作
在组件挂载后延迟执行DOM操作：

```javascript
mounted() {
  this.$nextTick(() => {
    // DOM 操作
  })
}
```

### 联系支持
如果问题持续存在且影响核心功能，请：

1. 记录浏览器版本和已安装扩展
2. 提供完整的错误堆栈跟踪
3. 描述重现步骤

---

*最后更新: 2024年12月* 