/**
 * Error handler utility for managing third-party script conflicts
 * Specifically handles shadowRoot errors from browser extensions
 */

export class ErrorHandler {
  constructor() {
    this.setupGlobalHandlers()
  }

  setupGlobalHandlers() {
    // Handle uncaught errors
    window.addEventListener('error', this.handleGlobalError.bind(this))
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this))
    
    // Override console.error to filter third-party errors
    this.setupConsoleFilter()
  }

  handleGlobalError(event) {
    if (this.isThirdPartyError(event)) {
      this.suppressError(event, 'Global error')
      return false
    }
    return true
  }

  handleUnhandledRejection(event) {
    if (this.isThirdPartyRejection(event)) {
      this.suppressError(event, 'Promise rejection')
      event.preventDefault()
      return false
    }
    return true
  }

  isThirdPartyError(event) {
    const indicators = [
      'content_scripts',
      'shadowRoot',
      'extension',
      'chrome-extension',
      'moz-extension'
    ]
    
    return indicators.some(indicator => {
      return (
        (event.filename && event.filename.includes(indicator)) ||
        (event.message && event.message.includes(indicator)) ||
        (event.error && event.error.stack && event.error.stack.includes(indicator))
      )
    })
  }

  isThirdPartyRejection(event) {
    if (!event.reason) return false
    
    const indicators = [
      'content_scripts',
      'shadowRoot',
      'extension',
      'chrome-extension',
      'moz-extension'
    ]
    
    return indicators.some(indicator => {
      return (
        (event.reason.stack && event.reason.stack.includes(indicator)) ||
        (event.reason.message && event.reason.message.includes(indicator))
      )
    })
  }

  suppressError(event, type) {
    console.warn(`[ErrorHandler] ${type} from third-party script suppressed:`, {
      message: event.message || event.reason?.message,
      filename: event.filename,
      source: 'Third-party extension'
    })
  }

  setupConsoleFilter() {
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('shadowRoot') || message.includes('content_scripts')) {
        console.warn('[ErrorHandler] Console error from third-party script suppressed:', message)
        return
      }
      originalError.apply(console, args)
    }
  }

  // Method to safely execute DOM operations that might conflict with extensions
  safeExecute(operation, fallback = null) {
    try {
      return operation()
    } catch (error) {
      if (this.isThirdPartyError({ error, message: error.message })) {
        console.warn('[ErrorHandler] Operation failed due to third-party conflict:', error.message)
        return fallback
      }
      throw error
    }
  }

  // Method to safely access DOM elements that might be affected by shadow DOM
  safeElementAccess(selector, context = document) {
    return this.safeExecute(() => {
      return context.querySelector(selector)
    }, null)
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler()

// Vue plugin
export const ErrorHandlerPlugin = {
  install(Vue) {
    Vue.prototype.$errorHandler = errorHandler
    
    // Set up Vue error handler
    Vue.config.errorHandler = (err, vm, info) => {
      if (errorHandler.isThirdPartyError({ error: err, message: err.message })) {
        errorHandler.suppressError({ error: err, message: err.message }, 'Vue error')
        return
      }
      console.error('Vue error:', err, info)
    }
  }
}

export default errorHandler 