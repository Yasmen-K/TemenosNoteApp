define({ 



  onViewCreated: function() {
    this.view.preShow = this.preShow;

  },


  preShow: function() {
    debugger;
    this.formatedNotes = [];
//     this.konyIndex = kony.store.getItem("categoryIndex");
    this.konyIndex=this.getItemFromKony("categoryIndex");
//     this.konyCategories = kony.store.getItem("categories");
    this.konyCategories=this.getItemFromKony("categories");
    this.formatNotesData(this.konyIndex,this.konyCategories,this.formatedNotes);
    
    this.view.segNotes.onRowClick = this.onRowClicked;
    this.view.reusableHeader.btnSearch.onClick = this.navigate;
    this.view.ButtonRoundFloat.onClick = this.navigateAdd;
    this.view.btnDeleteCategory.onClick = this.deleteCategory;
    this.view.lblCategoryName.text = this.konyCategories[this.konyIndex].name;
  },



  formatNotesData: function(konyIndex,konyData,formatedNotes) {
    var categoryData = konyData[konyIndex];
    
    if(categoryData.data.length > 0){
      var self=this;
       var sortedNotes = this.sortNotes(categoryData.data);
      konyData[konyIndex].data = sortedNotes;
//       kony.store.setItem("categories", konyData);
       this.setDataToKony("categories", konyData);
      console.log(konyData);
      sortedNotes.forEach(function(note) {
        debugger;
        formatedNotes.push({
          "lblNote": {"text": note.title},
          "lblEdited": {"text": self.formatDate(note.edited)},
          "markerCircle":{"skin":note.marker},
        });
      });
      this.view.segNotes.setData(formatedNotes);
    }
  },

   sortNotes:function(arrNotes){
     var sorter = function(a,b){
      return new Date(a.edited).getTime() - new Date(b.edited).getTime();
     };
     return arrNotes.sort(sorter);
  },
  
  deleteCategory:function(){
    var categories = this.konyCategories;
    categories.splice(this.konyIndex,1);
//     kony.store.setItem("categories", categories);
    this.setDataToKony("categories", categories);
     var konyNavigate = new kony.mvc.Navigation("frmCategoriesList");
    konyNavigate.navigate();
  },

  onRowClicked: function() {
    var indexOfSelectedRow = this.view.segNotes.selectedRowIndex[1];
    var data = this.konyCategories[this.konyIndex].data[indexOfSelectedRow];
//     kony.store.setItem("currentNote", data);
    this.setDataToKony("currentNote",data);
    var konyNavigate = new kony.mvc.Navigation("frmNoteView");
    konyNavigate.navigate(this.indexKony);
  },


  navigate:function(){
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
    konyNavigate.navigate();
  },

  navigateAdd:function(){
    var konyNavigate = new kony.mvc.Navigation("frmEditNote");
    konyNavigate.navigate();
  },
  
  formatDate:function(date){
    var editedDate=new Date(date);
    var currentDate=new Date();
    var daysAgo=Math.floor((currentDate-editedDate)/86400000);
    if(daysAgo===1){
      return "Edited: yesterday";
    }
    if(daysAgo<7){
      return "Edited: " + daysAgo + " days ago";
    }
    return "Edited: " + editedDate.getDate() + "-" + (editedDate.getMonth() + 1) + "-" + editedDate.getFullYear();
  },
  
  setDataToKony:function(key,data){
    data=JSON.stringify(data);
    kony.store.setItem(key, data);
  },
  
  getItemFromKony:function(key){
    var toReturn=JSON.parse(kony.store.getItem(key));
    if(toReturn===0 || toReturn)return toReturn;
    return ;
  }



});