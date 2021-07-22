define({ 

  //Type your controller code here 
  segColourList: [
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


  onViewCreated: function() {
    this.view.init = this.init;
    this.view.preShow = this.preShow;

  },

  

  preShow: function() {
    this.konyData = this.getItemFromKony("categories");
    this.categoryDropDown = [];
    this.formatColorTagsData.call(this,this.segColourList,this.formatedColorTags);
    this.view.segColorTag.setData(this.formatedColorTags);
    this.view.segColorTag.onRowClick = this.onRowClick;
    this.view.iconAngleDownColor.onTouchStart = this.toggleMenu;

    this.view.btnSearch.onClick = this.searchData;
    this.populateCategoryData(this.categoryDropDown);
    this.view.listBoxCategory.masterData = this.categoryDropDown;
  },


  populateCategoryData:function(dropDownArray){
    this.konyData.forEach(function(el,index){
      var key = "key"+(++index);
      dropDownArray.push([key,el.name]);
    });
  },



  searchData:function(){
    var categorySelection =  this.view.listBoxCategory.selectedKey;
    var colourSelection =  this.view.lblPickColour.text;
    var noteTitle = this.view.txtNoteTitle.text;
    var filteredMarker = '';


      var categoryValue = this.categoryDropDown.find(function(el){
        return el[0] === categorySelection;
      });

      var colourValue = this.segColourList.find(function(el){

        return el.name === colourSelection ? el.color : "";
      });


      var filteredCategory = this.konyData.find(function(category){

        return category.name === categoryValue[1];

      });

      var filteredNotes = noteTitle !== null ? 
          filteredCategory.data.filter(function(notes){return notes.title === noteTitle;}) 
      : null;

      filteredMarker = filteredNotes !== null ?  
        filteredNotes.filter(function(marker){return marker.marker === colourValue.color;}) 
      : filteredCategory.data.filter(function(marker){return marker.marker === colourValue.color;});

      var konyNavigate = new kony.mvc.Navigation("frmSearchResults");
      konyNavigate.navigate(filteredMarker);
    
  },

  formatColorTagsData: function(responseData,fomratedData) {  
    responseData.forEach(function(data) {
      fomratedData.push({
        "lblColor": {"text": data.name},
        "CircleDark": {"skin": data.color},
      });
    });

  },

  toggleMenu: function(){
    var isVisible = this.view.segColorTag.isVisible;

    if(isVisible){
      this.view.segColorTag.setVisibility(false);
    }else {
      this.view.segColorTag.setVisibility(true);
    }
  },

  onRowClick: function(){
    var colorData = this.view.segColorTag.selectedRowItems;
    this.view.lblPickColour.text = colorData[0].lblColor.text;
    this.view.CircleDark.skin = colorData[0].CircleDark.skin;
  },

  getItemFromKony:function(key){
    var toReturn=JSON.parse(kony.store.getItem(key));
    if(toReturn===0 || toReturn)return toReturn;
    return ;
  }

});