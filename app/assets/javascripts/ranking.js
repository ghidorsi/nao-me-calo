$(document).ready(function(){

  var region = "";
  var order = "good";
  var size = 5;

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
  })

});
