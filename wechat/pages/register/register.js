const app = getApp();
var that;
var resourceId,id;
Page({ 
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '快速注册', //导航栏 中间的标题
      indexUrl: '../../index/index'
    },
    register:{
      telephone:'',
      validateCode:'',
      password:'',
      confirmPass:'',
      
    },
    openid:'',
    userName: '',
    height: app.globalData.height * 2 + 20,
    pass:false,
    userInfo:{},
    type:""
  },
  sendCode(){
  //验证手机号码
    that.data.register.telephone = that.data.register.telephone.replace(/\s+/g, "");
    console.log(that.data.register.telephone)
    if (!(/^1[34578]\d{9}$/.test(that.data.register.telephone))) {

      wx.showToast({

        title: '手机号码格式有误',

        duration: 2000,

        icon: 'none'

      });

      return 

    }
    wx.showToast({
      title: '正在发送中...',
      duration: 15000,
      icon: 'loading',
      mask:true
    });
    console.log("发动验证码接口...");
    wx.request({
      url: app.globalData.hostUrl + '/userinfo/verificationCode',
      data: {phone:that.data.register.telephone},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success(res) {
        console.log(res); 
        wx.hideToast();
        if (res.data.code == 0) {
          wx.showToast({

            title: '发送成功，请留意短信',

            duration: 2000,

            icon: 'none'

          }); 
        } else {
          wx.showToast({

            title: res.data.msg,

            duration: 2000,

            icon: 'none'

          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  that = this;
    console.log(options.userInfo);
    options.userInfo = JSON.parse(options.userInfo);
    console.log(options.userInfo);
    if (options.type =="collect"){
      console.log("收藏页面跳转而来...");
      resourceId = options.resourceId;
      id = options.id;
    }
    if(options.type=="sale"){
      console.log("主页跳转而来，链接到房源发布页..."); 
    }
  that.setData({
    openid:options.openid,
    userName:options.userName,
    userInfo:options.userInfo,
    type:options.type
  })
    // that.setData({
    //   openid: 'oHLc75ICRFekIMvTI4hTs6DIppOc',
    //   userName: 777
    // })
  },
 //yanzheng
  validate(){
  if(that.data.register.telephone==""){
    wx.showToast({

      title: '请输入手机号码',

      duration: 2000,

      icon: 'none'

    });
    return
  }else{
    if (!(/^1[34578]\d{9}$/.test(that.data.register.telephone))) {

      wx.showToast({

        title: '手机号码格式有误',

        duration: 2000,

        icon: 'none'

      });

      return

    }
  }
   if(that.data.register.validateCode==""){
    wx.showToast({

      title: '请输入验证码',

      duration: 2000,

      icon: 'none'

    });
    return 
  }
  //开始调用后台验证接口
    wx.request({
      url: app.globalData.hostUrl + '/userinfo/verification',
      data: {   
        phone: that.data.register.telephone,
        code:that.data.register.validateCode

      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '验证成功',
            duration: 1500,
            mask: 'false'
          });
          console.log("进入输入密码页面....");
          that.setData({
            pass: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            icon: 'none'
          });
           }
      }
    });
  },
  validateInput(e) {
    var validate = "register.validateCode"
    this.setData({
      [validate]:e.detail.value
    })
  },
  telephoneInput(e){
    var telephone = "register.telephone"
    this.setData({
      [telephone]: e.detail.value
    })
  },
  passwordInput(e){
    var password = "register.password"
    this.setData({
      [password]: e.detail.value
    })
  }, 
  confirmPassInput(e){
    var confirmPass = "register.confirmPass"
    this.setData({
      [confirmPass]: e.detail.value
    })
  },
  register(){
    if(that.data.register.password==""){
      wx.showToast({

        title: '请输入密码',

        duration: 2000,

        icon: 'none'

      });
      return
    }
    if (that.data.register.confirmPass == "") {
      wx.showToast({

        title: '请确认密码',

        duration: 2000,

        icon: 'none'

      });
      return
    }
    if (that.data.register.confirmPass != that.data.register.password){
      wx.showToast({

        title: '两次输入的密码不一致！',

        duration: 2000,

        icon: 'none'

      });
      return
    }
  console.log("用户注册.....");
    wx.request({
      url: app.globalData.hostUrl + '/userinfo/insert',
      data: {
        acountType:0,
        password:that.data.register.password,
        openId:that.data.openid,
        telePhone:that.data.register.telephone,
        userName: that.data.userName,
       },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '注册成功',
            duration: 15000,
            icon: 'loading',
            mask:true
          });
        app.globalData.userInfo = that.data.userInfo; 
        wx.setStorageSync('userId', res.data.data.userId); 
        if(that.data.type=="collect"){
          wx.navigateTo({
            url: '../housePart/houseDetail/houseDetail?id=' + id + "&resourceId=" + resourceId
          })
        } else if (that.data.type == "sale"){
          wx.navigateTo({
            url: '../personCenter/myHouse/publishInfo/publishInfo'
          })
        }else{
          wx.switchTab({
            url: '../personCenter/center',
            success: function (e) {
              wx.hideToast();
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          });
        }
        
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            icon: 'none'
          });

        }
      }
    });
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
    wx.stopPullDownRefresh(); 
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