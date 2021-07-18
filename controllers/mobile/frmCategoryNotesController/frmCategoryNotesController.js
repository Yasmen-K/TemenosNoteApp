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
    this.formatNotesData.call(this,this.segDataList,this.formatedNotes);
    this.sortNotes = this.sortNotes;
    
  	
   
  },
  
  preShow: function() {
    this.view.segNotes.setData(this.formatedNotes);
  },
  
  
  formatNotesData: function(responseData,fomratedData) {
    var scope = this;
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
  


 });