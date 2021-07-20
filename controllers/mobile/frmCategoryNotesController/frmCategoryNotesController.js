define({ 

 //Type your controller code here 
  
 segDataList: [
    {title: "Ivan Minchev",
     edited: "December 29 2009",
     marker: "sknCircleGreen"},
    {title: "Denica Stoeva",
     edited: "August 25 2010",
     marker: "sknCircleRed"},
    {title: "Magazin za mebeli",
     edited: "Mar 12 2012",
     marker: "sknCircleBlue"},
    {title: "Ivan Milchev",
     edited: "June 14 2020",
     marker: ""},
  ],
  
  formatedNotes: [],
  
  onViewCreated: function() {
    this.view.init = this.init;
    this.view.preShow = this.preShow;
   
  },
  
  
  init: function() {
    this.konyData = kony.store.getItem("currentCategory");
    this.konyCategoriesData = kony.store.getItem("categories");
    this.formatNotesData.call(this,this.konyData,this.formatedNotes);
    this.sortNotes = this.sortNotes;
    
    console.log(this.konyCategoriesData);
    },
  
  preShow: function() {
    this.view.segNotes.setData(this.formatedNotes);
    this.view.segNotes.onRowClick = this.onRowClicked;
    this.view.reusableHeader.btnSearch.onClick = this.navigate;
    this.view.ButtonRoundFloat.onClick = this.navigateAdd;
    this.view.btnDeleteCategory.onClick = this.deleteCategory(this.konyCategoriesData,this.konyData);
  },
  
  
  formatNotesData: function(konyData,fomratedData) {
    var scope = this;
    var konyData = kony.store.getItem("currentCategories");
    var sortedNotes = this.sortNotes(responseData);
    alert(sortedNotes);
    sortedNotes.forEach(function(note) {
      
      fomratedData.push({
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
      var data = this.konyData.data[indexOfSelectedRow];
      kony.store.setItem("currentNote", data);
      var konyNavigate = new kony.mvc.Navigation("frmNoteView");
      konyNavigate.navigate();
    },
  
  deleteCategory:function(konyCategories,konyData){
    var category = konyData.name;
    var toRemove = konyCategories.find(function(el){
      return el.name === category;
    });
    kony.store.removeItem("name");
    
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