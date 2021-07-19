define({ 

  segDataList: [
    {
      name: "Red",
      color: "fa0000",
    },
    {
      name: "Green",
      color: "389c17",
    },
    {
      name: "Blue",
      color: "4b88f1",
    },
    {
      name: "Yellow",
      color: "f0ff21",
    },
    {
      name: "Orange",
      color: "ff6714",
    },
  ],
  
  formatedColorTags: [],
  
  onViewCreated: function(){
    this.view.preShow = this.preShow;
    this.view.onNavigate = this.onNavigate;
  },


  preShow: function(){
    this.formatColorTagsData.call(this,this.segDataList,this.formatedColorTags);
    this.view.segColorTag.setData(this.formatedColorTags);
    this.view.segColorTag.onRowClick = this.onRowClick;
//     this.view.btnNoteSave.onClick = this.onClick;
    
    this.view.AngleDown.onTouchStart = this.pickCategories;
    this.view.AngleDownColor.onTouchStart = this.pickColor;
    
    this.view.chkBxGrpCategories.onSelection = this.updateCategoryTxt;
  },

  onNavigate: function(data){
    this.view.lblNoteTitleInput.text = data.title;
    this.view.lblEditCategories.text = data.categories;
    this.view.txtAreaEditNoteTxt.text = data.noteTxt;
    this.updateChkBox();
  },

  // Category functions
  updateChkBox: function(){
    var categories = this.view.lblEditCategories.text.split(', ');
    var chkBox = this.view.chkBxGrpCategories.masterData;

    var arr = [];
    for(var check of chkBox){
      if(categories.includes(check[1])){
        arr.push(check[0]);
      }
    }
    this.view.chkBxGrpCategories.selectedKeys = arr;
  },

  pickCategories: function(){
    var isVisible = this.view.chkBxGrpCategories.isVisible;

    if(isVisible){
      this.view.chkBxGrpCategories.isVisible = false;
    }else {
      this.view.chkBxGrpCategories.isVisible = true;
    }
  },

  updateCategoryTxt: function(){
    var checked = this.view.chkBxGrpCategories.selectedKeyValues;
    var arr = [];
    
    if(checked){
      for(var check of checked){
        arr.push(check[1]);
      }
    }
    
    this.view.lblEditCategories.text = arr.join(", ");
  },
  
  // Color tag functions
  formatColorTagsData: function(responseData,fomratedData) {
    
    responseData.forEach(function(data) {
      fomratedData.push({
        "lblColor": {"text": data.name},
        "CircleDark": {"fontColor": data.color},
      });
    });
  },
  
  pickColor: function(){
   var isVisible = this.view.segColorTag.isVisible;

    if(isVisible){
      this.view.segColorTag.isVisible = false;
    }else {
      this.view.segColorTag.isVisible = true;
    }
  },
  
  onRowClick: function(){
    var colorData = this.view.segColorTag.selectedRowItems;
    this.view.lblEditColorTag.text = colorData[0].lblColor.text;
  }

//   onClick: function(){
//     var newData = {
//       title: this.view.txtBxNoteTitleInput.text,
//       categories: this.view.lstBxEditCategories.placeholder,
//       noteTxt: this.view.txtAreaEditNoteTxt.text 
//     };
//     var nvg = new kony.mvc.Navigation("frmEditNote");
// 	nvg.navigate(newData);
//   }

});