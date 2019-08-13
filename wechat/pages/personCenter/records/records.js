const app = getApp();
var that;
var pageNum = 1, size = 5;
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '浏览记录', //导航栏 中间的标题
      indexUrl: "../../index/index"
    },
    height: app.globalData.height * 2 + 20,
    roomList: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    pageNum=1;
    size=5;
    var page={pageNum:pageNum,size:size}
    that.getRecord(page);
  },


  //获取记录
  getRecord(page){
    console.log("获取我的浏览记录...");
    wx.showToast({
      duration: 15000,
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data: {
        userId: wx.getStorageSync("userId"),
        pageNum: page.pageNum,
        size: page.size
      },
      method: "GET",
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
        if (res.data.code == 0) {
          if (res.data.data.length > 0) {
            wx.hideToast();
            that.setData({
              roomList: []
            })
            for (let i = 0; i < res.data.data.length; i++) {
              var item = {};
              item.img = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
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
              item.id = res.data.data[i].houseResources.id;
              item.resourceid = res.data.data[i].resourcesId;
              that.data.roomList.push(item);
            }
            that.setData({
              roomList: that.data.roomList
            })
            console.log(that.data.roomList)
          } else {
            wx.showToast({
              title: '您还没有浏览记录哦！',
              icon: 'none',
              duration: 1000
            })
          }
        } else {
          wx.showToast({
            title: '获取房源浏览记录失败',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  jumpToDetail: function (e) {
    console.log("跳转到房源详情页......");
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../housePart/houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" + e.currentTarget.dataset.id
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
    wx.showToast({
      duration: 15000,
      icon: 'loading'
    })
    if (pageNum == 1) {
      pageNum++
    }
    console.log("上拉翻页...");
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data: {
        userId: wx.getStorageSync("userId"),
        pageNum: pageNum,
        size: size
      },
      method: "GET",
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
        if (res.data.code == 0) {
          if (res.data.data.length > 0) {
            wx.hideToast();
            pageNum++
            for (let i = 0; i < res.data.data.length; i++) {
              var item = {};
              item.img = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
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
              item.id = res.data.data[i].houseResources.id;
              item.resourceid = res.data.data[i].resourcesId;
              that.data.roomList.push(item);
            }
            that.setData({
              roomList: that.data.roomList
            })
            console.log(that.data.roomList)
          } else {
            wx.showToast({
              title: '没有更多啦',
              icon: 'none',
              duration: 1000
            })
          }
        } else {
          wx.showToast({
            title: '没有更多啦',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})