<template>
  <div class="myMedal-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>我的奖牌</div>
    </div>
    <div class="contentWrapper">
      <div class="containerOfMine" v-show="!isShowRankingCenter">
        <div class="item">
          <div class="title">累计金牌</div>
          <div>
            <img src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png"/>
          </div>
          <div class="score">{{numOfChampion}} 枚</div>
        </div>
        <div class="item">
          <div class="title">累计银牌</div>
          <div>
            <img src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png"/>
          </div>
          <div class="score">{{numOfSecond}} 枚</div>
        </div>
        <div class="item">
          <div class="title">累计铜牌</div>
          <div>
            <img src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png"/>
          </div>
          <div class="score">{{numOfThird}} 枚</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      numOfChampion: 100,
      numOfSecond: 100,
      numOfThird: 100,
    }
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 48px;
}
.containerOfMine {
  display: flex;
  justify-content: space-around;
  padding: 10px 10px 0 10px;
}
.containerOfMine img {
  width: 40%;
}
.containerOfMine .item {
  box-sizing: border-box;
  padding-top: 20px;
  width: 32%;
  text-align: center;
  flex-grow: 0;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #fff;
}
.containerOfMine .item .title {
  margin-bottom: 10px;
  color: #999;
}
.containerOfMine .item .score {
  margin-bottom: 10px;
  color: #60c38b;
  font-size: 24px;
}
.containerOfMine .item .txt {
  padding: 10px 0;
  color: #aaa;
  border-top: 1px solid #e5e5e5;
}
</style>