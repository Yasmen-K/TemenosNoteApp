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
    this.view.postShow = this.postShow;
  },

  init: function() {
    debugger;
    this.renderSegList();
  },

  preShow: function() {
    debugger;
    this.view.segListCategories.onRowClick = this.onRowClicked;
    this.view.segListCategories.setData(this.formatedData);
    this.view.btnSaveCategory.onClick=this.saveCategory;
    this.view.btnCloseIcon.onClick=this.closePopup;
  },

  postShow: function(){  
    debugger;
    this.view.segListCategories.data[0][0].btnAddCategory.onClick=this.addCategory;
    debugger;
  },

  formatedSegmentData: function(responseData,formatedData) {
    var self=this;
    formatedData=[];

    var header=[];
    debugger;
    header.push({
      "lblHeaderTitle":{"text":"Categories"},
      "btnAddCategory":{"skin":"sknBtnAddImg","onClick":self.addCategory}
    });
    //     debugger;

    responseData.sort(this.compare);

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
    formatedData.push(header);
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
    this.view.flxPopup.setVisibility(true);
    this.view.flxPopup.isModalContainer=true;
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