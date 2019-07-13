const app = getApp();
// pages/housePart/houseDetail/houseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      imgUrls: [
        '../../../images/index/house1.jpg',
        '../../../images/index/house2.jpg',
        '../../../images/index/house3.jpg',
        '../../../images/index/house4.jpg',
        '../../../images/index/house5.jpg',
        '../../../images/index/house6.jpg'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '房源详情', //导航栏 中间的标题
      
    },
    height: app.globalData.height * 2 + 20,
    contactHeight:7,
    salerInfo:{
      image:"../../../images/people/test.jpg",
      name:"Tansy"
    }, 
    houseDetail:{
      price:"98万",
      title:'开发商直售 | 英郡三期三居室出售', 
      room:"3室1厅1卫",
      floor:"中/6层",
      size:"97.24",
      right:"共有",
      subTitle: ['近地铁', '配套齐全', '精装修', '有车位', '中央空调', '有电梯', '有沙发'],
      distribution:[{
        title:"核心卖点",
        content:"此房满5年，中间楼层三层，精装修，南向正规三局一厅室，随时可签约。"
      }, {
        title: "户型介绍",
        content: "此房满5年，中间楼层三层，精装修，南向正规三局一厅室，随时可签约。"
      },
      {
        title: "装修描述",
        content: "此房满5年，中间楼层三层，精装修，南向正规三局一厅室，随时可签约。"
      },
      {
        title: "居住感受",
        content: "此房满5年，中间楼层三层，精装修，南向正规三局一厅室，随时可签约。"
      },]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("接收上个页面传递来的参数......");
    var id = options.id;
    console.log("id："+id);
    this.getRoomDetail(id);
  },
  getRoomDetail:function(id){
  console.log("查询房间详情内容");
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