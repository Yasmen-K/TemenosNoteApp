define({ 

  formatedNotes: [],

  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },
  
  preShow: function() {
    this.konyIndex = kony.store.getItem("categoryIndex");
    this.konyCategories = kony.store.getItem("categories");
    this.formatNotesData(this.konyIndex,this.konyCategories,this.formatedNotes);
    this.view.segNotes.setData(this.formatedNotes);
    this.view.segNotes.onRowClick = this.onRowClicked;
    this.view.reusableHeader.btnSearch.onClick = this.navigate;
    this.view.ButtonRoundFloat.onClick = this.navigateAdd;
  },



  formatNotesData: function(konyIndex,konyData,formatedNotes) {
    var categoryData = konyData[konyIndex];
    var sortedNotes = this.sortNotes(categoryData.data);

    sortedNotes.forEach(function(note) {

      formatedNotes.push({
        "lblNote": {"text": note.title},
        "lblEdited": {"text": note.edited},
        "markerCircle":{"skin":note.marker},
      });
    });
  },

  sortNotes:function(arrNotes){
    var sorter = function(a,b){
      return new Date(a.edited).getTime() - new Date(b.edited).getTime();
    };
    return arrNotes.sort(sorter);
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