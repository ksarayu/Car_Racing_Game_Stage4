class Game{
    constructor(){

    }

    getGameState(){
        var gameStateref = database.ref("gameState");
        gameStateref.on("value", (data)=>{
            game_state = data.val();
        })
    }

    updateGameState(state){
        var gameStateref = database.ref("/");
        gameStateref.update({
            gameState: state
        })
    }

    start(){
        if (game_state === 0){
            players = new Players();
            players.getPlayerCount();
            form = new Form();
            form.display();
        }

        car1 = createSprite(100,200,100,100);
        car1.addImage(carImage1);
        car2 = createSprite(100,200,100,100);
        car2.addImage(carImage2);
        //car3 = createSprite(500,200,100,100);
        //car4 = createSprite(700,200,100,100);

        cars_array = [car1, car2];
        //cars_array.push[car3, car4];
    }

    play(){
        form.hide();
        //text("The game has started! Good luck!", displayWidth/3, displayHeight/3);
        Players.getAllPlayers();
        if (all_players !== undefined){
            image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
            var positionX = 300;
            var positionY = 130;
            var index = 0;
            for (var plr in all_players){
                positionX = positionX + 250;
                positionY = displayHeight - all_players[plr].distance
                cars_array[index].x = positionX;
                cars_array[index].y = positionY;
                index = index + 1;
                if(index === players.index){
                    cars_array[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars_array[index - 1].y;
                }
            }

            drawSprites();
        }

        if (keyIsDown(UP_ARROW) && players.index !== null){
            players.distance = players.distance + 20;
            players.updatePlayerInfo();
        }

        if(players.distance === 5100){
            game_state = 2;
        }
    }

    end(){
        console.log("Game over");
        game.updateGameState(2);
    }
}