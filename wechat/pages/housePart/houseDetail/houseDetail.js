const app = getApp();
var that;
var resourceId,statusId,collectionId;
const APP_ID = 'wxe5fa3487aa7ea615';//输入小程序appid  
const APP_SECRET = '92e6aab17237ff9911e2d36e6009b660';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  
// pages/housePart/houseDetail/houseDetail.js
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    swiper: {
      imgUrls: [],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      userInfo:{}
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '房源详情', //导航栏 中间的标题
      indexUrl:'../../index/index'
      
    },
    height: app.globalData.height * 2 + 20,
    contactHeight:7,
    salerInfo:{
      image:"../../../images/people/test.png",
      name:"Tansy",
      point:"置业顾问"
    }, 
    houseDetail:{},
    subTitle:[],
    isLogin:false,
    collect:false,
    //
    onsale:false,
    deal:false,
    //
    longitude:10,
    latitude:10,
    map:false,
    markers:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    console.log("接收上个页面传递来的参数......");
    console.log(options)
    var id = options.id;
    statusId = id;
    resourceId = options.resourceId;
    console.log("id："+id);
    console.log("resourceId：" + resourceId);
    this.getRoomDetail(id);
    if (app.globalData.userInfo){
      that.setData({
        isLogin:true
      })
      console.log("已有用户信息，调用收藏接口...");
      console.log(app.globalData);
      console.log(wx.getStorageSync('userId'));
      var userId = wx.getStorageSync('userId');
      this.getCollect(resourceId, userId);
      //新增用户查看记录
      this.viewRecord(resourceId, userId);
    }else{
      that.setData({
        isLogin: false
      })
      console.log("没有用户信息，状态还是未收藏");
    }
   },
   //新增查看记录
  viewRecord(resourceId, userId){ 
    wx.request({
      url: app.globalData.hostUrl + '/propertybrowsehistory/insert',
      method: "POST",
      data: {
        resourcesId: resourceId,
        userId: userId
      }
    })
  },
  //打电话
  callNumber(){
    wx.makePhoneCall({
      phoneNumber: '17098335652' //仅为示例，并非真实的电话号码
    })
  },
  getCollect(resourceId,userId){
  wx.request({
    url: app.globalData.hostUrl + '/housecollection/queryListWithNoPage',
    data:{
      sharePath: "/pages/housePart/houseDetail/houseDetail?id=" +statusId+ " & resourceId="+resourceId,
      resourcesId: resourceId,
      userId: userId
    },
    method:'GET',
    fail() {
      wx.hideToast();
      wx.showToast({
        title: '服务器异常，请稍后重试',
        duration: 1500,
        icon: 'none',
        mask: false
      });
    },
    success:function(res){
    console.log(res.data)
    if(res.data.code==0){
      if(res.data.data.length>0){
        console.log("该用户已收藏该房源")
        //var collect = "collect";
        that.setData({
          collect: true 
        }) 
          collectionId=res.data.data[0].id;  
      }else{
        that.setData({
          collect: false 
        }) 
      }
    }
    }
  })
  },
  getRoomDetail:function(id){
  console.log("查询房间详情内容");
    wx.showToast({ 
      duration: 15000,
      icon: 'loading',
      mask:true,
    });
    wx.request({
      url: app.globalData.hostUrl + '/housereleasemanagement/queryListWithPage',
      data: { resourcesId: resourceId },
      //{ id:id } { resourcesId:resourceId },
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
        wx.hideToast();
        if (res.data.code == 0) {
          wx.hideToast(); 
          var subTitle=[];
          var labels = res.data.data[0].houseResources.houseLabelList;
          if (labels.length > 0) { 
            for (let i = 0; i < labels.length; i++) {
             subTitle.push(labels[i].labelName);
            }
           } 
           if(res.data.data.length>0){
             var imgUrls = [];
             imgUrls = res.data.data[0].houseResources.houseFilePath.substr(0, res.data.data[0].houseResources.houseFilePath.length - 1).split(";");
             var imgUrls01 = "swiper.imgUrls";
             if (res.data.data[0].type==3){
               that.setData({
                 deal:true,
                 onsale:false,
               })
             } else if (res.data.data[0].type == 2 && res.data.data[0].status == 1){
               that.setData({
                 deal: false,
                 onsale: true,
               })
                
             }else{
               that.setData({
                 deal: false,
                 onsale: false,
               })
             }
             //lastUpdateTime
             res.data.data[0].houseResources.lastUpdateTime = res.data.data[0].houseResources.lastUpdateTime.substr(0,10)
             //salerInfo
             var name = "salerInfo.name";
             that.setData({
               [name]: res.data.data[0].operatorName
             })
             
             //swiper.imgUrls
             that.setData({
               houseDetail: res.data.data[0].houseResources,
               subTitle: subTitle,
               [imgUrls01]: imgUrls,
               longitude: res.data.data[0].houseResources.houseLocationInfo.longitude,
               latitude: res.data.data[0].houseResources.houseLocationInfo.latitude,
               markers: [{
                 id: "1",
                 latitude: res.data.data[0].houseResources.houseLocationInfo.latitude,
                 longitude: res.data.data[0].houseResources.houseLocationInfo.longitude,
                 width: 30,
                 height: 30,
                 iconPath: "../../../images/icons/marker.png"
               }],
               map:true,
             }) 
           }
          console.log(that.data.houseDetail)
        } else {
          wx.showToast({

            title: res.data.msg,
            duration: 2000,

            icon: 'none'

          });
        }
      }
    });
  },
  collectRoom:function(){
  console.log("收藏房源....");
    if (app.globalData.userInfo) {
      console.log("已有用户信息，调用新增收藏接口...");
      console.log(app.globalData);
      console.log(wx.getStorageSync('userId'));
      var userId = wx.getStorageSync('userId');
     this.insertCollect(userId);

      // var collect = "collect";
      // this.setData({
      //   [collect]: true
      // })
    } else {
      console.log("没有用户信息，状态还是未收藏");
      that.bindGetUserInfo();
    } 
  },
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showToast({
        title: '',
        duration: 15000,
        icon: 'loading',
        mask:true,
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
  //根据openid校验是否是我们的用户
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
                    url: '../../register/register?openid=' + openId + "&userName=" + that.data.userInfo.nickName + "&userInfo=" + JSON.stringify(that.data.userInfo) + "&type=collect" + "&resourceId=" + resourceId + "&id=" + statusId
                  })
                } else {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              }
            })

          } else {
            console.log("用户存在判断他之前是否收藏过该房源");
            app.globalData.userInfo = that.data.userInfo;
            that.setData({
              isLogin: true
            })
            wx.setStorageSync('userId', res.data.data[0].userId);
            //that.getCollect(resourceId, res.data.data[0].userId);
            wx.request({
              url: app.globalData.hostUrl + '/housecollection/queryListWithNoPage',
              data: {
                resourcesId: resourceId,
                userId: res.data.data[0].userId
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
                if (res.data.code == 0) {
                  if (res.data.data.length > 0) {
                    console.log("该用户已收藏该房源") 
                    that.setData({
                      collect: true
                    })
                    collectionId = res.data.data[0].collectionId;
                    wx.showToast({
                      title: '您已收藏过该房源',
                      icon:'none',
                      duration:1000
                    })
                  } else {
                    that.setData({
                      collect: false
                    })
                      console.log("用户之前没有收藏过该房源")
                    that.insertCollect(wx.getStorageSync('userId'));
                  }
                }
              }
            })
            // if(!that.data.collect){
            //   console.log("用户之前没有收藏过该房源")
            //   that.insertCollect(res.data.data[0].userId);
            // } 
          }
        }
      }
    })

  },
  insertCollect(userId){
  wx.request({
    url: app.globalData.hostUrl +'/housecollection/insert',
    method:"POST",
    data:{
      resourcesId:resourceId,
      userId: userId
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
    success:function(res){
       console.log(res.data);
       if(res.data.code==0){
        //var collect = "collect";
         collectionId = res.data.data.id;
        that.setData({
        collect: true
        })
         wx.showToast({
           title: '收藏成功',
           icon: "success",
           duration: 1500,
         })
       }else{
         wx.showToast({
           title: '收藏失败',
           icon: "",
           duration: 1500,
         })
         //var collect = "collect";
         that.setData({
           collect: false
         })
       }
    }
  })
  },
  unCollectRoom: function () {
  console.log("取消收藏....");
    wx.request({
      url: app.globalData.hostUrl + '/housecollection/delete',
      method: "POST",
      data: {
        id: collectionId
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
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          
          that.setData({
            collect: false 
          })
          wx.showToast({
            title: '取消收藏成功',
            icon: "success",
            duration: 1500,
          })
        } else {
          wx.showToast({
            title: '取消收藏失败',
            icon: "none",
            duration: 1500,
          }) 
        }
      }
    })  
},
  //图片预览
  previewImage: function (e) {
    var _this = this; 
    var current = e.target.dataset.src;
    // var urls = []; 

      // for (let i = 0; i < _this.data.imgPath.length; i++) {
      //   urls.push(_this.data.imgPath[i].path);
      // }  

    if (typeof current != 'undefined') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: that.data.swiper.imgUrls // 需要预览的图片http链接列表
      })
    }

  },
  //
  jumpToMap(e){
  console.log(e)
    console.log(parseFloat(e.target.dataset.latitude))
    console.log(parseFloat(e.target.dataset.longitude))
    wx.openLocation({
      latitude: parseFloat(e.target.dataset.latitude),
      longitude: parseFloat(e.target.dataset.longitude), 
      scale: 12
    })
  // wx.navigateTo({
  //   url: '../map/map?longitude=' + e.target.dataset.longitude + "&latitude=" + e.target.dataset.latitude,
  // })
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