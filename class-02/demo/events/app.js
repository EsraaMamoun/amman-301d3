$(document).ready(function() {
  $("main section button:first").on("click", function() {
    $(this)
      .siblings("ul")
      .toggleClass("on");
  });

  $("ul").on("click", "li", function() {
    $(this).fadeOut(900);
  });
});
