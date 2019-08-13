const app = getApp();
var that;
var pageNum=1,size=5;
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的收藏', //导航栏 中间的标题
      indexUrl: "../../index/index"
    },
    height: app.globalData.height * 2 + 20,
    //0 已停售 1 已成交
    roomList: [
      // {
      //   img: '../../../images/index/house1.jpg',
      //   title: '首月免租 月月返现 近地铁站',
      //   addr: '双流区-茶店子-龙祥佳苑',
      //   subTitle: ['合租', '朝南', '近地铁'],
      //   price: '820元/月',
      //   size: '97.24',
      //   room: '三室一厅',
      //   id: "1",
      //   status:0
      // },
      // {
      //   img: '../../../images/index/house2.jpg',
      //   title: '首月免租 月月返现 近地铁站',
      //   addr: '双流区-茶店子-龙祥佳苑',
      //   subTitle: ['合租', '朝南', '近地铁'],
      //   price: '820元/月',
      //   size: '97.24',
      //   room: '三室一厅',
      //   id: "2",
      //   status: 1
      // },
      // {
      //   img: '../../../images/index/house3.jpg',
      //   title: '首月免租 月月返现 近地铁站',
      //   addr: '双流区-茶店子-龙祥佳苑',
      //   subTitle: ['合租', '朝南', '近地铁'],
      //   price: '820元/月',
      //   size: '97.24',
      //   room: '三室一厅',
      //   id: "3",
      //   status: 0
      // },
      // {
      //   img: '../../../images/index/house4.jpg',
      //   title: '首月免租 月月返现 近地铁站',
      //   addr: '双流区-茶店子-龙祥佳苑',
      //   subTitle: ['合租', '朝南', '近地铁'],
      //   price: '820元/月',
      //   size: '97.24',
      //   room: '三室一厅',
      //   id: "4",
      //   status: 1
      // },  
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    pageNum = 1
    that.getMyCollection(1);
  },
  getMyCollection(page){ 
    wx.showToast({
      duration: 15000,
      icon: 'loading'
    })
  console.log("获取我收藏的房源...");
  wx.request({
    url: app.globalData.hostUrl +'/housecollection/queryListWithPage',
    data:{
      userId:wx.getStorageSync("userId"),
      pageNum: pageNum,
      size:size
    },
    method:"GET",
    fail() {
      wx.hideToast();
      wx.showToast({
        title: '服务器异常，请稍后重试',
        duration: 1500,
        icon: 'none',
        mask: false
      });
    },
    success(res){
      console.log(res.data);
      if(res.data.code==0){
        if(res.data.data.length>0){
          wx.hideToast();
          that.setData({
            roomList: []
          })
          for (let i = 0; i < res.data.data.length; i++) {
            var item = {};
            item.img = res.data.data[i].houseFilePath.split(";")[0];
            //item.id = res.data.data[i].id;
            item.id = res.data.data[i].id;
            item.title = res.data.data[i].title;
            item.addr = "成都市-" + res.data.data[i].regionName + "-" + res.data.data[i].vilageName;

            item.subTitle = [];
            var labels = res.data.data[i].houseLabelList;
            if (labels.length > 0) {
              if (labels.length > 4) {
                labels.length = 4;
              }
              for (let i = 0; i < labels.length; i++) {
                item.subTitle.push(labels[i].labelName);
              }
            }
            //已成交
            if (res.data.data[i].type==3){
              item.status=1
            }else if(res.data.data[i].type==2){
              if (res.data.data[i].status==1){
                //已上架
                item.status=2
              } else if (res.data.data[i].status == 2){
                //已下架
                item.status=0
              }

            }
            item.price = res.data.data[i].price + "万";
            item.room = res.data.data[i].roomTypeInfo;
            item.size = res.data.data[i].houseArea;
            item.id = res.data.data[i].id;
            item.resourceid = res.data.data[i].resourcesId;
            that.data.roomList.push(item);
          }
          that.setData({
            roomList: that.data.roomList
          })
          console.log(that.data.roomList) 
        }else{
          wx.showToast({
            title: '您还没有收藏的房源哦',
            icon: 'none',
            duration: 1000
          })
        }
      }else{
        wx.showToast({
          title: '获取房源失败',
          icon:'none',
          duration:1000
        })
      }
    }
  })
  },
  jumpToDetail: function (e) {
    console.log("跳转到房源详情页......");
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../housePart/houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" + e.currentTarget.dataset.resourceid
    })
  },
  dontJump:function(){
    wx.showToast({ 
      title:"该房源已下架",
      image: '../../../images/icons/error.png',
      duration: 1000
    }) 
  },
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
    if(pageNum==1){
      pageNum++
    }
    console.log("上拉翻页...");
    wx.request({
      url: app.globalData.hostUrl + '/housecollection/queryListWithPage',
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
              item.img = res.data.data[i].houseFilePath.split(";")[0];
              //item.id = res.data.data[i].id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].title;
              item.addr = "成都市-" + res.data.data[i].regionName + "-" + res.data.data[i].vilageName;

              item.subTitle = [];
              var labels = res.data.data[i].houseLabelList;
              if (labels.length > 0) {
                if (labels.length > 4) {
                  labels.length = 4;
                }
                for (let i = 0; i < labels.length; i++) {
                  item.subTitle.push(labels[i].labelName);
                }
              }
              //已成交
              if (res.data.data[i].type == 3) {
                item.status = 1
              } else if (res.data.data[i].type == 2) {
                if (res.data.data[i].status == 1) {
                  //已上架
                  item.status = 2
                } else if (res.data.data[i].status == 2) {
                  //已下架
                  item.status = 0
                }

              }
              item.price = res.data.data[i].price + "万";
              item.room = res.data.data[i].roomTypeInfo;
              item.size = res.data.data[i].houseArea;
              item.id = res.data.data[i].id;
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