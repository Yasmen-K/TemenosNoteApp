define({ 
  
  formatedNotes: [],
  
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },
  
 
  
  preShow: function() {
    this.view.reusableHeader.btnSearch.onClick = this.navigate;
    this.view.segNotes.setData(this.formatedNotes);
    this.view.flxBtnAdd.onClick = this.navigateAdd;
  },
  
  onNavigate:function(sentData){
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
  
  navigateAdd:function(){
    var konyNavigate = new kony.mvc.Navigation("frmEditNote");
    konyNavigate.navigate();
  },
  
  formatDate:function(date){
    var editedDate=new Date(date);
    var currentDate=new Date();
    var daysAgo=Math.floor((currentDate-editedDate)/86400000);
    if(daysAgo === 0){
      return "Edited: today";
    }
    if(daysAgo===1){
      return "Edited: yesterday";
    }
    if(daysAgo<7){
      return "Edited: " + daysAgo + " days ago";
    }
    return "Edited: " + editedDate.getDate() + "-" + (editedDate.getMonth() + 1) + "-" + editedDate.getFullYear();
  }
 });