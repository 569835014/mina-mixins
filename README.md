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
app.js:
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
