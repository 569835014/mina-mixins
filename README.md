### vue mixins 的小程序版实现

### 安装
```cmd
npm i mina-mixins
```
### 合并策略
- 生命周期依次触发混合数组中的同名周期，最后触发页面的同名周期
- data等属性依次合并，最后和页面data合并
- 自定义函数优先页面函数，数组中的同名函数以最后一个为准

### 使用
1.全局使用app.js:
```javascript
import minaMixins from 'mina-mixins'
Page=minaMixins.extend(Page);
```

页面组件
```javascript
Page({
  mixins:[mixin1,mixin2]
})
```

2.单独配置
````javascript
import minaMixins from 'mina-mixins'
Page(minaMixins.strategy({
//TODO
mixins:[mixin1,mixin2]
}))
````
### 自定义混合策略
可以使用use方法自定义自己的混合策略
```javascript
import minaMixins from 'mina-mixins'
minaMixins.use({
 //生命周期的混合策略
 lifecycleStrategy:()=>{},
  //data、custome、event的混合策略
  assetsStrategy:()=>{},
  //除以上两类的混合策略，自定义方法的混合策略
  customStrategy:()=>{}
})
```
> 参数说明：


| 名称       | 类型    |  描述  | 备注 |
    | --------   | -----:   | :----: | :----:|
    | prop        | string      |   配置项的key名称    | 列如生命周期策略里key为生命周期名称|
    | options        | object      |   当前页面的配置    |  -
    |    mixinArray     | Array      |   同名的配置混合后的数组    | 如：onHide混合和页面一共出现5次值[f,f,f,f,f]得函数数组
