"use strict";

var titleState = function(game){

};

titleState.prototype = {

  create:function()
  {
    this.centerX = this.game.config.width*0.5;
    this.centerY = this.game.config.height*0.5;
    this.width = this.game.config.width;
    this.height = this.game.config.height;

    var titlebg = this.add.sprite(0,0,"titlebg");
    titlebg.setOrigin(0);

    var title = this.add.sprite(this.centerX,400,"title");

    var title_image = this.add.sprite(this.centerX,this.centerY+200,"title_image");
    title_image.setScale(0.8);

    var playButton = this.add.sprite(this.centerX,this.height-200,"play_button");
    playButton.setInteractive();
    playButton.on('pointerdown',this.onPlayButtonClick,this);

  },

  onPlayButtonClick:function()
  {
    this.scene.start('game');
  }
};
