# x-address
基于vue的移动端地区选择组件

使用示例
```javascript
import Vue from 'vue'
import XAddress from 'x-address'
import 'x-address/dist/x-address.css'
Vue.use(XAddress)
```

```html
<template>
  <div id="app">
    <button @click="showAddress = !showAddress">选择地址</button>
    <p>{{select}}</p>
    <x-address v-model="showAddress"
               :default-address="defaultAddress"
               @on-select="handleOnSelect"></x-address>
  </div>
</template>

<script>
export default {
  name: 'address-demo',
  components: {
    XAddress
  },
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

#### x-address API

参数|说明|类型|默认值|可选值
-|-|-|-|-
| v-model | 显示/隐藏 | Boolean | false | true |
| defaultAddress | 默认选择地区 | Array | [] | ['浙江省', '杭州市', '余杭区'] |
