/**
 * 插件管理器
 * 负责插件的注册、管理和生命周期管理
 */
import { LOG_LEVELS, ERROR_TYPES } from '../types/index.js'

class PluginManager {
  constructor() {
    this.plugins = new Map()
    this.hooks = new Map()
    this.config = {
      enableLogging: true,
      logLevel: LOG_LEVELS.INFO,
      autoLoad: true,
      strictMode: false
    }
    
    this.init()
  }

  /**
   * 初始化插件管理器
   */
  init() {
    try {
      this.log('插件管理器初始化开始', LOG_LEVELS.INFO)
      
      // 注册内置钩子
      this.registerBuiltinHooks()
      
      // 加载已注册的插件
      if (this.config.autoLoad) {
        this.loadRegisteredPlugins()
      }
      
      this.log('插件管理器初始化完成', LOG_LEVELS.INFO)
    } catch (error) {
      this.log('插件管理器初始化失败: ' + error.message, LOG_LEVELS.ERROR)
      throw error
    }
  }

  /**
   * 注册插件
   * @param {string} name - 插件名称
   * @param {Object} plugin - 插件对象
   * @param {Object} options - 插件选项
   * @returns {boolean} 是否注册成功
   */
  registerPlugin(name, plugin, options = {}) {
    try {
      if (!name || typeof name !== 'string') {
        throw new Error('插件名称必须是有效的字符串')
      }

      if (!plugin || typeof plugin !== 'object') {
        throw new Error('插件必须是有效的对象')
      }

      if (this.plugins.has(name)) {
        if (this.config.strictMode) {
          throw new Error(`插件 ${name} 已经存在`)
        }
        this.log(`插件 ${name} 已存在，将被覆盖`, LOG_LEVELS.WARN)
      }

      // 验证插件结构
      this.validatePlugin(plugin)

      // 注册插件
      this.plugins.set(name, {
        plugin,
        options,
        status: 'registered',
        registerTime: Date.now(),
        hooks: new Set()
      })

      this.log(`插件 ${name} 注册成功`, LOG_LEVELS.INFO)
      return true
    } catch (error) {
      this.log(`注册插件 ${name} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 卸载插件
   * @param {string} name - 插件名称
   * @returns {boolean} 是否卸载成功
   */
  unregisterPlugin(name) {
    try {
      if (!this.plugins.has(name)) {
        this.log(`插件 ${name} 不存在`, LOG_LEVELS.WARN)
        return false
      }

      const pluginInfo = this.plugins.get(name)
      
      // 调用插件的卸载方法
      if (pluginInfo.plugin.uninstall && typeof pluginInfo.plugin.uninstall === 'function') {
        try {
          pluginInfo.plugin.uninstall()
        } catch (error) {
          this.log(`插件 ${name} 卸载方法执行失败: ${error.message}`, LOG_LEVELS.WARN)
        }
      }

      // 清理钩子
      pluginInfo.hooks.forEach(hookName => {
        this.unregisterHook(hookName, name)
      })

      // 移除插件
      this.plugins.delete(name)
      
      this.log(`插件 ${name} 卸载成功`, LOG_LEVELS.INFO)
      return true
    } catch (error) {
      this.log(`卸载插件 ${name} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 获取插件
   * @param {string} name - 插件名称
   * @returns {Object|null} 插件对象
   */
  getPlugin(name) {
    const pluginInfo = this.plugins.get(name)
    return pluginInfo ? pluginInfo.plugin : null
  }

  /**
   * 获取所有插件
   * @returns {Array} 插件列表
   */
  getAllPlugins() {
    return Array.from(this.plugins.entries()).map(([name, info]) => ({
      name,
      ...info
    }))
  }

  /**
   * 注册钩子
   * @param {string} hookName - 钩子名称
   * @param {string} pluginName - 插件名称
   * @param {Function} callback - 回调函数
   * @returns {boolean} 是否注册成功
   */
  registerHook(hookName, pluginName, callback) {
    try {
      if (!hookName || typeof hookName !== 'string') {
        throw new Error('钩子名称必须是有效的字符串')
      }

      if (!pluginName || typeof pluginName !== 'string') {
        throw new Error('插件名称必须是有效的字符串')
      }

      if (!callback || typeof callback !== 'function') {
        throw new Error('回调函数必须是有效的函数')
      }

      // 确保钩子存在
      if (!this.hooks.has(hookName)) {
        this.hooks.set(hookName, new Map())
      }

      const hook = this.hooks.get(hookName)
      hook.set(pluginName, callback)

      // 记录到插件信息中
      const pluginInfo = this.plugins.get(pluginName)
      if (pluginInfo) {
        pluginInfo.hooks.add(hookName)
      }

      this.log(`钩子 ${hookName} 注册成功，插件: ${pluginName}`, LOG_LEVELS.DEBUG)
      return true
    } catch (error) {
      this.log(`注册钩子失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 卸载钩子
   * @param {string} hookName - 钩子名称
   * @param {string} pluginName - 插件名称
   * @returns {boolean} 是否卸载成功
   */
  unregisterHook(hookName, pluginName) {
    try {
      const hook = this.hooks.get(hookName)
      if (hook && hook.has(pluginName)) {
        hook.delete(pluginName)
        
        // 如果钩子没有注册者了，删除钩子
        if (hook.size === 0) {
          this.hooks.delete(hookName)
        }

        this.log(`钩子 ${hookName} 卸载成功，插件: ${pluginName}`, LOG_LEVELS.DEBUG)
        return true
      }
      return false
    } catch (error) {
      this.log(`卸载钩子失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 触发钩子
   * @param {string} hookName - 钩子名称
   * @param {*} data - 传递给钩子的数据
   * @returns {Array} 钩子执行结果
   */
  async triggerHook(hookName, data = null) {
    try {
      const hook = this.hooks.get(hookName)
      if (!hook || hook.size === 0) {
        return []
      }

      const results = []
      const promises = []

      // 收集所有钩子的执行结果
      for (const [pluginName, callback] of hook.entries()) {
        try {
          const result = callback(data, pluginName)
          if (result instanceof Promise) {
            promises.push(result.then(r => ({ pluginName, result: r, error: null })))
          } else {
            results.push({ pluginName, result, error: null })
          }
        } catch (error) {
          results.push({ pluginName, result: null, error: error.message })
          this.log(`钩子 ${hookName} 执行失败，插件: ${pluginName}, 错误: ${error.message}`, LOG_LEVELS.ERROR)
        }
      }

      // 等待异步钩子完成
      if (promises.length > 0) {
        const asyncResults = await Promise.allSettled(promises)
        asyncResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            results.push(result.value)
          } else {
            const pluginName = promises[index].pluginName
            results.push({ pluginName, result: null, error: result.reason })
          }
        })
      }

      this.log(`钩子 ${hookName} 执行完成，共 ${results.length} 个结果`, LOG_LEVELS.DEBUG)
      return results
    } catch (error) {
      this.log(`触发钩子 ${hookName} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return []
    }
  }

  /**
   * 验证插件结构
   * @param {Object} plugin - 插件对象
   */
  validatePlugin(plugin) {
    const requiredMethods = ['install']
    const optionalMethods = ['uninstall', 'enable', 'disable', 'configure']

    // 检查必需方法
    requiredMethods.forEach(method => {
      if (!plugin[method] || typeof plugin[method] !== 'function') {
        throw new Error(`插件缺少必需的方法: ${method}`)
      }
    })

    // 检查可选方法
    optionalMethods.forEach(method => {
      if (plugin[method] && typeof plugin[method] !== 'function') {
        throw new Error(`插件的 ${method} 方法必须是函数`)
      }
    })
  }

  /**
   * 注册内置钩子
   */
  registerBuiltinHooks() {
    const builtinHooks = [
      'app:before-mount',
      'app:after-mount',
      'app:before-unmount',
      'app:after-unmount',
      'route:before-enter',
      'route:after-enter',
      'route:before-leave',
      'route:after-leave',
      'theme:before-change',
      'theme:after-change',
      'article:before-load',
      'article:after-load',
      'error:before-handle',
      'error:after-handle'
    ]

    builtinHooks.forEach(hookName => {
      this.hooks.set(hookName, new Map())
    })

    this.log(`注册内置钩子: ${builtinHooks.join(', ')}`, LOG_LEVELS.DEBUG)
  }

  /**
   * 加载已注册的插件
   */
  async loadRegisteredPlugins() {
    try {
      for (const [name, pluginInfo] of this.plugins.entries()) {
        if (pluginInfo.status === 'registered') {
          await this.loadPlugin(name)
        }
      }
    } catch (error) {
      this.log('加载已注册插件失败: ' + error.message, LOG_LEVELS.ERROR)
    }
  }

  /**
   * 加载插件
   * @param {string} name - 插件名称
   * @returns {boolean} 是否加载成功
   */
  async loadPlugin(name) {
    try {
      const pluginInfo = this.plugins.get(name)
      if (!pluginInfo) {
        throw new Error(`插件 ${name} 不存在`)
      }

      if (pluginInfo.status === 'loaded') {
        this.log(`插件 ${name} 已经加载`, LOG_LEVELS.DEBUG)
        return true
      }

      // 调用插件的安装方法
      if (pluginInfo.plugin.install) {
        await pluginInfo.plugin.install(this, pluginInfo.options)
      }

      pluginInfo.status = 'loaded'
      pluginInfo.loadTime = Date.now()

      this.log(`插件 ${name} 加载成功`, LOG_LEVELS.INFO)
      return true
    } catch (error) {
      this.log(`加载插件 ${name} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 启用插件
   * @param {string} name - 插件名称
   * @returns {boolean} 是否启用成功
   */
  enablePlugin(name) {
    try {
      const pluginInfo = this.plugins.get(name)
      if (!pluginInfo) {
        throw new Error(`插件 ${name} 不存在`)
      }

      if (pluginInfo.plugin.enable && typeof pluginInfo.plugin.enable === 'function') {
        pluginInfo.plugin.enable()
      }

      pluginInfo.status = 'enabled'
      this.log(`插件 ${name} 启用成功`, LOG_LEVELS.INFO)
      return true
    } catch (error) {
      this.log(`启用插件 ${name} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 禁用插件
   * @param {string} name - 插件名称
   * @returns {boolean} 是否禁用成功
   */
  disablePlugin(name) {
    try {
      const pluginInfo = this.plugins.get(name)
      if (!pluginInfo) {
        throw new Error(`插件 ${name} 不存在`)
      }

      if (pluginInfo.plugin.disable && typeof pluginInfo.plugin.disable === 'function') {
        pluginInfo.plugin.disable()
      }

      pluginInfo.status = 'disabled'
      this.log(`插件 ${name} 禁用成功`, LOG_LEVELS.INFO)
      return true
    } catch (error) {
      this.log(`禁用插件 ${name} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 配置插件
   * @param {string} name - 插件名称
   * @param {Object} config - 配置对象
   * @returns {boolean} 是否配置成功
   */
  configurePlugin(name, config) {
    try {
      const pluginInfo = this.plugins.get(name)
      if (!pluginInfo) {
        throw new Error(`插件 ${name} 不存在`)
      }

      if (pluginInfo.plugin.configure && typeof pluginInfo.plugin.configure === 'function') {
        pluginInfo.plugin.configure(config)
      }

      // 更新插件选项
      pluginInfo.options = { ...pluginInfo.options, ...config }

      this.log(`插件 ${name} 配置成功`, LOG_LEVELS.INFO)
      return true
    } catch (error) {
      this.log(`配置插件 ${name} 失败: ${error.message}`, LOG_LEVELS.ERROR)
      return false
    }
  }

  /**
   * 获取插件状态
   * @param {string} name - 插件名称
   * @returns {string|null} 插件状态
   */
  getPluginStatus(name) {
    const pluginInfo = this.plugins.get(name)
    return pluginInfo ? pluginInfo.status : null
  }

  /**
   * 获取钩子信息
   * @param {string} hookName - 钩子名称
   * @returns {Array} 钩子信息
   */
  getHookInfo(hookName) {
    const hook = this.hooks.get(hookName)
    if (!hook) {
      return []
    }

    return Array.from(hook.entries()).map(([pluginName, callback]) => ({
      hookName,
      pluginName,
      callback: callback.toString()
    }))
  }

  /**
   * 获取所有钩子
   * @returns {Array} 钩子列表
   */
  getAllHooks() {
    return Array.from(this.hooks.keys())
  }

  /**
   * 日志记录
   * @param {string} message - 日志消息
   * @param {string} level - 日志级别
   */
  log(message, level = LOG_LEVELS.INFO) {
    if (!this.config.enableLogging) {
      return
    }

    const levels = Object.values(LOG_LEVELS)
    const currentLevelIndex = levels.indexOf(this.config.logLevel)
    const messageLevelIndex = levels.indexOf(level)

    if (messageLevelIndex <= currentLevelIndex) {
      const timestamp = new Date().toISOString()
      const logMessage = `[PluginManager] [${level.toUpperCase()}] ${timestamp}: ${message}`
      
      switch (level) {
        case LOG_LEVELS.ERROR:
          console.error(logMessage)
          break
        case LOG_LEVELS.WARN:
          console.warn(logMessage)
          break
        case LOG_LEVELS.INFO:
          console.info(logMessage)
          break
        case LOG_LEVELS.DEBUG:
          console.debug(logMessage)
          break
        default:
          console.log(logMessage)
      }
    }
  }

  /**
   * 设置配置
   * @param {Object} config - 配置对象
   */
  setConfig(config) {
    this.config = { ...this.config, ...config }
    this.log('配置更新成功', LOG_LEVELS.INFO)
  }

  /**
   * 获取配置
   * @returns {Object} 当前配置
   */
  getConfig() {
    return { ...this.config }
  }

  /**
   * 销毁插件管理器
   */
  destroy() {
    try {
      // 卸载所有插件
      for (const [name] of this.plugins.entries()) {
        this.unregisterPlugin(name)
      }

      // 清理钩子
      this.hooks.clear()

      this.log('插件管理器已销毁', LOG_LEVELS.INFO)
    } catch (error) {
      console.error('销毁插件管理器失败:', error)
    }
  }
}

// 创建单例实例
const pluginManager = new PluginManager()

export default pluginManager
