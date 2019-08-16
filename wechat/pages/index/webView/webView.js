const app = getApp();
Page({ 
  data: { 
      nvabarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '搜索房源', //导航栏 中间的标题
        indexUrl: '../index'
      },
      height: app.globalData.height * 2 + 20, 
      src:''
  }, 
  onLoad: function (options) {
    wx.setNavigationBarTitle({

      title: ""

    });
    this.setData({
      src:options.src
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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