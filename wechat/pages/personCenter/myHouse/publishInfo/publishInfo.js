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
    isUpdate:false, 
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
    cityArray: [["成都市"], ["锦江区", "青羊区", "高新区", "天府新区", "金牛区", "武侯区", "成华区", "龙泉驿区", "青白江区", "新都区", "温江区", "金堂县", "双流县", "郫县", "大邑县", "蒲江县", "新津县", "都江堰市", "彭州市", "邛崃市", "崇州市"]],
    objectMultiArray:[],
    //房型信息下拉框数据
    roomInfoIndex:[0,0,0],
    roomInfoArray: [
      ['0室', '1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室', '10室'], 
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅', '10厅'], 
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫', '10卫']],
  
    //在住情况下拉数据
    liveInOrnotIndex: 0,
    liveInOrnotArray: ["是", "否"],
    houseDetail:{},
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    //获取区域数据
    that.getRegionData();
    if(typeof options.id !='undefined'){
      var id = options.id;
      console.log("id：" + id);
      this.getMyRoomDetail(id);
    }else{
      console.log("没有参数，新增房源")
    }
    
  },
  getRegionData(){
    console.log("获取区域数据...");
    wx.request({
      url: app.globalData.hostUrl + '/area/hierarchicalArea',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
         console.log(res);
        if(res.data.code==0){
         var obj = res.data.data[0].list[0];
         var arr = [];
          arr.push(obj.area);
          var newarr = arr.concat(obj.list);
          that.setData({
            objectMultiArray:newarr
          });
          console.log(that.data.objectMultiArray)
        }else{
          console.log("区域获取失败");
        }
      }
    });
  },
  getMyRoomDetail(id){
    console.log("获取id房源信息...");
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/queryListWithNoPage',
      data: {
        id:id
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
       if (res.data.code == 0) {
         var obj = res.data.data;
         console.log(obj);
         var item = {}
         var houseImgPath = obj[0].houseFilePath.split(";");
         var rightImgPath = obj[0].estateFilePath.split(";");
         var cardImgPath = obj[0].cardFilePath.split(";");
         for (let i = 0; i < houseImgPath.length-1; i++) {
            item={};
            item.type = 'room';
           item.path = houseImgPath[i];
           that.data.imgPath.push(item);
         }
          that.setData({
            showImg:true,
            imgPath: that.data.imgPath
          }) 
          //
         for (let j = 0; j < rightImgPath.length - 1; j++) {
           item = {};
           item.type = 'right';
           item.path = rightImgPath[j];
           that.data.rightImgPath.push(item);
         }
         that.setData({
           showIdCardImg: true,
           rightImgPath: that.data.rightImgPath
         }) 
         //
         for (let k = 0; k < cardImgPath.length - 1; k++) {
           item = {};
           item.type = 'idCard';
           item.path = cardImgPath[k];
           that.data.idCardImgPath.push(item);
         }
         that.setData({
           showRightImg: true,
           idCardImgPath: that.data.idCardImgPath
         }) 

         // 除图片之外的input数据回填
         that.setData({
           houseDetail: obj[0]
         });
         //picker数据回填
         //区域
         for (let i = 0; i < that.data.cityArray[1].length; i++) {
           if (obj[0].regionName == that.data.cityArray[1][i]) {
             that.setData({
               cityIndex: [0,i]
             })
             break;
           }
         }
         //房型
         var roomType = obj[0].roomTypeInfo.split("-");
         console.log(roomType)
         var roomInfoArray = that.data.roomInfoArray;
         var a,b,c;
         for (let m = 0; m < roomInfoArray[0].length;m++){
           if (roomInfoArray[0][m]==roomType[0]){
             a = m;
             break;
           }
         }
         for (let n = 0; n < roomInfoArray[1].length; n++) {
           if (roomInfoArray[1][n] == roomType[1]) {
             b = n;
             break;
           }
         }
         for (let k = 0; k < roomInfoArray[2].length; k++) {
           if (roomInfoArray[2][k] == roomType[2]) {
             c = k;
             break;
           }
         }
         that.setData({
           roomInfoIndex:[a,b,c]
         })
         //是否在住
         if (obj[0].isLive==1){
          that.setData({
            liveInOrnotIndex:[0]
          })
         }else{
           that.setData({
             liveInOrnotIndex: [1]
           })
         }
         
        }
      }
    });
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
  //表单输入值
  getInput:function(e){
    if (e.target.dataset.options =="vilageName"){
      var vilageName = "houseDetail.vilageName"
    that.setData({
      [vilageName]:e.detail.value
    })
  }
    if (e.target.dataset.options =="residential"){
      var residential ="houseDetail.residential"
      that.setData({
        [residential]:e.detail.value
      })
    }

    if (e.target.dataset.options == "houseArea") {
      var houseArea = "houseDetail.houseArea"
      that.setData({
        [houseArea]: e.detail.value
      })
    }

    if (e.target.dataset.options == "price") {
      var price = "houseDetail.price"
      that.setData({
        [price]: e.detail.value
      })
    }

    if (e.target.dataset.options == "contact") {
      var contact = "houseDetail.contact"
      that.setData({
        [contact]: e.detail.value
      })
    }

    if (e.target.dataset.options == "contactInformation") {
      var contactInformation = "houseDetail.contactInformation"
      that.setData({
        [contactInformation]: e.detail.value
      })
    }
  console.log(that.data.houseDetail)
  },
  continueUpload:function(e){
  var _this = this;
  var type = e.target.dataset.type;
    if (type == "room") {
    var num = 9-this.data.imgPath.length;
    }else if(type=="right"){
     var num = 9 - this.data.rightImgPath.length;
    }else{
    var  num = 9 - this.data.idCardImgPath.length;
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
        
        //这里要条件判断
        if (type == "room") {
          var newarr = _this.data.imgPath.concat(tempFilePaths);
          that.setData({
            showImg: true,
            imgPath: newarr
          })
          console.log(_this.data.imgPath);
        } else if (type == "right") {
          var newarr = _this.data.rightImgPath.concat(tempFilePaths);
          _this.setData({
            showRightImg: true,
            rightImgPath: newarr
          })
          console.log(_this.data.rightImgPath);
        } else {
          var newarr = _this.data.idCardImgPath.concat(tempFilePaths);
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
    formData["creator"] = wx.getStorageSync('userId');
    console.log("表单数据：" );
    console.log(formData);

    //allImg
    this.setData({
      allImg: that.data.imgPath.concat(that.data.rightImgPath,that.data.idCardImgPath)
    })
    console.log("图片数据：");
    console.log(this.data.allImg);
    return
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