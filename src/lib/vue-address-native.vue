<template>
  <transition name="address-fade">
    <div class="address"
         v-show="showDialog">
      <div class="address-dialog"
           @click.stop="closeAddress"
           @touchmove.prevent="noopfn"
           v-show="showDialog"></div>
      <transition name="address-slide">
        <div class="address-wrap"
             v-show="showSlide">
          <header class="address-tip" @touchmove.prevent="noopfn">收货地址</header>
          <div class="address-tab" @touchmove.prevent="noopfn">
            <ul class="address-tab--list">
              <li v-for="(item, index) in select"
                  @click.stop="changeTab(index)"
                  :class="{'address-tab--active': index === activeTab}"
                  :key="item.code">{{item.name}}</li>
            </ul>
          </div>
          <scroll-container class="address-content"
                   ref="addressContent">
            <ul>
              <li v-for="(value, key) in showList"
                  :key="key"
                  class="address-content--item"
                  :class="{'address-item--active': key === select[activeTab].code}"
                  @click.stop="changeSelect(value, key)">{{value}}</li>
            </ul>
          </scroll-container>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import chinaData from './assets/china-data.js'
import scrollContainer from './scroll-container'
export default {
  name: 'vue-address',
  components: {
    scrollContainer
  },
  model: {
    prop: 'show',
    event: 'on-change'
  },
  props: {
    defaultAddress: Array,
    show: Boolean
  },
  data () {
    return {
      showSlide: false,
      showDialog: false,
      activeTab: 0,
      select: [{
        name: '请选择',
        code: ''
      }]
    }
  },
  watch: {
    defaultAddress () {
      this.initAddress()
    },
    show (val) {
      if (val) {
        this.showDialog = val
        setTimeout(() => {
          this.showSlide = val
        }, 100)
      } else {
        this.showSlide = val
        setTimeout(() => {
          this.showDialog = val
        }, 100)
      }
    }
  },
  computed: {
    showList () {
      let selectItem = this.select[this.activeTab - 1]
      let code = selectItem ? selectItem.code : '86'
      return this.getListByCode(code)
    }
  },
  methods: {
    noopfn () { },
    fixIosScrolling () {
      this.$nextTick(() => {
        this.$refs.addressContent.$el.scrollTop = 1
      })
    },
    closeAddress () {
      this.$emit('on-change')
    },
    changeTab (index) {
      this.activeTab = index
      this.fixIosScrolling()
    },
    changeSelect (val, key) {
      let item = {
        name: val,
        code: key
      }
      this.select[this.activeTab] = item
      this.select.splice(this.activeTab + 1)
      this.activeTab += 1
      if (Object.keys(this.showList).length > 0) {
        this.select.push({
          name: '请选择',
          code: ''
        })
      } else {
        this.activeTab -= 1
        this.$emit('on-select', JSON.parse(JSON.stringify(this.select)))
        this.$emit('on-change')
      }
      this.fixIosScrolling()
    },
    getListByCode (code) {
      return chinaData[code] || {}
    },
    getCodeByName (name) {
      for (let x in chinaData) {
        for (let y in chinaData[x]) {
          if (name === chinaData[x][y]) {
            return y
          }
        }
      }
      return ''
    },
    getNameByCode (code) {
      for (let x in chinaData) {
        for (let y in chinaData[x]) {
          if (~~code === ~~y) {
            return chinaData[x][y]
          }
        }
      }
      return ''
    },
    initAddress () {
      if (this.defaultAddress) {
        let select = []
        this.defaultAddress.forEach(name => {
          let code = this.getCodeByName(name)
          select.push({
            name,
            code
          })
        })
        this.select = select
        this.activeTab = select.length - 1
      }
    }
  },
  created () {
    this.initAddress()
  }
}
</script>

<style lang="less">
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.address-fade-enter-active,
.address-fade-leave-active {
  transition: opacity 0.3s;
}
.address-fade-enter,
.address-fade-leave-to {
  opacity: 0;
}
.address-slide-enter-active,
.address-slide-leave-active {
  transition: all 0.24s ease-out;
}
.address-slide-enter,
.address-slide-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}

.address-item--acitve {
  color: #3278ee;
}
.address-tab--active {
  color: #3278ee;
  border-bottom: 1px solid #3278ee;
}
.address {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.6);
}
.address-dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 301;
}
.address-wrap {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fbfbfb;
  z-index: 302;
}
.address-tip {
  padding: 10px 0;
  font-size: 14px;
  color: #83889a;
}
.address-tab {
  border-bottom: 1px solid #eee;
}
.address-tab--list {
  display: flex;
  font-size: 12px;
  li {
    padding: 8px;
    margin-right: 10px;
  }
}
.address-content {
  height: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.address-content--item {
  font-size: 12px;
  padding: 8px;
  text-align: left;
}
</style>
