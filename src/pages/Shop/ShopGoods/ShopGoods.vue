<template>
  <div>
    <div class="goods">
      <!--左侧列表-->
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: currentIndex === index}" @click="handleLeft(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧列表-->
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        scrollY: 0, // 右侧列表的滑动坐标(在滑动过程中实时的设置)
        tops: [] // 右侧所有li所组成的分类列表的数组（在初始化显示列表是设置）
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', () => { // 状态数据更新完之后立即调用
        this.$nextTick(() =>{
          // 必须在列表获取之后显示
          //  new BScroll('.menu-wrapper', {})
         //  new BScroll('.foods-wrapper', {})
          this._initScroll()
          this._initTops()
        })
      })
    },
    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),
      // 当前分类的下标
      currentIndex () {
        const {scrollY, tops} = this
        const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])

        // 每次currentIndex变化，左侧滚动到最新的分类项
        if (index !== this.index && this.leftScroll) {
          // 将最新的index保存起来
          this.index = index
          // 左侧滚动到最新分类项
          this.leftScroll.scrollToElement(this.$refs.leftUl.children[index], 300)
        }
        return index
      }

    },
    methods: {
      // 初始化滚动对象
      _initScroll () {
        // better-scroll 默认会阻止浏览器的原生 click 事件。
        // 当设置为 true，better-scroll 会派发一个 click 事件，
        // 我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true, // 分发自定义点击事件
        })
        this.rightScroll = new BScroll('.foods-wrapper', {
          probeType: 1,
          // probeType: 2,
          // probeType: 3
          click: true
        })
        // 给右侧绑定滚动监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', y, x)
          this.scrollY = Math.abs(y)
        })
        // 给右侧绑定滚动结束的监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', y, x)
          this.scrollY = Math.abs(y)
        })

      },
      // 初始化所有li的分类top
      _initTops () {
        // 统计tops
        const tops = []
        let top = 0
        tops.push(top)

        const lis = this.$refs.rightUl.getElementsByClassName('food-list-hook')

        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        // 更新tops状态数据
        this.tops = tops
        // console.log('tops', tops)
      },

      handleLeft (index) {
        // 右侧的坐标
        const top = this.tops[index]
        // 让右侧滑动到相应的位置
        // 设置scrollY为目标top
        this.scrollY = top
        // scrollTo(x, y, time, easing)
        this.rightScroll.scrollTo(0, -top, 300)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
