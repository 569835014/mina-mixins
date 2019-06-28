import { Page, PageOptions, PageType, Assets,MinaMixinsStatic, LifecylceType,LifecylceArrayType } from './types'
import { isPlainObject, isArray, extend, deepMerge } from './util'
const assetsProp=['data','events','customData']
const lifecylce:Array<LifecylceType> = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onTitleClick', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage']
class MinaMixins {
  lifecylceMixin(key: string, options: PageOptions, lifecylceArray: Array<Function>): void {
    const value = options[key]
    options[key] = function(): void {
      let context=this
      let arg = Array.from(arguments)
      lifecylceArray.forEach((lifecylce) => {
        lifecylce.apply(context, arg)
      })
      value.apply(context, arg)
    }
  }
  assetsMixin(key: string, options: PageOptions, assetsArry: Array<Assets>): void {
    let page: any = {}
    if(assetsProp.includes(key)){
      assetsArry.forEach((assets: Assets) => {
        page =deepMerge(page,assets);
      })
      options[key] = deepMerge( page, options[key]);
    }else{
      options[key]=options[key]?options[key]:assetsArry[assetsArry.length - 1]
    }
  }
  lifecylceMixinExtend(options: PageOptions, mixins: LifecylceArrayType) {
    for (let key in mixins) {
      if (lifecylce.includes(key as LifecylceType)) {
        this.lifecylceMixin(key, options, mixins[key])
      } else {
        this.assetsMixin(key, options, mixins[key])
      }
    }
  }
  extend(page: Page): Page {
    let self:MinaMixins=this
    let oldPage:Page=page
    page = function(this:any,options: PageOptions): any {
      const mixins = options.mixins || []
      if (!isArray(mixins)) {
        return new Error('mixins必须是一个数组')
      }
      const mixinsArray: PageType = {}
      if(mixins.length>0){
        mixins.forEach((option: PageOptions) => {
          if (!isPlainObject(option)) return new Error('mixins的元素必须是一个对象')
          for (let [key, value] of Object.entries(option)) {
            if (!mixinsArray[key]) {
              mixinsArray[key] = []
            }
            mixinsArray[key].push(value)
          }
        })
        console.info()
        self.lifecylceMixinExtend(options,mixinsArray);
      }
      delete options.mixins
      oldPage(options);
    }

    return page
  }
}
export default new MinaMixins();

