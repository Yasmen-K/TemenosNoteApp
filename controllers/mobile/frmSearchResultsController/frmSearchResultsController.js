define({ 
  
  formatedNotes: [],
  
  onViewCreated: function() {
    this.view.init = this.init;
    this.view.preShow = this.preShow;
   
  },
  
  
  init: function() {
    this.formatNotesData = this.formatNotesData;
    this.sortNotes = this.sortNotes;
     this.view.reusableHeader.btnSearch.onClick = this.navigate;
  },
  
  preShow: function() {
    this.view.segNotes.setData(this.formatedNotes);
  },
  
  onNavigate:function(sentData){
    alert(sentData);
    this.formatNotesData(sentData, this.formatedNotes);
  },
  
  formatNotesData: function(responseData,formatedData) {
    var scope = this;
    var sortedNotes = this.sortNotes(responseData);
    
    sortedNotes.forEach(function(note) {
     
      formatedData.push({
        "lblNote": {"text": note.title},
        "lblEdited": {"text": scope.formatDate(note.edited)},
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
  
  navigate:function(){
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
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
  }
 });