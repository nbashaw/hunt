// Plant enemy
var $enemy = $('.enemy');
$enemy.css({left: (Math.random() * window.innerWidth), top: (Math.random() * window.innerHeight)});
var crosshairX = (window.innerWidth / 2) - 10;
var crosshairY = (window.innerHeight / 2) - 10;

var $console = $('#console')

function between(x, min, max) {
  return x >= min && x <= max;
}

var winning = false;

// Control movement

var moving = false;
var movementTouchId;
var deltaX;
var deltaY;
var movementStartCoords = {x: 0, y: 0};

$(window).on('touchstart', function(e) {
  if (winning) {
    $('.win').fadeOut();
    $enemy.css({left: (Math.random() * window.innerWidth), top: (Math.random() * window.innerHeight)});
    winning = false;
  }
  moving = true;
  movementTouchId = e.originalEvent.touches[0].identifier;
  movementStartCoords = {
    x: e.originalEvent.touches[0].screenX,
    y: e.originalEvent.touches[0].screenY
  };
});

$(window).on('touchmove', function(e) {
  var touch = e.originalEvent.changedTouches[0];
  if (touch.identifier == movementTouchId) {
    deltaX = touch.screenX - movementStartCoords.x;
    deltaY = touch.screenY - movementStartCoords.y;
  }
});

$(window).on('touchend', function(e) {
  if (e.originalEvent.changedTouches[0].identifier == movementTouchId) {
    moving = false;
    movementTouchId = null;
    movementTouchCoords = {x: 0, y: 0};
  }
});

var gameInterval = setInterval(function(){
  if (moving && !winning) {
    var oldLeft = parseInt($enemy.css('left'));
    var oldTop = parseInt($enemy.css('top'));
    var newLeft = oldLeft - (deltaX / 7);
    var newTop = oldTop - (deltaY / 7);
    if (newLeft > 0 && newLeft < (window.innerWidth - 20)) {
      $enemy.css({left: newLeft});
    }
    if (newTop > 0 && newTop < (window.innerHeight - 20)) {
      $enemy.css({top: newTop});
    }
    if (between(newTop, crosshairY - 15, crosshairY + 15) && between(newLeft, crosshairX - 15, crosshairX + 15)) {
      winning = true;
      $('.win').fadeIn();
    }
  }
},10);