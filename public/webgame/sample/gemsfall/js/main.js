"use strict";

var width = 1536;
var height = 2048;
var gameDiv = "gamediv";

let config = {

    type:Phaser.CANVAS,
    _parent: gameDiv,
    scale:{
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    width:width,
    height:height

};

var game = new Phaser.Game(config);

game.scene.add("boot",bootState);
game.scene.add("preload",preloadState);
game.scene.add("title",titleState);
game.scene.add("game",gameState);
game.scene.add("result",resultState);

game.scene.start("boot");
