define({ 

  onViewCreated: function(){
    this.view.init = this.init;
    this.view.preShow = this.preShow;
//     this.view.onNavigate = this.onNavigate;
  },

  init: function(){
    this.view.lblNoteTitle.text = "Some Note";
    this.view.lblCategoryList.text = "Category 2, Category 3";
    this.view.lblNoteTxt.text = "asdlasijdfoapdjfsdfsdfsd";

    this.view.btnNoteEdit.onClick = this.editNote;
    this.view.btnNoteRemove.onClick = this.removeNote;
  },

  editNote: function(){
    var data = {
      title: this.view.lblNoteTitle.text,
      categories: this.view.lblCategoryList.text,
      noteTxt: this.view.lblNoteTxt.text
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