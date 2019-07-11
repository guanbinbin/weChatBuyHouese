const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper1:{
      imgUrls: [
        '../../images/index/head1.jpg',
        '../../images/index/head2.jpg',
        '../../images/index/head3.jpg'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
    swiper2: {
      content: [{
        text: '1111',
        imgUrl: '../../images/index/head1.jpg',
      }, {
          text: '1111',
          imgUrl: '../../images/index/head1.jpg',
        }, {
          text: '1111',
          imgUrl: '../../images/index/head1.jpg',
        }, {
          text: '1111',
          imgUrl: '../../images/index/head1.jpg',
        }, {
          text: '1111',
          imgUrl: '../../images/index/head1.jpg',
        }, {
          text: '1111',
          imgUrl: '../../images/index/head1.jpg',
        }],
       
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, 
    //推荐好房列表
    roomList:[
      { img:'../../images/index/house1.jpg',
      title:'首月免租 月月返现 近地铁站',
      addr:'双流区-茶店子-龙祥佳苑',
      subTitle:['合租','朝南','近地铁'],
      price:'820元/月',
      size:'97.24',
      room:'三室一厅'},
      {
        img: '../../images/index/house2.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅'
      },
      {
        img: '../../images/index/house3.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅'
      },
      {
        img: '../../images/index/house4.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅'
      },
      {
        img: '../../images/index/house5.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅'
      },
      {
        img: '../../images/index/house6.jpg',
        title: '首月免租 月月返现 近地铁站',
        addr: '双流区-茶店子-龙祥佳苑',
        subTitle: ['合租', '朝南', '近地铁'],
        price: '820元/月',
        size: '97.24',
        room: '三室一厅'
      }
    ],
    //底部导航栏配置
    tabbar: {
      color: "#000000",
      selectedColor: "#000000",
      backgroundColor: "rgb(247,247,250)",
      borderStyle: "rgb(194,194,196)",
      list: [
        {
          pagePath: "../index/index",
          text: "首页",
          iconPath: "../../img/home.png",
          selectedIconPath: "../../img/home.png",
          selected: true
        },
        {
          pagePath: "../userCenter/userCenter",
          text: "我的信息",
          iconPath: "../../img/myinfo.png",
          selectedIconPath: "../../img/myinfo.png",
          selected: false
        }
      ],
      position: "bottom"
    }
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