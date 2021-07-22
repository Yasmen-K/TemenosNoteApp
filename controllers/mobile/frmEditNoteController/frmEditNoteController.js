define({ 

  segDataList: [
    {
      name: "Red",
      color: "sknCircleRed",
    },
    {
      name: "Green",
      color: "sknCircleGreen",
    },
    {
      name: "Blue",
      color: "sknCircleBlue",
    },
    {
      name: "Yellow",
      color: "sknCircleYellow",
    },
    {
      name: "Orange",
      color: "sknCircleOrange",
    },
  ],

  formatedColorTags: [],

  onViewCreated: function(){
    this.view.preShow = this.preShow;
  },


  preShow: function(){
    this.formatColorTagsData.call(this,this.segDataList,this.formatedColorTags);
    this.view.segColorTag.setData(this.formatedColorTags);
    this.view.segColorTag.onRowClick = this.onRowClick;
    this.view.AngleDownColor.onTouchStart = this.pickColor;

    this.view.AngleDown.onTouchStart = this.pickCategories;
    this.view.chkBxGrpCategories.onSelection = this.updateCategoryTxt;

    this.view.btnNoteSave.onClick = this.onClick;   
    this.view.reusableHeader.btnSearch.onClick=this.navToSearch;
  },

  onNavigate: function(data){
    this.populateCategories();

    if(data){
      // Populates the data
      this.view.txtBxNoteTitleInput.text = data.title;
      this.view.lblEditCategories.text = data.categories;
      this.view.txtAreaEditNoteTxt.text = data.noteTxt;
      this.updateChkBox();

      //Populates the color tag
      var skin = data.marker;
      var color = skin.split("sknCircle");
      this.view.CircleDark.skin = data.marker;
      this.view.lblEditColorTag.text = color[1];

      this.view.btnNoteSave.text = "Save";
    }else {
      this.view.txtBxNoteTitleInput.text = "";
      this.view.lblEditCategories.text = "";
      this.view.txtAreaEditNoteTxt.text = "";
      this.view.CircleDark.skin = "sknCircleDeff";
      this.view.lblEditColorTag.text = "Pick Color";

      this.view.btnNoteSave.text = "Add";
    }
  },

  // Category functions:
  populateCategories: function(){
    var ctgArr = [];
    var i = 1;
    var category = this.getItemFromKony("categories");
    for(var ctg of category){
      ctgArr.push(["ctg" + i, ctg.name]);
      i++;
    } 
    this.view.chkBxGrpCategories.masterData = ctgArr;
  },

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
        "CircleDark": {"skin": data.color},
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
    this.view.CircleDark.skin = colorData[0].CircleDark.skin;
  },

  // Button Add/Save function
  onClick: function(){
    var newData = {
      title: this.view.txtBxNoteTitleInput.text,
      description: this.view.txtAreaEditNoteTxt.text,
      edited: new Date(),
      categories: this.view.lblEditCategories.text.split(", "),   
      marker: this.view.CircleDark.skin, 
    };
    var categories = this.getItemFromKony("categories");
    var ctgIndex = this.getItemFromKony("categoryIndex");
    var currNote = this.getItemFromKony("currentNote");

    var ctg = categories[ctgIndex];
    var ctgData = ctg.data;

    // Save
    if(this.view.btnNoteSave.text === "Save"){
      for(var data of ctgData){
        if(data.title === currNote.title){
          data.title = newData.title;
          data.description = newData.description;
          data.edited = newData.edited;
          data.categories = newData.categories;
          data.marker = newData.marker;
        }
      }
      // Add
    }else {
      ctgData.push(newData);
    }

    ctg.data = ctgData;
    categories[ctgIndex] = ctg;
    this.setDataToKony("categories", categories);

    this.view.txtBxNoteTitleInput.text = "";
    this.view.lblEditCategories.text = "";
    this.view.txtAreaEditNoteTxt.text = "";

    var nvg = new kony.mvc.Navigation("frmCategoriesList");
    nvg.navigate();
  },

  navToSearch:function(){
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
    konyNavigate.navigate();
  },

  setDataToKony:function(key,data){
    data=JSON.stringify(data);
    kony.store.setItem(key, data);
  },

  getItemFromKony:function(key){
    var toReturn = JSON.parse(kony.store.getItem(key));
    if(toReturn === 0 || toReturn) {
      return toReturn;
    }
    return ;
  }

});