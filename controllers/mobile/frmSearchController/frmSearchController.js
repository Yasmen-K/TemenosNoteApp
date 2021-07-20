define({ 

 //Type your controller code here 
  
  categories: [
    {name: "Movie",
     data:[
       {name: "Ivan Minchev",
        edited: "December 29 2009",
        marker: "sknCirclePink"},
       {name: "Denica Stoeva",
        edited: "August 25 2010",
        marker: "green"},
       {name: "Magazin za mebeli",
        edited: "Mar 12 2012",
        marker: "pink"},
       {name: "Ivan Minchev",
        edited: "June 14 2020",
        marker: "sknCirclePink"},
     ]},
    {name: "Food",
     data:[
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
     ]},
    ],

  
    onViewCreated: function() {
    this.view.init = this.init;
    this.view.preShow = this.preShow;
   
  },
  
    init: function() {
 
  },
  
  preShow: function() {
    this.view.listBoxCategory.masterData = this.dataList;
    this.view.listBoxColor.masterData = this.colourList;
    this.view.btnSearch.onClick = this.searchData;
  },
  
  

  
  dataList :[
    ["key1", "Movie"],
    ["key2", "Food"],
    ["key3", "Car"]
],
  
    colourList :[
    ["sknCirclePink", "pink"],
    ["key2", "green"],
    ["key3", "blue"]
],
  
  searchData:function(){
    var categorySelection =  this.view.listBoxCategory.selectedKey;
    var colourSelection =  this.view.listBoxColor.selectedKey;
    var noteTitle = this.view.txtNoteTitle.text;
    
    alert(noteTitle);
    
    var categoryValue = this.dataList.find(function(el){
      return el[0] === categorySelection;
    });
    
    var colourValue = this.colourList.find(function(el){
      return el[0] === colourSelection;
    });
    
 
    
    var filteredCategory = this.categories.find(function(category){
    
      return category.name === categoryValue[1];
    });
    
    
       
    var filteredNotes = filteredCategory.data.filter(function(notes){
      
      return notes.name === noteTitle;
     });
    
    var filteredMarker = filteredNotes.filter(function(marker){
      return marker.marker === colourValue[0];
     });
    
    
     var konyNavigate = new kony.mvc.Navigation("frmSearchResults");
     konyNavigate.navigate(filteredMarker);
    
    
    
  },


 
 


 });