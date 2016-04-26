// Setting up default variables for usage throughout the site
var huge = 1450,
    large  = 1250,
    medium  = 1000,
    small = 750;


// Checking what the screen size is, in order to accurately adjust the layout of different items
function minWidth(width) {
  var screenWidth =  $(window).width();
  if ( screenWidth >= width ) {
    return true;
  } else {
    return false;
  }
}

// Setting up slider layout
function sliderLayout(){
  var products = $(".product-slider .wrapper a");
  if ( minWidth(1450) ){
    // Huge layout
    if( products.parent().is(".slide") ) {
      products.unwrap();
      for( var i = 0; i < products.length; i+=5 ) {
        products.slice(i, i+5).wrapAll('<div class="slide"></div>');
      }
    } else {
      for( var i = 0; i < products.length; i+=5 ) {
        products.slice(i, i+5).wrapAll('<div class="slide"></div>');
      }
    }
  } else if(minWidth(1250)) {
    // Large layout
    if( products.parent().is(".slide") ) {
      products.unwrap();
      for( var i = 0; i < products.length; i+=4 ) {
        products.slice(i, i+4).wrapAll('<div class="slide"></div>');
      }
    } else {
      for( var i = 0; i < products.length; i+=4 ) {
        products.slice(i, i+4).wrapAll('<div class="slide"></div>');
      }
    }
  }  else if (minWidth(1000)){
    // Medium layout
    if( products.parent().is(".slide") ) {
      products.unwrap();
      for( var i = 0; i < products.length; i+=3 ) {
        products.slice(i, i+3).wrapAll('<div class="slide"></div>');
      }
    } else {
      for( var i = 0; i < products.length; i+=3 ) {
        products.slice(i, i+3).wrapAll('<div class="slide"></div>');
      }
    }
  } else if ( minWidth(750)){
    // Small Layout
    if( products.parent().is(".slide") ) {
      products.unwrap();
      for( var i = 0; i < products.length; i+=2 ) {
        products.slice(i, i+2).wrapAll('<div class="slide"></div>');
      }
    } else {
      for( var i = 0; i < products.length; i+=2 ) {
        products.slice(i, i+2).wrapAll('<div class="slide"></div>');
      }
    }

  } else {
    // Mobile layout
    products.unwrap();
    if( products.parent().is(".slide") ) {
      products.unwrap();
      for( var i = 0; i < products.length; i+=1 ) {
        products.slice(i, i+1).wrapAll('<div class="slide"></div>');
      }
    } else {
      for( var i = 0; i < products.length; i+=1 ) {
        products.slice(i, i+1).wrapAll('<div class="slide"></div>');
      }
    }
  }
}
  //
  //

// Attempting to create an object for each sliders
function createSliderObject() {
  // Creating an array of all matching elements, and then adding a class for differentiation.
  $(".product-slider").each( function(index, value) {
    $(this).addClass("" + index);
    $(this).children().children(".slide-wrapper").children().children().first().addClass("active");
  });
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

navigationFade("header.global", "255, 255, 255");
flexImagefix(".product-info .images .selected-image .wrapper img");

sliderLayout();
createSliderObject();
overlayLoad();

$(window).resize( function() {
  sliderLayout();
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
