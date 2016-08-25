//= require header-mobile

var autocomplete;
var map;

function initAutocomplete () {
  var mapField = $('#map')[0]
  map = new google.maps.Map(mapField, {
    center: {lat: -10.254450, lng: -48.324275},
    zoom: 3
  });

  initMap();
  createPin();
  cleanPlaceIdValueFromInput();
  initLists();

  var searchField = $('#searchField')[0];
  var types = {types: ['establishment']};

  searchBox = new google.maps.places.Autocomplete(searchField, types);

  var evaluateField = $('#evaluateField')[0];

  autocomplete = new google.maps.places.Autocomplete(
    (evaluateField),
    {types: ['establishment']});

    autocomplete.addListener('place_changed', fillName);
    searchBox.addListener('place_changed', fillSearch);

    $('#evaluateField').change("fillName()");
    $('#searchField').change("fillSearch()");
    $('#searchField').focus("geolocate()");
    $('#searchField').keydown("list_places()");
    $('#evaluateField').keydown("list_places()");


    // Create the search box and link it to the UI element.
    var input = document.getElementById('map_search');
    var searchBoxMap = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBoxMap.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBoxMap.addListener('places_changed', function() {
      var places = searchBoxMap.getPlaces();

      if ( places.length === 0 ) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
      map.setZoom(15);
    });
  }

  function fillName(){
    var place = autocomplete.getPlace();
    $('#placeId').val(place.place_id);
    $('#rate-btn').click();
  }

  function fillSearch(){
    var place = searchBox.getPlace();
    $('#placeId2').val(place.place_id);
    $('#search-btn').click();
  }

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
        searchBox.setBounds(circle.getBounds());
      });
    }
  }

  function cleanPlaceIdValueFromInput(){
    $('#placeId').val('');
    $('#placeId2').val('');
  }

  function initMap() {

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
        map.setZoom(12);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function createPin(){
    for(var i = 0; i<locations.length; i++){
      var locate = locations[i];
      var iconColor = locate[3];
      var myLatLng = {lat: locate[1], lng: locate[2]};
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: locate[0],
        icon: iconColor,
        optimized: false
      });
      var contentString = '<div id="content">'+
      '<a href="/perfil/' + locate[4].toString() + '">';

      // if (locate[7]) {
      // }
      contentString = contentString + '<h4><label class="concept ' + locate[6].toString() + '">' + locate[5].toString() + '</label></h4>'
      contentString = contentString + '<h3 id="firstHeading" class="text-center spacing-concept-pin">'+ locate[0].toString() +'</h3>' +
      '<div id="bodyContent"></a>'+
      '</div>'+
      '</div>';
      marker.info = new google.maps.InfoWindow({
        content: contentString
      });
      google.maps.event.addListener(marker, 'click', function(){
        var marker_map = this.getMap();
        this.info.open(marker_map, this);
      });
    }
  }

  function initLists(){
    $('#bottom5').hide();
  }


  $(document).ready(function(){

    var type = "good";

    $('#text-without-javascript').hide();
    openHeaderMobile();

    var isMobile = window.matchMedia("only screen and (max-width: 1199px)");

    initLists();
    checkOffset();
    checkMobileEnhanceButtons();
    hideMapIfIsMobile();
    changingTopOfFlagWhenIsMobile();

    if(window.location.pathname == "/"){
      sendAjaxRequestForWelcome();
    }


    function hideMapIfIsMobile(){
      if(isMobile.matches){
        $("#map-mobile").css("display", "none");
        $("#link-to-ranking").css("margin-bottom", "10px");
      }
    }

    function changingTopOfFlagWhenIsMobile(){
      if(isMobile.matches){
        $('.concept:before').css("top", "36px");
      }
    }

    function sendAjaxRequestForWelcome(){
      $.get('/?&type=' + type,{
        success: console.log(":}")
      });
    }

    var actualFontSize = 14
    $("#upperFontSizeButton").click(upperFontSize);

    $("#lowerFontSizeButton").click(lowerFontSize);

    function lowerFontSize(){
      var min = 14
      if(actualFontSize>min){
        actualFontSize = actualFontSize-2;
        $("body").css("font-size", actualFontSize + "px");
        // $(".menu").css("font-size", parseInt($(".menu").css("font-size"))-2+'px');
      }
    }

    function upperFontSize() {
      var max = 18
      if(actualFontSize<max){
        actualFontSize = actualFontSize+2;
        $("body").css("font-size", actualFontSize + "px");
        // $(".menu").css("font-size", parseInt($(".menu").css("font-size"))+2+'px');
      }
    }

    // $(document).scroll(function() {
    //   if(!isMobile.matches){
    //     checkOffset();
    //   }
    // });

    function checkMobileEnhanceButtons(){
      if(isMobile.matches){
        $('#buttons-enhance').hide();
      }
    }

    function checkOffset(){
      var buttons = $('#buttons-enhance');
      buttons.css({'position': 'fixed', "bottom": "2px", "left": "6px"});
    }

    $("#bestPlacesButton").click(function(){
      type = "good";
      sendAjaxRequestForWelcome();
    });

    $("#worstPlacesButton").click(function(){
      type = "bad";
      sendAjaxRequestForWelcome();
    });

    $('#placeId').attr('readonly', true)
    $('#placeId2').attr('readonly', true)

    $('#formEvaluate').submit(function(e){
      if($('#placeId').val() === ''){
        e.preventDefault();
      }
    });

    $('#formSearch').submit(function(e){
      if($('#placeId2').val() === ''){
        e.preventDefault();
      }
    });
  });

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-81341067-1', 'auto');
  ga('send', 'pageview');
