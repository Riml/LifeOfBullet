/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var player_anim : createjs.SpriteSheet;
var saw_anim : createjs.SpriteSheet;
var crate_anim : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;
var stopGame : boolean;

var animationInPlay : boolean;
var idleAnimationInPlay : boolean;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "background", src: "../../Assets/images/bg.png"},
    {id: "bullet", src: "../../Assets/images/player.png"},
    {id: "menu_bg", src: "../../Assets/images/menu_bg.png"},
    {id: "playBtn", src: "../../Assets/images/playBtn.png"},
    {id: "winBtn", src: "../../Assets/images/win.png"},
    {id: "loseBtn", src: "../../Assets/images/lose.png"},
    {id: "backBtn", src: "../../Assets/images/backBtn.png"},
    {id: "instBtn", src: "../../Assets/images/instBtn.png"},
    {id: "block", src: "../../Assets/images/block.png"},
    {id: "player_ss", src: "../../Assets/images/player_ss.png"},
    {id: "crate_ss", src: "../../Assets/images/crate_ss.png"},
    {id: "saw_ss", src: "../../Assets/images/saw_ss.png"}    
    //{id: "theme", src: "../../Assets/audio/main_theme.mp3"}
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    //assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init() {
    // Reference to canvas element
   
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    let newData0 = {
        "images": [assets.getResult("player_ss")],
        "frames": {width:90, height:50},
        "animations": {
            
            "idle": [0,3,"idle",0.33],
            "slow": [8,9,"slow",0.01],
            "fast": [4,5,"fast",0.8]
        }
    }
    player_anim = new createjs.SpriteSheet(newData0);
    
    let newData1 = {
        "images": [assets.getResult("saw_ss")],
        "frames": {width:128, height:128},
        "animations": {
            
            "idle": [0,3,"idle",0.5]
        }
    }
    saw_anim = new createjs.SpriteSheet(newData1);

    let newData2 = {
        "images": [assets.getResult("crate_ss")],
        "frames": {width:128, height:128},
        "animations": {
            
            "idle": [0,0,"idle",0.5],
            "blow": [0,3,"blow",0.9]
        }
    }
    crate_anim = new createjs.SpriteSheet(newData2);

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.TUTORIAL :
            stage.removeAllChildren();
            currentScene = new scenes.Tutorial();;
            console.log("Starting TUTORIAL scene");
            break;
        case config.Scene.GAME :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting PLAY scene");
            break;
    }
    
}