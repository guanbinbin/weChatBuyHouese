const app = getApp();
// pages/personCenter/myHouse/myHouse.js
Page({ 
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的房源', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, 
    menuList: [{
      name: "全部房源"
    }, {
      name: "已审核房源"
    }, {
      name: "未审核房源"
    }],
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: '',
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
  onLoad: function (options) {
    wx.getSystemInfo({  // 获取当前设备的宽高
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  clickMenu: function (e) {
    var current = e.currentTarget.dataset.current //获取当前tab的index 
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({ currentTab: current })
    }
  },
  changeContent: function (e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 5
    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
  },
  jumpToPublish:function(e){
   console.log("跳转到发布房源页面.....");
    wx.navigateTo({
      url: '../myHouse/publishInfo/publishInfo'
    })
  },
  jumpToDetail:function(e){
    wx.navigateTo({
      url: '../../housePart/houseDetail/houseDetail?id=' + e.currentTarget.dataset.id
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