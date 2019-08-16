const app = getApp();
var that;
//
const APP_ID = 'wxe5fa3487aa7ea615';//输入小程序appid  
const APP_SECRET = '92e6aab17237ff9911e2d36e6009b660';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  

Page({ 
  data: {
    //
    loading:true,
    //输入框的输入内容
    searchContent:'', 
    swiper1:{
      imgUrls: [

        // '../../images/index/head1.jpg',
        // '../../images/index/head2.jpg',
        // '../../images/index/head3.jpg'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
    swiper2: {
      content: [
      //   {
      //   title: '万科璟南堂今日...',
      //   price:"200万",
      //   addr:"双流区-茶店子-龙祥佳苑",
      //   imgUrl: '../../images/index/head1.jpg',
      // }, {
      //     title: '万科璟南堂今日...',
      //     price: "200万",
      //     imgUrl: '../../images/index/head1.jpg',
      //   }, {
      //     title: '万科璟南堂今日...',
      //     price: "200万",
      //     imgUrl: '../../images/index/head1.jpg',
      //   }, {
      //     title: '万科璟南堂今日...',
      //     price: "200万",
      //     imgUrl: '../../images/index/head1.jpg',
      //   }, {
      //     title: '万科璟南堂今日...',
      //     price: "200万",
      //     imgUrl: '../../images/index/head1.jpg',
      //   }, {
      //     title: '万科璟南堂今日...',
      //     price: "200万",
      //     imgUrl: '../../images/index/head1.jpg',
      //   }
        ],
       
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
    },
    //
    iconList:[
      {
        img:"../../images/index/1.png",
        text:"地图找房", 
        type:"map"
      },
      {
        img: "../../images/index/2.png",
        text: "列表找房",
        type:"list"
      },
      {
        img: "../../images/index/3.png",
        text: "我要卖房",
        type:"sale"
      }
    ]
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
              loading: false
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
              roomList: that.data.roomList,
              loading: false
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
              loading:false
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

  getBanner(){
   wx.request({ 
     url: app.globalData.hostUrl + '/bannerurl/queryListWithNoPage',
     data: {
       isEffective:0,
       bannerScene:0
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
     console.log("banner");
     console.log(res.data);
     if(res.data.code==0){
      if(res.data.data.length>0){
        var obj = "swiper1.imgUrls";
        that.setData({
          [obj]: res.data.data
        })
      }else{
        var obj = "swiper1.imgUrls";
        that.setData({
          [obj]:{
            file: '../../images/index/head1.jpg',
            bannerValue:'',
            bannerType:''
          }
        })
      }
     }
     }
   })
  },
  //首页swiper跳转
  jumpToSwiper(e){
    var type = e.currentTarget.dataset.type;
    var value = e.currentTarget.dataset.value;
    if(type==0){
      console.log("网络链接");
      wx.navigateTo({
        url: 'webView/webView?src='+value
        //url: 'webView/webView?src=http:www.baidu.com' 
      })
    } else if (type == 1){
      console.log("具体房源");
      wx.navigateTo({
        url: '../housePart/houseDetail/houseDetail?id=&resourceId=' + value
      })
    }else{

    }
  },
  //首页icon跳转
  jumpToPage(e){
  console.log(e);
  if(e.currentTarget.dataset.type=="sale"){
   console.log("判断是否登录......");
    if (app.globalData.userInfo) {
      console.log("用户已登录 直接跳转");
      console.log(app.globalData);
      console.log(wx.getStorageSync('userId'));
      wx.navigateTo({
        url: './personCenter/myHouse/publishInfo/publishInfo',
      })
    } else {
      console.log("没有用户信息，需要授权");
      that.bindGetUserInfo();
    } 
} else if (e.currentTarget.dataset.type == "map"){
    wx.switchTab({
      url: '../map/map',
    })
  }else{
    wx.navigateTo({
      url: '../housePart/houseList/houseList?content=&type=new'
    })
  }
  },
   bindGetUserInfo(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showToast({
        title: '',
        duration: 15000,
        icon: 'loading',
        mask: true,
      })
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          //app.globalData.userInfo = res.userInfo;
          //console.log(app.globalData.userInfo);
          this.setData({
            userInfo: res.userInfo
          })
          console.log("获取openid...");
          that.getOpenId();
        }
      })
    }
    // else {
    //    wx.switchTab({
    //     url: '../index/index',
    //   })
    // }

  },
  getOpenId: function () {
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: app.globalData.hostUrl + "/wxInterface/getAccessToken",
          data: {
            //appid: APP_ID,
            //secret: APP_SECRET,
            code: res.code,
            // grant_type: 'authorization_code'
          },
          method: 'GET',
          fail() {
            wx.hideToast();
            wx.showToast({
              title: '服务器异常，请稍后重试',
              duration: 1500,
              icon: 'none',
              mask: false
            });
          },
          success: function (res) {
            console.log(res.data)
            console.log(app.globalData.userInfo)
            OPEN_ID = res.data.data.openid;//获取到的openid  
            SESSION_KEY = res.data.data.session_key;//获取到session_key  
            console.log(OPEN_ID);
            console.log(SESSION_KEY);

            that.isOurUser(OPEN_ID);
          }
        })
      }
    })
  },
  isOurUser: function (openId) {
    wx.request({
      url: app.globalData.hostUrl + "/userinfo/queryListWithNoPage",
      data: {
        openId: openId
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
        console.log(res.data);
        console.log("根据openid判断是否是我们的用户....");
        if (res.data.code == 0) {
          wx.hideToast();
          if (res.data.data.length == 0) {
            console.log("用户不存在进入注册页面....");
            wx.showModal({
              title: '提示',
              content: '我们没有找到您，您需要注册才能加入我们的用户哦',
              confirmText: '去注册',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../register/register?openid=' + openId + "&userName=" + that.data.userInfo.nickName + "&userInfo=" + JSON.stringify(that.data.userInfo) + "&type=sale"
                  })
                } else {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              }
            })

          } else { 
            app.globalData.userInfo = that.data.userInfo;
            wx.setStorageSync('userId', res.data.data[0].userId);
            console.log("根据openid判断是我们的用户，直接跳转到发布房源页面");
            wx.navigateTo({
              url: '../personCenter/myHouse/publishInfo/publishInfo',
            })
          }
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
   console.log("展示首页banner图...");
    this.getBanner();
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