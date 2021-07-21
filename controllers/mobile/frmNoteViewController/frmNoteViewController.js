define({ 

  onViewCreated: function(){
    this.view.preShow = this.preShow;
  },

  preShow: function(){
    this.noteData = kony.store.getItem("currentNote");

    this.view.lblNoteTitle.text = this.noteData.title;
    this.view.lblCategoryList.text = this.noteData.categories.join(", ");
    this.view.lblNoteTxt.text = this.noteData.description;
    this.view.CircleDark.skin = this.noteData.marker;
    this.view.reusableHeader.btnSearch.onClick=this.navToSearch;
    this.view.btnNoteEdit.onClick = this.editNote;
    this.view.btnNoteRemove.onClick = this.removeNote;
  },

  editNote: function(){
    var data = {
      title: this.view.lblNoteTitle.text,
      categories: this.view.lblCategoryList.text,
      noteTxt: this.view.lblNoteTxt.text,
      marker: this.view.CircleDark.skin
    }; 
    var nvg = new kony.mvc.Navigation("frmEditNote");
    nvg.navigate(data);
  },

  removeNote: function() {
    var categories = kony.store.getItem("categories");
    var ctgIndex = kony.store.getItem("categoryIndex");   
    var currNote = kony.store.getItem("currentNote");

    var ctg = categories[ctgIndex];
    var ctgData = ctg.data;
    
    alert(categories);

    for(var i = 0; i < ctgData.length; i++){
      var data = ctgData[i];
      
      if(data.title === currNote.title){
        ctgData.splice(i, 1);
      }
    }
    ctg.data = ctgData;
    categories[ctgIndex] = ctg;
    alert(categories);
    kony.store.setItem("categories", categories);
    
    

    var nvg = new kony.mvc.Navigation("frmCategoriesList");
    nvg.navigate();
  },

  navToSearch:function(){
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
    konyNavigate.navigate();
  }
});