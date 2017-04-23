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
      var electron = new Q.Electron();
      var atom = new Q.Atom();
      var isWorldVisible = true;

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

             if (world.p.scale <= 1.65 && !isWorldVisible) {
                stage.remove(atom);
                stage.insert(world);
                isWorldVisible = true;
            }

        });

        Q.input.on('right',stage,function(e) { 
            console.log("input!");
           

            if (world.p.scale > 1.65) {
                stage.remove(world);
                stage.insert(atom);
                isWorldVisible = false;
            } else {
                world.p.scale += 0.1;
                world.p.cx -= 100;
                world.p.cy -= 100;
                
                world.p.x -= 100;
                world.p.y -= 100;
            }

        });

      stage.insert(world);
      //stage.insert(atom);
    });

    Q.load([ "Ludum dare 38 loop 2.mp3" ], function() {
        console.log("loaded music");
       // Q.audio.play('Ludum dare 38 loop 2.mp3',{ loop: true });
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

    Q.Sprite.extend("Electron", {
            init: function(p) {
                this._super(p, {
                    asset: "electron.png",
                    scale: 1
                });

                console.log(this);
            },
            step: function() {
            }
        });

     Q.Sprite.extend("Atom", {
            init: function(p) {
                this._super(p, {
                    asset: "atom.png",
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
        Q.load("electron.png",function() {
            Q.load("atom.png",function() {
                Q.stageScene("level");

            });
        });
    });

    

    

});
        
        
        
        
        
        