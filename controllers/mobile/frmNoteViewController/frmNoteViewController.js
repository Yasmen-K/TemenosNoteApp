define({ 

  noteData: {
    title: "Some Note",
    categories: ["Category 2", "Category 3"],
    noteTxt: "asdlasijdfoapdjfsdfsdfsd",
    marker: "sknCircleGreen",
    edited: "August 25 2010"
  },
  
  onViewCreated: function(){
    this.view.init = this.init;
    this.view.preShow = this.preShow;
//     this.view.onNavigate = this.onNavigate;
  },

  init: function(){
    this.view.lblNoteTitle.text = this.noteData.title;
    this.view.lblCategoryList.text = this.noteData.categories.join(", ");
    this.view.lblNoteTxt.text = this.noteData.noteTxt;
    this.view.CircleDark.skin = this.noteData.marker;

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

//   onNavigate:function(newData){
//     this.view.lblNoteTitle.text = newData.title;
//     this.view.lblCategoryList.text = newData.categories;
//     this.view.lblNoteTxt.text = newData.noteTxt;
//   }

});