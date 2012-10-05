window.onload = function () {
  Crafty.init(500, 400);
  //Crafty.canvas.init();
  
  // buat maze secara random
  function generateMaze(params) {
    
    // jalankan callback
    params.onComplete && params.onComplete();
  }
  
  // setting up stage
  Crafty.scene('settingup', function () {
    
    generateMaze({
      onComplete: function () {
        // ketika generateMaze sudah selesai, maka kita jalankan scene 'main'
        Crafty.scene('main');
      }
    });
  });

  // mari kita mulai  
  Crafty.scene('main', function () {
    
  });
}