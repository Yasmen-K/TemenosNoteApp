define({ 

 //Type your controller code here 
  
    onViewCreated: function() {
    this.view.init = this.init;
    this.view.preShow = this.preShow;
   
  },
  
    init: function() {
  
  },
  
  preShow: function() {
    this.view.listBoxCategory.masterData = this.dataList;
    this.view.listBoxCategory.onSelection =this.onSelectionCallback;
   
  },
  
  

  
  dataList :[
    ["key1", "burger"],
    ["key2", "spice"],
    ["key3", "car"]
],
  

  
  onSelectionCallback:function(){
  var selected = this.view.listBoxCategory.selectedKey;
  var found = this.dataList.find(function(el){
    //send found[1]
    if(el[0] === selected){
      
      return el;
    }
  });   

  },


 });