$(function() {
//Start Scrollspy
  // Cache selectors
  var lastId,
      topMenu = $("#top-menu"),
      topMenuHeight = topMenu.outerHeight()+15,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+topMenuHeight;
     
     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";
     
     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         //menuItems
         //  .parent().removeClass("active")
         //  .end().filter("[href=#"+id+"]").parent().addClass("active");
     }                   
  });
//End Scrollspy

//Start datepicker
  $('#datetimepicker8').datetimepicker({
    pickTime: false
  });
  $('#datetimepicker9').datetimepicker({
    pickTime: false
  });
  $("#datetimepicker8").on("dp.change",function (e) {
     $('#datetimepicker9').data("DateTimePicker").setMinDate(e.date);
  });
  $("#datetimepicker9").on("dp.change",function (e) {
     $('#datetimepicker8').data("DateTimePicker").setMaxDate(e.date);
  });
//End datepicker
});