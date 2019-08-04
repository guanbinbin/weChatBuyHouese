const app = getApp();
var that;
// pages/housePart/houseList/houseList.js
Page({
  data: {
    top:false,
    topStyle:'',
    roomList: [],
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
    data2: [{ id: 0, title: '不限',}],
    data3: [{ id: 0, title: '不限', }],
      //查询条件对象
    searchData: {
      title:'',
      regionCode: '',
      priceMin: '',
      priceMax: '',

      roomTypeInfo: '',

      roomAreaMin: '',
      roomAreaMax: '',
      roomAgeMin: '',
      roomAgeMax: '',
      propertyType: '',
      labelId: '',
    }
     
  }, 
  onLoad: function (options) {
  that = this;
  console.log("获取上一页面传来的参数......");

  //var content = options.content;
    var content = "";
  console.log("content:"+content);
  var title = 'searchData.title';
  that.setData({
    [title]: content
  })
  this.getRoomList();
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
    wx.showToast({
      title:'',
      duration: 15000,
      icon: 'loading',
      mask: true
    });
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data: that.data.searchData,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res);
        wx.hideToast();
        if (res.data.code == 0) {
          if(res.data.data.length>0){
            for (let i = 0; i < res.data.data.length;i++){
            var item = {};
              item.img = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].houseResources.id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
              item.addr = "成都市-" + res.data.data[i].houseResources.regionName + "-" + res.data.data[i].houseResources.vilageName;

              item.subTitle=[];
              var labels = res.data.data[i].houseResources.houseLabelList; 
              if (labels.length>0){
                if(labels.length>4){
                  labels.length=4;
                }
                for (let i = 0; i < labels.length;i++){
                  item.subTitle.push(labels[i].labelName);
                } 
              } 

              item.price = res.data.data[i].houseResources.price+"万";
              item.room = res.data.data[i].houseResources.roomTypeInfo;
              item.size = res.data.data[i].houseResources.houseArea;
              item.resourceId = res.data.data[i].houseResources.id;
              that.data.roomList.push(item);
            }
           that.setData({
             roomList: that.data.roomList
           })
          }else{
            wx.hideToast();
            wx.showToast({
              title: '暂无房源信息',
              duration: 15000, 
              mask: true
            });
          }
        }  
      }
    });
  },
  getInput: function (e) {
    var title = "searchData.title"
    this.setData({
      [title]: e.detail.value,
    });
    console.log("搜索框输入内容：" + this.data.searchContent)
  },
  searchConfirm(){
  that.getRoomList();
  },
  selectedItem: function (e) {
    console.log("搜索参数返回：");
    console.log(e.detail);
    var data = e.detail; 
    data.title = that.data.searchData.title;
    that.setData({
      searchData:data
    })
    that.getRoomList()
    /*wx.request({
      url: app.globalData.hostUrl + '/area/hierarchicalArea',
      data: data,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
           
        } else {
          console.log("区域获取失败");
        }
      }
    });*/
  },
  //跳转到房源详情页
  jumpToDetail: function (e) {
    console.log("跳转到房源详情页......");
    console.log(e.currentTarget.dataset);
    console.log('../houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" + e.currentTarget.dataset.resourceid)
    wx.navigateTo({
      url: '../houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" +e.currentTarget.dataset.resourceid
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