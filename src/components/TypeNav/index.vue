<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件委托 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 编程式导航+事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类 使用js完成二三级分类的隐藏-->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">易购超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash全部功能函数
// import _ from 'lodash';
// 按需引入lodash
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移动上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发送请求
  mounted() {
    // 通知vuex发送请求，获取数据，存储于仓库中，此处发送请求会执行多次，只要这个组件调用一次就会发送一次请求
    // this.$store.dispatch("categoryList");
    // 判断在那个路由挂载成功，不是Home就隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 16),
    }),
  },
  methods: {
    // 鼠标进入，修改currentIndex数据, throttle函数不要使用箭头函数
    changeIndex: throttle(function (index) {
      // 使用节流，防止用户操作过快，导致浏览器卡顿，二三级分类无法及时响应
      this.currentIndex = index;
    }, 50),
    // 跳转至search页面的回调
    goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let element = event.target;
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //点击的到底是不是a标签（只要这个标签身上带有categoryname）就一定是a标签
      // 为什么是categoryname，在浏览器编译时会把驼峰写法自动转为categoryname
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数，顺便传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态给location配置对象添加query属性
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入时，商品分类列表展示
    enterShow() {
      this.show = true;
    },
    // 当鼠标移出时，商品分类隐藏
    leaveIndex() {
      // 如果当前所在路由不是home时才会执行
      if (this.$route.path != "/home") {
        this.currentIndex = -1;
        this.show = false;
      } else {
        this.currentIndex = -1
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 使用css样式隐藏二三级样式
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // .item:hover {
        //   background-color: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter { 
      height: 0px;
    }
    // 过渡动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all .5s linear;
      overflow: hidden;
    }
  }
}
</style>