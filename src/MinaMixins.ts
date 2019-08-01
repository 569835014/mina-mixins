import {
  Page,
  PageOptions,
  PageType,
  LifecycleType,
  AssetsType,
  IMixin,
  IMixinStrategy,
  Options,
  AssetsValueType
} from './types'
import { isPlainObject, isArray, deepMerge } from './util'

const assetsProp: Array<AssetsType> = ['data', 'events', 'customData']
const lifecycleProp: Array<LifecycleType> = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onTitleClick',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage'
]
const MixinStrategy: IMixinStrategy = {
  lifecycleStrategy(prop: LifecycleType, options: Options, lifecycleArray: Array<Function>): void {
    const pageLifecycle = options[prop]
    if (pageLifecycle && typeof pageLifecycle === 'function') {
      lifecycleArray.push(options[prop] as () => void)
    }
    // 同名生命周期函数全部触发
    options[prop] = function(this: Options, ...arg): void {
      lifecycleArray.forEach(fn => {
        fn.call(this, ...arg)
      })
    }
  },
  assetsStrategy(prop: AssetsType, options: Options, assetsArray: Array<AssetsValueType>): void {
    const pageAssets = options[prop]
    if (pageAssets) {
      assetsArray.push(pageAssets)
    }

    let page: object = {}
    assetsArray.forEach((assets: AssetsValueType) => {
      page = deepMerge(page, assets)
    })
    options[prop] = page as AssetsValueType
  },
  customStrategy(prop: string, options: Options, customArray: Array<any>): void {
    const pageCustom = options[prop]
    if (pageCustom) {
      customArray.push(pageCustom)
    }

    let page: object = {}
    customArray.forEach(custom => {
      page = deepMerge(page, custom)
    })
    options[prop] = page
  }
}

class Mixin implements IMixin {
  lifecycleStrategy = MixinStrategy.lifecycleStrategy
  assetsStrategy = MixinStrategy.assetsStrategy
  customStrategy = MixinStrategy.customStrategy

  extend(page: Page): Page {
    const self = this
    return function(this: Page, options: Options) {
      options = self.strategy(options)
      page(options)
    }
  }

  strategy(options: PageOptions): PageOptions {
    const mixins: Array<Options> | undefined = options.mixins
    if (!isArray(mixins)) return options
    if (mixins.length < 1) return options
    const propArray: PageType = {}
    mixins.forEach((mixin: Options) => {
      if (!isPlainObject(mixin)) return new Error('mixins的元素必须是一个对象')
      for (let [key, value] of Object.entries(mixin)) {
        if (!propArray[key]) {
          propArray[key] = []
        }
        propArray[key].push(value)
      }
    })
    for (let prop in propArray) {
      if (lifecycleProp.includes(prop as LifecycleType)) {
        this.lifecycleStrategy(prop as LifecycleType, options, propArray[prop])
      } else if (assetsProp.includes(prop as AssetsType)) {
        this.assetsStrategy(prop as AssetsType, options, propArray[prop])
      } else {
        this.customStrategy(prop, options, propArray[prop])
      }
    }
    options.mixins = undefined
    delete options.mixins
    return options
  }

  use(strategy: IMixinStrategy): void {
    this.lifecycleStrategy = strategy.lifecycleStrategy
    this.assetsStrategy = strategy.assetsStrategy
    this.customStrategy = strategy.customStrategy
  }
}

export { Mixin }
export default new Mixin()
