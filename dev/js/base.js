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
  // Adding a unique class to each slider for differentiation of

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

// Setting some defaults for each slider
function sliderDefaults(){
  $(".product-slider").each( function(index, value) {
    $(this).addClass("" + index);
    $(this).children().children(".slide-wrapper").children().children().first().addClass("active");
    $(this).children().children(".lead").children().children(".left").addClass("disabled");
    $(this).children().children(".slide-wrapper").attr("data-shift-amount", "0");
  });
}

function sliderActiveSet(){
  $(".product-slider .slide-wrapper").each( function(){
    var slideAmount = $(this).attr("data-shift-amount"),
        activeSlide = (slideAmount * -1 / 100) + 1,
        slideNumber = $(this).children().length;

    $(this).children().children(".slide:nth-child(" + activeSlide + ")").addClass("active");

    console.log(".slide:nth-child(" + activeSlide + ")");

  });
}

// Causing the header navigation background color to fade in as you scroll
function navigationFade() {
  console.log("test");
  var a = $(window).scrollTop() / 100;
  console.log(a);
  if(a < .75){
    $("header.global").removeClass("scrolled");
    $(".overlay").removeClass("scrolled");
  } else {
    $("header.global").addClass("scrolled");
    $(".overlay").addClass("scrolled");
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
  $(".overlay ." + overlayType).velocity({ opacity: 1 });
  $(".header-wrapper").velocity({ paddingTop: overlayOffset }, { easing: "linear"});
  $("header.global").addClass("overlay-open");
  $(".hero, .product-hero").velocity({paddingTop: paddingIncrease}, { easing: "linear"});
}

function overlayClose(overlayType){
  var overlayOffset = $("." + overlayType).innerHeight();
  var paddingDecrease = parseInt($(".hero").css("padding-top"), 10) - overlayOffset;
  $(".overlay ." + overlayType).toggleClass("inactive");
  $(".header-wrapper").velocity({ paddingTop: 0 }, { easing: "linear"});
  $("header.global").removeClass("overlay-open");
  $(".hero").velocity({paddingTop: paddingDecrease}, { easing: "linear"});

}

/***************************************
Functions to run on load, resize, and scroll
***************************************/

navigationFade();
flexImagefix(".product-info .images .selected-image .wrapper img");

sliderLayout();
sliderDefaults();
overlayLoad();

$(window).resize( function() {
  sliderLayout();
  flexImagefix(".product-info .images .selected-image .wrapper img");
  sliderActiveSet();
});

$(window).scroll( function() {
  navigationFade();
});


/***************************************
Interactive JS
***************************************/

// Setting up the functionality for the slide down view of the request a quote, and help sections.
// This needs to be disabled for 50ms in order for JS to have time to properly calculate the height of these sections

$("header.global aside a").click( function(e){
  e.preventDefault();
  var buttonText = $(this).text(),
      overlayType = $(this).attr("class").split(" ")[2];
  $(".overlay").toggleClass("open");
  $(this).toggleClass("active");
  $(this).attr("data-text", buttonText);
  if($(".overlay").hasClass("open")){
    console.log(overlayType);
    overlayOpen(overlayType);
    $(this).text("Close Overlay");
  } else {
    console.log(overlayType)
    overlayClose(overlayType);
    $(this).text($(this).attr("data-text"));
  }
});

$(".product-slider .button").click(function(){
  var type = $(this).attr("class").split(" ").pop(),
  currentSlider = $(this).parent().parent().parent().parent(),
  currentWrapper = $(this).parent().parent().parent().children(".slide-wrapper"),
  currentActiveSlide = currentWrapper.children().children(".active"),
  shiftAmount = 100,
  potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
  currentAmount = parseInt(currentWrapper.attr("data-shift-amount"), 0);

  if(type === "right"){
    currentAmount = currentAmount - shiftAmount;

    if(currentAmount === potentialShift){
      $(this).parent().children(".right").addClass("disabled");
    } else {
      $(this).parent().children(".right").removeClass("disabled");
    }

    $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
    $(currentWrapper).attr("data-shift-amount", currentAmount);
    $(currentActiveSlide).next().addClass("active");
    $(currentActiveSlide).removeClass("active");

  } else {
    currentAmount = currentAmount + shiftAmount;

    if( currentAmount === 0 ) {
      $(this).parent().children(".left").addClass("disabled");
    }  else {
      $(this).parent().children(".left").removeClass("disabled");
    }

    $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
    $(currentWrapper).attr("data-shift-amount", currentAmount);
    $(currentActiveSlide).prev().addClass("active");
    $(currentActiveSlide).removeClass("active");

  }

  if(currentAmount === potentialShift){
    console.log("MAX!");
    $(this).parent().children(".right").addClass("disabled");
  } else if( currentAmount === 0 ) {
    console.log("MIN!")
    $(this).parent().children(".left").addClass("disabled");
  } else {
    $(this).parent().children().removeClass("disabled");
  }

});
