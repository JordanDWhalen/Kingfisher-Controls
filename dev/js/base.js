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

function maxWidth(width) {
  var screenWidth =  $(window).width();
  if ( screenWidth <= width ) {
    return true;
  } else {
    return false;
  }
}

// Setting up slider layout
function sliderLayout(){
  // Adding a unique class to each slider for differentiation of
  $(".product-slider").each( function( index, value ) {
    $(this).addClass("" + index);
    var sliderNumber = $(this).attr("class").split(" ").pop(),
    products = $(".product-slider." + sliderNumber + " .wrapper a");

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

    if ( minWidth(1450) ) {
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
    }

    if ( minWidth(800) && maxWidth(1200) ) {
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
    }

  });
}

// Setting up a function to take care of laying out items to fit a grid, and hiding arrow buttons as well as properly
// updating the button label
function viewAllLayout(currentWrapper, currentSliderClass, currentSlides, button) {

  if( $(currentWrapper).children(".wrapper").hasClass("view-all") ){

    $(button).text("View All");

    $(currentWrapper).addClass("line");
    $(currentWrapper).removeClass("grid");

    $(".product-slider." + currentSliderClass + " .left").removeClass("hidden");
    $(".product-slider." + currentSliderClass + " .right").removeClass("hidden");

    $(currentWrapper).css("transform", "translateX(0)");
    $(currentWrapper).attr("data-shift-amount", "0");

    $(currentWrapper).children(".wrapper").removeClass("view-all");
    $(currentSlides).attr("class", "slide");

    sliderActiveSet();

  } else {

    $(button).text("View Less");

    $(currentWrapper).removeClass("line");
    $(currentWrapper).addClass("grid");

    $(".product-slider." + currentSliderClass + " .left").addClass("hidden");
    $(".product-slider." + currentSliderClass + " .right").addClass("hidden");

    $(currentWrapper).css("transform", "translateX(0)");
    $(currentWrapper).attr("data-shift-amount", "0");

    $(currentWrapper).children(".wrapper").addClass("view-all");
    $(currentSlides).attr("class", "slide active");

  }

}


// Setting up a function to run on load to check and see if a section is open by default
function viewAllDefaults() {

  $(".product-slider").each( function() {

    var currentWrapper = $(this).children().children(".slide-wrapper"),
        currentSliderClass = $(this).attr("class").split(" ").pop(),
        currentSlides = currentWrapper.children().children(".slide");

        if(currentWrapper.hasClass("grid")){

          $(".product-slider." + currentSliderClass + " .button.view-all").text("View Less");

          $(currentWrapper).removeClass("line");
          $(currentWrapper).addClass("grid");

          $(".product-slider." + currentSliderClass + " .left").addClass("hidden");
          $(".product-slider." + currentSliderClass + " .right").addClass("hidden");

          $(currentWrapper).css("transform", "translateX(0)");
          $(currentWrapper).attr("data-shift-amount", "0");

          $(currentWrapper).children(".wrapper").addClass("view-all");
          $(currentSlides).attr("class", "slide active");

        }

  });

};

// Setting some defaults for each slider
function sliderDefaults() {
  $(".product-slider").each( function(index, value) {
    $(this).children().children(".slide-wrapper").children().children().first().addClass("active");
    $(this).children().children(".lead").children().children(".left").addClass("disabled");
    $(this).children().children(".slide-wrapper").attr("data-shift-amount", "0");

    var slideNumber = $(this).children().children(".slide-wrapper").children().children(".slide").length;

    if(slideNumber <= 1){
      $(this).children().children(".lead").children().children(".right").addClass("disabled");
    }
  });
}

// Setting the first slide active
function sliderActiveSet() {
  $(".product-slider .slide-wrapper").each( function(){
    var slideAmount = $(this).attr("data-shift-amount"),
    activeSlide = (slideAmount * -1 / 100) + 1,
    slideNumber = $(this).children().length;

    $(this).children().children(".slide:nth-child(" + activeSlide + ")").addClass("active");

  });
}

// Creating a function to disable the arrow buttons based on slide position
function disabledButtons(currentSliderClass, currentAmount, potentialShift) {
  if(currentAmount === potentialShift){
    $(".product-slider." + currentSliderClass + " .right").addClass("disabled");
    if ( currentAmount !== 0 ){
      $(".product-slider." + currentSliderClass + " .left").removeClass("disabled");
    }
  } else if( currentAmount === 0 ) {
    $(".product-slider." + currentSliderClass + " .left").addClass("disabled");
    if ( currentAmount !== potentialShift ){
      $(".product-slider." + currentSliderClass + " .right").removeClass("disabled");
    }
  } else {
    $(".product-slider." + currentSliderClass + " .button").removeClass("disabled");
  }
}

// Causing the header navigation background color to fade in as you scroll
function navigationFade() {
  var a = $(window).scrollTop() / 100;
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

// Defining the default overlay settings
function overlayLoad(){
  setTimeout(function(){
    var helpHeight    = $(".overlay .help").innerHeight(),
    requestHeight = $(".overlay .request").innerHeight();

    $(".overlay .help").css("top", helpHeight * -1);
    $(".overlay .request").css("top", requestHeight * -1);
  }, 500);
}

// Creating a function for showing the overlay
function overlayOpen(overlayType){
  var overlayOffset = $("." + overlayType).innerHeight();
  var paddingIncrease = parseInt($(".hero").css("padding-top"), 10) + overlayOffset;
  $(".header-wrapper").velocity({ paddingTop: overlayOffset }, { easing: "linear"});
  $("header.global").addClass("overlay-open");
  $(".hero, .product-hero").velocity({paddingTop: paddingIncrease}, { easing: "linear"});
}

// Creating a function for hiding the overlay
function overlayClose(overlayType){
  var overlayOffset = $("." + overlayType).innerHeight();
  console.log(overlayType + " : " + overlayOffset);
  var paddingDecrease = parseInt($(".hero").css("padding-top"), 10) - overlayOffset;
  $(".header-wrapper").velocity({ paddingTop: 0 }, { easing: "linear"});
  $("header.global").removeClass("overlay-open");
  $(".hero").velocity({paddingTop: paddingDecrease}, { easing: "linear"});

}

// Setting up functions for shifting the sliders appropriately
function slideLeft(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift){

  currentAmount = currentAmount + shiftAmount;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + currentAmount + "%)");
  $(currentWrapper).attr("data-shift-amount", currentAmount);
  $(currentActiveSlide).prev().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    disabledButtons(currentSliderClass, currentAmount, potentialShift);
  }, 50)

}

function slideRight(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift){

  currentAmount = currentAmount - shiftAmount;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + currentAmount + "%)");
  $(currentWrapper).attr("data-shift-amount", currentAmount);
  $(currentActiveSlide).next().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    disabledButtons(currentSliderClass, currentAmount, potentialShift);
  }, 50)

}

/***************************************
Functions to run on load, resize, and scroll
***************************************/

navigationFade();
flexImagefix(".product-info .images .selected-image .wrapper img");

sliderLayout();
sliderDefaults();
viewAllDefaults();
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

var i = 0;
$("header.global aside a").click( function(e){
  e.preventDefault();

  if( i === 0 ){

    i++;
    setTimeout( function() {
      i=0;
    }, 1000)

    var buttonText = $(this).text(),
    overlayType = $(this).attr("class").split(" ")[2],
    otherOverlay = $(".overlay > div").not("." + overlayType).attr("class").split(" ")[1],
    $this = $(this);

    // Overlay, active link
    if( $(".overlay").hasClass("open") && $(this).hasClass("active")){

      console.log("First Scenario")

      overlayClose(overlayType);
      $(".overlay ." + overlayType).removeClass("active");
      $(".overlay").toggleClass("open");
      $(this).toggleClass("active");
      $this.text($(this).attr("data-text"));

      // Overlay, inactive link
    } else if( $(".overlay").hasClass("open") && !$(this).hasClass("active") ){

      console.log("Second Scenario")

      overlayClose(otherOverlay);
      $(".overlay").toggleClass("open");
      $("header.global aside .active").text($("header.global aside .active").attr("data-text"));
      $("header.global aside .active").toggleClass("active");
      $(".overlay .active").removeClass("active");

      setTimeout( function() {
        overlayOpen(overlayType);
        $(".overlay ." + overlayType).addClass("active");
        $this.attr("data-text", buttonText);
        $(".overlay").toggleClass("open");
        $this.toggleClass("active");
        setTimeout( function() {
          $this.text("Close Overlay");
        }, 500);
      }, 1000)

      // No overlay, no link
    } else {

      console.log("Third Scenario");
      $(this).attr("data-text", buttonText);

      overlayOpen(overlayType);
      $(".overlay ." + overlayType).addClass("active");
      $(".overlay").toggleClass("open");
      $(this).toggleClass("active");

      setTimeout( function() {
        $this.text("Close Overlay");
      }, 500);

    }

  }

});

$(".product-slider .button").click(function(){
  var button = $(this),
  type = $(this).attr("class").split(" ").pop(),
  currentSliderClass = $(this).parent().parent().parent().parent().attr("class").split(" ").pop(),
  currentWrapper = $(this).parent().parent().parent().children(".slide-wrapper"),
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children().children(".active"),
  shiftAmount = 100,
  potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
  currentAmount = parseInt(currentWrapper.attr("data-shift-amount"), 0);

  if(type === "right"){

    slideRight(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift);

    // currentAmount = currentAmount - shiftAmount;
    //
    // // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
    // $(currentWrapper).css("transform", "translateX(" + currentAmount + "%)");
    // $(currentWrapper).attr("data-shift-amount", currentAmount);
    // $(currentActiveSlide).next().addClass("active");
    // $(currentActiveSlide).removeClass("active");

  } else if (type === "left"){

    slideLeft(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift);

  } else if ( type === "view-all" ){

    viewAllLayout(currentWrapper, currentSliderClass, currentSlides, button);

    // if( $(currentWrapper).children(".wrapper").hasClass("view-all") ){
    //
    //   $(this).text("View All");
    //
    //   $(currentWrapper).addClass("line");
    //   $(currentWrapper).removeClass("grid");
    //
    //   $(".product-slider." + currentSliderClass + " .left").removeClass("hidden");
    //   $(".product-slider." + currentSliderClass + " .right").removeClass("hidden");
    //
    //   $(currentWrapper).css("transform", "translateX(0)");
    //   $(currentWrapper).attr("data-shift-amount", "0");
    //
    //   $(currentWrapper).children(".wrapper").removeClass("view-all");
    //   $(currentSlides).attr("class", "slide");
    //
    //   sliderActiveSet();
    //
    // } else {
    //
    //   $(this).text("View Less");
    //
    //   $(currentWrapper).removeClass("line");
    //   $(currentWrapper).addClass("grid");
    //
    //   $(".product-slider." + currentSliderClass + " .left").addClass("hidden");
    //   $(".product-slider." + currentSliderClass + " .right").addClass("hidden");
    //
    //   $(currentWrapper).css("transform", "translateX(0)");
    //   $(currentWrapper).attr("data-shift-amount", "0");
    //
    //   $(currentWrapper).children(".wrapper").addClass("view-all");
    //   $(currentSlides).attr("class", "slide active");
    //
    // }
  }

  disabledButtons(currentSliderClass, currentAmount, potentialShift);

});

$(".product-slider .product").click( function(e){

  var parentSlide = $(this).parent(),
      currentWrapper = $(this).parent().parent().parent(),
      currentSliderClass = currentWrapper.parent().parent().attr("class").split(" ").pop(),
      currentAmount = parseInt(currentWrapper.attr("data-shift-amount"), 0),
      shiftAmount = 100,
      potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
      currentSlides = currentWrapper.children().children(".slide"),
      currentActiveSlide = currentWrapper.children().children(".active");

      // console.log(currentSliderClass);


  if( !parentSlide.hasClass("active") ){
    e.preventDefault();

      if( parentSlide.prev().hasClass("active") ) {
        slideRight( currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift );
      } else if ( parentSlide.next().hasClass("active") ){
        slideLeft( currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift );
      }

  }
})


$(".toggle").click( function(e) {
  e.preventDefault();
  $(".mobile header.global").toggleClass("toggle-open");
});
