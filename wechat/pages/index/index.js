const app = getApp();
var that;
Page({ 
  data: {
    //输入框的输入内容
    searchContent:'', 
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
        title: '万科璟南堂今日...',
        price:"200万",
        addr:"双流区-茶店子-龙祥佳苑",
        imgUrl: '../../images/index/head1.jpg',
      }, {
          title: '万科璟南堂今日...',
          price: "200万",
          imgUrl: '../../images/index/head1.jpg',
        }, {
          title: '万科璟南堂今日...',
          price: "200万",
          imgUrl: '../../images/index/head1.jpg',
        }, {
          title: '万科璟南堂今日...',
          price: "200万",
          imgUrl: '../../images/index/head1.jpg',
        }, {
          title: '万科璟南堂今日...',
          price: "200万",
          imgUrl: '../../images/index/head1.jpg',
        }, {
          title: '万科璟南堂今日...',
          price: "200万",
          imgUrl: '../../images/index/head1.jpg',
        }],
       
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, 
    //推荐好房列表
    roomList:[],
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
  //跳转到房源详情页
  jumpToDetail:function(e){ 
    console.log("跳转到房源详情页......");
    console.log(e.currentTarget.dataset);
    console.log('../houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" + e.currentTarget.dataset.resourceid)
    wx.navigateTo({
      url: '../housePart/houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" + e.currentTarget.dataset.resourceid
    })
  }, 
  jumpToList(e) {
    console.log("跳转到房源列表页......");
    console.log(e.currentTarget.dataset);
    var option = e.currentTarget.dataset; 
    wx.navigateTo({
      url: '../housePart/houseList/houseList?content=&type=' + option.type
    })
  },
  //显示搜索页面
  jumpToSearchPage:function(){
    console.log("跳转到搜索页面......");
    wx.navigateTo({
      url: '../index/search/search'
    })
  },
  getRecommedHouse:function(){ 
    wx.showToast({
      title: '',
      duration: 15000,
      icon: 'loading',
      mask: true
    }); 
    console.log(that.data.searchData);
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data:{
        pageNum:1,
        size:10,
        isRecommend:""
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      fail(){
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success(res) {
        console.log(res);
        wx.hideToast();
        if (res.data.code == 0) {
          if (res.data.data == null) {
            wx.hideToast();
            wx.showToast({
              title: '暂无推荐房源信息',
              duration: 1500,
              icon: 'none',
              mask: false
            });
            that.setData({
              roomList: [], 
            })
            return
          }
          if (res.data.data.length > 0) {  
            that.setData({
              roomList: [], 
            })
            for (let i = 0; i < res.data.data.length; i++) {
              var item = {}; 
              item.img = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].houseResources.id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
              if (item.title.length > 12) {
                item.title = item.title.substr(0, 11) + "..."
              }
              item.addr = "成都市-" + res.data.data[i].houseResources.regionName + "-" + res.data.data[i].houseResources.vilageName;

              item.subTitle = [];
              var labels = res.data.data[i].houseResources.houseLabelList;
              if (labels.length > 0) {
                if (labels.length > 4) {
                  labels.length = 4;
                }
                for (let i = 0; i < labels.length; i++) {
                  item.subTitle.push(labels[i].labelName);
                }
              }

              item.price = res.data.data[i].houseResources.price + "万";
              item.room = res.data.data[i].houseResources.roomTypeInfo;
              item.size = res.data.data[i].houseResources.houseArea;
              item.resourceId = res.data.data[i].houseResources.id;
              that.data.roomList.push(item);
            }
            that.setData({
              roomList: that.data.roomList
            })
          } else {
            wx.hideToast();
            wx.showToast({
              title: '暂无推荐房源信息',
              duration: 1500,
              icon: 'none',
              mask: false
            });
            that.setData({
              roomList: [], 
            })
          }
        }

        that.getNewHouse();
      }
    });
  },
  getNewHouse(){
    wx.showToast({
      title: '',
      duration: 15000,
      icon: 'loading',
      mask: true
    }); 
    var newRoomList = "swiper2.content" 
    that.setData({
      [newRoomList]:[]
    })
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data: {
        pageNum: 1,
        size: 10, 
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      }, 
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success(res) {
        console.log(res);
        
        wx.hideToast();
        if (res.data.code == 0) {
          if (res.data.data == null) {
            wx.hideToast();
            wx.showToast({
              title: '暂无最新房源信息',
              duration: 1500,
              icon: 'none',
              mask: false
            });
            that.setData({
              [newRoomList]: []
            })
            return
          }
          if (res.data.data.length > 0) {
            that.setData({
              [newRoomList]: []
            })
            var roomList = [];
            for (let i = 0; i < res.data.data.length; i++) {
              var item = {};
              item.imgUrl = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].houseResources.id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
              if (item.title.length > 9) {
                item.title = item.title.substr(0, 8) + "..."
              }
              item.addr = "成都市-" + res.data.data[i].houseResources.regionName + "-" + res.data.data[i].houseResources.vilageName;
              if(item.addr.length>10){
                item.addr = item.addr.substr(0, 9) + "..."
              }
              item.subTitle = [];
              var labels = res.data.data[i].houseResources.houseLabelList;
              if (labels.length > 0) {
                if (labels.length > 4) {
                  labels.length = 4;
                }
                for (let i = 0; i < labels.length; i++) {
                  item.subTitle.push(labels[i].labelName);
                }
              }

              item.price = res.data.data[i].houseResources.price + "万";
              item.room = res.data.data[i].houseResources.roomTypeInfo;
              item.size = res.data.data[i].houseResources.houseArea;
              item.resourceId = res.data.data[i].houseResources.id;
              roomList.push(item);
            }
            that.setData({
              [newRoomList]: roomList
            })
          } else {
            wx.hideToast();
            wx.showToast({
              title: '暂无最新房源信息',
              duration: 1500,
              icon: 'none',
              mask: false
            });
            that.setData({
              [newRoomList]: [],
            })
          }
        } 
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
   console.log("展示最新房源...");
    this.getRecommedHouse();
  //  console.log("展示最新房源...");
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