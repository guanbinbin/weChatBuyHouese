const app = getApp();
var that;
// pages/personCenter/myHouse/myHouse.js
Page({ 
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的房源', //导航栏 中间的标题
      indexUrl:"../../index/index"
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
    roomList: []
  }, 
  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({  // 获取当前设备的宽高
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });
    console.log("查询所有房源信息...");
    that.getMyhouseList(1,5)
  },
  getMyhouseList:function(page,size){
    this.loading = true;
    var type = "";
    var status = "";
    that.getList(type,status,page,size);
 },
  getList: (type, status,page, size)=>{
    wx.request({
      url: app.globalData.hostUrl + '/housereleasemanagement/queryListWithPage',
      data: {
        type:type,
        status:status,
        pageNum:page,
        size:size,
        isEffective:0,
        creator: wx.getStorageSync('userId')
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res.data); 
        if (res.data.code == 0) {
         if(res.data.data.length>0){
           that.createRoomListData(res.data.data);
         }else{
           console.log("无房源信息展示...");
         }
        }
      }
    });
  },
  createRoomListData:function(data){
    var roomList = [];
    var roomItem = {};
  for(let i=0;i<data.length;i++){
    roomItem={};
    if(data[i].type==0){
      if (data[i].status==0){
        roomItem.status="待审核";
      } else if (data[i].status == 2){
        roomItem.status = "审核不通过";
      }
    } else if (data[i].type==1){
      if (data[i].status == 0) {
        roomItem.status = "待勘察";
      } else if (data[i].status == 2) {
        roomItem.status = "勘察不通过";
      } else if (data[i].status==3){
        roomItem.status = "勘察数据修改申请中";
      }
    } else if (data[i].type==2){
      if (data[i].status == 1) {
        roomItem.status = "已上架";
      } else if (data[i].status == 3) {
        roomItem.status = "上架数据修改申请中";
      } else if (data[i].status == 0){
        roomItem.status = "勘察通过,待上架";
      }
    }else{
      if (data[i].status == 1) {
        roomItem.status = "已下架";
      } else if (data[i].status == 4) {
        roomItem.status = "下架申请中";
      } 
    }
    var imgPath = data[i].houseResources.houseFilePath.split(";");
    roomItem.imgPath = imgPath[0];
    roomItem.regionName = "成都市 - " + data[i].houseResources.regionName;
    roomItem.residential = data[i].houseResources.residential;//房屋地址
    roomItem.roomTypeInfo = data[i].houseResources.roomTypeInfo;
    roomItem.vilageName = data[i].houseResources.vilageName;
    roomItem.price = data[i].houseResources.price;
    roomItem.houseArea = data[i].houseResources.houseArea;
    roomItem.id = data[i].houseResources.id;
    roomList.push(roomItem)
  }
  that.setData({
    roomList: roomList
  })
  console.log(that.data.roomList);
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
      url: './publishInfoUpdate/publishInfoUpdate?id=' + e.currentTarget.dataset.id
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