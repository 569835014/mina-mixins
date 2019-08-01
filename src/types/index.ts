export type LifecycleType =
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
export type AssetsType = 'data' | 'events' | 'customData'
export interface Lifecycle<T> {
  onLoad?: T
  onShow?: T
  onReady?: T
  onHide?: T
  onUnload?: T
  onTitleClick?: T
  onPullDownRefresh?: T
  onReachBottom?: T
  onShareAppMessage?: T
}

export interface PageData {
  [propName: string]: any
}

export interface PageEvent {
  [propName: string]: () => any
}

export interface CustomData {
  [propName: string]: any
}
export type AssetsValueType = PageData | PageEvent | CustomData
export interface Assets {
  data?: PageData
  events?: PageEvent
  customData?: CustomData

  [propName: string]: any
}

export interface Options extends Lifecycle<() => void>, Assets {}

export interface PageOptions extends Options {
  mixins?: Array<Options>
  [propName: string]: any
}

export interface Page {
  (options: PageOptions): any
}

export interface LifecycleArrayType extends Lifecycle<Array<() => void>> {
  [propName: string]: any
}

export interface PageType extends Lifecycle<Array<() => void>> {
  data?: Array<PageData>
  events?: Array<PageEvent>
  customData?: Array<CustomData>

  [propName: string]: any
}

export interface IMixinStrategy {
  lifecycleStrategy(prop: LifecycleType, options: Options, lifecycleArray: Array<Function>): void
  assetsStrategy(prop: AssetsType, options: Options, assetsArray: Array<Assets>): void
  customStrategy(prop: string, options: Options, customArray: Array<any>): void
}

export interface IMixin extends IMixinStrategy {
  extend(page: Page): Page
  strategy(options: PageOptions): PageOptions
  use(strategy: IMixinStrategy): void
}

export interface MinaMixins {
  extend(page: Page): Page

  lifecycleStrategy(
    prop: LifecycleType,
    options: PageOptions,
    lifecycleArray: Array<Function>
  ): void

  lifestylesMixin?: (key: string, options: PageOptions, lifecycleArray: Array<Function>) => void
  assetsMixin?: (key: string, options: PageOptions, lifecycleArray: Array<Assets>) => void
  lifecycleMixinExtend?: (options: PageOptions, mixins: LifecycleArrayType) => void
}
