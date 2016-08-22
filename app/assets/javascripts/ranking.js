$(document).ready(function(){

  var region = "";
  var order = "good";

  if(window.location.pathname == "/ranking"){
    sendAjaxRequestForRanking();
  }

  function sendAjaxRequestForRanking(){
    $.get('/ranking?order=' + order + "&region=" + region, {
      success: console.log(":}")
    });
  }

  $('#rankingForm').submit(function(){
    region = $('#searchRanking').val();
    sendAjaxRequestForRanking();
    return false;
  });

});
