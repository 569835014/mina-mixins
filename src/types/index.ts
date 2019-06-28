export type LifecylceType =
  | 'onLoad'
  | 'onShow'
  | 'onReady'
  | 'onHide'
  | 'onUnload'
  | 'onTitleClick'
  | 'onPullDownRefresh'
  | 'onPullDownRefresh'
  | 'onReachBottom'
  | 'onShareAppMessage'

export interface Lifecylce<T> {
  onLoad?: T
  onShow?: T
  onReady?: T
  onHide?: T
  onUnload?:T
  onTitleClick?: T
  onPullDownRefresh?:T
  onReachBottom?: T
  onShareAppMessage?: T
}
export interface PageData {
  [propName:string]:any
}
export interface PageEvent {
  [propName:string]:()=>any
}
export interface CustomData {
  [propName:string]:any
}
export interface LifecylceArrayType extends Lifecylce<Array<()=>void>>{
  [propName:string]:any
}
export interface PageType extends Lifecylce<Array<()=>void>>{
  data?: Array<PageData>
  events?: Array<PageEvent>
  customData?:Array<CustomData>
  [propName:string]:any
}
export interface Assets {
  data?: PageData
  events?: PageEvent
  customData?:CustomData
  [propName:string]:any
}
export interface PageOptions extends Lifecylce<()=>void>,Assets {
  mixins?:Array<PageOptions>
  [propName:string]:any
}
export interface Page {
  (options:PageOptions):any
}
export interface MinaMixins {
  extend(page:Page):Page
  lifestylesMixin?:(key: string, options: PageOptions, lifecylceArray: Array<Function>)=>void
  assetsMixin?:(key: string, options: PageOptions, lifecylceArray: Array<Assets>)=>void
  lifecylceMixinExtend?:(options: PageOptions, mixins: LifecylceArrayType)=>void
}

export interface MinaMixinsStatic {
  minaMixins: MinaMixins
  lifestyles: Array<LifecylceType>
  use: (page:Page) => Page
}
