const app = getApp();
var that;
var pageNum = 1,size=5;
var his = [];
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
    screenHeight: app.globalData.screenHeight - app.globalData.height * 2 + 20,
    //下拉组件参数
    dropDownMenuTitle: ['区域', '价格', '房型', '更多'],//['区域','价格','户型','排序'],
    data1: [
      {
        id: 0, title: '不限',
      } 
    ],
    data2: [{ id: 0, title: '不限',}],
    data3: [{ id: 0, title: '不限', }],
    //
    itemHeight:"100%",
    persent: true,
      //查询条件对象
    searchData: {
      title:'',
      regionCode: '',
      priceMin: '',
      priceMax: '',

      roomTypeInfo: '',
      orderType:'',
      roomAreaMin: '',
      roomAreaMax: '',
      roomAgeMin: '',
      roomAgeMax: '',
      propertyTypes: '',
      labelIds: '',
      pageNum:1,
      size:size
    
    }
     
  }, 
  onLoad: function (options) {
  that = this;

    if (wx.getStorageSync("historyData") != "") {
      //console.log("存在历史记录");
      his = wx.getStorageSync("historyData");
      if (his.length > 15) {
        his = his.slice(0, 15);
        wx.setStorageSync("historyData", his);
      }
      this.setData({
        historyData: his,
        hasHistory: true
      });
    } else {
      wx.setStorageSync("historyData", []);
      his = [];
      //console.log("不存在历史记录");
      this.setData({
        hasHistory: false
      });
    } 

  pageNum=1;
  //console.log("获取上一页面传来的参数......");
  //console.log(options)
  var content = options.content;
    //var content = "";
  //console.log("content:"+content);
    if (options.type =="recommend"){
      //console.log("recommend")
      var isRecommend = "searchData.isRecommend";
    that.setData({
      [isRecommend]: "111"
    })
  }
  var title = 'searchData.title';
  that.setData({
    [title]: content
  })
  this.getRoomList(1);
  this.getArea();
  },
  getArea:function(){
    //console.log("获取区域数据...");
    wx.request({
      url: app.globalData.hostUrl + '/area/hierarchicalArea',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '获取区域数据异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success(res) {
        //console.log(res); 
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
          //console.log(that.data.data1);
        } else {
          //console.log("区域获取失败");
        }
      }
    });
  },
  getRoomList:function(page){
  //console.log("获取房源列表......");
    pageNum=1;
    wx.showToast({
      title:'',
      duration: 15000,
      icon: 'loading',
      mask: true
    });
    var num = "searchData.pageNum";
    that.setData({
      // roomList: [],
      [num]: page,
    })
    //console.log(that.data.searchData); 
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data: that.data.searchData,
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
        //console.log(res);
        wx.hideToast();
        if (res.data.code == 0) {
          if(res.data.data==null){
            wx.hideToast();
            wx.showToast({
              title: '暂无房源信息',
              duration: 1500,
              icon: 'none',
              mask: false, 
            
            }); 
            that.setData({
              roomList: [],
              itemHeight: "100vh",
              persent: false
            })
            return
          }
          if(res.data.data.length>0){ 
            if (res.data.data.length > 5){
             that.setData({
               itemHeight:'100%',
               persent: true
             })
             console.log("persent:"+that.data.persent)
            }else{
              that.setData({
                itemHeight: '100vh',
                persent: false
              })
            }
            //console.log("pageNum:" + pageNum);
            var num = "searchData.pageNum";
            var size01 = "searchData.size";
            that.setData({
              roomList: [],
              [num]: pageNum, 
            })
            for (let i = 0; i < res.data.data.length;i++){
            var item = {};
              item.img = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].houseResources.id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
              if (item.title.length > 12) {
                item.title = item.title.substr(0, 11) + "..."
              }
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
              duration: 1500, 
              icon:'none',
              mask: false
            });
            that.setData({
              roomList: [],
              itemHeight:"100vh",
              persent:false
            })
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
    //console.log("搜索框输入内容：" + this.data.searchData.title)
  },
  searchConfirm(){
    if (this.data.searchData.title != "") {
      his.unshift(this.data.searchData.title)
      wx.setStorageSync("historyData", his)
      //console.log(wx.getStorageSync("historyData"));
    }
  pageNum =1 ;
  that.getRoomList(1);
  },
  selectedItem: function (e) {
    //console.log("搜索参数返回：");
    //console.log(e.detail);
    var data = e.detail; 
    data.title = that.data.searchData.title;
    data.pageNum = 1;
    data.size = 5;
    pageNum = 1;
    that.setData({
      searchData:data
    })
    that.getRoomList(1)
    /*wx.request({
      url: app.globalData.hostUrl + '/area/hierarchicalArea',
      data: data,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        //console.log(res);
        if (res.data.code == 0) {
           
        } else {
          //console.log("区域获取失败");
        }
      }
    });*/
  },
  //跳转到房源详情页
  jumpToDetail: function (e) { 
    //console.log("跳转到房源详情页......");
    //console.log(e.currentTarget.dataset);
    //console.log('../houseDetail/houseDetail?id=' + e.currentTarget.dataset.id + "&resourceId=" + e.currentTarget.dataset.resourceid)
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
   // //console.log(e);//{scrollTop:99}
    if(e.scrollTop>50){
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
    if (that.data.roomList.length < 5) {
      return
    }
    //console.log("上拉翻页..."); 
    //console.log(pageNum)
    if(pageNum==1){
      pageNum++
      //console.log("第二页")
    }
    var num01 = "searchData.pageNum";
    that.setData({
      // roomList: [],
      [num01]: pageNum,
    }) 
    wx.showToast({
      title: '',
      duration: 15000,
      icon: 'loading',
      mask: true
    });
    //console.log(that.data.searchData);
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/search',
      data: that.data.searchData,
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
        //console.log(res);
       
        wx.hideToast();
        if (res.data.code == 0) {
          if (res.data.data == null) {
            wx.hideToast();
            wx.showToast({
              title: '没有更多啦',
              duration: 1000,
              icon: 'none', 
            });
            // that.setData({
            //   roomList: []
            // })
            return
          }
          if (res.data.data.length > 0) {
            pageNum++;
            //console.log("pageNum:" + pageNum);
            var num = "searchData.pageNum";
            that.setData({
             // roomList: [],
              [num]: pageNum,
            })
            for (let i = 0; i < res.data.data.length; i++) {
              var item = {};
              item.img = res.data.data[i].houseResources.houseFilePath.split(";")[0];
              //item.id = res.data.data[i].houseResources.id;
              item.id = res.data.data[i].id;
              item.title = res.data.data[i].houseResources.title;
              if(item.title.length>11){
                item.title = item.title.substr(0,11)+"..."
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
                persent: true 
            })
          } else {
            wx.hideToast();
            wx.showToast({
              title: '没有更多啦',
              duration: 1000,
              icon: 'none', 
            });
            that.setData({
              persent:true
            })
          }
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onPullDownRefresh:function(){  
      that.getRoomList(1)
      wx.stopPullDownRefresh(); 
  }
})