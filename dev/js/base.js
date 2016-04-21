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

// Setting up a function to fix image sizes for the Product Page
function flexImagefix(target){
  var square = $(target).width();
  $(target).height(square);
}

function overlayLoad(){
  setTimeout(function(){
    var helpHeight    = $(".overlay .help").innerHeight(),
        requestHeight = $(".overlay .request").innerHeight();

    $(".overlay .help").css("top", helpHeight * -1);
    $(".overlay .request").css("top", requestHeight * -1);
  }, 50);
}

function overlayOpen(overlayType){
  var overlayOffset = $("." + overlayType).innerHeight();
  var paddingIncrease = parseInt($(".hero").css("padding-top"), 10) + overlayOffset;
  $(".overlay ." + overlayType).addClass("active");
  $(".header-wrapper").velocity({ paddingTop: overlayOffset }, { easing: "linear"});
  $("header.global").addClass("overlay-open");
  $(".hero, .product-hero").velocity({paddingTop: paddingIncrease}, { easing: "linear"});
}

function overlayClose(overlayType){
  var overlayOffset = $("." + overlayType).innerHeight();
  var paddingDecrease = parseInt($(".hero").css("padding-top"), 10) - overlayOffset;
  $(".overlay ." + overlayType).removeClass("active");
  $(".header-wrapper").velocity({ paddingTop: 0 }, { easing: "linear"});
  $("header.global").removeClass("overlay-open");
  $(".hero").velocity({paddingTop: paddingDecrease}, { easing: "linear"});
}

/***************************************
  Functions to run on load, resize, and scroll
***************************************/
var i = 0;
$(".product-slider.detailed").each( function(){
  sliderLayout(".product-slider.detailed" + "." + i);
  i++;
})

sliderLayout(".product-slider.detailed");
navigationFade("header.global", "255, 255, 255");
flexImagefix(".product-info .images .selected-image .wrapper img");

overlayLoad();

$(window).resize( function() {
  sliderLayout(".product-slider");
  flexImagefix(".product-info .images .selected-image .wrapper img");
});

$(window).scroll( function() {
  navigationFade("header.global", "255, 255, 255");
});


/***************************************
  Interactive JS
***************************************/

// Setting up the functionality for the slide down view of the request a quote, and help sections.
// This needs to be disabled for 50ms in order for JS to have time to properly calculate the height of these sections
setTimeout(function(){
  $("header.global aside a").click( function(){
    var buttonText = $(this).text();
    var overlayType = $(this).attr("class").split(" ").pop(0);
    $(".overlay").toggleClass("open");
    $(this).toggleClass("active");
    $(this).attr("data-text", buttonText);
    if($(".overlay").hasClass("open")){
      overlayOpen(overlayType);
      $(this).text("Close Overlay");
    } else {
      overlayClose(overlayType);
      $(this).text($(this).attr("data-text"));
    }
  });
}, 50);
