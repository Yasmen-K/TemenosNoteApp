define({ 

 //Type your controller code here 
  
  categories: [
    {name: "Movie",
     data:[
       {title: "Ivan Minchev",
        edited: "December 29 2009",
        marker: "pink"},
       {name: "Denica Stoeva",
        edited: "August 25 2010",
        marker: "green"},
       {title: "Magazin za mebeli",
        edited: "Mar 12 2012",
        marker: "pink"},
       {title: "Ivan Minchev",
        edited: "June 14 2020",
        marker: "blue"},
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
    ["key1", "pink"],
    ["key2", "green"],
    ["key3", "blue"]
],
  
  searchData:function(){
    var categorySelection =  this.view.listBoxCategory.selectedKey;
    var colourSelection =  this.view.listBoxColor.selectedKey;
    var noteTitle = this.view.txtNoteTitle.txt;
    
    var categoryValue = this.dataList.find(function(el){
      return el[0] === categorySelection;
    });
    
    var colourValue = this.colourList.find(function(el){
      return el[0] === colourSelection;
    });
    
    var filteredCategory = this.categories.find(function(category){
      return category.name === categoryValue[1];
    });
    
//     var filteredNotes = filteredCategory.filter(function(notes){
//       return notes.data.title === noteTitle;
//     });
    
    alert(filteredCategory);
  },

 



 });