window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .setup({
      width: 640,   //to fit devices with a screne resolution of 1280 x 720
      height: 480
    }).controls().touch().enableSound();

    Q.setImageSmoothing(false);
    
    var electrons =[];
    var electronBoundaryPoints = [];
    var electronProperties = [];

   


    Q.scene('level', function(stage) {
      var player;
      var world = new Q.World();
      
      var atom = new Q.Atom();
      var isWorldVisible = true;

      player = Q("Player").first();
      
    electrons.push(new Q.Electron());
    electrons.push(new Q.Electron());
    electrons.push(new Q.Electron());

    // top left
    electronBoundaryPoints.push({ x: 280, y:130 });
    electronBoundaryPoints.push({ x: 330, y:180 });
    electronBoundaryPoints.push({ x: 380, y:230 });

    // bottom left
    electronBoundaryPoints.push({ x: 280, y:470 });
    electronBoundaryPoints.push({ x: 330, y:420 });
    electronBoundaryPoints.push({ x: 380, y:370 });

    // bottom right
    electronBoundaryPoints.push({ x: 620, y:470 });
    electronBoundaryPoints.push({ x: 570, y:420 });
    electronBoundaryPoints.push({ x: 520, y:370 });

    // top right
    electronBoundaryPoints.push({ x: 620, y:130 });
    electronBoundaryPoints.push({ x: 570, y:180 });
    electronBoundaryPoints.push({ x: 520, y:230 });

    electronProperties.push({ xVel: -1, yVel: 0 });
    electronProperties.push({ xVel: -1, yVel: 0 });
    electronProperties.push({ xVel: -1, yVel: 0 });


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

                electrons.map(function(e){
                    stage.remove(e);
                });
            }

        });

        Q.input.on('right',stage,function(e) { 
            console.log("input!");
           

            if (world.p.scale > 1.65) {
                stage.remove(world);
                stage.insert(atom);
                isWorldVisible = false;

                electrons[0].p.x = 620;
                electrons[0].p.y = 130;

                electrons[1].p.x = 570;
                electrons[1].p.y = 180;

                electrons[2].p.x = 520;
                electrons[2].p.y = 230;

                electrons.map(function(e){
                    stage.insert(e);
                });
                
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
            step: function(dt) {

                for (var i = 0; i < 3; i++) {
                    electrons[i].p.x += electronProperties[i].xVel * 4;
                    electrons[i].p.y += electronProperties[i].yVel * 4;

                    electronBoundaryPoints.map(function(bp){
                        if (electrons[i].p.x === bp.x && electrons[i].p.y === bp.y) {
                            var newDir = changeDirection(electronProperties[i].xVel, electronProperties[i].yVel);
                            electronProperties[i].xVel = newDir.x;
                            electronProperties[i].yVel = newDir.y;
                        }
                    });
                }
            }
        });

    function changeDirection(x,y) {
        if (x === 0 && y === 1) {
            return { x: 1 , y: 0};
        }

        if (x === 1 && y === 0) {
            return { x: 0 , y: -1};
        }

        if (x === 0 && y === -1) {
            return { x: -1 , y: 0};
        }

        if (x === -1 && y === 0) {
            return { x: 0 , y: 1 };
        }
    }

    Q.load("earth.png",function() {
        Q.load("electron.png",function() {
            Q.load("atom.png",function() {
                Q.stageScene("level");

            });
        });
    });

    

    

});
        
        
        
        
        
        
