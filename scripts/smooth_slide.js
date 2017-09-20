$(document).ready(function(){
  $("#am").click(function(){
    $("#about").slideToggle();
    $("#etc").hide();
    setTimeout(function(){if ($("#about").css("display")!="block"){
      $("#etc").fadeIn();
    }},500);
    $("#education, #experience, #other").hide();
  });
  $("#ed").click(function(){
    $("#education").slideToggle();
    $("#about, #experience, #other").hide();
    $("#etc").hide();
    setTimeout(function(){if ($("#education").css("display")!="block"){
      $("#etc").fadeIn();
    }},500);
  });
  $("#ex").click(function(){
    $("#experience").slideToggle();
    $("#education, #about, #other").hide();
    $("#etc").hide();
    setTimeout(function(){if ($("#experience").css("display")!="block"){
      $("#etc").fadeIn();
    }},500);
  });
  $("#pj").click(function(){
    $("#other").slideToggle();
    $("#education, #experience, #about").hide();
    $("#etc").hide();
    setTimeout(function(){if ($("#other").css("display")!="block"){
      $("#etc").fadeIn();
    }},500);
  });
});