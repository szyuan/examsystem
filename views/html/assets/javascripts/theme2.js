(function() {
    $(document).ready(function() {

        $(".box .box-collapse").click(function(e) {
            var box;

            box = $(this).parents(".box").first();
            box.toggleClass("box-collapsed");
            return e.preventDefault();
        });

        if (!$("body").hasClass("fixed-header")) {
            return $('#main-nav.main-nav-fixed').affix({
                offset: 40
            });
        }
    });


}).call(this);