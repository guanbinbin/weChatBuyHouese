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
    showRightImg:false,
    showIdCardImg:false,
    //产权上传
    rightDialog:false,
    //房屋照片路径集合
    imgPath:[],
    //产权照片路径集合
    rightImgPath:[],
    //身份证照片路径集合
    idCardImgPath:[],
    that:[],
    roomFormData:{},
    //城市-区域下拉框数据
    cityIndex: [0, 0],
    cityArray: [["成都"], ["成华区", "高新区", "天府新区", "郫县", "锦江区", "金牛区", "武侯区", "新都区", "新津县", "青白江"]],
    objectMultiArray:
    [{ "regionCode": "2", "parid": "1", "regionName": "成都", "regtype": "1", "ageid": "0" }, { "regionCode": "2451", "parid": "2", "regionName": "成华区", "regtype": "2", "ageid": "0" }, { "regionCode": "392", "parid": "2", "regionName": "高新区", "regtype": "2", "ageid": "0" }, { "regionCode": "393", "parid": "2", "regionName": "郫县", "regtype": "2", "ageid": "0" }, { "regionCode": "394", "parid": "2", "regionName": "双流区", "regtype": "2", "ageid": "0" }, { "regionCode": "395", "parid": "2", "regionName": "天府新区", "regtype": "2", "ageid": "0" }, { "regionCode": "396", "parid": "2", "regionName": "锦江区", "regtype": "2", "ageid": "0" }, { "regionCode": "397", "parid": "2", "regionName": "金牛区", "regtype": "2", "ageid": "0" }],
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
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("选择的房源图片......");
        console.log(res);
        var tempFilePaths = [];
        for (let i = 0; i < res.tempFilePaths.length;i++){
        var item = {};
        item.type = type;
        item.path = res.tempFilePaths[i];
        tempFilePaths.push(item);
        } 
        //这里要条件判断
        if(type=="room"){
          _this.setData({
            showImg: true,
            imgPath: tempFilePaths
          })
          console.log(_this.data.imgPath);
        } else if (type == "right"){
          _this.setData({
            showRightImg: true,
            rightImgPath: tempFilePaths
          })
          console.log(_this.data.rightImgPath);
        }else{
          _this.setData({
            showIdCardImg: true,
            idCardImgPath: tempFilePaths
          })
          console.log(_this.data.idCardImgPath);
        }
        
      }
    })
  },
  continueUpload:function(){
  var _this = this;
  var type = e.target.dataset.type;
    if (type == "room") {
    num = 9-this.data.imgPath.length;
    }else if(type=="right"){
      num = 9 - this.data.rightImgPath.length;
    }else{
      num = 9 - this.data.idCardImgPath.length;
    }
  console.log(num)
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("继续上传的图片文件......");
        console.log(res);
        var tempFilePaths = [];
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          var item = {};
          item.type = "room";
          item.path = res.tempFilePaths[i];
          tempFilePaths.push(item);
        } 
        var newarr =  _this.data.imgPath.concat(tempFilePaths);
        //这里要条件判断
        if (type == "room") {
          _this.setData({
            showImg: true,
            imgPath: newarr
          })
          console.log(_this.data.imgPath);
        } else if (type == "right") {
          _this.setData({
            showRightImg: true,
            rightImgPath: newarr
          })
          console.log(_this.data.rightImgPath);
        } else {
          _this.setData({
            showIdCardImg: true,
            idCardImgPath: newarr
          })
          console.log(_this.data.idCardImgPath);
        }
      }
    })
  },
  //图片预览
  previewImage:function(e){
    var _this = this; 
    var type = e.target.dataset.type;
    var current = e.target.dataset.src;
    var urls = [];
    if(type=="room"){
      for (let i = 0; i < _this.data.imgPath.length; i++) {
        urls.push(_this.data.imgPath[i].path);
      }
    }else if(type=="right"){
      for (let i = 0; i < _this.data.rightImgPath.length; i++) {
        urls.push(_this.data.rightImgPath[i].path);
      }
    }else{
      for (let i = 0; i < _this.data.idCardImgPath.length; i++) {
        urls.push(_this.data.idCardImgPath[i].path);
      }
    }
    if(typeof current!='undefined'){
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      }) 
    }
   
  },
  //删除图片
  deleteImage:function(e){
  var _this = this;
  var type = e.target.dataset.type;
  var index = e.target.dataset.index;
  if(type=="room"){
    this.data.imgPath.splice(index, 1);
    if (this.data.imgPath.length == 0) {
      this.setData({
        showImg: false
      })
    }
    this.setData({
      imgPath: this.data.imgPath
    })
    console.log(this.data.imgPath);
  }else if(type=="right"){
    this.data.rightImgPath.splice(index, 1);
    if (this.data.rightImgPath.length == 0) {
      this.setData({
        showRightImg: false
      })
    }
    this.setData({
      rightImgPath: this.data.rightImgPath
    })
    console.log(this.data.rightImgPath);
  }else{
    this.data.idCardImgPath.splice(index, 1);
    if (this.data.idCardImgPath.length == 0) {
      this.setData({
        showIdCardImg: false
      })
    }
    this.setData({
      idCardImgPath: this.data.idCardImgPath
    })
    console.log(this.data.idCardImgPath);
  }
  
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
  //提交房源信息
  formSubmit:function(e){
    
    console.log("表单提交..."); 
    var formData = e.detail.value;
    formData["roomTypeInfo"] = that.data.roomInfoArray[0][that.data.roomInfoIndex[0]] + "-" + that.data.roomInfoArray[1][that.data.roomInfoIndex[1]] + "-" + that.data.roomInfoArray[2][that.data.roomInfoIndex[2]];
    var isLive ;
    if (this.data.liveInOrnotIndex=="是"){
      isLive = 0;
    }else{
      isLive = 1;
    }
    formData["isLive"] = isLive;
    formData["regionName"] = that.data.cityArray[1][that.data.cityIndex[1]];
    //objectMultiArray
    for (let i = 0; i < this.data.objectMultiArray.length;i++){
      if (this.data.objectMultiArray[i].regionName== formData["regionName"]){
        formData["regionCode"] = this.data.objectMultiArray[i].regionCode;
        break;
      }
    } 
    formData["creator"] = app.globalData.userInfo.id;
    console.log("表单数据：" );
    console.log(formData);

    //allImg
    this.setData({
      allImg: that.data.imgPath.concat(that.data.rightImgPath,that.data.idCardImgPath)
    })
    console.log("图片数据：");
    console.log(this.data.allImg);
    
    //上传表单和图片
    this.upload(formData);
  },
  upload: function (formData) { 
    wx.request({
      url: app.globalData.hostUrl +"/houserelease/insert",
      data:formData,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res.data);
        console.log("表单数据新增之后开始传图片....");
        if(res.data.code==0){
          that.uploadImg(res.data.data);
        }
      }
    })

  },
  uploadImg:function(id){
    for (let i = 0; i < this.data.allImg.length;i++){
      var type ="";
      if (this.data.allImg[i].type == 'room') {
        type = "HOUSE";
      } else if (this.data.allImg[i].type == 'right') {
        type = "ESTATE";
      } else {
        type = "CARD";
      } 
      wx.uploadFile({
        url: app.globalData.hostUrl + "/housepicture/insert",
        filePath: that.data.allImg[i].path,
        name: 'file',
        formData: {type: type,resouceId: id},
        header: {
          "Content-Type": "multipart/form-data",
        },
        success: (resp) => { 
          console.log("图片上传成功"+i);
        },
        fail: (res) => { 
        },
        complete: () => { 
          if (i == this.data.allImg.length-1) {   //当图片传完时，停止调用
            wx.showToast({
              title: '上传成功',
              duration: 1500,
              mask: 'false'
            })
             
          } 
        }
      }); 
    }
  
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