  define({ 
    categories: [
      {name: "Kony Widgets",
       data:[
         {title: "Button",
          description:"Button widget is a UI element that is used to trigger any actions. These actions can be navigating to another form, perform animations, interacting with a dialog box, etc.",
          edited: "December 29 2009",
          categories:["Widgets"],
          marker: "sknCircleRed"},
         {title: "Flex Container",
          description:"The FlexContainer widget is a container that can provide a unique UI/UX property to a collection of widgets.",
          edited: "August 25 2010",
          categories:["Widgets"],
          marker: "sknCircleBlue"},
         {title: "Image",
          description:"Image widget is used to display a graphic image such as a company logo, photo, or illustration, in PNG, JPEG,WebP or GIF format, in an application.",
          edited: "Mar 12 2012",
          categories:["Widgets"],
          marker: "sknCircleBlue"},
         {title: "List Box",
          description:"The ListBox widget displays a list of items as a drop-down box and allows you to select a one or more items from the list.",
          edited: "June 14 2020",
          categories:["Widgets"],
          marker: "sknCircleRed"},
         {title: "Label",
          description:"The Label widget is used to display static text on a form. It can be used as a form label or an area header with various text alignments and styles.",
          edited: "August 25 2010",
          categories:["Widgets"],
          marker: "sknCircleOrange"},
         {title: "Map",
          description:"aIf you want to display certain geographical locations on a map as part of your application, you should use a Map widget.",
          edited: "Mar 12 2012",
          categories:["Widgets"],
          marker: "sknCircleGreen"},
         {title: "Text Box",
          description:"The TextBox widget enables you to get a single-line input from users. This widget can accept input from the users in the form of numbers or text.",
          edited: "June 14 2020",
          categories:["Widgets"],
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
          edited: "August 25 2010",
          categories:["Kony Fabric"],
          marker: "sknCircleOrange"},
         {title: "Orchestration",
          description:"Orchestration Services leverage the concept of combining multiple integration services, object services or orchestration services into a single service to simplify business logic in client apps and reduce the number of service invocations.",
          edited: "Mar 12 2012",
          categories:["Kony Fabric"],
          marker: "sknCircleBlue"},
         {title: "Object Services",
          description:"Object Services is a feature of Quantum Fabric that enables model-driven application design and development by following a microservices architectural approach to create reusable components and link them to fit into your solution.",
          edited: "June 14 2020",
          categories:["Kony Fabric"],
          marker: "sknCircleRed"},
       ]}
    ],

    formatedData: [],

    onViewCreated: function(){
      this.view.init = this.init;
      this.view.preShow = this.preShow;
    },

    init: function() {
      this.renderSegList();
    },

    preShow: function() {
      this.view.reusableHeader.btnSearch.onClick=this.navToSearch;
      this.view.segListCategories.onRowClick = this.onRowClicked;
      this.view.segListCategories.setData(this.formatedData);
      this.view.btnSaveCategory.onClick=this.saveCategory;
      this.view.btnCloseIcon.onClick=this.closePopup;
    },

    navToSearch:function(){
      kony.store.setItem("categories", this.categories);
      var konyNavigate = new kony.mvc.Navigation("frmSearch");
      konyNavigate.navigate();
    },

    formatedSegmentData: function(responseData,formatedData) {
      var self=this;
      formatedData=[];

      var header=[];
      header.push({
        "lblHeaderTitle":{"text":"Categories"},
        "btnAddCategory":{"skin":"sknBtnAddImg","onClick":self.addCategory}
      });

      responseData.sort(this.compare);

      var rows=[];
      responseData.forEach(function(category) {
        rows.push({
          "lblCategoryName": {"text": category.name},
          "lblNotesNumber": {"text": Math.round(category.data.length)},
          //         "imgArrow": {"text": contact.dateAdded},
          "flxBottomLine": {"width": "95%"}
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
      kony.store.setItem("categories", this.categories);
      kony.store.setItem("categoryIndex", indexOfSelectedRow);
      var konyNavigate = new kony.mvc.Navigation("frmCategoryNotes");
      konyNavigate.navigate();
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