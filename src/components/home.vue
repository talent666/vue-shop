<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div class="logo_box">
        <img src="../assets/img/heima.png" alt>
        <span class="header_text">电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside  :width="collapseLock?'65px':'200px'">
        <el-col>
            <div class="fold" @click="collapseLock=!collapseLock">|||</div>
          <el-menu
            default-active="1"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse="collapseLock"
            :collapse-transition="false"
            :style="collapseLock ? 'width:65px;' : 'width:200px;'"
            :router="true"
          >
            <el-submenu :index="k+''" v-for="(item,k) in menuList" :key="item.id" >
              <template slot="title">
                <i :class="'iconfont'+' '+iconfontArr[k]"></i>
                <span>{{ item.authName }}</span>
              </template>
                
                <el-menu-item :index="'/'+item1.path"  v-for="(item1) in item.children" :key="item1.id">
                  <i class="el-icon-menu"></i>
                  {{ item1.authName }}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getList()
  },
  data() {
    return {
      menuList: [],
      iconfontArr: ['icon-users','icon-tijikongjian','icon-shangpin','icon-danju','icon-baobiao'],
      collapseLock: false
    }
  },
  methods: {
    async getList() {
      let { data: res } = await this.$http.get('/menus')
      this.menuList = res.data
      console.log(this.menuList)
    },
    logout() {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/login')
          window.sessionStorage.removeItem('token')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    color: #fff;
    .logo_box {
      display: flex;
      height: 50px;
      line-height: 50px;
    }
    img {
      line-height: middle;
      margin-right: 10px;
      width: 50px;
      height: 50px;
    }
  }
  .el-aside {
    background-color: rgb(51, 55, 68);
    .fold {
      text-align: center;
      font-size: 12px;
      letter-spacing: 0.1em;
      height: 25px;
      color: #fff;
      line-height: 25px;
      background-color: rgb(74, 80, 100);
      cursor: pointer;
    }
    .el-submenu {
      .el-submenu__title{
        width: 200px;
      }
      .el-menu-item {
        width: 200px;
      }
      .iconfont {
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background-color: rgb(234, 237, 241);
  }
}
</style>
