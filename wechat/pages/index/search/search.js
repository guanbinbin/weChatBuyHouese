const app = getApp();
Page({ 
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '搜索房源', //导航栏 中间的标题
      indexUrl:'../index'
    },
    height: app.globalData.height * 2 + 20, 
    historyData: ["仁和春天", "火车南站", "中德英伦联邦", "伊藤洋华堂", "高新区", "郫县", "仁和春天", "火车南站", "中德英伦联邦", "伊藤洋华堂", "高新区", "郫县"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取输入框的值
  getInput: function (e) {
    this.setData({
      searchContent: e.detail.value,
    });
    console.log("搜索框输入内容：" + this.data.searchContent)
  },
  //手机键盘输入确认
  searchConfirm: function () {
    console.log("跳转到房源列表页......");
    wx.navigateTo({
      url: '../../housePart/houseList/houseList?content=' + this.data.searchContent
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