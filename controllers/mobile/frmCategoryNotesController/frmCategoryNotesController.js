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
    this.formatNotesData.call(this,this.konyData,this.formatedNotes);
    this.sortNotes = this.sortNotes;
    this.view.reusableHeader.btnSearch.onClick = this.navigate;
    
  },
  
  preShow: function() {
    this.view.segNotes.setData(this.formatedNotes);
    this.view.segNotes.onRowClick = this.onRowClicked;
  },
  
  
  formatNotesData: function(konyData,fomratedData) {
    alert(konyData);
    var scope = this;
    var sortedNotes = this.sortNotes(konyData.data);
    sortedNotes.forEach(function(note) {
      
      fomratedData.push({
        "lblNote": {"text": note.title},
        "lblEdited": {"text": note.edited},
        "markerCircle":{"skin":note.marker},
      });
    });
  },
  
  sortNotes:function(arrNotes){
    alert(JSON.stringify(arrNotes));
    var sorter = function(a,b){
       return new Date(a.edited).getTime() - new Date(b.edited).getTime();
    };
    return arrNotes.sort(sorter);
  },
  
    onRowClicked: function() {
      var indexOfSelectedRow = this.view.segNotes.selectedRowIndex[1];
      var data = this.konyData.data[indexOfSelectedRow];
      alert(JSON.stringify(data));
      console.log(data);
      kony.store.setItem("currentNote", data);
      alert(JSON.stringify(kony.store.getItem("currentNote")));
      var konyNavigate = new kony.mvc.Navigation("frmNoteView");
      konyNavigate.navigate();
    },
  
  navigate:function(){
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
    konyNavigate.navigate();
  },
  


 });