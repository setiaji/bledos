window.onload = function () {
  Crafty.init(480, 480);
  Crafty.canvas.init();
  
  Crafty.sprite(16, 'resources/sprites/bomber.png', {
    hWall: [10, 4],
    vWall: [10, 5],
    floor: [0, 0]
  });
  
  // buat maze secara random
  function generateMaze() {
    // gambar tembok
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        if (j === 0 || j === 14) {
          // buat tembok mendatar
          Crafty.e("2D, Canvas, hWall, solid")
          .attr({x: i * 32, y: j * 32, h: 32, w: 32});
        } else if (i === 0 || i === 14) {
          // buat tembok tegak
          Crafty.e("2D, Canvas, vWall, solid")
          .attr({x: i * 32, y: j * 32, h: 32, w: 32});
        } else {
          // buat lantai
          Crafty.e("2D, Canvas, floor")
          .attr({x: i * 32, y: j * 32, h: 32, w: 32});
          
          // buat tembok di dalam arena
          // kita ingin agar ada banyak tembok di dalam arena,
          // jadi peluang adanya tembok adalah 2/5
          if (Crafty.math.randomInt(1, 5) < 3) {
            Crafty.e("2D, Canvas, hWall")
            .attr({x: i * 32, y: j * 32, h: 32, w: 32});
          }
        }
      }
    }
  }
  
  // setting up stage
  Crafty.scene('setup', function () {
    
    Crafty.load(["resources/sprites/bomber.png"], function () {
      Crafty.scene('main');
    });
  });

  // mari kita mulai  
  Crafty.scene('main', function () {
    generateMaze();
    
    // hancurkan tembok di pojok pemain
    
  });
  
  // Jalankan dari awal
  Crafty.scene('setup');
}