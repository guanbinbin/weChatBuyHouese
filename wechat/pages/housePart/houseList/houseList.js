const app = getApp();
var that;
// pages/housePart/houseList/houseList.js
Page({
  data: {
    top:false,
    topStyle:'',
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
    ],
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '房源列表', //导航栏 中间的标题
      indexUrl: '../../index/index'
    },
    height: app.globalData.height * 2 + 20,
    //下拉组件参数
    dropDownMenuTitle: ['区域', '价格', '房型', '更多'],//['区域','价格','户型','排序'],
    data1: [
      {
        id: 0, title: '不限',
      } 
    ],
    data2: [
      { id: 1, title: '个人房源' },
      { id: 2, title: '经纪人房源' }],
    data3: [
      { id: 1, title: '出租' },
      { id: 2, title: '出售' }],
      //查询条件对象
      searchObj:{},
     
  }, 
  onLoad: function (options) {
  that = this;
  console.log("获取上一页面传来的参数......");
  var content = options.content;
  console.log("content:"+content);
  this.getRoomList(content);
  this.getArea();
  },
  getArea:function(){
    console.log("获取区域数据...");
    wx.request({
      url: app.globalData.hostUrl + '/area/hierarchicalArea',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res); 
        if (res.data.code == 0) {
          var obj = res.data.data[0].list[0]; 
          var regionObj = {};
          regionObj.childModel=[{
            id:'',title:'不限'
          }];
          regionObj.id=obj.area.id;
          regionObj.title=obj.area.name;
          for(let i=0;i<obj.list.length;i++){
            var item = {};
            item.id = obj.list[i].id;
            item.title = obj.list[i].name;
            regionObj.childModel.push(item);
          }
          that.data.data1.push(regionObj)
          that.setData({
            data1: that.data.data1
          })
          console.log(that.data.data1);
        } else {
          console.log("区域获取失败");
        }
      }
    });
  },
  getRoomList:function(params){
  console.log("获取房源列表......");
  },
  selectedItem: function (e) {
    console.log(e);
  },
  //跳转到房源详情页
  jumpToDetail: function (e) {
    console.log("跳转到房源详情页......");
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../houseDetail/houseDetail?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onPageScroll: function (e) {
    console.log(e);//{scrollTop:99}
    if(e.scrollTop>100){
    this.setData({
      top:true,
      topStyle:'top:'+this.data.height+'px'
    });
    }else{
      this.setData({
        top: false,
        topStyle:''

      });
    }
  },  
  onHide: function () {
  
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