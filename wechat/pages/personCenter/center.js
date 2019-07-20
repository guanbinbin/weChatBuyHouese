const app = getApp();
Page({ 
  data: {
    userInfo:{
      image:"../../images/people/test.jpg"
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, 
  }, 
  onLoad: function (options) {
    
  },
  jumpToMyhouse:function(e){
    console.log("跳转到我的房源......");
    //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: 'myHouse/myHouse'
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