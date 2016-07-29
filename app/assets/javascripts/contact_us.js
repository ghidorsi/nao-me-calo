errorsContact = {emailEvaluateContact: true, messageEvaluate: true, nameEvaluateContact: false}

$(document).ready(function(){
  initialize();
   patternLinks();
  var dots = 0;

  function patternLinks(){
      $('#abuse-first').click(function(){
        $('#article-1').fadeToggle("slow");
      });

      $('#abuse-second').click(function(){
          $('#article-2').fadeToggle("slow");
      });

      $('#abuse-three').click(function(){
          $('#article-3').fadeToggle("slow");
      });

      $('#abuse-four').click(function(){
          $('#article-4').fadeToggle("slow");
      });

      $('#abuse-five').click(function(){
          $('#article-5').fadeToggle("slow");
      });

      $('#abuse-six').click(function(){
          $('#article-6').fadeToggle("slow");
      });
 }

  $('#emailEvaluateContact').focusout(function(){
    checkMailContact();
  });

  $('#messageEvaluate').focusout(function(){
    hasBadWordsContact($('#messageEvaluate'));
  });

  $('#nameEvaluateContact').focusout(function(){
    checkNameContact();
  });

  function disableButton(){
    $('#buttonDisable').attr('disabled', true);
  }

  function enableButton(){
    $('#buttonDisable').attr('disabled', false);
  }

  function loadDots(){
    if(dots < 3){
      $('#buttonDisable').val($('#buttonDisable').val() + ".");
      dots++;
    } else {
      $('#buttonDisable').val("Aguarde");
      dots = 0;
    }
  }

  $('#messageEvaluate').keyup(function(){
    countChars($('#messageEvaluate'),500,'limitCharContact');
  });

  $('#form-contact').submit(function(){
    disableButton();
    $('#buttonDisable').val("Aguarde");
    setInterval(loadDots, 600);
  });

  function initialize(){
    for(var l in errorsContact){
      if(errorsContact[l] === true){
        return disableButton();
      } else {
        enableButton();
      }
    }
  }

  function countChars(box, limit, campospan){
    var count =  limit  - box.val().length;
    document.getElementById(campospan).innerHTML = "Caracteres restantes: " + count;
  }

  function checkMailContact(){
    var emailExp = /^(([^<>()\[\]\\.,;:=/{}+!\s@"]+(\.[^<>()\[\]\\.,;:=/{}+!\s@]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailInput = $('#emailEvaluateContact').val();
    if (!emailInput.match(emailExp) || emailInput === "" ){
      errorFoundContact('#emailEvaluateContact', '#emailAlertTextContact', '#emailAlertContact');
      errorsContact["emailEvaluateContact"] = true;
      initialize();
    }else{
      errorNotFoundContact('#emailEvaluateContact', '#emailAlertTextContact', '#emailAlertContact')
      errorsContact["emailEvaluateContact"] = false;
      initialize();
    }
  }

  function checkNameContact(){
    var nameExp = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    if (checking("#nameEvaluateContact", nameExp)){
      errorNotFoundContact('#nameEvaluateContact', '#nameAlertTextContact', '#nameAlertContact')
      errorsContact["nameEvaluateContact"] = false;
      initialize();
    }
    else {
      errorFoundContact('#nameEvaluateContact', '#nameAlertTextContact', '#nameAlertContact');
      errorsContact["nameEvaluateContact"] = true;
      initialize();
    }
  }

  function checkMessage(){
    var message = $('#messageEvaluate').val();
    if (message === ""){
      errorFoundContact('#messageEvaluate', '#messageAlertText', '#messageAlert');
      errorsContact["messageEvaluate"] = true;
      initialize();
    }else{
      errorNotFoundContact('#messageEvaluate', '#messageAlertText', '#messageAlert')
      errorsContact["messageEvaluate"] = false;
      initialize();
    }
  }

  function errorFoundContact(textAreaId, alertTextId, alertDivId){
    $(textAreaId).addClass("error");
    $(alertTextId).removeClass("hidden");
    $(alertDivId).addClass("text-field-error");
  }

  function errorNotFoundContact(textAreaId, alertTextId, alertDivId){
    $(textAreaId).removeClass("error");
    $(alertTextId).addClass("hidden");
    $(alertDivId).removeClass("text-field-error");
  }

  function hasBadWordsContact(text){
    var count = 0;
    var textLowerCase = text.val().toLowerCase().split(" ");
    for(var i = 0; i <= badwords.length; i++){
      for(j=0; j <= textLowerCase.length; j++){
        if(textLowerCase[j] == badwords[i]){
          count++;
          break;
        }
      }
    }
    badWordsErrorsContact(count, text);
  }

  function badWordsErrorsContact(count, text){
    if(count > 1){
      errorsContact["messageEvaluate"] = true;
      text.addClass("error");
      $('#messageAlertTextObscenity' ).removeClass("hidden");
      $('#messageAlert').addClass("text-field-error");
      initialize();
    }
    else {
      errorsContact["messageEvaluate"] = false;
      text.removeClass( "errorBorder" );
      $('#messageAlertTextObscenity').addClass( "hidden" );
      $('#messageAlert').removeClass("text-field-error");
      initialize();
      checkMessage();
    }
  }

});
