var database;
var game_state = 0;
var player_count = 0;
var form, game, players;
var all_players;
var car1, car2, car3, car4, cars_array;

function preload(){
    carImage1 = loadImage("images/car1.png");
    carImage2 = loadImage("images/car3.png");
    track = loadImage("images/track.jpg");
}

function setup(){
    createCanvas(displayWidth, displayHeight);

    database = firebase.database();

    game = new Game();
    game.getGameState();
    game.start();
}

function draw(){
    if (player_count === 2){
        game.updateGameState(1);
    }

    if (game_state === 1){
        clear();
        game.play();
    }

    if (game_state === 2){
        game.end();
    }
}