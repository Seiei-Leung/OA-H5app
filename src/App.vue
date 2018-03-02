<!-- 首页,初始化为控制台 -->
<template>
  <div id="app">
    <!-- 顶部标题栏 -->
    <div class="header">
      衣讯通微OA
    </div>
    <!-- 用于页面跳转 以及 Tap台控制显示的内容 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- Tap台 -->
    <div class="tap">
      <ul>
        <li>
          <router-link to="/">
            <i class="icon-bubble2"></i>
            <p>消息</p>
          </router-link>
        </li>
        <li>
          <router-link to="/addressBook">
            <i class="icon-address-book"></i>
            <p>通讯录</p>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <i class="icon-table2"></i>
            <p>工作台</p>
          </router-link>
        </li>
        <li>
          <router-link to="/personalMsg">
            <i class="icon-user"></i>
            <p>我</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.header {
  background-color: #667e9c;
  color: #fff;
  text-align: center;
  font-size: 24px;
  line-height: 2em;
}
.tap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #eee;
  border-top: rgba(0, 0, 0, .1) 1px solid;
}
.tap li {    
  display: inline-block;
  float: left;
  padding: .2rem 0;
  width: 2.5rem;
  line-height: 1.5;
  text-align: center;
  font-size: .7em;
  color: #777;
}
.tap .router-link-exact-active{
  color: #67c1bc;
}
.tap li a{
  color: #777;
}
.tap li i{  
  font-size: .6rem;
}
</style>
