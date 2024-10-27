//import Phaser from 'phaser'
import GamePlay from './scene/GamePlay.js'
import Preload from './scene/GamePreload.js'
import GameMenu from './scene/GameMenu.js'
    
let game
window.onload = function() {
let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game",
        width:720,
        height:1280,
    }, 
    backgroundColor: '#000000',

    scene: [Preload,GameMenu,GamePlay]
}
game = new Phaser.Game(config);

}
