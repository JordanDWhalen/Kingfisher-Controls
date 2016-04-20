// Setting up default variables for usage throughout the site
var large = 1150,
    medium  = 800,
    small  = 650;


// Checking what the screen size is, in order to accurately adjust the layout of different items
function minWidth(width) {
  var screenWidth =  $(window).width();
  if ( screenWidth >= width ) {
    return true;
  } else {
    return false;
  }
}

// Utilizing the minWidth() function to determine how to layout the sliders
function sliderLayout(target) {
  if( $(target).length ){
    // Getting the item count so I can properly manipulate the width of the slide wrapper
    var count = $(target + " " + ".container a").length;

    if ( minWidth(large) ) {

      // If the screen is larger than 1150px, we're going to have 5 columns
      $(target + " " + "a").css("width", "20%");
      var number = (count / 5) * 100;
      $(target + " " + ".wrapper").css("width",  number + "%");

    } else if ( minWidth(medium) ){

      // If the screen is smaller than 1150px, but larger than 800 we're going to have 3 columns
      $(target + " " + "a").css("width", "33.33333%");
      var number = (count / 3) * 100;
      $(target + " " + ".wrapper").css("width",  number + "%");

    } else {

      // Otherwise, one column
      $(target + " " + "a").css("width", "100%");
      var number = count * 100;
      $(target + " " + ".wrapper").css("width",  number + "%");

    }
  }
}

// Causing the header navigation background color to fade in as you scroll
function navigationFade(target, rgb) {
  var a = $(window).scrollTop() / 100;
  if(a < .75){
    $(target).css("background-color", "rgba(" + rgb + "," + a + ")");
    $("header.global").removeClass("scrolled");
  } else {
    $(target).css("background-color", "rgba(" + rgb + "," + ".8" + ")");
    $("header.global").addClass("scrolled");
  }
}

/***************************************
  Functions to run on load, resize, and scroll
***************************************/
sliderLayout(".product-slider");

$(window).resize( function() {
  sliderLayout(".product-slider");
});

$(window).scroll( function() {
  navigationFade("header.global", "255, 255, 255");
});
