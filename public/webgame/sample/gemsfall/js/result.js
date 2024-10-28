"use strict";

var resultState = function(game){

};

resultState.prototype = {

  create:function()
  {
    this.centerX = this.game.config.width*0.5;
    this.centerY = this.game.config.height*0.5;
    this.width = this.game.config.width;
    this.height = this.game.config.height;

    this.setHighScore();

    var resultbg = this.add.sprite(0,0,"resultbg");
    resultbg.setOrigin(0);

    var gameover = this.add.sprite(this.centerX,400,"gameover");

    var text_style = { fontFamily: 'Arial Black', fontSize: 100, color: '#ffffff', align:'center'};

    var scoreLabel = this.add.text(this.centerX,880,"Score",text_style);
    var scoreField = this.add.text(this.centerX,1000,Global.score.toString(),text_style);

    var highScoreLabel = this.add.text(this.centerX,1200,"High Score",text_style);
    var highScoreField = this.add.text(this.centerX,1320,Global.highScore.toString(),text_style);

    scoreLabel.setOrigin(0.5);
    scoreField.setOrigin(0.5);
    highScoreLabel.setOrigin(0.5);
    highScoreField.setOrigin(0.5);

    var playAgainButton = this.add.sprite(this.centerX,this.height-200,"playagain_button");
    playAgainButton.setInteractive();
    playAgainButton.on('pointerdown',this.onPlayAgainClick,this);

  },
  setHighScore()
  {
    if(localStorage.getItem("HS") !== null)
    {
      Global.highScore = localStorage.getItem("HS");
    }
    if(Global.score >= Global.highScore)
    {
      Global.highScore = Global.score;
      localStorage.setItem("HS",Global.highScore);
    }
  },
  onPlayAgainClick:function()
  {
    Global.score = 0;
    this.scene.start('game');
  }
};
