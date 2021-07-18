define({ 
  categories: [
    {name: "Movie",
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
    {name: "Category",
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
    {name: "Notes",
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
    {name: "Category 4",
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
     ]}
  ],

  formatedData: [],

  onViewCreated: function(){
    this.view.init = this.init;
    this.view.preShow = this.preShow;
    //     this.view.postShow = this.postShow;
  },

  init: function() {
    this.renderSegList();
  },

  preShow: function() {
    this.view.segListCategories.onRowClick = this.onRowClicked;
    this.view.segListCategories.setData(this.formatedData);
    this.view.btnAddCategory.onClick=this.saveCategory;
    this.view.imgCloseIcon.onClick=this.closePopup;
  },

  postShow: function(){  
    debugger;
    //     this.view.segListCategories.data[0][0]['imgAddCategory'].onTouchStart=this.addCategory;
    debugger;
  },

  formatedSegmentData: function(responseData,formatedData) {
    var self=this;
    formatedData=[];

    var header=[];
    header.push({
      "lblHeaderTitle":{"text":"Categories"},
      "imgAddCategory":{
        "src":"acme.png",
        "onClick": self.addCategory
      }
    });
    debugger;

    responseData.sort(this.compare);
    console.log("response data " + responseData);
    var rows=[];
    responseData.forEach(function(category) {
      rows.push({
        "lblCategoryName": {"text": category.name},
        "lblNotesNumber": {"text": category.data.length},
        //         "imgArrow": {"text": contact.dateAdded},
        "lblBottomLine": {"width": "95%"}
      });
    });

    header.push(rows);
    console.log("header with rows " + header);
    formatedData.push(header);
    console.log("formated data after function " + formatedData);
    this.formatedData=formatedData;
  },

  renderSegList:function(){
    this.formatedSegmentData(this.categories, this.formatedData);
    this.view.segListCategories.setData(this.formatedData);
  },

  compare:function(a,b){
    var first=a.name;
    var second=b.name;
    return ( first < second ? -1 : ( first > second ? 1 : 0 ));
  },

  onRowClicked: function() {
    var indexOfSelectedRow = this.view.segListCategories.selectedRowIndex[1];
    var data = this.categories[indexOfSelectedRow];
    kony.store.setItem("choosenCategory", data);
    //TODO navigation
  },

  addCategory: function(){

    if(!this.view.flxPopup.isVisible){
      this.view.flxPopup.setVisibility(true);
    }
  },

  saveCategory:function(){
    var title=this.view.txtBoxAddCategory.text;
    this.categories.push({
      name:title,
      data:[]
    });
    this.renderSegList();    
    this.closePopup();
  },

  closePopup:function(){
    this.view.flxPopup.setVisibility(false);
  }
});