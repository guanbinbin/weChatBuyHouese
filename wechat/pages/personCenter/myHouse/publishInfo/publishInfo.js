const app = getApp();
Page({ 
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发布房源', //导航栏 中间的标题
      indexUrl:'../../../index/index',
      innerPage:false,//是否是该页面的第二个页面
    },
    height: app.globalData.height * 2 + 20,
    //图片预览
    showImg:false,
    //产权上传
    rightDialog:false,
    //房屋照片路径集合
    imgPath:[],
    //产权照片路径集合
    rightImgPath:[],
    //身份证照片路径集合
    idCardImgPath:[],
    roomFormData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  chooseImg:function(e){
    var _this = this;
    var type = e.target.dataset.type;
    console.log("type:"+type);
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("上传的图片文件......");
        console.log(res);
        var tempFilePaths = res.tempFilePaths
        //这里要条件判断
        _this.setData({
          showImg:true,
          imgPath:tempFilePaths
        })
      }
    })
  },
  continueUpload:function(){
  var _this = this;
  var num = 9-this.data.imgPath.length;
  console.log(num)
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("继续上传的图片文件......");
        console.log(res);
        var tempFilePaths = res.tempFilePaths
       var newarr =  _this.data.imgPath.concat(tempFilePaths);
        _this.setData({
          imgPath: newarr
        })
        console.log(_this.data.imgPath);
      }
    })
  },
  //图片预览
  previewImage:function(e){
    var _this = this;
    var current = e.target.dataset.src;
    if(typeof current!='undefined'){
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: _this.data.imgPath // 需要预览的图片http链接列表
      }) 
    }
   
  },
  //删除图片
  deleteImage:function(e){
  var index = e.target.dataset.index;
  this.data.imgPath.splice(index,1);
    if (this.data.imgPath.length==0){
      this.setData({
        showImg:false
      })
    }
  this.setData({
    imgPath:this.data.imgPath
  })
  },
  //打开上传产权照片和身份证照片窗口
  openRightDialog:function(){
    var _this = this;
    var innerPage = "nvabarData.innerPage";
    var title = "nvabarData.title";
    /*nvabarData:{
    showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '产权图片上传', //导航栏 中间的标题
        indexUrl: '../../../index/index',
          innerPage: true,  
    }*/
  this.setData({
    rightDialog:true,
    [innerPage]:true,
    [title]:"产权图片上传"
   })
  },
  //顶部导航传参
  onMyEvent: function (e) {
    var innerPage = "nvabarData.innerPage";
    var title = "nvabarData.title";
    this.setData({
      rightDialog: e.detail.paramBtoA,
      [title]:"发布房源",
      [innerPage]:false
    })
    console.log(this.data.roomFormData)
  },
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          /*  wx.uploadFile({
              url: HOST + '地址路径',
              filePath: tempFilePaths[i],
              name: 'uploadfile_ant',
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                count++;
                //如果是最后一张,则隐藏等待中  
                if (count == tempFilePaths.length) {
                  wx.hideToast();
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })
              }
            });*/
        }

      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})