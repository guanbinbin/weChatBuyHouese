 const app = getApp();
 Component({
  properties: {
    dropDownMenuTitle: {
      type: Array,
      value: [],
    },
    dropDownMenuDistrictData: {
      type:Array,
      value:[]
    },
   
    dropDownMenuSourceData: {
      type: Array,
      value: []
    },
    dropDownMenuStyleData: {
      type: Array,
      value: []
    },
    
  },
  data: {
    // private properity
    district_open: false, // 区域
    source_open: false, // 来源
    style_open: false, // 出租 出售
    filteropen: false,  // 筛选
    shownavindex: '',
    dropDownMenuDistrictDataRight: {},
    district_left_select: '',
    district_right_select: '',
    district_right_select_name:'',
    selected_style_id: 0,
    selected_style_name:'',
    selected_source_id: 0,
    selected_source_name:'',
    selected_filter_id: 0,
    selected_filter_name: '',
    //
    dropDownMenuTags: [],
    tagIds:[],

    dropDownMenuFilterData: [{ id: "1", title: "价格从高到低" }, { id: "2", title: "价格从低到高" }, { id: "3", title: "面积从大到小" }, { id: "4", title: "面积从小到大" }],
    filterIsTwice:false,
    filterCheckId:999,

    dropDownMenuSizeData: [{ id: "1", title: "50以下" }, { id: "2", title: "50-70" }, { id: "3", title: "70-90" }, { id: "4", title: "90-120" }, { id: "5", title: "120-150" }, { id: "6", title: "150-200" }, { id: "7", title: "200-300" }, { id: "8", title: "300以上" }],
    sizeCheckId: 999,
    sizeIsTwice: false,

    dropDownMenuTypeData: [{ id: "1", title: "普通住宅", check: false }, { id: "2", title: "公寓", check: false }, { id: "3", title: "别墅", check: false }, { id: "4", title: "平房", check: false }, { id: "5", title: "其他", check: false }], 
    typeIsTwice:false,
    checkTypes:[],

    dropDownMenuAge: [{ id: "0", title: "两年内" }, { id: "1", title: "2-5年" }, { id: "2", title: "5-7年" }, { id: "3", title: "7年以上" }],
    ageCheckId: 999,
    ageIsTwice: false,
    //
    dropDownMenuPrice: [{ id: "1", title: "20万以内" }, { id: "2", title: "20-40万" }, { id: "3", title: "40-70万" }, { id: "4", title: "70-100万" }, { id: "5", title: "100-120万" }, { id: "6", title: "120-150万" }, { id: "7", title: "150-200万" }, { id: "8", title: "200万以上" }],
     //价格的选中id
    clickPriceId:999,
    priceTwice:false,
    //
    dropDownMenuRoomData1: [{id:10,title:"不限"},{ id: 0, title: "1室" }, { id: 1, title: "2室" }, { id: 2, title: "3室" }, { id: 3, title: "4室" }, { id: 4, title: "5室" }, { id: 5, title: "6室" }, { id: 6, title: "7室" }, { id: 7, title: "8室" }, { id: 8, title: "9室" }, { id: 9, title: "10室" }],
    dropDownMenuRoomData2: [{ id: 10, title: "不限" },{ id: 0, title: "1厅" }, { id: 1, title: "2厅" }, { id: 2, title: "3厅" }, { id: 3, title: "4厅" }, { id: 4, title: "5厅" }, { id: 5, title: "6厅" }, { id: 6, title: "7厅" }, { id: 7, title: "8厅" }, { id: 8, title: "9厅" }, { id: 9, title: "10厅" }],
    dropDownMenuRoomData3: [{ id: 10, title: "不限" },{ id: 0, title: "1卫" }, { id: 1, title: "2卫" }, { id: 2, title: "3卫" }, { id: 3, title: "4卫" }, { id: 4, title: "5卫" }, { id: 5, title: "6卫" }, { id: 6, title: "7卫" }, { id: 7, title: "8卫" }, { id: 8, title: "9卫" }, { id: 9, title: "10卫" }],
    clickRoom1Id:999,
    clickRoom2Id: 999,
    clickRoom3Id: 999,
    selectedroom1:'',
    selectedroom2: '',
    selectedroom3: '',
    //search
    searchData:{
      title:'',
      regionCode:'',
      priceMin:'',
      priceMax:'',

      roomTypeInfo:'',

      roomAreaMin:'',
      roomAreaMax:'',
      roomAgeMin:'',
      roomAgeMax:'',
      propertyTypes:'',
      labelIds:'',
   }
  },
  methods: {
    
    tapDistrictNav: function (e) {
      if (this.data.district_open) {
        this.setData({
          district_open: false,
          source_open: false,
          style_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          district_open: true,
          style_open: false,
          source_open: false,
          filter_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }

    },
    tapSourceNav: function (e) {
      if (this.data.source_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: true,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
    },
    tapStyleNav: function (e) {
      if (this.data.style_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: false,
          style_open: true,
          filter_open: false,
          district_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
      console.log(e.target)
    },
    tapFilterNav: function (e) {
      if (this.data.filter_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: true,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
    },
  //quyu1
    selectDistrictLeft: function (e) {
      var that = this;
      var regionCode = "searchData.regionCode";
      var model = e.target.dataset.model.childModel;
      var selectedId = e.target.dataset.model.id;
      var selectedTitle = e.target.dataset.model.title;
      if (selectedTitle=="不限"){
        that.setData({
          [regionCode]:""
        })
      }
      this.setData({
        dropDownMenuDistrictDataRight: model==null?"":model,
        district_left_select: selectedId,
        district_right_select: '',
        district_right_select_name: selectedTitle
      })
      if (model == null || model.length == 0) { 
        this.closeHyFilter();
        this.triggerEvent("selectedItem", that.data.searchData)
      }
    },
    //fangxing
    selectRoomItem:function(e){
    var that = this;
      var roomTypeInfo = "searchData.roomTypeInfo";
     if(e.target.dataset.type=="room1"){
       this.setData({
         clickRoom1Id: e.target.dataset.model.id,
         selectedroom1: e.target.dataset.model.title,
       })
     }
      if (e.target.dataset.type == "room2") {
        this.setData({
          clickRoom2Id: e.target.dataset.model.id,
          selectedroom2: e.target.dataset.model.title,
        })
      }
      if (e.target.dataset.type == "room3") {
        this.setData({
          clickRoom3Id: e.target.dataset.model.id,
          selectedroom3: e.target.dataset.model.title,
        });
        
      }
      if (this.data.clickRoom1Id == 10 || this.data.clickRoom2Id == 10 || this.data.clickRoom3Id ==10) {
        this.closeHyFilter();
        this.setData({
          clickRoom3Id: 10,
          clickRoom1Id: 10,
          clickRoom2Id: 10
        });
        var selectedTitle = "不限"
        this.setData({
          selected_style_name: selectedTitle,
          [roomTypeInfo]: "",
        })
        this.triggerEvent("selectedItem", that.data.searchData);
        return
      }


      if (this.data.clickRoom1Id != 999 && this.data.clickRoom2Id != 999 && this.data.clickRoom3Id != 999 ){
        this.closeHyFilter();
        var selectedTitle = this.data.selectedroom1 + "-" + this.data.selectedroom2 + "-" + this.data.selectedroom3
        this.setData({
          selected_style_name: selectedTitle,
          [roomTypeInfo]: selectedTitle,
        })
        this.triggerEvent("selectedItem", that.data.searchData);
      }
      
    },
    //quyu2
    selectDistrictRight: function (e) {
      var that = this;
      var regionCode = "searchData.regionCode";
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        [regionCode]:selectedId,
        district_right_select: selectedId,
        district_right_select_name:selectedTitle
      })
      this.triggerEvent("selectedItem", that.data.searchData)
    },
   //jiage
    selectSourceItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      var priceMin = "searchData.priceMin";
      var priceMax = "searchData.priceMax";
      var min="";
      var max="";
      if (selectedId == 1){ 
        max = selectedTitle.slice(0, selectedTitle.length-3);
      }else if (selectedId == 8){
        min = selectedTitle.slice(0, selectedTitle.length - 3);
      }else{
        var arr = selectedTitle.split("-");
        min = arr[0];
        max = arr[1].slice(0, arr[1].length-1);
      }

      if(e.target.dataset.active){
        this.setData({
          clickPriceId:999,
          priceTwice:true,
          selected_source_id: '',
          selected_source_name: '',
          [priceMax]:"",
          [priceMin]:""
        })
      }else{
        this.setData({
          clickPriceId: selectedId,
          priceTwice: false,
          selected_source_id: selectedId,
          selected_source_name: selectedTitle,
          [priceMax]: max,
          [priceMin]: min
        }) 
       
      }
      this.triggerEvent("selectedItem", this.data.searchData)
      this.closeHyFilter();
      
      
    },
  //gengduo
    selectFilterItem: function (e) {
      var that = this;
      //选择标签
      if (e.target.dataset.type=="tag"){
        var item = e.target.dataset.model;
        var index = e.target.dataset.index;
        if (e.target.dataset.model.check){ 
          var check = 'dropDownMenuTags['+index+'].check'
          this.setData({ 
            [check]: false
          }) 
          var index = that.data.tagIds.indexOf(item.id);
          that.data.tagIds.splice(index,1);
        }else{ 
          var check = 'dropDownMenuTags[' + index + '].check'
          this.setData({
            [check]: true
          })
          that.data.tagIds.push(item.id);
          
      }
        var labelIds = "searchData.labelIds";
        that.setData({
          [labelIds]: that.data.tagIds.toString()
        })
        console.log(this.data.dropDownMenuTags[index])
        }
        //排序
      else if (e.target.dataset.type =="filter"){
        if(e.target.dataset.active){
         this.setData({
           filterIsTwice:true,
           filterCheckId:999
         })
        }else{
          this.setData({
            filterIsTwice: false,
            filterCheckId:e.target.dataset.model.id
          })
        }
      }//类型 
      else if (e.target.dataset.type == "roomType"){ 
        var item = e.target.dataset.model;
        var index = e.target.dataset.index;
        if (e.target.dataset.model.check) {
          var check = 'dropDownMenuTypeData[' + index + '].check'
          this.setData({
            [check]: false
          })
          var index = that.data.checkTypes.indexOf(item.title);
          that.data.checkTypes.splice(index, 1);
        } else {
          var check = 'dropDownMenuTypeData[' + index + '].check'
          this.setData({
            [check]: true
          })
          that.data.checkTypes.push(item.title);
        }
        var propertyTypes = "searchData.propertyTypes";
        that.setData({
          [propertyTypes]: that.data.checkTypes.toString()
        })
        console.log(this.data.dropDownMenuTypeData[index])
      }//房龄
       else if (e.target.dataset.type == "age"){
        var roomAgeMin = "searchData.roomAgeMin";
        var roomAgeMax = "searchData.roomAgeMax";
        var min = 0, max =999;
        var selectedTitle = e.target.dataset.model.title;
        var selectedId = e.target.dataset.model.id;
        if (e.target.dataset.active) {
          this.setData({
            ageIsTwice: true,
            ageCheckId: 999
          });
        } else {
          this.setData({
            ageIsTwice: false,
            ageCheckId: e.target.dataset.model.id
          })
          if (selectedId == 0) {
            max = 2;
          } else if (selectedId == 3) {
            min =7;
          } else {
            var arr = selectedTitle.split("-");
            min = arr[0];
            max = arr[1].slice(0, arr[1].length-1);
          }
        }
        that.setData({
          [roomAgeMin]: min,
          [roomAgeMax]: max,
        })
        
      }//面积
       else if (e.target.dataset.type == "size"){
        var roomAreaMin = "searchData.roomAreaMin";
        var roomAreaMax = "searchData.roomAreaMax";
        var min = 0, max =9999;
        var selectedTitle =  e.target.dataset.model.title;
        var selectedId = e.target.dataset.model.id;
        if (e.target.dataset.active) {
          this.setData({
            sizeIsTwice: true,
            sizeCheckId: 999
          })
        } else {
          this.setData({
            sizeIsTwice: false,
            sizeCheckId: e.target.dataset.model.id
          });
          if (selectedId == 1) {
            max = selectedTitle.slice(0, selectedTitle.length - 2);
          } else if (selectedId == 8) {
            min = selectedTitle.slice(0, selectedTitle.length - 2);
          } else {
            var arr = selectedTitle.split("-");
            min = arr[0];
            max = arr[1];
          }
        }
        that.setData({
          [roomAreaMin]: min,
          [roomAreaMax]: max,
        })
      }  
    },

    selectStyleItem: function (e) {
      //var selectedId = e.target.dataset.model.id
      //var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_style_id: selectedId,
        selected_style_name:selectedTitle
      })
      this.triggerEvent("selectedItem", { index: this.data.shownavindex, selectedId: selectedId, selectedTitle: selectedTitle })
    },
    
    /**关闭筛选 */
    closeHyFilter: function () {
      if (this.data.district_open) {
        this.setData({
          district_open: false,
          source_open: false,
          style_open: false,
          filter_open: false,
        })
      } else if (this.data.source_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
        })
      }
      else if (this.data.style_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
        })
      }
      else if (this.data.filter_open) {
        this.setData({
          source_open: false,
          style_open: false,
          district_open: false,
          filter_open: false,
        })
      }
    },
    //search
    search() {
      this.closeHyFilter();
      this.triggerEvent("selectedItem", this.data.searchData)
    },
    //cancel
    cancel() {
      this.closeHyFilter();
    },
    getTags(){
      var that = this;
      console.log("获取tags");
      wx.request({
        url: app.globalData.hostUrl + "/basiclabel/queryListWithNoPage",
        method:'GET',
        data:{},
        success:(res)=>{
        if(res.data.code==0){
          console.log(res.data.data);
          var tags = res.data.data;
          for (let i = 0; i < tags.length;i++){
            tags[i].check=false;
            tags[i].title = tags[i].name;
            that.data.dropDownMenuTags.push(tags[i]);
          }
          that.setData({
            dropDownMenuTags: that.data.dropDownMenuTags
          });
          console.log(that.data.dropDownMenuTags)
        }
        }
      })
    }
  },
  
  //组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function () { 
    this.getTags();  
   },

})