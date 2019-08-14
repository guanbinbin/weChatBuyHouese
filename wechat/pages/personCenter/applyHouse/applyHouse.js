const app = getApp();
Page({
 
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '申请房源', //导航栏 中间的标题
      indexUrl: "../../index/index"
    },
    height: app.globalData.height * 2 + 20,
    roomList: [
      {
        img: '../../../images/index/house1.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅',
        id: "1"
      },
      {
        img: '../../../images/index/house2.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅',
        id: "2"
      },
      {
        img: '../../../images/index/house3.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅',
        id: "3"
      },
      {
        img: '../../../images/index/house4.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅',
        id: "4"
      },
      {
        img: '../../../images/index/house5.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅',
        id: "5"
      },
      {
        img: '../../../images/index/house6.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅',
        id: "6"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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