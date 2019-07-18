const app = getApp();
var list = [];
var that;
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
    roomFormData:{},
    //城市-区域下拉框数据
    cityIndex: [0, 0],
    cityArray: [["成都"], ["成华区", "高新区", "天府新区", "郫县", "锦江区", "金牛区", "武侯区", "新都区", "新津县", "青白江"]],
    objectMultiArray:
    [{ "regid": "2", "parid": "1", "regname": "成都", "regtype": "1", "ageid": "0" }, { "regid": "391", "parid": "2", "regname": "成华区", "regtype": "2", "ageid": "0" }, { "regid": "392", "parid": "2", "regname": "高新区", "regtype": "2", "ageid": "0" }, { "regid": "393", "parid": "2", "regname": "郫县", "regtype": "2", "ageid": "0" }, { "regid": "394", "parid": "2", "regname": "双流区", "regtype": "2", "ageid": "0" }, { "regid": "395", "parid": "2", "regname": "天府新区", "regtype": "2", "ageid": "0" }, { "regid": "396", "parid": "2", "regname": "锦江区", "regtype": "2", "ageid": "0" }, { "regid": "397", "parid": "2", "regname": "金牛区", "regtype": "2", "ageid": "0" }],
    //房型信息下拉框数据
    roomInfoIndex:[0,0,0],
    roomInfoArray: [
      ['0室', '1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室', '10室'], 
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅', '10厅'], 
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫', '10卫']],
  
    //在住情况下拉数据
    liveInOrnotIndex: 0,
    liveInOrnotArray: ["是", "否"],
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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
  cityChange: function (e) { 
    that.setData({
      "cityIndex[0]": e.detail.value[0],
      "cityIndex[1]": e.detail.value[1]
    })
  },
  roomInfoChange:function(e){
    this.setData({
      "roomInfoIndex[0]": e.detail.value[0],
      "roomInfoIndex[1]": e.detail.value[1],
      "roomInfoIndex[2]": e.detail.value[2]
    })
  },
  liveInOrnotChange:function(e){
    this.setData({
      "liveInOrnotIndex": e.detail.value[0],
    })
  },
 /* bindMultiPickerColumnChange: function (e) {
    let that = this;
    switch (e.detail.column) {
      case 0:
        list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
            list.push(that.data.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })

    }
  },*/
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