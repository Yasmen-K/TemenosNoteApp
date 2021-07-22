define({ 



  onViewCreated: function() {
    this.view.preShow = this.preShow;

  },


  preShow: function() {
    this.formatedNotes = [];
    this.konyIndex = kony.store.getItem("categoryIndex");
    this.konyCategories = kony.store.getItem("categories");
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
     
       var sortedNotes = this.sortNotes(categoryData.data);
      konyData[konyIndex].data = sortedNotes;
      kony.store.setItem("categories", konyData);
      console.log(konyData);
      sortedNotes.forEach(function(note) {

        formatedNotes.push({
          "lblNote": {"text": note.title},
          "lblEdited": {"text": note.edited},
          "markerCircle":{"skin":note.marker},
        });
      });
      this.view.segNotes.setData(formatedNotes);
      return;
    }
    this.view.segNotes.isVisible(false);
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
    kony.store.setItem("categories", categories);
     var konyNavigate = new kony.mvc.Navigation("frmCategoriesList");
    konyNavigate.navigate();
  },

  onRowClicked: function() {
    var indexOfSelectedRow = this.view.segNotes.selectedRowIndex[1];
    var data = this.konyCategories[this.konyIndex].data[indexOfSelectedRow];
    kony.store.setItem("currentNote", data);
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



});