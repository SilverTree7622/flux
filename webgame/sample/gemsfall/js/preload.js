"use strict";

var preloadState = function(game){

};

preloadState.prototype = {

  init:function()
  {
      //preloader

      this.centerX = this.game.config.width*0.5;
      this.centerY = this.game.config.height*0.5;

      var style = { font: "45px Arial Black", fill: "#ffffff", align: "center" };

      this.loding_text = this.add.text(this.centerX-411*0.5, this.centerY-60, 'Loading...',style);
      this.loding_text.setOrigin(0,0.5);

      var preload_title = this.add.sprite(this.centerX+10,800,"preload_title");

      var loadingbar_bg = this.add.sprite(this.centerX-411*0.5,this.centerY,"loadingbar_bg");
      loadingbar_bg.setOrigin(0,0.5);

      this.loadingbar = this.add.sprite(this.centerX-411*0.5,this.centerY,"loadingbar");
      this.loadingbar.setOrigin(0,0.5);

      this.loadingbar.scaleX = 0;

  },
  preload:function()
  {
     var d = new Date();
     var t = d.getTime();

     this.load.baseURL = "assets/";

     //background images

     this.load.image('title','ui/title.png?v='+t);
     this.load.image('title_image','ui/title_image.png?v='+t);
     this.load.image('titlebg','titlebg.png?v='+t);
     this.load.image('play_button','ui/play_button.png?v='+t);

     this.load.image('gamebg','gamebg.png?v='+t);
     this.load.image('desktop_instruction','ui/desktop_instruction.png?v='+t);
     this.load.image('mobile_instruction','ui/mobile_instruction.png?v='+t);

    this.load.image('bag','bag.png?v='+t);
    this.load.image('bagHitArea','bagHitArea.jpg?v='+t);

    this.load.image('time_up','ui/time_up.png?v='+t);

    this.load.image('gameover','ui/gameover.png?v='+t);
    this.load.image('resultbg','resultbg.png?v='+t);
    this.load.image('playagain_button','ui/playagain_button.png?v='+t);

    this.load.image('gem_1', 'gems/gem_1.png?v='+t);
    this.load.image('gem_2', 'gems/gem_2.png?v='+t);
    this.load.image('gem_3', 'gems/gem_3.png?v='+t);
    this.load.image('gem_4', 'gems/gem_4.png?v='+t);
    this.load.image('gem_5', 'gems/gem_5.png?v='+t);
    this.load.image('gem_6', 'gems/gem_6.png?v='+t);
    this.load.image('gem_7', 'gems/gem_7.png?v='+t);
    this.load.image('gem_8', 'gems/gem_8.png?v='+t);
    this.load.image('gem_9', 'gems/gem_9.png?v='+t);

    this.load.on('progress', this.loadUpdate,this);


  },
  loadUpdate(per)
  {
    this.loadingbar.scaleX = per;
    this.loding_text.text = "Loading... " + Math.ceil(100*per)+"%";
  },
  create:function()
  {
    this.scene.start('title');
  }

};
