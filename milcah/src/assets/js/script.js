$(document).ready(function () {
  //click button hide error
  $("#close-login-error").click(function (e) {
    e.preventDefault();
    $(this).closest(".alert-login-error").removeClass("login-error");
  });

  //
  function mySlide() {
    $(".carousel-control")
      .siblings(".active")
      .children(".carousel-custom")
      .slideUp();
    setTimeout(function () {
      $("#homeSlide").carousel("next");
    }, 600);
    setTimeout(function () {
      $(".active").children(".carousel-custom").slideDown();
    }, 1000);
  }

  $("#homeSlide").carousel();
  $(document).on("click", ".carousel-control", function (e) {
    e.preventDefault();
    mySlide();
  });

  var autoSlide = setInterval(mySlide, 10000);

  // $(".carousel-item").mouseenter(function () {
  //   clearInterval(autoSlide);
  // });
  // });
  //sub menu header
  $(".products-list")
    .hover(function () {
      $(this).children(".sub-mega-menu").addClass("hover");
    })
    .mouseleave(function () {
      $(this).children(".sub-mega-menu").removeClass("hover");
    });
});

//close submenu when click item
$(document).on("click", ".menu-link__sub", function () {
  $(this).closest(".sub-mega-menu").removeClass("hover");
});

//effect label inside when focus input
$(document)
  .on("focus", ".validate", function () {
    $(this).next("label").addClass("active");
    $(this).prev("i").addClass("active");
  })
  .on("blur", ".validate", function () {
    $(this).next("label").removeClass("active");
    $(this).prev("i").removeClass("active");
    if ($(this).val()) {
      $(this).next("label").addClass("active");
    }
  });

//change login to register
$(document).on("click", ".create-account", function (e) {
  e.preventDefault();
  $(this).closest(".login").hide();
  $(this).closest(".login").next(".register").show();
});

//change resgiter to login
$(document).on("click", ".login", function (e) {
  //e.preventDefault();
  $(this).closest(".register").hide();
  $(this).closest(".register").prev(".login").show();
});

//submenu mobile
$(document).on("click", "#menu_mobile", function (e) {
  e.preventDefault();
  $(this).children(".sub-menu").slideToggle();
});

//menu mobile

$(document).on("click", ".menu_link", function (e) {
  e.preventDefault();
  $("#menu_header").modal("hide");
});

//close modal cart when open page cart
$(document).on("click", "#btn-addCart", function (e) {
  e.preventDefault();
  $("#modal_cart").modal("hide");
});

//close modal login when open page forgot password
$(document).on("click", ".forgot-password", function (e) {
  e.preventDefault();
  $("#modal_login").modal("hide");
});

//collapse login/register page checkout
$(document).on("click", "#btn-collapse-login", function (e) {
  e.preventDefault();
  $("#collapse-login").toggle("slow");
});

$(document).on("click", "#btn-collapse-register", function (e) {
  e.preventDefault();
  $("#collapse-register").toggle("slow");
});

//close modal cart when open page checkout
$(document).on("click", "#btn-checkout", function (e) {
  e.preventDefault();
  $("#modal_cart").modal("hide");
});

//select change qty item
$(document).on("click", ".current", function (e) {
  e.preventDefault();
  $(this).next(".qty-options").toggle();
});

$(document).on("click", function (e) {
  //e.preventDefault();
  if (!$(e.target).closest(".current").length) {
    $(".qty-options").hide();
  }
});

$(document).on("mouseup", ".current", function (e) {
  e.preventDefault();
  var container = $(".qty-options");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});

//
$(document)
  .on("focus", ".form-info", function () {
    $(this).next("label").addClass("active");
    $(this).prev("i").addClass("active");
  })
  .on("blur", ".form-info", function () {
    $(this).next("label").removeClass("active");
    $(this).prev("i").removeClass("active");
    if ($(this).val()) {
      $(this).next("label").addClass("active");
    }
  })
  .on("click", "#seach_header", function () {
    $(this).next("#input_search").addClass("entry").focus();
  });

$(document).on("focusout", "#input_search", function (e) {
  $(this).removeClass("entry");
});

//preview image before update
let imagesPreview = function (input, placeToInsertImagePreview) {
  if (input.files) {
    let filesAmount = input.files.length;
    for (i = 0; i < filesAmount; i++) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $($.parseHTML("<img>"))
          .attr("src", event.target.result)
          .attr("style", "margin-right: 10px")
          .attr("style", "width: 130px")
          .appendTo(placeToInsertImagePreview);
      };
      reader.readAsDataURL(input.files[i]);
    }
  }
};
$(document).on("change", "#customFile", function () {
  imagesPreview(this, "div.preview-images");
});

//click confirm delete
$(document).on("click", "#delete", function () {
  $(this).children("#first").hide();
  $(this).children("#last").show();
  $(this).next(".confirm").addClass("open");
});

//cancel delete
$(document).on("click", "#cancel_order", function () {
  $(this).closest(".confirm").removeClass("open");
  $(this).closest(".confirm").prev("#delete").children("#first").show();
  $(this).closest(".confirm").prev("#delete").children("#last").hide();
});

$(document).on("focusout", "#change_status", function () {
  $(this).removeClass("active");
});

$(document).on("focusout", ".content", function () {
  $(this).closest("#confirm").removeClass("open");
});

//product admin
$(document)
  .on("click", ".arrow", function () {
    $(this)
      .closest(".status-product")
      .next("#change_status_product")
      .addClass("open")
      .focus();
  })
  .on("focusout", "#change_status_product", function () {
    $(this).removeClass("open");
  });
