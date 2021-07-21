define({ 
  
  onViewCreated: function(){
    this.view.preShow = this.preShow;
//     this.view.onNavigate = this.onNavigate;
  },

  preShow: function(){
    this.noteData = kony.store.getItem("currentNote");
    
    this.view.lblNoteTitle.text = this.noteData.title;
    this.view.lblCategoryList.text = this.noteData.categories.join(", ");
    this.view.lblNoteTxt.text = this.noteData.description;
    this.view.CircleDark.skin = this.noteData.marker;
	this.view.btnSearch.onClick=this.navToSearch;
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
  
   navToSearch:function(){
    var konyNavigate = new kony.mvc.Navigation("frmSearch");
    konyNavigate.navigate();
  }

//   onNavigate:function(newData){
//     this.view.lblNoteTitle.text = newData.title;
//     this.view.lblCategoryList.text = newData.categories;
//     this.view.lblNoteTxt.text = newData.noteTxt;
//   }

});