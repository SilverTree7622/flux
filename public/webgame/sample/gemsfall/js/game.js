"use strict";

var gameState = function(game){

};

gameState.prototype = {

  init:function()
  {
    gameState.obj = this;

    this.centerX = this.game.config.width*0.5;
    this.centerY = this.game.config.height*0.5;
    this.width = this.game.config.width;
    this.height = this.game.config.height;

    this.score = 0;
    this.speed = 800;

    this.LEFT = false;
    this.RIGHT = false;
    this.TOP = true;
    this.DOWN = false;

    this.start = false;

    this.gameOverFlag = false;

    this.basketSpeed = 900;

    this.gemsArr = ["gem_1","gem_2","gem_3","gem_4","gem_5","gem_6","gem_7","gem_8","gem_9"];

    this.directionFlag = false;
    this.timeCount = 60;

    this.desktopFlag = false;
    this.tapCount = 0;

    this.timedEvent = undefined;

  },
  create:function()
  {
    this.physics.world.setBounds(0, 0,this.game.width, this.game.height);

    this.setScreen();

    this.addHud();

  },
  setScreen:function()
  {
    var bg = this.add.image(0,0,"gamebg");
    bg.setOrigin(0);

    this.basket = this.physics.add.sprite(this.centerX,this.height-380,"bag");
    this.basket.setOrigin(0.5,0);

    this.hitArea = this.physics.add.sprite(this.centerX,this.basket.y+120,"bagHitArea");
    this.hitArea.setOrigin(0.5,0);
    this.hitArea.alpha = 0.0;

    this.basket.hitted = false;
    this.basket.iy = this.basket.y;

    this.gemGroup = this.physics.add.group();

  },

  addHud:function()
  {
    var style = { font: "45px Arial Black", fill: "#ffffff", align: "center" };

    var timeLabel = this.add.text(1300, 42,"Time:",style);
    timeLabel.setOrigin(0,0.5);

    this.timeField = this.add.text(timeLabel.x+150, 42,this.timeCount.toString(),style);
    this.timeField.setOrigin(0,0.5);

    var scoreLabel = this.add.text(20, 42,"SCORE:",style);
    scoreLabel.setOrigin(0,0.5);

    this.scoreField = this.add.text(scoreLabel.x+200, 42,this.score.toString(),style);
    this.scoreField.setOrigin(0,0.5);

    var str = "mobile_instruction";

    this.desktopFlag = this.sys.game.device.os.desktop;

    if(this.desktopFlag === true)
    {
       str = "desktop_instruction";
       this.addKeyBoardEvents();
    }
    else {
      str = "mobile_instruction";
    }

    this.instruction = this.add.sprite(this.centerX,this.centerY-100,str);
    this.instruction.setOrigin(0.5);

  },

  addTimer:function()
  {
    var timerConfig = {
      delay: 1000,
      callback: this.updateCounter,
      callbackScope: this,
      repeat: this.timeCount,
      startAt: 0
    };

    this.timedEvent = this.time.addEvent(timerConfig);
  },
  updateCounter:function()
  {
     if(this.timeCount > 0)
     {
       this.timeCount--;
       this.updateTimeText();
     }

     if(this.timeCount === 0)
     {
      this.onTimerComplete();
     }

  },
  updateTimeText:function()
  {
    this.timeField.text = this.timeCount.toString();
  },
  onTimerComplete:function()
  {
   this.onGameOver();
  },

  addGameObjects:function()
  {
    if(this.start === false){ return; }
    if(this.TOP === false){ return; }

    this.addGems();

  },
  addGems:function()
  {
    var entriesArr = this.gemGroup.children.entries;
    var len = entriesArr.length;

    if(len >= Phaser.Math.Between(3,5)) { return; }

    if(len > 0)
    {
     var lastChild = entriesArr[len-1];

     var rnd = Phaser.Math.Between(8,9)*100;
     if(lastChild.y < rnd){ return; }
    }

    var xpos = Phaser.Math.Between(100,512);
    var ypos = -200;

    var rnd = Phaser.Math.Between(1,4);

    if(rnd === 2)
    {
      xpos = Phaser.Math.Between(512,1024);
    }
    else if(rnd === 3)
    {
      xpos = Phaser.Math.Between(1024,1436);
    }

    var fno = Phaser.Math.Between(0,this.gemsArr.length-1);
    var type = this.gemsArr[fno];

    var sprite = this.physics.add.sprite(xpos,ypos,type);
    sprite.setOrigin(0.5);
    this.gemGroup.add(sprite);

    sprite.type = type;

    sprite.body.velocity.y = this.speed;
    sprite.body.angularVelocity = 100;

  },
  setScore:function(n=1)
  {
    this.score += n;
    this.scoreField.text = this.score.toString();
  },

  onGameOver:function()
  {
    if(this.gameOverFlag) {
      return;
    }

    let _self = this;
    this.gameOverFlag = true;
    Global.score = this.score;
    this.speed = 0;

    var entriesArr = this.gemGroup.children.entries;

    for(var j=0; j < entriesArr.length; j++)
    {
      var gem = entriesArr[j];
      gem.body.velocity.x = 0;
      gem.body.velocity.y = 0;
      gem.body.angularVelocity = 0;
    }

    var timeup = this.add.sprite(this.centerX,this.centerY,"time_up");
    timeup.alpha = 0;
    timeup.setScale(0.6);

    var tween = this.tweens.add({
        targets: timeup,
        scale:0.8,
        alpha:1,
        duration: 300,
        ease: 'Power2'
    });


      setTimeout(function(){
       _self.scene.start("result");
     },1500);
  },
  addTapEvents:function()
  {
    if(this.desktopFlag === true){ return; }
    if(this.gameOverFlag === true){return;}

    if(this.input.activePointer.isDown)
    {
      this.tapCount++;
      this.onTapDown(this.input.activePointer);
    }
    else {
      this.onTapUp();
    }
  },
  onTapDown:function(pointer)
  {
    if(this.tapCount > 1)
    {
      this.start = true;
      this.instruction.visible = false;
    }
    else {
      return;
    }

    if(pointer.x < this.centerX)
    {
      this.LEFT = true;
      this.RIGHT = false;
    }
    else if(pointer.x > this.centerX)
    {
      this.RIGHT = true;
      this.LEFT = false;
    }

    if(this.timedEvent === undefined) {
      this.addTimer();
    }
  },
  onTapUp:function()
  {
    this.RIGHT = false;
    this.LEFT = false;
  },
  addKeyBoardEvents:function()
  {
    this.input.keyboard.on('keydown_LEFT',this.onKeyDown,this);
    this.input.keyboard.on('keydown_RIGHT',this.onKeyDown,this);

    this.input.keyboard.on('keyup_LEFT',this.onKeyUp,this);
    this.input.keyboard.on('keyup_RIGHT',this.onKeyUp,this);

  },

  onKeyDown:function(event)
  {
    if(this.gameOverFlag === true){return;}

    var key = "";
    key = event.key;

    this.instruction.visible = false;
    this.start = true;

    if(key === "ArrowLeft") { this.LEFT = true; }
    else if(key === "ArrowRight") { this.RIGHT = true; }

    if(this.timedEvent === undefined) {
      this.addTimer();
    }

  },
  onKeyUp:function(event)
  {
    var key = "";
    key = event.key;

    if(key === "ArrowLeft") { this.LEFT = false; }
    else if(key === "ArrowRight") { this.RIGHT = false; }

  },

  /*--------------------UPDATE--------------------------------*/

   update:function()
   {
    this.addTapEvents();

     if(this.start === false){ return; }

     this.basket.y = this.basket.iy;

     if(this.gameOverFlag === true) {

       this.basket.body.velocity.x = 0;
       this.basket.body.velocity.y = 0;

       return;
     }


     this.moveBasket();

     this.moveGems();

     this.Collisions();

     this.addGameObjects();

     this.speed += 0.2;

   },
   moveBasket:function()
   {
     if(this.LEFT === true) { this.basket.x += -15; }
     if(this.RIGHT === true) { this.basket.x += 15; }

     var half_width = this.basket.width*0.5;

     if(this.basket.x <= half_width) { this.basket.x = half_width }
     else if(this.basket.x >= this.width - half_width) { this.basket.x = this.width - half_width; }

     this.hitArea.x = this.basket.x;

   },

   moveGems:function()
   {
     var entriesArr = this.gemGroup.children.entries;
     var len = entriesArr.length;

     if(len <= 0){ return; }

     for(var i=0; i < len; i++)
     {
       var gem = entriesArr[i];

       if(gem.y > this.height + gem.height)
       {
         gem.destroy();
         len = entriesArr.length;
         break;
       }

     }
   },
   Collisions:function()
   {
     this.physics.add.overlap(this.hitArea,this.gemGroup,this.onGemHit,null,this); //overlap collider
   },

   onGemHit:function(basket,sprite)
   {
     sprite.destroy();
     this.setScore(10);
   }

};
