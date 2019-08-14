const app = getApp();
var his =[];
Page({ 
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '搜索房源', //导航栏 中间的标题
      indexUrl:'../index'
    },
    height: app.globalData.height * 2 + 20, 
    historyData: [],
    // ["仁和春天", "火车南站", "中德英伦联邦", "伊藤洋华堂", "高新区", "郫县", "仁和春天", "火车南站", "中德英伦联邦", "伊藤洋华堂", "高新区", "郫县"],
    searchContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("historyData")!=""){
      console.log("存在历史记录");
      his = wx.getStorageSync("historyData");
      if(his.length>15){
        his = his.slice(0,15);
        wx.setStorageSync("historyData", his);
      }
      this.setData({
        historyData: his,
        hasHistory: true
      }); 
    }else{
      wx.setStorageSync("historyData", []);
      his=[];
      console.log("不存在历史记录");
      this.setData({
        hasHistory: false
      });
    } 
  },
  //获取输入框的值
  getInput: function (e) {
    this.setData({
      searchContent: e.detail.value,
    });
    console.log("搜索框输入内容：" + this.data.searchContent)
  },
  //手机键盘输入确认
  searchConfirm: function () {
    console.log("跳转到房源列表页......");
    console.log(this.data.searchContent);
    if(this.data.searchContent!=""){ 
      his.unshift(this.data.searchContent) 
      wx.setStorageSync("historyData", his)
      console.log(wx.getStorageSync("historyData"));
    }
    wx.navigateTo({
      url: '../../housePart/houseList/houseList?content=' + this.data.searchContent
    })
  },
  //点击每一个小标题
  tapToDetail:function(e){
    console.log("跳转到房源列表页......");
    wx.navigateTo({
      url: '../../housePart/houseList/houseList?content=' + e.currentTarget.dataset.param+"&type=new"
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
       this.onLoad();
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