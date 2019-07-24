
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
    dropDownMenuTags: [{ id: 0, title: "近地铁", check: false }, { id: 1, title: "学区房", check: false }, { id: 2, title: "精装修", check: false }, { id: 3, title: "清水房", check: false }, { id: 4, title: "普通装修", check: false }, { id: 5, title: "有电梯", check: false }, { id: 6, title: "无电梯", check: false }, { id: 7, title: "随时看房", check: false }, { id: 8, title: "有车位", check: false }, { id: 9, title: "无车位", check: false }],
    dropDownMenuFilterData: [{ id: "1", title: "价格从高到低" }, { id: "2", title: "价格从低到高" }, { id: "3", title: "面积从大到小" }, { id: "3", title: "面积从小到大" }],
    dropDownMenuSizeData: [{ id: "1", title: "50以下" }, { id: "2", title: "50-70" }, { id: "3", title: "70-90" }, { id: "4", title: "90-120" }, { id: "5", title: "120-150" }, { id: "6", title: "150-200" }, { id: "7", title: "200-300" }, { id: "8", title: "300以上" }],
    dropDownMenuTypeData: [{ id: "1", title: "普通住宅" }, { id: "2", title: "公寓" }, { id: "3", title: "别墅" }, { id: "3", title: "平房" }, { id: "3", title: "其他" }], 
    dropDownMenuAge: [{ id: "1", title: "两年内" }, { id: "2", title: "2-5年" }, { id: "3", title: "5-7年" }, { id: "3", title: "7年以上" }],
    dropDownMenuPrice: [{ id: "1", title: "20万以内" }, { id: "2", title: "20-40万" }, { id: "3", title: "40-70万" }, { id: "4", title: "70-100万" }, { id: "5", title: "100-120万" }, { id: "6", title: "120-150万" }, { id: "7", title: "150-200万" }, { id: "8", title: "200万以上" }],
    //价格的选中id
    clickPriceId:999,
    priceTwice:false
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

    selectDistrictLeft: function (e) {
      var model = e.target.dataset.model.childModel;
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.setData({
        dropDownMenuDistrictDataRight: model==null?"":model,
        district_left_select: selectedId,
        district_right_select: '',
      })
      if (model == null || model.length == 0) {
        this.closeHyFilter();
        this.triggerEvent("selectedItem", { index: this.data.shownavindex, selectedId: selectedId, selectedTitle: selectedTitle })
      }
    },

    selectDistrictRight: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        district_right_select: selectedId,
        district_right_select_name:selectedTitle
      })
      this.triggerEvent("selectedItem", { index: this.data.shownavindex, selectedId: selectedId, selectedTitle: selectedTitle })
    },

    selectSourceItem: function (e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      if(e.target.dataset.active){
        this.setData({
          clickPriceId:999,
          priceTwice:true,
          selected_source_id: '',
          selected_source_name: ''
        })
      }else{
        this.setData({
          clickPriceId: selectedId,
          priceTwice: false,
          selected_source_id: selectedId,
          selected_source_name: selectedTitle
        }) 
        this.triggerEvent("selectedItem", { index: this.data.shownavindex, selectedId: selectedId, selectedTitle: selectedTitle })
      }
      this.closeHyFilter();
      
      
    },
  //
    selectFilterItem: function (e) {
      if (e.target.dataset.type=="tag"){
        var item = e.target.dataset.model;
        var index = e.target.dataset.index;
        if (e.target.dataset.model.check){ 
          var check = 'dropDownMenuTags['+index+'].check'
          this.setData({ 
            [check]: false
          }) 
        }else{
          var check = 'dropDownMenuTags[' + index + '].check'
          this.setData({
            [check]: true
          }) 
      }
        console.log(this.data.dropDownMenuTags[index])}
    /*  var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_filter_id: selectedId,
        selected_filter_name:selectedTitle
      })
      this.triggerEvent("selectedItem", { index: this.data.shownavindex, selectedId: selectedId, selectedTitle: selectedTitle })*/
     
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
  },
  //组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function () {
    
    
  },

})