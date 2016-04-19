
// Checking what the screen size is, in order to accurately adjust the layout of different items
function minWidth(width) {
  var screenWidth =  $(window).width();
  if ( screenWidth >= width ) {
    return true;
  } else {
    return false;
  }
}

// Setting the grid up for product line sliders in a way that is friendly to utilizing flexbox for sliding,
// as well as expanding to show all.
if( $(".lines").length ){
  // Getting the item count so I can properly manipulate the width of the line slide wrapper
  var count = $(".lines .wrapper a").length;

  if ( minWidth(1150) ) {
    // If the screen is larger than 1150px, we're going to have 5 columns

    $(".lines a").css("width", "20%");
    var number = (count / 5) * 100;
    $(".lines .wrapper").css("width",  number + "%");

  } else if ( minWidth(800) ){
    // If the screen is smaller than 1150px, but larger than 800 we're going to have 3 columns
    $(".lines a").css("width", "33.33333%");
    var number = (count / 3) * 100;
    $(".lines .wrapper").css("width",  number + "%");

  } else {
    // Otherwise, one column
    $(".lines a").css("width", "100%");
    var number = count * 100;
    $(".lines .wrapper").css("width",  number + "%");

  }

}
