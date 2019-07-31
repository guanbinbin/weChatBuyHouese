var that;
const APP_ID = 'wxe7a351c39c76c81d';//输入小程序appid  
const APP_SECRET = '8485584ecaf79325df005ba07108b7ab';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  
const app = getApp();
Page({ 
  data: {
    //授权弹窗
    showAuthBox:false,
    authPass:false,
    userInfo:{},
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, 
  }, 
  onLoad: function (options) {
    that = this;
    //判断有无用户信息
    if (app.globalData.userInfo) {
      console.log("已有用户信息，直接展示...");
      console.log(app.globalData);
      console.log(wx.getStorageSync('userId'));
      this.setData({
        userInfo: app.globalData.userInfo,
        showAuthBox: false,
        authPass: true
      })
    }else{
      this.setData({
        userInfo:{},
        showAuthBox: true,
        authPass: false
      })
    }
  },
  bindGetUserInfo:function(e){ 
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showToast({
        title: '',
        duration: 15000,
        icon: 'loading'
      })
      this.setData({
        showAuthBox: false
      });
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          //app.globalData.userInfo = res.userInfo;
          //console.log(app.globalData.userInfo);
          this.setData({
            userInfo: res.userInfo
          })
          console.log("获取openid...");
          that.getOpenId();
        }
      }) 
    }else{
      this.setData({
        showAuthBox: true,
        authPass:false
      });
      wx.switchTab({
        url: '../index/index',
      })
    }
    
  },
  getOpenId:function(){ 
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid  
            SESSION_KEY = res.data.session_key;//获取到session_key  
            console.log(OPEN_ID);
            console.log(SESSION_KEY.length);
            
            that.isOurUser(OPEN_ID);
          }
        })
      }
    }) 
  },
  //根据openid校验是否是我们的用户
  isOurUser:function(openId){
    wx.request({
      url: app.globalData.hostUrl + "/userinfo/queryListWithNoPage",
      data:{
        openId:openId
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res.data);
        console.log("根据openid判断是否是我们的用户...."); 
        if(res.data.code==0){
          wx.hideToast();
          if(res.data.data.length==0){
            console.log("用户不存在进入注册页面...."); 
            wx.showModal({
              title: '提示',
              content: '我们没有找到您，您需要注册才能加入我们的用户哦',
              confirmText:'去注册',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../register/register?openid=' + openId + "&userName=" + that.data.userInfo.nickName + "&userInfo=" + that.data.userInfo,
                  })
                } else {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              }
            }) 
           
          }else{ 
            console.log("用户存在回到个人中心页面...."); 
            app.globalData.userInfo = that.data.userInfo;
            that.setData({ 
              authPass: true
            })
            wx.setStorageSync('userId', res.data.data[0].userId); 
          }
        }
      }
    }) 
  
  },
  jumpToMyhouse:function(e){
    console.log("跳转到我的房源......"); 
    wx.navigateTo({
      url: 'myHouse/myHouse?'
    })
  },
  jumpToCommond: function (e) {
    console.log("跳转到推荐房源......");
    //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: 'commond/commond'
    })
  },
  jumpToApplyhouse: function (e) {
    console.log("跳转到购房申请......");
    //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: 'applyHouse/applyHouse'
    })
  },
  jumpToCollectPage:function(e){
    console.log("跳转到我的收藏页面......");
    wx.navigateTo({
      url: 'collections/collections'
    })
  },
  jumpToRecordsPage:function(){
    console.log("跳转到历史记录页面......");
    wx.navigateTo({
      url: 'records/records'
    })
  },
  jumpToQuestionPage: function () {
    console.log("跳转到问题反馈页面......");
    wx.navigateTo({
      url: 'collections/collections'
    })
  },
  jumpToUsPage: function () {
    console.log("跳转到关于我们页面......");
    wx.navigateTo({
      url: 'aboutUs/aboutUs'
    })
  },
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})