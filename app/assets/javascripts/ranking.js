$(document).ready(function(){

  var region = "";
  var order = "good";
  var size = 5;

  if(window.location.search != null){
    region = window.location.search.replace("?region=", "").split("+").join(" ");
    $('#searchRanking').val(region);
  }

  if(window.location.pathname == "/ranking"){
    sendAjaxRequestForRanking();
  }

  function sendAjaxRequestForRanking(){
    $.get('/ranking?order=' + order + "&region=" + region + "&size=" + size, {
      success: console.log(":}")
    });
  }

  $('#rankingForm').submit(function(){
    region = $('#searchRanking').val();
    sendAjaxRequestForRanking();
    return false;
  });

  $('#showMoreRanking').click(function(){
    size = size + 5;
    sendAjaxRequestForRanking();
  });

  $('#bestPlacesButtonRanking').click(function(){
    order = "good";
    size = 5;
    sendAjaxRequestForRanking();
  });

  $('#worstPlacesButtonRanking').click(function(){
    order = "bad";
    size = 5;
    sendAjaxRequestForRanking();
  })
});
