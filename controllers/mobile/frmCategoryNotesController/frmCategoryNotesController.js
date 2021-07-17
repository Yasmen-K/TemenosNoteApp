define({ 

 //Type your controller code here 
  
 segDataList: [
    {title: "Ivan Minchev",
     edited: "December 29 2009",
     marker: "25/06/2021"},
    {name: "Denica Stoeva",
     edited: "August 25 2010",
     marker: "25/06/2021"},
    {title: "Magazin za mebeli",
     edited: "Mar 12 2012",
     marker: "25/06/2021"},
    {title: "Ivan Minchev",
     edited: "June 14 2020",
     marker: "25/06/2021"},
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
    sortedNotes.forEach(function(note) {
      fomratedData.push({
        "lblNote": {"text": note.title},
        "lblEdited": {"text": note.edited},
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