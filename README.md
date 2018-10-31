# vue-address
基于vue的移动端地区选择组件

demo地址: http://demo.hgaoke.com/address/index.html

TODO: 添加插件式调用

使用示例
```javascript
import Vue from 'vue'
import VueAddress from 'vue-address'
import 'vue-address/dist/vue-address.css'
Vue.use(VueAddress)
```

```html
<template>
  <div id="app">
    <button @click="showAddress = !showAddress">选择地址</button>
    <p>{{select}}</p>
    <vue-address v-model="showAddress"
                 :default-address="defaultAddress"
                 @on-select="handleOnSelect"></vue-address>
  </div>
</template>

<script>
export default {
  name: 'address-demo',
  data () {
    return {
      showAddress: false,
      select: [],
      defaultAddress: ['浙江省', '杭州市', '余杭区']
    }
  },
  methods: {
    handleOnSelect (val) {
      this.select = val
    }
  }
}
</script>

```

### 使用指南

#### vue-address 参数

参数|说明|类型|默认值|可选值
-|-|-|-|-
| v-model | 显示/隐藏 | Boolean | false | true |
| defaultAddress | 默认选择地区 | Array | [] | ['浙江省', '杭州市', '余杭区'] |

#### vue-address 事件

名称|说明|回调参数|
-|-|-
| on-select | 选择地址后触发 | Array<地址> |
