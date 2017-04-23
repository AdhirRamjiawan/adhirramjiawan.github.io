window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    //.include("ActionPlatformerPlayer")
    .setup({
      width: 640,   //to fit devices with a screne resolution of 1280 x 720
      height: 480
    }).controls().touch().enableSound();

    Q.setImageSmoothing(false);

    Q.scene('level', function(stage) {
      var player;

      player = Q("Player").first();
      
        stage.insert(new Q.UI.Text({ 
            label: "A small world\n by \nAdhir Ramjiawan \n\n Ludum Dare 38",
            color: "white",
            x: 120,
            y: 80
        }));

        stage.insert(new Q.UI.Text({ 
            label: "Left: Zoom out\nRight: Zoom in",
            color: "white",
            x: 120,
            y: 300
        }));

      stage.insert(new Q.World());
    });

    Q.load([ "Ludum dare 38 loop 2.mp3" ], function() {
        console.log("loaded music");
        Q.audio.play('Ludum dare 38 loop 2.mp3',{ loop: true });
    });

    Q.Sprite.extend("World", {
            init: function(p) {
                this._super(p, {
                    asset: "earth.png",
                    x: 450,
                    y: 300
                });

                this.add("platformerControls");
                console.log(this);
            }
        });

    Q.load("earth.png",function() {
        Q.stageScene("level");

    });


});
        
        
        
        
        
        