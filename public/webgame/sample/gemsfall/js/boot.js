"use strict";

var bootState = function(game){

}

bootState.prototype = {

  init:function()
  {

  },
  preload:function()
  {
      var d = new Date();
      var t = d.getTime();

      this.load.baseURL = "assets/";

      this.load.image('loadingbar','ui/loadingbar.png?v='+t);
      this.load.image('loadingbar_bg','ui/loadingbar_bg.png?v='+t);
      this.load.image('preload_title','ui/preload_title.png?v='+t);

  },
  create:function()
  {
    this.scene.start('preload');
  }
};
