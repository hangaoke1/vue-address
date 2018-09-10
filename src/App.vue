<template>
  <div id="app">
    <button class="address-demo--button"
            @click="showAddress = !showAddress">选择地址</button>
    <p class="address-demo--select">{{select}}</p>
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

<style lang="less">
#app {
  text-align: center;
}
.address-demo--button {
  display: inline-block;
  width: 200px;
  height: 40px;
  margin-top: 100px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 5px;
  outline: none;
  background: #3f86ff;
}
.address-demo--select {
  font-size: 14px;
}
</style>
