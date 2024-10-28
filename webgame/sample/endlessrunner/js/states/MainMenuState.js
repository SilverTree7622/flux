var MainMenuState = {
    create: function () {
        game.add.image(0, 0, 'mainMenuBackground');
        game.input.onDown.addOnce(function(){
            game.state.start("GameState");
        })
        
        // init highscore record
        if (localStorage.getItem("highscore") == null) {
            localStorage.setItem("highscore", 0);
        }
        
        //game.state.start("GameState");
    },
};