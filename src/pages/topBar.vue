<template>
  <div class="topBar">
    <div class="icon">
      <img class="img" src="../assets/music.png" />
    </div>
    <div class="search">
      <input class="inp" v-model.trim="searchWord" placeholder="请输入搜索关键词" />
      <img class="simg" src="../assets/search.png" />
    </div>
    <div class="user">
      <img v-if="!isLogin" class="adv" src="http://p3.music.126.net/QomeEmqE2cBi2w7Fk3UNcQ==/109951166891321876.jpg?param=30y30" />
      <span v-if="!isLogin" class="name">用户名*%￥#5仔</span>
      <span v-if="isLogin" class="login" @click="showPup = true">登 录</span>
    </div>
    <van-overlay :show="showPup" style="background-color: rgba(0,0,0,0.5)" @click="showPup = false" >
      <div class="wrapper" @click.stop>
        <div class="item">
          <div class="label">账号：</div>
          <div class="value">
            <input class="inp" v-model="form.account" placeholder="请输入用户手机号" />
          </div>
        </div>
        <div class="item">
          <div class="label">密码：</div>
          <div class="value">
            <input class="inp" type="password" v-model="form.pasWord" placeholder="请输入用户密码" />
          </div>
        </div>
        <div class="btn">
          <div class="logBtn">登 录</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: 'topBar',
  data() {
    return {
      searchWord: '',
      isLogin: true,
      showPup: false,
      form: {
        account: '17602985178',
        pasWord: 'kxk1004816'
      }
    }
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.topBar{
  height: 50px;
  line-height: 50px;
  background: #f5f5f5;
  position: relative;
  .icon{
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    top: 5px;
    margin-left: 30px;
    .img{
      width: 36px;
      height: 36px;
      position: absolute;
    }
  }
  .search{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    position: absolute;
    left: 120px;
    top: 0;
    .inp{
      width: 220px;
      height: 30px;
      line-height: 30px;
      outline: none;
      border: 1px solid #cccccc;
      padding-right: 33px;
      padding-left: 10px;
      border-radius: 15px;
    }
    .simg{
      width: 20px;
      height: 20px;
      position: absolute;
      top: 15px;
      right: 12px;
    }
  }
  .user{
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: 0;
    right: 30px;
    .adv{
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .name{
      margin-left: 5px;
    }
    .login{
      display: block;
      padding: 0 8px;
      font-size: 16px;
      color: #2540f0;
      font-weight: bold;
    }
  }
}
.wrapper{
  width: 285px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .item{
    height: 32px;
    line-height: 32px;
    margin-bottom: 20px;
    .label{
      display: inline-block;
    }
    .value{
      display: inline-block;
      .inp{
        width: 200px;
        height: 30px;
        line-height: 30px;
        outline: none;
        border: 1px solid #999;
        padding: 0 10px;
      }
    }
  }
  .btn{
    .logBtn{
      height: 32px;
      line-height: 32px;
      width: 150px;
      border-radius: 6px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      background: #2c7bf1;
      margin: 0 auto;
    }
  }
}
</style>
