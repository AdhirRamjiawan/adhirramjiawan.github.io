window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .setup({
      width: 640,   //to fit devices with a screne resolution of 1280 x 720
      height: 480
    }).controls().touch().enableSound();

    Q.setImageSmoothing(false);
    
    Q.scene('level', function(stage) {
      var player;
      var world = new Q.World();

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

        Q.input.on('left',stage,function(e) { 
            console.log("input!");

            if (world.p.scale > 1) {
                world.p.scale -= 0.1;
                world.p.cx += 100;
                world.p.cy += 100;

                world.p.x += 100;
                world.p.y += 100;
            }
            
        });

        Q.input.on('right',stage,function(e) { 
            console.log("input!");
            world.p.scale += 0.1;
            world.p.cx -= 100;
            world.p.cy -= 100;
            
            world.p.x -= 100;
            world.p.y -= 100;

            console.log(world.p);
        });

      stage.insert(world);
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
                    y: 300,
                    scale: 1
                });

                console.log(this);
            },
            step: function() {
            }
        });

    Q.load("earth.png",function() {
        Q.stageScene("level");

    });


});
        
        
        
        
        
        