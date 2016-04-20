// Setting up default variables for usage throughout the site
var large = 1450,
    medium  = 1000,
    small  = 750;


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
    var instance = $(target).attr("class").split(" ").pop();
    // Getting the item count so I can properly manipulate the width of the slide wrapper
    var count = $(target + "." + instance + " " + ".container a").length;

    if ( minWidth(large) ) {

      // If the screen is larger than 1450, we're going to have 5 columns
      if(count > 5){
          var number = (count / 5) * 100;
          $(target + "." + instance + " " + ".wrapper").css("width",  number + "%");
      } else {
        $(target + "." + instance + " " + ".wrapper").css("width",  "100%");
      }

    } else if ( minWidth(medium) ){
      // If the screen is smaller than 900, but larger than 800 we're going to have 3 columns
      if( count > 3 ){
        var number = (count / 3) * 100;
        $(target + "." + instance + " " + ".wrapper").css("width",  number + "%");
      } else {

      }

    } else if ( minWidth(small) ){
      // If the screen is smaller than 750, two columns
      var number = count * 50;
      $(target + "." + instance + " " + ".wrapper").css("width",  number + "%");

    } else if ( minWidth(500) ){
      // Otherwise, one column
      var number = count * 100;
      $(target + "." + instance + " " + ".wrapper").css("width",  number + "%");
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
