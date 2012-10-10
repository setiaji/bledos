window.onload = function () {
  Crafty.init(480, 480);
  Crafty.canvas.init();
  
  Crafty.sprite(16, 'resources/sprites/bomber.png', {
    hWall: [10, 4],
    vWall: [10, 5],
    iWall: [10, 4],
    floor: [0, 0],
    wong: [1, 4]
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
          // jadi peluang adanya tembok adalah 2/3
          if (Crafty.math.randomInt(1, 3) < 3) {
            Crafty.e("2D, Canvas, iWall, solid")
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
    // pos posisi dari pojok-pojok ini
    var pos = [
        {i: 1, j: 1},
        {i: 2, j: 2},
        {i: 1, j: 2},
        {i: 12, j: 1},
        {i: 13, j: 1},
        {i: 13, j: 2},
        {i: 1, j: 12},
        {i: 1, j: 13},
        {i: 2, j: 13},
        {i: 12, j: 13},
        {i: 13, j: 12},
        {i: 13, j: 13}
      ],
      ent, idx, obj, player;
    
    // iterasi untuk mencari apakah pada titik-titik pojok
    // terdapat sebuah entitas iWall
    for (idx = 0; idx < pos.length; idx += 1) {
      obj = pos[idx];
      ent = Crafty.map.search({_x: obj.i * 32, _y: obj.j * 32, _w: 32, _h: 32});
      
      // kita mengetahui bahwa entitas iWall berada di atas
      // entitas floor.
      if (ent[1]) {
        if (ent[1]['__c'].iWall) {
          Crafty.map.remove(ent[1]);
        }
      }
    }
    
    Crafty.c('Wong', {
      init: function () {
        this.requires('SpriteAnimation, Collision, Wong')
        .animate('walkRight', 4, 4, 7)
        .animate('walkLeft', 4, 4, 7)
        .animate('walkUp', 8, 4, 9)
        .animate('walkDown', 1, 4, 3)
        .bind('NewDirection', function (direction) {
          if (direction.x < 0) {
            if (!this.isPlaying('walkLeft')) {
              this.stop().animate('walkLeft', 10, -1);
            }
          }
          
          if (direction.x > 0) {
            if (!this.isPlaying('walkRight')) {
              this.stop().animate('walkRight', 10, -1);
            }
          }
          
          if (direction.y < 0) {
            if (!this.isPlaying('walkUp')) {
              this.stop().animate('walkUp', 10, -1);
            }
          }
          
          if (direction.y > 0) {
            if (!this.isPlaying('walkDown')) {
              this.stop().animate('walkDown', 10, -1);
            }
          }
          
          if (!direction.x && !direction.y) {
            this.stop();
          }
        })
        .bind('Moved', function (from) {
          // kalau ketemu dengan entitas 'solid', maka jangan sampai
          // pemain menembusnya
          if (this.hit('solid')) {
            this.attr({x: from.x, y: from.y});
          }
        });
      }
    });
    
    Crafty.c('RightControls', {
      init: function () {
        this.requires('Multiway');
      },
      
      rightControls: function (speed) {
        this.multiway(speed, {
          UP_ARROW: -90,
          DOWN_ARROW: 90,
          RIGHT_ARROW: 0,
          LEFT_ARROW: 180
        });
        
        return this;
      }
    });
    
    player = Crafty.e('2D, Canvas, wong, Wong, RightControls, Animate, Collision')
    .attr({x: 32, y: 32, z: 1, w: 32, h: 32})
    .rightControls(1);
  });
  
  // Jalankan dari awal
  Crafty.scene('setup');
}