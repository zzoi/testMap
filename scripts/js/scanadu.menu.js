(function ($) {
  $(document).ready(function () {
    $menu = $("#menu");
    $menulink = $(".menu-link");
    $menulink.click(function(e) {
      e.preventDefault();
      $menulink.toggleClass("active");
      return $menu.toggleClass("active");
    });
  });
})(jQuery);
