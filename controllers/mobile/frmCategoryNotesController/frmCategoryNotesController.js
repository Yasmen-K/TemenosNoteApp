define({ 
  
  formatedNotes: [],
  
  onViewCreated: function() {
    this.view.init = this.init;
    this.view.preShow = this.preShow;
   
  },
  
  
  init: function() {
//     this.formatNotesData.call(this,this.konyData,this.formatedNotes);
    this.formatNotesData = this.formatNotesData;
    this.sortNotes = this.sortNotes;
    this.indexKony = '';
 
    },
  
  preShow: function() {
    this.konyCategories = kony.store.getItem("categories");
    console.log(this.indexKony);
    this.view.segNotes.setData(this.formatedNotes);
    this.view.segNotes.onRowClick = this.onRowClicked;
    this.view.reusableHeader.btnSearch.onClick = this.navigate;
    this.view.ButtonRoundFloat.onClick = this.navigateAdd;
   
  },
  
    onNavigate: function(input) {
        this.indexKony = input;
        },
  
  
  formatNotesData: function() {
    
    var data = this.konyCategories[this.konyIndex];
    console.log(data);
    var scope = this;
    var sortedNotes = this.sortNotes(data.data);
    sortedNotes.forEach(function(note) {
      
      this.fomratedNotes.push({
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
      var data = this.konyCategories[this.indexKony].data[indexOfSelectedRow];
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