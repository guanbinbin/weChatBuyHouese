const app = getApp();
var that;
// pages/personCenter/myHouse/myHouse.js
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '房源修改记录', //导航栏 中间的标题
      indexUrl: "../../index/index"
    },
    height: app.globalData.height * 2 + 20,
    menuList: [{
      name: "全部房源"
    }/*, {
      name: "已审核房源"
    }, {
      name: "未审核房源"
    }*/],
    tabScroll: 0,
    currentPage: 0,
    //每个tab定义不一样的currentPage


    currentTab: 0,
    windowHeight: '',
    windowWidth: '',
    roomList: [],
    deleteUrl: '../../../images/icons/delete.png',
    editUrl: '../../../images/icons/edit.png',
    priceUrl: '../../../images/icons/price.png',
    checkUrl: '../../../images/icons/check.png',
    onsaleUrl: '../../../images/icons/onsale.png',
    offsaleUrl: '../../../images/icons/offsale.png',
    showDialog: false,
    price: '',
    price01: '',
    showReasonDialog: false,
    showPriceDialog: false,
    showApplyDialog: false,
    remarks: '',
    remarksInputValue: '',
  },
  onLoad: function (options) {
    that = this;
    that.setData({
      showDialog: false,
      showPriceDialog: false,
      showReasonDialog: false,
      price01: '',
      currentPage: 0,
      roomList: [],
      remarksInputValue: ''
    })
    wx.showToast({
      title: '',
      duration: 15000,
      icon: 'loading'
    })
    wx.getSystemInfo({  // 获取当前设备的宽高
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });
    console.log("查询所有房源信息...");
    that.getMyhouseList(1, 5)
  },
  getMyhouseList: function (page, size) {
    this.loading = true;
    var type = "";
    var status = "";
    that.getList(type, status, page, size);
  },
  getList: (type, status, page, size, isPage) => {
    wx.showToast({
      duration: 15000,
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + '/housereleasemanagement/queryListWithPage',
      data: {
        type: type,
        status: status,
        pageNum: page,
        size: size,
        isEffective: 0,
        creator: wx.getStorageSync('userId'),
        modify:true
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
        wx.hideToast();
        console.log(res.data);
        if (res.data.code == 0) {

          if (res.data.data.length > 0) {
            that.createRoomListData(res.data.data);
            that.setData({
              currentPage: that.data.currentPage + 1
            })
          } else {
            if (isPage) {
              wx.showToast({
                title: '没有更多啦',
                duration: 2000,
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: '没有房源信息',
                duration: 2000,
                icon: 'none'
              })
            }

            console.log("无房源信息展示...");
          }
        }
      }
    });
  },
  createRoomListData: function (data) {
    var roomList = [];
    var roomItem = {};
    for (let i = 0; i < data.length; i++) {
      roomItem = {};
      if (data[i].status == 3) {
        roomItem.status = '修改申请中';
      }
      if (data[i].type == 0) {
        if (data[i].status == 0) {
          roomItem.status = "待审核";
        } else if (data[i].status == 2) {
          roomItem.status = "审核未通过";
        }
        // else if (data[i].status == 3) {
        //   roomItem.status = '修改申请中';
        // }
      } else if (data[i].type == 1) {
        if (data[i].status == 0) {
          roomItem.status = "待勘察";
        } else if (data[i].status == 2) {
          roomItem.status = "勘察未通过";
        }
        // else if (data[i].status==3){
        //   roomItem.status = "勘察数据修改申请中";
        // }
      } else if (data[i].type == 2) {
        if (data[i].status == 1) {
          roomItem.status = "已上架";
        }
        else if (data[i].status == 3) {
          roomItem.status = "修改申请中";
        }
        else if (data[i].status == 0) {
          roomItem.status = "待上架";
        }
        else if (data[i].status == 2) {
          roomItem.status = "已下架";
        }
      } else {
        if (data[i].status == 0) {
          roomItem.status = "已成交";
        }
        // } else if (data[i].status == 4) {
        //   roomItem.status = "下架申请中";
        // } 
      }
      if (data[i].houseResources.houseFilePath != null) {
        var imgPath = data[i].houseResources.houseFilePath.split(";");
        roomItem.imgPath = imgPath[0];
      } else {
        var imgPath = "../../../images/index/noImg.png";
        roomItem.imgPath = imgPath;
      }

      roomItem.regionName = "成都市 - " + data[i].houseResources.regionName;
      roomItem.residential = data[i].houseResources.residential;//房屋地址
      roomItem.roomTypeInfo = data[i].houseResources.roomTypeInfo;
      roomItem.vilageName = data[i].houseResources.vilageName;
      roomItem.price = data[i].houseResources.price;
      roomItem.houseArea = data[i].houseResources.houseArea;
      roomItem.id = data[i].houseResources.id;
      roomItem.remarks = data[i].remarks;
      roomItem.statusId = data[i].id;
      roomItem.modifyInfo = data[i].houseResources.modifyInfo;
      roomList.push(roomItem)
    }
    that.setData({
      roomList: that.data.roomList.concat(roomList)
    })
    console.log(that.data.roomList);
  },
  clickMenu: function (e) {
    var current = e.currentTarget.dataset.current //获取当前tab的index 
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({ currentTab: current })
    }
  },
  changeContent: function (e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 5
    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
  },
  jumpToPublish: function (e) {
    console.log("跳转到发布房源页面.....");
    wx.navigateTo({
      url: '../myHouse/publishInfo/publishInfo'
    })
  },
  jumpToDetail: function (e) {
    console.log(typeof e.currentTarget.dataset.check);
    var check = typeof e.currentTarget.dataset.check;
    if (check == "undefined") {
      console.log("跳转到修改页面...");
      wx.navigateTo({
        url: './publishInfoUpdate/publishInfoUpdate?id=' + e.currentTarget.dataset.id
      })
    } else {
      console.log("跳转到查看页面...");
      wx.navigateTo({
        url: '../myHouse/publishInfoCheck/publishInfoCheck?id=' + e.currentTarget.dataset.id
      })
    }

  },
  //
  checkReason(e) {
    that.setData({
      remarks: e.target.dataset.remarks,
      showReasonDialog: true
    })
  },
  //
  openDialog(e) {
    var type = e.target.dataset.type;
    that.setData({
      showDialog: true
    });
    if (type == "price") {
      that.setData({
        price: e.target.dataset.price,
        id: e.target.dataset.id,
        showPriceDialog: true,
        showReasonDialog: false,
        showApplyDialog: false,
      })
    } else if (type == "remarks") {
      that.setData({
        remarks: e.target.dataset.remarks,
        id: e.target.dataset.id,
        showPriceDialog: false,
        showReasonDialog: true,
        showApplyDialog: false,
      })
    } else if (type == "apply") {
      that.setData({
        id: e.target.dataset.id,
        showPriceDialog: false,
        showReasonDialog: false,
        showApplyDialog: true,
      })
    }

  },
  //
  priceInput(e) {
    that.setData({
      price01: e.detail.value
    })
  },
  //
  remarksInput(e) {
    that.setData({
      remarksInputValue: e.detail.value
    })
  },
  //
  submitPrice() {
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 15000
    })
    if (that.data.price01 == "") {
      wx.showToast({
        title: '请输入修改后的价格',
        icon: 'none',
        duration: 1500
      });
      return
    }
    wx.request({
      url: app.globalData.hostUrl + '/houserelease/update',
      data: {
        id: that.data.id,
        price: that.data.price01
      },
      method: 'POST',
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success: (res) => {
        console.log(res);
        wx.hideToast();
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            duration: 1500,
            icon: 'success'
          });
          setTimeout(function () {
            that.onLoad();
          }, 2000);
        } else {
          wx.showToast({
            title: '修改失败',
            duration: 1500,
            icon: 'none'
          });
        }
      }
    })
  },
  //
  submitApply() {
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 15000
    })
    if (that.data.remarksInputValue == "") {
      wx.showToast({
        title: '请输入您想修改的内容',
        icon: 'none',
        duration: 1500
      });
      return
    }
    wx.request({
      url: app.globalData.hostUrl + '/modifyapplication/insert',
      data: {
        resourcesId: that.data.id,
        remark: that.data.remarksInputValue,
        status: 0
      },
      method: 'POST',
      fail() {
        wx.hideToast();
        wx.showToast({
          title: '服务器异常，请稍后重试',
          duration: 1500,
          icon: 'none',
          mask: false
        });
      },
      success: (res) => {
        console.log(res);
        wx.hideToast();
        if (res.data.code == 0) {
          wx.showToast({
            title: '申请成功',
            duration: 1500,
            icon: 'success'
          });
          setTimeout(function () {
            that.onLoad();
          }, 2000);
        } else {
          wx.showToast({
            title: '申请失败',
            duration: 1500,
            icon: 'none'
          });
        }
      }
    })
  },
  offSale(e) {
    var id = e.target.dataset.id;
    wx.showModal({

      title: '提示',

      content: '确定要下架该房源吗？',

      success: function (res) {
        console.log("下架房源...");
        wx.showToast({
          title: '',
          icon: 'loading',
          duration: 15000
        });
        if (res.confirm) {
          wx.request({
            url: app.globalData.hostUrl + '/housereleasemanagement/update',
            data: {
              id: id,
              status: 2
            },
            method: 'POST',
            fail() {
              wx.hideToast();
              wx.showToast({
                title: '服务器异常，请稍后重试',
                duration: 1500,
                icon: 'none',
                mask: false
              });
            },
            success: (res) => {
              console.log(res);
              wx.hideToast();
              if (res.data.code == 0) {
                wx.showToast({
                  title: '下架成功',
                  duration: 1500,
                  icon: 'success'
                });
                setTimeout(function () {
                  that.onLoad();
                }, 2000);
              } else {
                wx.showToast({
                  title: '下架失败',
                  duration: 1500,
                  icon: 'none'
                });
              }
            }
          })


        } else {//这里是点击了取消以后

          console.log('用户点击取消')

        }

      }

    })
  },
  reOnSale(e) {
    var id = e.target.dataset.id;
    wx.showModal({

      title: '提示',

      content: '确定要重新上架该房源吗？',

      success: function (res) {
        console.log("重新上架房源...");
        wx.showToast({
          title: '',
          icon: 'loading',
          duration: 15000
        });
        if (res.confirm) {
          wx.request({
            url: app.globalData.hostUrl + '/housereleasemanagement/update',
            data: {
              id: id,
              status: 1
            },
            method: 'POST',
            fail() {
              wx.hideToast();
              wx.showToast({
                title: '服务器异常，请稍后重试',
                duration: 1500,
                icon: 'none',
                mask: false
              });
            },
            success: (res) => {
              console.log(res);
              wx.hideToast();
              if (res.data.code == 0) {
                wx.showToast({
                  title: '上架成功',
                  duration: 1500,
                  icon: 'success'
                });
                setTimeout(function () {
                  that.onLoad();
                }, 2000);
              } else {
                wx.showToast({
                  title: '上架失败',
                  duration: 1500,
                  icon: 'none'
                });
              }
            }
          })


        } else {//这里是点击了取消以后

          console.log('用户点击取消')

        }

      }

    })
  },
  //
  closeDialog(e) {
    var type = e.target.dataset.type
    that.setData({
      showDialog: false
    })
    if (type == "price") {
      that.setData({
        price01: '',
        showPriceDialog: false
      })
    } else if (type == "remarks") {
      that.setData({
        showReasonDialog: false
      })
    } else if (type == "apply") {
      that.setData({
        remarksInputValue: ''
      })
    }
  },
  scroll(e) {
    console.log(e.detail.scrollTop)
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
    console.log("下拉刷新...");
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉翻页...");
    var type, status, page;
    var size = 5;
    if (that.data.currentTab == 0) {
      type = "";
      status = "";
      page = that.data.currentPage + 1;
    }
    that.getList(type, status, page, size, true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})