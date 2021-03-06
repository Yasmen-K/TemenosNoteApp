define({ 
  categories: [
    {name: "Kony Widgets",
     data:[
       {title: "Button",
        description:"Button widget is a UI element that is used to trigger any actions. These actions can be navigating to another form, perform animations, interacting with a dialog box, etc.",
        edited: "December 29 2009",
        categories:["Kony Widgets"],
        marker: "sknCircleRed"},
       {title: "Flex Container",
        description:"The FlexContainer widget is a container that can provide a unique UI/UX property to a collection of widgets.",
        edited: "August 25 2010",
        categories:["Kony Widgets"],
        marker: "sknCircleBlue"},
       {title: "Image",
        description:"Image widget is used to display a graphic image such as a company logo, photo, or illustration, in PNG, JPEG,WebP or GIF format, in an application.",
        edited: "Mar 12 2012",
        categories:["Kony Widgets"],
        marker: "sknCircleBlue"},
       {title: "List Box",
        description:"The ListBox widget displays a list of items as a drop-down box and allows you to select a one or more items from the list.",
        edited: "June 14 2020",
        categories:["Kony Widgets"],
        marker: "sknCircleRed"},
       {title: "Label",
        description:"The Label widget is used to display static text on a form. It can be used as a form label or an area header with various text alignments and styles.",
        edited: "August 25 2010",
        categories:["Kony Widgets"],
        marker: "sknCircleOrange"},
       {title: "Map",
        description:"aIf you want to display certain geographical locations on a map as part of your application, you should use a Map widget.",
        edited: "Mar 12 2012",
        categories:["Kony Widgets"],
        marker: "sknCircleGreen"},
       {title: "Text Box",
        description:"The TextBox widget enables you to get a single-line input from users. This widget can accept input from the users in the form of numbers or text.",
        edited: "June 14 2020",
        categories:["Kony Widgets"],
        marker: "sknCircleYellow"}
     ]},
    {name: "Kony Fabric",
     data:[
       {title: "Identity",
        description:"Quantum Fabric identity services help you secure your application by adding an authentication layer.",
        edited: "December 29 2009",
        categories:["Kony Fabric"],
        marker: "sknCircleYellow"},
       {title: "Integration",
        description:"An Integration Service is an application component that represents the application interaction with an external system or data source.",
        edited: "July 17 2021",
        categories:["Kony Fabric"],
        marker: "sknCircleOrange"},
       {title: "Orchestration",
        description:"Orchestration Services leverage the concept of combining multiple integration services, object services or orchestration services into a single service to simplify business logic in client apps and reduce the number of service invocations.",
        edited: "July 15 2021",
        categories:["Kony Fabric"],
        marker: "sknCircleBlue"},
       {title: "Object Services",
        description:"Object Services is a feature of Quantum Fabric that enables model-driven application design and development by following a microservices architectural approach to create reusable components and link them to fit into your solution.",
        edited: "July 20 2021",
        categories:["Kony Fabric"],
        marker: "sknCircleRed"},
     ]}
  ],

  formatedData: [],

  onViewCreated: function(){
    this.view.preShow = this.preShow;
  },

  preShow: function() {
    this.renderSegList();
    this.view.reusableHeader.btnSearch.onClick=this.navToSearch;
    this.view.segListCategories.onRowClick = this.onRowClicked;
    this.view.btnSaveCategory.onClick=this.saveCategory;
    this.view.btnCloseIcon.onClick=this.closePopup;
  },

  navToSearch:function(){
    this.setDataToKony("categories", this.categories);
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
    konyNavigate.navigate();
  },

  formatedSegmentData: function(responseData,formatedData) {
    var self=this;
    formatedData=[];

    var header=[];
    header.push({
      "lblHeaderTitle":{"text":"Categories"},
      "flxIcon":{"onClick":self.addCategory, "zIndex":"2"},
      "iconPlus":{"src":"iconPlus.json"},
    });

    responseData.sort(this.compare);

    var rows=[];
    responseData.forEach(function(category) {
      var notesNumber=category.data.length+"";
      rows.push({
        "lblCategoryName": {"text": category.name},
        "lblNotesNumber": {"text": notesNumber},
        "iconArrowCircleORight":{"src":"iconArrowCircleORight.json"},
        "flxBottomLine": {"width": "95%"}
      });
    });

    header.push(rows);
    formatedData.push(header);
    this.formatedData=formatedData;
  },

  renderSegList:function(){
    var changedCategory=this.getItemFromKony("categories");
    if(changedCategory){
      this.categories=changedCategory;
    }
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
    this.setDataToKony("categories", this.categories);
    this.setDataToKony("categoryIndex", indexOfSelectedRow);
    var konyNavigate = new kony.mvc.Navigation("frmCategoryNotes");
    konyNavigate.navigate();
  },

  addCategory: function(){
    this.view.flxPopup.setVisibility(true);
    this.view.flxPopup.isModalContainer=true;
  },

  saveCategory:function(){
    var title=this.view.txtBoxAddCategory.text;
    var alreadyExist=this.categories.find(function(value){return value.name===title; });
    if(alreadyExist){
      alert("Category with this name already exists");
      return;
    }
    this.categories.push({
      name:title,
      data: new Array(0)
    });
    this.setDataToKony("categories", this.categories);
    this.renderSegList();    
    this.closePopup();
  },

  closePopup:function(){
    this.view.flxPopup.setVisibility(false);
    this.view.flxPopup.txtBoxAddCategory.text="";
  },

  setDataToKony:function(key,data){
    data=JSON.stringify(data);
    kony.store.setItem(key, data);
  },

  getItemFromKony:function(key){
    var toReturn=JSON.parse(kony.store.getItem(key));
    if(toReturn)return toReturn;
    return ;
  }

});