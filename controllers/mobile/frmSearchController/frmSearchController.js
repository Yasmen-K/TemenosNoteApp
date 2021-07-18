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
  },
  
  
  dataList :[
    ["key1", "burger"],
    ["key2", "spice"],
    ["key3", "car"]
],


 });