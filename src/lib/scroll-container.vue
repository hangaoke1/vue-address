<template>
  <div ref="scrollContainer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    initEvent () {
      const container = this.$refs.scrollContainer
      let start
      let end
      this.touchStart = event => {
        start = event.targetTouches[0].clientY
      }
      this.touchMove = event => {
        const clientHeight = container.clientHeight
        const direction = start - end
        end = event.targetTouches[0].clientY
        if ((direction < 0 && container.scrollTop === 0) || (direction > 0 && container.scrollTop + clientHeight === container.scrollHeight)) {
          event.preventDefault()
        }
      }
      container.addEventListener('touchstart', this.touchStart)
      container.addEventListener('touchmove', this.touchMove)
    }
  },
  mounted () {
    this.initEvent()
  },
  destroyed () {
    const container = this.$refs.scrollContainer
    container.removeEventListener('touchstart', this.touchStart)
    container.removeEventListener('touchmove', this.touchMove)
  }
}
</script>
