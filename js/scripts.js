let mapPlaceholderWidth = (screen.width<=1280) ? screen.width : 1280;
let mapPlaceholderHeight = (screen.height<=1280) ? screen.height : 1280;
document.getElementById('mapPlaceholder').style.backgroundImage= "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/11.9681,57.6971,12/"+mapPlaceholderWidth+"x"+mapPlaceholderHeight+"?access_token=pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoiY2l1dTUzcmgxMDJ0djJ0b2VhY2sxNXBiMyJ9.25Qs4HNEkHubd4_Awbd8Og')";

//11.9680538, 57.6970956]

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = checkTime(m);
  document.getElementById('timerBox').innerHTML = 
  h + ":" + m;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
} 

function calcDiffTimeInMinutes(dt2, dt1) {  
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

console.log('ok');

var mapHasBeenResized = false;

var currentToken;
var departStopId;
var departStopName;
var directionStopId;
var directionStopName;
var departStopId2;
var departStopName2;
var directionStopId2;
var directionStopName2;
var departStopId3;
var departStopName3;
var directionStopId3;
var directionStopName3;
var departStopId4;
var departStopName4;
var directionStopId4;
var directionStopName4;

var currentHeaders = new Headers();
//currentHeaders.append("Authorization", "Bearer "+currentToken);

var requestOptions = {
method: 'GET',
headers: '',
redirect: 'follow'
};

function getAuthToken () {  
  var initialHeaders = new Headers();
  initialHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  initialHeaders.append("Authorization", "Basic SjFkQkhzc1d1T0Q4cnVYM1cxUXlWVXZnVE5zYTpQbWZtY3JDWHJacG41QW16NkppMGpabFFMOVVh");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  var initialRequestOptions = {
    method: 'POST',
    headers: initialHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  fetch("https://api.vasttrafik.se/token", initialRequestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        console.log(result.access_token);
        currentToken = result.access_token;
        //document.getElementById('trip').innerHTML="Authorization obtained";    
        currentHeaders.append("Authorization", "Bearer "+currentToken);
        requestOptions.headers=currentHeaders;
        return currentToken;


      })
    .catch(error => console.log('error', error));
}

    
const getStopId = async(stopName,requestOptions) => {
  return fetch("https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input="+stopName+"&format=json", requestOptions);//07%3A00
}
let feature9 =  {
  'type': 'Feature',
  'place_name': '🚌 ' + 'Loading',
  'center': [11.939940,57.705515],
  'place_type': ['Stop'],
  'properties': {
  'title': 'Lincoln Park',
  'description':
  'A northside park that is home to the Lincoln Park Zoo'
  },
  'geometry': {
  'coordinates': [11.939940,57.705515],
  'type': 'Point'
  }
  };
arr1 = [];
arr1.push(feature9);

function fireKey(el,key)
{
    if(document.createEventObject)
    {
        var eventObj = document.createEventObject();
        eventObj.keyCode = key;
        el.fireEvent("onkeydown", eventObj);
        eventObj.keyCode = key;   
    }else if(document.createEvent)
    {
        var eventObj = document.createEvent("Events");
        eventObj.initEvent("keydown", true, true);
        eventObj.which = key; 
        eventObj.keyCode = key;
        el.dispatchEvent(eventObj);
    }
} 




let blablaGeocoder = async(query) =>{
  const bla = await getStopId(query,requestOptions);
  const blo = await bla.json();
  console.log('with await '+blo);
  arr1.length=0;
  var stpLoc00 = blo.LocationList.StopLocation[0];
  var feature0 = {
    'type': 'Feature',
    'properties': {
      'title': stpLoc00.name,
      'description': 'blabla'
    },
    'geometry': {
      'coordinates': [stpLoc00.lon, stpLoc00.lat],
      'type': 'Point'
    },
    'place_name': '🚌 ' + stpLoc00.name,
    'center': [stpLoc00.lon, stpLoc00.lat],
    'place_type': ['Stop']
  };
  arr1.push(feature0);
  /*geocoder.setInput(query);
  geocoder.query=query;
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value=query;*/
  /*var rf = geocoder.getRenderFunction();
  console.log(rf);
  geocoder.getRenderFunction().call(arr1);*/
  console.log('JE SUIS LA');
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value+='';
  geocoder.localGeocoder=arr1;

  ev2 = new KeyboardEvent('keydown', {
    key : "q",
    keyCode : 81});
  document.dispatchEvent(ev2);
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].dispatchEvent(ev2);
  
  ev1 = new KeyboardEvent('keyup', {
    key : "q",
    keyCode : 81});
  document.dispatchEvent(ev1);
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].dispatchEvent(ev1);
  
  fireKey(document, 37);



}


  var forwardGeocoder = function(query) {
  var matchingFeatures = [];
  /*const bla = await getStopId(query,requestOptions);
  const blo = await bla.json();
  console.log('with await '+blo);
  console.log(blo.LocationList);    */
  for(i=0;i<arr1.length;i++) {
    console.log('turn '+i+arr1[i]);
    let feature = arr1[i];
    matchingFeatures.push(feature);
  }



  //var stpLoc0 = blo.LocationList.StopLocation[0];
  /*var feature = {
    'type': 'Feature',
    'properties': {
      'title': stpLoc0.name,
      'description': 'blabla'
    },
    'geometry': {
      'coordinates': [stpLoc0.lon, stpLoc0.lat],
      'type': 'Point'
    },
    'place_name': '🌲 ' + stpLoc0.name,
    'center': [stpLoc0.lon, stpLoc0.lat],
    'place_type': ['Stop']
  };








    feature['place_name'] = '🌲 ' + stpLoc0.name;
    feature['center'] = [stpLoc0.lon, stpLoc0.lat];
    feature['place_type'] = ['Stop'];*/
    /*for (var i = 0; i < resultList.StopLocation.length; i++) {
      var feature = resultList.StopLocation[i];
      // handle queries with different capitalization than the source data by calling toLowerCase()
      if (
      feature.properties.title
      .toLowerCase()
      .search(query.toLowerCase()) !== -1
      ) {
        // add a tree emoji as a prefix for custom data results
        // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        feature['place_name'] = '🌲 ' + feature.properties.title;
        feature['center'] = feature.geometry.coordinates;
        feature['place_type'] = ['park'];
        matchingFeatures.push(feature);
      }
    }*/
    //console.log('hola'+feature['place_name']);
    //matchingFeatures.push(feature);
    return matchingFeatures; 
}






mapboxgl.accessToken = 'pk.eyJ1IjoiYnBkbDk5IiwiYSI6ImNrN3U4N2c3dTA2MmkzZW03eTF2cG9mZmkifQ.CxHSE9Adrn5FuxFy3MCo-Q';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [11.9680538, 57.6970956],// [11.9700082, 57.7086032],     57.707604,11.93348999     57.7061575,11.9312679
zoom: 12,
maxBounds: [[11.135498, 57.3223778], [12.9494377, 58.2625957]],
minZoom: 8
});

map.on('load', function(e) {
  var mapContainerEl = document.getElementById('map');
  mapContainerEl.style.visibility = 'visible';
  document.getElementById('mapPlaceholder').remove();
});
 
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  countries: 'se',
  bbox: [11.135498, 57.3223778, 12.9494377, 58.2625957],
  minLength: 5,
  localGeocoderOnly:false,
  localGeocoder: forwardGeocoder,
  /*localGeocoder: function(query) {
    //Promise.resolve(forwardGeocoder(query)).then(rlt => {console.log(rlt);return rlt;});
    return Promise.resolve(forwardGeocoder(query));
  },*/
  placeholder: 'On va où  ?',
  marker: {
    color: 'orange'
  },
  mapboxgl: mapboxgl
  });

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
let tokToCheckIfSet;

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  console.log('KEY = '+event);
});

window.onload = (event) => {
  console.log('page is fully loaded');
  startTime();
  tokToCheckIfSet = getAuthToken();
  console.log("AuthToken set to: "+tokToCheckIfSet);

};
document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].addEventListener("input", function(event) {
  console.log('imherekeypressed');
  if(requestOptions.headers==''){
    //tokToCheckIfSet = getAuthToken();
    console.log("AuthToken set to: "+tokToCheckIfSet);
  }
  if (event.target.value.length>3) {
    blablaGeocoder(event.target.value);
  }
  if (event.target.value.length>4) {
    console.log(event.target.value);
    
    /*var keyEvent = new KeyboardEvent("keydown", {key : "a", char : "a", shiftKey: true});
    
    document.dispatchEvent(keyEvent);*/

    /*getStopId(event.target.value,requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.LocationList);   
    });*/
  }
});

document.getElementById('inputBox').addEventListener("click", function( event ) {
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--button')[0].display = 'block';
});

let userPosition;
let numTrips;
let saveResultChosen;
let tripResults;
geocoder.on('result', (inputResult) => {
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].disabled = true;
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].active = false;
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].blur();
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].style.color= 'black'; //rgb(55, 171, 46)
  //document.getElementsByClassName('mapboxgl-ctrl-geocoder mapboxgl-ctrl')[0].innerHTML+='<i class="fas fa-map-marker-alt" id="searchInputMarker"></i>'; .id='searchInputMarker'
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--button')[0].display = 'block';
  document.getElementById('buttonSettings').style.display= 'inline-block';
  document.getElementById('buttonRefresh').style.display= 'inline-block';
  document.getElementById('buttonSetTime').style.display= 'inline-block';
  let iconToInsert = document.createElement("i");
  iconToInsert.id = 'searchInputMarker';
  iconToInsert.classList.add('fas');
  iconToInsert.classList.add('fa-map-marker-alt');
  if(document.getElementById('searchInputMarker')==undefined) {
    document.getElementById('geocoder').firstChild.insertBefore(iconToInsert,document.getElementById('geocoder').firstChild.firstChild);
  }
  document.getElementById('searchEmoji').style.display = 'none';
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--icon-search')[0].style.display = 'none';
  saveResultChosen = inputResult;
  document.getElementById('bottomGreen').classList.add('bottomGreenExtended');
  document.getElementById('inputBox').classList.add('inputBoxExtended');
  if(mapHasBeenResized) {
    map.flyTo({ center: [inputResult.result['center'][0],inputResult.result['center'][1]], zoom: 15});
  } else {
    map.flyTo({ center: [inputResult.result['center'][0],inputResult.result['center'][1]-0.0043], zoom: 15}); //Gamla%20ceresgatan%207%2C%20G%C3%B6teborg
  }
  //document.getElementById('possibleTripList').addEventListener('click', (event) => clickedResultTrip(event, result.TripList.Trip));
  getWalkOnlyTripList(inputResult);
  getPossibleTripList(inputResult, true);
  

});

function getWalkOnlyTripList(resultChosenWalkOnly) {  
  const originLngLat = userPositionMarker.getLngLat();
  //console.log('google maps url');
  //window.location = 'geo:40.765819,-73.975866';
  console.log('comgooglemaps://?saddr='+originLngLat.lat+','+originLngLat.lng+'&daddr='+resultChosenWalkOnly.result['center'][1]+','+resultChosenWalkOnly.result['center'][0]+'&directionsmode=walking');
  console.log("maps://?ll="+resultChosenWalkOnly.result['center'][1]+","+resultChosenWalkOnly.result['center'][0]);
  document.getElementById('buttonWalkLink').href='comgooglemaps://?saddr='+originLngLat.lat+','+originLngLat.lng+'&daddr='+resultChosenWalkOnly.result['center'][1]+','+resultChosenWalkOnly.result['center'][0]+'&directionsmode=walking';
  if(screen.width>=730) {
  document.getElementById('buttonWalk').style.display="block";
  }
  //window.location = "maps://?ll="+resultChosenWalkOnly.result['center'][1]+","+resultChosenWalkOnly.result['center'][0];
  /*fetch("https://api.vasttrafik.se/bin/rest.exe/v2/trip?originCoordLat="+originLngLat.lat+"&originCoordLong="+originLngLat.lng+"&originCoordName="+"userPos"
  +"&destCoordLat="+resultChosenWalkOnly.result['center'][1]+"&destCoordLong="+resultChosenWalkOnly.result['center'][0]+"&destCoordName="+resultChosenWalkOnly.result['properties'].title+"&numTrips=7&needGeo=1&onlyWalk=1&format=json", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log('WALK ONLY TRIPS'+JSON.stringify(result.TripList));
  });*/
}

// geocoder.on('result', (resultChosen) =>{
function getPossibleTripList(resultChosen, newInputEntered){
  console.log('Result'+resultChosen.result['center']);
  console.log('Result'+JSON.stringify(resultChosen.result));
  console.log('Result'+saveResultChosen.result['place_name']);
  const originLngLat = userPositionMarker.getLngLat();
  document.getElementById('possibleTripList').innerHTML='';
  const originName="userPos";
  let walkHTML='';
  if(screen.width<=730) {
    walkHTML = '<div style="height: 40px;text-align: center;width: 30%;min-width: 150px;" class="singleTripBox" id="Walk999'+'">'
    +'<span class="spanLeg" style="line-height: 40px; top: 0%; text-align: center;"><a style="color:black;text-decoration:none;" href="'
    +'comgooglemaps://?saddr='+originLngLat.lat+','+originLngLat.lng+'&daddr='+resultChosen.result['center'][1]+','+resultChosen.result['center'][0]+'&directionsmode=walking'
    +'">On y va à pied !</a></span></div>';
    document.getElementById('possibleTripList').innerHTML+=walkHTML;
  }
  fetch("https://api.vasttrafik.se/bin/rest.exe/v2/trip?originCoordLat="+originLngLat.lat+"&originCoordLong="+originLngLat.lng+"&originCoordName="+originName
  +"&destCoordLat="+resultChosen.result['center'][1]+"&destCoordLong="+resultChosen.result['center'][0]+"&destCoordName="+resultChosen.result['properties'].title+"&numTrips=7&needGeo=1&format=json", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.TripList);
    tripResults = result.TripList.Trip;
    result.TripList.Trip.forEach((trp,index) => {
      let htmlToAdd = '<div class="singleTripBox" id="trip'+index+'">'; // <h2>Trip n*'+index+'</h2>';
      let lastLeg;
      let firstLegNonWalk=null;
      let serverTime = result.TripList.servertime;
      let serverDate = result.TripList.serverdate;
      let jServerDate = new Date(serverDate+'T'+serverTime);
      console.log(jServerDate);
      let tripTimeFromNow;
      trp.Leg.forEach((lg,ind) => {
        
        const dateOrig = new Date(lg.Origin.date+'T'+lg.Origin.time);
        const dateDest = new Date(lg.Destination.date+'T'+lg.Destination.time);
        const walkTimeDiff = calcDiffTimeInMinutes(dateDest,dateOrig);

        if(ind==trp.Leg.length-1) {
          htmlToAdd+='<span class="spanLeg">';
          let jFinalLegDestinationDate = new Date(lg.Destination.date+'T'+lg.Destination.time);
          var diff =(jFinalLegDestinationDate.getTime() - jServerDate.getTime()) / 1000;
          diff /= 60;
          tripTimeFromNow = Math.abs(Math.round(diff));
          //tripTimeFromNow = lg.Destination.time+' now '+result.TripList.servertime;
        } else if(walkTimeDiff == 0 && lg.type== "WALK") {
          htmlToAdd+='<span>'
        } else {
          htmlToAdd+='<span class="spanLeg spanLegDot">';
        }
        if(lg.type == "WALK") {
          /*const dateOrig = new Date(lg.Origin.date+'T'+lg.Origin.time);
          const dateDest = new Date(lg.Destination.date+'T'+lg.Destination.time);
          const walkTimeDiff = calcDiffTimeInMinutes(dateDest,dateOrig);*/
          if(walkTimeDiff != 0) {
            htmlToAdd+='<i class="fas fa-walking"></i>';
            console.log('time diff walk: ',walkTimeDiff);
            htmlToAdd+='<div class="divWalkMin">~'+walkTimeDiff+'m</div>';
          }
        } else if(lg.type == "BUS") {
          htmlToAdd+='<div class="busLeg" style="background-color: '+lg.fgColor+'">'+lg.sname+'</div>';
        } else if(lg.type == "TRAM"){     
          if(lg.fgcColor=="#FFFFFF" || lg.sname=="1") {
            console.log('WHITE COLOR!!!');
            htmlToAdd+='<div class="busLeg" style="background-color: '+lg.fgColor+';border-style: solid; border-color: black; border-width: 2px; color: black;">T'+lg.sname+'</div>';
          } else {    
            htmlToAdd+='<div class="busLeg" style="background-color: '+lg.fgColor+'">T'+lg.sname+'</div>';
          }
        } else if(lg.type == "BOAT"){          
        htmlToAdd+='<div class="busLeg" style="background-color: '+lg.fgColor+'">'+lg.sname+'</div>';
        }
        htmlToAdd+='</span>';
        if(lg.type!= "WALK" && firstLegNonWalk == null) {
          firstLegNonWalk = lg;
        }
      });
      htmlToAdd+='<span class="spanLeg spanMin">'+tripTimeFromNow+'<p class="pMin">min</p></span>';
      let firstPTDepartureTime = (firstLegNonWalk.Origin.rtTime!=undefined) ? firstLegNonWalk.Origin.rtTime : firstLegNonWalk.Origin.time;
      htmlToAdd+='<div class="divDepartureInformation">départ à '+firstPTDepartureTime+' de '+firstLegNonWalk.Origin.name.replace(', Göteborg','')+' '+firstLegNonWalk.Origin.track+'</div>'
      document.getElementById('possibleTripList').innerHTML+=htmlToAdd+'</div>';
    });
  //if(newInputEntered) {
    //if()
    //document.getElementById('possibleTripList').addEventListener('click', (event) => clickedResultTrip(event, result.TripList.Trip));
    document.getElementById('possibleTripList').removeEventListener('click', clickedResultTrip);
    document.getElementById('possibleTripList').addEventListener('click', clickedResultTrip);
  //}
  });

}
//function possibleTripListClicked(event)

geocoder.on('clear', () =>{
  console.log('Input Cleared');
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].disabled = false;
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].style.color= '';
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--button')[0].display = '';
  document.getElementById('searchInputMarker').remove();
  document.getElementsByClassName('mapboxgl-ctrl-geocoder--icon-search')[0].style.display = '';
  document.getElementById('searchEmoji').style.display = '';
  document.getElementById('possibleTripList').innerHTML='';
  document.getElementById('bottomGreen').classList.remove('bottomGreenExtended');
  document.getElementById('inputBox').classList.remove('inputBoxExtended');
  document.getElementById('buttonSettings').style.display= 'none';
  document.getElementById('buttonRefresh').style.display= 'none';
  document.getElementById('buttonSetTime').style.display= 'none';
  document.getElementById('buttonWalk').style.display="none";
  if(mapHasBeenResized){
    map.flyTo({ center: [userPosition.longitude,userPosition.latitude], zoom: 16 });
  } else {
    map.flyTo({ center: [userPosition.longitude,userPosition.latitude-0.0013], zoom: 16 });
  }

});
    
const getGeoRef = async(geoRefURL,requestOptions) => {
  return fetch(geoRefURL, requestOptions);
}




function drawTripUsingSource(arrayWithAllTripSource) {
  if (map.getLayer('lines')) map.removeLayer('lines');
  if (map.getSource('lines')) map.removeSource('lines');
  map.addSource('lines', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': arrayWithAllTripSource/*[
        {
          'type': 'Feature',
          'properties': {
            'color': geoColor//'#F7455D' // red
          },
          'geometry': {
            'type': 'LineString',
            'coordinates': allPointArray[
              [-122.4833858013153, 37.829607404976734],
              [-122.4830961227417, 37.82932776098012],
              [-122.4830746650696, 37.82932776098012],
              [-122.48218417167662, 37.82889558180985],
              [-122.48218417167662, 37.82890193740421],
              [-122.48221099376678, 37.82868372835086],
              [-122.4822163581848, 37.82868372835086],
              [-122.48205006122589, 37.82801003030873]
            ]
          }
        }
      ]*/
    }
  });
  map.addLayer({
    'id': 'lines',
    'type': 'line',
    'source': 'lines',
    'paint': {
      'line-width': 5,
      // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
      // to set the line-color to a feature property value.
      'line-color': ['get', 'color']
    },
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    }
  });
}



// async function clickedResultTrip(ev, tripArray) {
async function clickedResultTrip(ev) {
  console.log(ev);
  console.log(ev.target);
  let tripArray = tripResults;
  if(ev.target.className == "singleTripBox") { //toElement
    console.log(ev.target.id.charAt(ev.target.id.length-1)); //toElement
    console.log(tripArray[ev.target.id.charAt(ev.target.id.length-1)]); //toElement
    let promiseArray = new Array();
    let arrayWithTripSource = new Array();
    let arrayWithLegColors = new Array();
    let htmlToAdd = '';
    document.getElementById('tripDetailsBox').innerHTML = document.getElementById('trip'+ev.target.id.charAt(ev.target.id.length-1)).outerHTML; //toElement
    document.getElementById('tripDetailsBox').innerHTML += '<div style="height: 5px;"></div>';
    console.log('HEHO');
    tripArray[ev.target.id.charAt(ev.target.id.length-1)].Leg.forEach((currentLeg, currentIndex) => { //toElement
      //htmlToAdd += '<div class="singleLegBox" id="leg'+currentIndex+'">'; // <h2>Trip n*'+index+'</h2>'; class="singleLegBox"
      const ifPossibleDestName = (currentLeg.Destination.name!=undefined&&currentLeg.Destination.name!='undefined') ? currentLeg.Destination.name : saveResultChosen.result['place_name'];
      console.log('PLACE = '+ifPossibleDestName);
      const ifPossibleRtDateOrig = (currentLeg.Origin.rtDate!=undefined) ? currentLeg.Origin.rtDate : currentLeg.Origin.date;
      const ifPossibleRtDateDest = (currentLeg.Destination.rtDate!=undefined) ? currentLeg.Destination.rtDate : currentLeg.Destination.date;
      const ifPossibleRtTimeOrig = (currentLeg.Origin.rtTime!=undefined) ? currentLeg.Origin.rtTime : currentLeg.Origin.time;
      const ifPossibleRtTimeDest = (currentLeg.Destination.rtTime!=undefined) ? currentLeg.Destination.rtTime : currentLeg.Destination.time;
      const dateOrig = new Date(ifPossibleRtDateOrig+'T'+ifPossibleRtTimeOrig);
      const dateDest = new Date(ifPossibleRtDateDest+'T'+ifPossibleRtTimeDest);
      const walkTimeDiff = calcDiffTimeInMinutes(dateDest,dateOrig);
      htmlToAdd += '<span class="" style="position: absolute;right: 15px;line-height: 32px;text-align:right;font-size: larger;font-weight: bold;padding-top: 9px;">'+walkTimeDiff+'<p class="pMin" style="line-height:3px;font-weight:normal;">min</p></span>';

      if(currentLeg.type == "WALK") {
        if(ifPossibleDestName.length>30) {          
          htmlToAdd += '<div class="singleLegBox" id="leg'+currentIndex+'" style="line-height:20px">';  
        } else {
          htmlToAdd += '<div class="singleLegBox" id="leg'+currentIndex+'">';
        }        
        htmlToAdd += "Marcher jusqu'à "+ifPossibleDestName.replace(', Göteborg','');
      } else {
        htmlToAdd += '<div class="singleLegBox" style="height: 120px;" id="leg'+currentIndex+'">';
        if(currentLeg.type=="TRAM") {
          if(currentLeg.sname=="1") {
            htmlToAdd += '<div class="busLeg" style="background-color: '+currentLeg.fgColor+';border-style: solid;border-color: black;border-width: 2px;color: black;'
            +'transform: scale(0.8);padding-bottom: 0px;padding-top: 2px;line-height: 30px;">T'+currentLeg.sname+'</div>';
          } else {          
            htmlToAdd += '<div class="busLeg" style="background-color: '+currentLeg.fgColor+';transform: scale(0.8);padding-bottom: 0px;padding-top: 2px;line-height: 30px;">T'+currentLeg.sname+'</div>'; 
          }
        } else {
          htmlToAdd += '<div class="busLeg" style="background-color: '+currentLeg.fgColor+';transform: scale(0.8);padding-bottom: 0px;padding-top: 2px;line-height: 30px;">'+currentLeg.sname+'</div>'; 
        }
        htmlToAdd += 'direction <span class="busDirectionDisplay">'+currentLeg.direction+'</span>'; 
        htmlToAdd += '<div><div class="transportLeftLine" style="border-color:'+currentLeg.fgColor+'"></div>';
        htmlToAdd += '<div style="display:inline-block">'+ifPossibleRtTimeOrig+' '+currentLeg.Origin.name.replace(', Göteborg','')+' '+currentLeg.Origin.track+'<br />'
        +''+ifPossibleRtTimeOrig+' '+currentLeg.Destination.name.replace(', Göteborg','')+' '+currentLeg.Destination.track+'</div></div>';
      }
      htmlToAdd += '</div>';

      const currentPromise = getGeoRef(currentLeg.GeometryRef.ref,requestOptions);
      promiseArray.push(currentPromise);
      console.log(currentPromise);
      console.log(promiseArray);
      let geoColor = 'blue';
      if(currentLeg.type=="WALK") {
        geoColor = 'green';
      } else if(currentLeg.fgColor!='#FFFFFF') {
        geoColor = currentLeg.fgColor;
      }
      arrayWithLegColors.push(geoColor);
    });
    document.getElementById('tripDetailsBox').innerHTML+=htmlToAdd;
    const resolvedFetchArray = await Promise.all(promiseArray);
    let unResolvedJsonArray = new Array();
    resolvedFetchArray.forEach((res) => {
      unResolvedJsonArray.push(res.json());
    });
    const resolvedJsonArray = await Promise.all(unResolvedJsonArray);
    resolvedJsonArray.forEach((geoResult, geoIndex) => {
      let allPointArray = new Array();
      geoResult.Geometry.Points.Point.forEach(pt => {
        allPointArray.push([pt.lon, pt.lat]);
      });
      arrayWithTripSource.push({
        'type': 'Feature',
        'properties': {
          'color': arrayWithLegColors[geoIndex]//'#F7455D' // red
        },
        'geometry': {
          'type': 'LineString',
          'coordinates': allPointArray
        }
      });      
    });
    //move
    document.getElementById('bottomGreen').style.height = '49%';    
    // document.getElementById('inputBox').style.top= '49.8%';    
    document.getElementById('inputBox').style.display= 'none';  
    //document.getElementById('possibleTripList').style.top= '5%';
    document.getElementById('possibleTripList').style.display= 'none';
    document.getElementById('precBox').style.display= 'block';
    document.getElementById('tripDetailsBox').style.display= 'block';

    document.getElementById('map').style.height= '56%';   

    map.resize();
    mapHasBeenResized = true;
    // document.getElementById('bottomGreen').classList.add('bottomGreenExtended');
    // document.getElementById('inputBox').classList.add('inputBoxExtended');
    drawTripUsingSource(arrayWithTripSource);
    fitToTripLine(arrayWithTripSource);
    const greenBoxElement = document.getElementById('bottomGreen');
    //greenBoxElement.onwheel = zoom;
    //greenBoxElement.addEventListener('wheel', (event) => zoom(event, greenBoxElement)); //ADDEVENTLISTENER SCROLL GREENBOX
    document.getElementById('tripDetailsBox').addEventListener('click', (clickEvent) => {
      console.log('this is clicked '+clickEvent);
      if(clickEvent.target.className == "singleLegBox") { //toElement
        console.log(clickEvent.target.id.charAt(clickEvent.target.id.length-1)); //toElement
        console.log('color with trip source clicked = '+arrayWithTripSource[clickEvent.toElement.id.charAt(clickEvent.target.id.length-1)].properties.color); //toElement
        const pp = arrayWithTripSource[clickEvent.target.id.charAt(clickEvent.target.id.length-1)]; //toElement
        fitToTripLine([pp]);
      }
      if(clickEvent.target.className == "singleTripBox") { //toElement
        fitToTripLine(arrayWithTripSource);
      }
    });

  }
}

let scale = 1;
function zoom(event,el) {
  event.preventDefault();

  scale += event.deltaY * -0.01;
  console.log('scale = '+scale);
  //scale = scale*3;
  if(scale<0) scale=0;
  // Restrict scale
  //scale = Math.min(Math.max(.125, scale), 4);

  // Apply scale transform
  el.style.height = 49+scale*4+`%`;
  //el.style.transform = `scale(${scale})`;
}






function fitToTripLine(arrayWithLineCoords) {
  // Geographic coordinates of the LineString
  //var coordinates = geojson.features[0].geometry.coordinates;
  let allLegCoords = new Array();
  arrayWithLineCoords.forEach((singleLegCoords) => {
    allLegCoords = allLegCoords.concat(singleLegCoords.geometry.coordinates);
  });
  //var coordinates = arrayWithLineCoords[0].geometry.coordinates; 
  var coordinates = allLegCoords;
  // Pass the first coordinates in the LineString to `lngLatBounds` &
  // wrap each coordinate pair in `extend` to include them in the bounds
  // result. A variation of this technique could be applied to zooming
  // to the bounds of multiple Points or Polygon geomteries - it just
  // requires wrapping all the coordinates with the extend method.
  var bounds = coordinates.reduce(function(bounds, coord) {
  return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
   
  map.fitBounds(bounds, {
  padding: 80
  });
  // map.setZoom(map.getZoom()-2);
  // map.setCenter(new mapboxgl.LngLat (map.getCenter().lng,map.getCenter().lat-0.0100));
  }
  

  //map.flyTo({ center: [resultChosen.result['center'][0],resultChosen.result['center'][1]-0.0043], zoom: 15});

// 57.709181    ,   11.970838                57.711623 , 11.970489    0.0025


/*
accessToken: mapboxgl.accessToken,
 
// limit results to Australia
countries: 'au',
 
// further limit results to the geographic bounds representing the region of
// New South Wales
bbox: [139.965, -38.03, 155.258, -27.839],
 
// apply a client side filter to further limit results to those strictly within
// the New South Wales region
filter: function(item) {
// returns true if item contains New South Wales region
return item.context
.map(function(i) {
// id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
// this example attempts to find the `region` named `New South Wales`
return (
i.id.split('.').shift() === 'region' &&
i.text === 'New South Wales'
);
})
.reduce(function(acc, cur) {
return acc || cur;
});*/









var userPositionMarker = new mapboxgl.Marker({
  draggable: true,
  color: '#4264fb'
});
navigator.geolocation.getCurrentPosition(posi => {console.log(posi);centerMapOnUser(posi.coords)});
function centerMapOnUser (position) {
  let heightOffset = 0.0010;
  if(window.matchMedia("(max-height: 700px)").matches){
    heightOffset = 0.0005;
  } else {
    heightOffset = 0.0010;
  }
  userPosition = position;
  map.flyTo({ center: [position.longitude,position.latitude-heightOffset], zoom: 16 });
  userPositionMarker.setLngLat([position.longitude, position.latitude]);
  userPositionMarker.addTo(map);
}
/*

const node = document.getElementById("userDest");
node.value = "";
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      if(userPosition!=undefined) {
        console.log('hey '+event.target.value);
        //getAuthToken();

      } else {
        console.log('bye '+ event.target.value);
      }
        // Do work
    }
});
/*

mapboxgl.accessToken = 'pk.eyJ1IjoiYnBkbDk5IiwiYSI6ImNrN3U4N2c3dTA2MmkzZW03eTF2cG9mZmkifQ.CxHSE9Adrn5FuxFy3MCo-Q';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [11.9700082, 57.7086032],
zoom: 12,
maxBounds: [[11.135498, 57.3223778], [12.9494377, 58.2625957]],
minZoom: 8
});

*/



document.getElementById('precBox').addEventListener('click', (event) => {    
  document.getElementById('inputBox').style.display= '';  
  document.getElementById('inputBox').style.bottom= '49%';
  document.getElementById('possibleTripList').style.display= '';
  document.getElementById('precBox').style.display= 'none';
  document.getElementById('tripDetailsBox').style.display= 'none';
  if (map.getLayer('lines')) map.removeLayer('lines');
  if (map.getSource('lines')) map.removeSource('lines');
  map.flyTo({ center: [saveResultChosen.result['center'][0],saveResultChosen.result['center'][1]], zoom: 15}); //-0.0043


});

document.getElementById('buttonRefresh').addEventListener('click', (event) => getPossibleTripList(saveResultChosen, false));









var todayDateTime = new Date();
console.log(todayDateTime);
todayDateTime.setHours( todayDateTime.getHours() + 1 );
console.log(todayDateTime);
var todayDate = todayDateTime.toISOString().split('T')[0];
var todayTime = todayDateTime.toISOString().split('T')[1].substring(0,5);
todayTime = todayTime.replace(':','%3A');
console.log(todayDate+' '+todayTime);


var journeyIdTojourneyURL = new Map();

  const getDepartureList = async(stopName1,stopName2,requestDate,requestTime,timeSpan,requestOptions,titleHtmlElementIdToUpdate, contenthtmlElementIdToUpdate) => {
  const stopId1 = getStopId(stopName1,requestOptions);
  const stopId2 = getStopId(stopName2,requestOptions);
  const stopResponseList = await Promise.all([stopId1,stopId2]);
  const stopIdList = await Promise.all([stopResponseList[0].json(),stopResponseList[1].json()]);
  //console.log('OK+'+stopIdList[0].LocationList.StopLocation[0].id);
  document.getElementById(contenthtmlElementIdToUpdate).addEventListener('click',event => journeyClicked(event,stopIdList[1].LocationList.StopLocation[0].name)); 
  document.getElementById(titleHtmlElementIdToUpdate).innerHTML="From "+stopIdList[0].LocationList.StopLocation[0].name.replace(', Göteborg','')+' to '+stopIdList[1].LocationList.StopLocation[0].name.replace(', Göteborg','');
  return fetch("https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id="+stopIdList[0].LocationList.StopLocation[0].id+"&date="+requestDate+"&time="+requestTime+"&useVas=0&useLDTrain=0&useRegTrain=0&timeSpan="+timeSpan+"&direction="+stopIdList[1].LocationList.StopLocation[0].id+"&format=json",requestOptions);
  }

  function createTimeTable(departName,arrivalName,rDate,rTime,tSpan,requestOptions,titleElem,contentElem) {
    getDepartureList(departName,arrivalName,rDate,rTime,tSpan,requestOptions,titleElem,contentElem)
    .then(response => response.json())
    .then(result => {
      console.log(result.DepartureBoard);
      result.DepartureBoard.Departure.forEach((dep,num) => { 
        journeyIdTojourneyURL.set(dep.journeyid,dep.JourneyDetailRef.ref); 
        var cssClass = (num & 1 ) ? "pure-table-odd" : "";
        let timeDiffString='';
        if(dep.rtTime!=undefined){
          const timeDiff = dep.rtTime.split(':')[1].valueOf()-dep.time.split(':')[1].valueOf();
          if (timeDiff!=undefined&&timeDiff!=null&&timeDiff!=0) {
            timeDiffString = (timeDiff>0)? ' (+'+timeDiff+')' : ' ('+timeDiff+')';
          }
        }
        document.getElementById(contentElem).innerHTML+='<tr id="'+dep.journeyid+'" class="'+cssClass+'"><td>'+num+'</td><td>'+dep.name+'</td><td>'+dep.time+timeDiffString+'</td><td>'+dep.rtTime+'</td><td>--:--</td><td>--:--</td></tr>';  //<i class="fas fa-sync-alt"></i>              
      });
    })
    .catch(error => console.log('error', error));

  }
  /*createTimeTable('sannegårdshamnen','volvo%20it',todayDate,'07:00',90,requestOptions,'trip','tableContent');
  createTimeTable('volvo%20it','sannegårdshamnen',todayDate,'16:00',90,requestOptions,'trip2','tableContent2');
  createTimeTable('lindholmspiren','stenpiren',todayDate,todayTime,30,requestOptions,'trip3','tableContent3');
  createTimeTable('sannegårdshamnen','nordstan',todayDate,todayTime,30,requestOptions,'trip4','tableContent4');*/

  //fetch("https://api.vasttrafik.se/bin/rest.exe/v2/trip?originCoordLat=57.704809&originCoordLong=11.926041&originCoordName=Gamla%20ceresgatan%207%2C%20G%C3%B6teborg&destCoordLat=57.696990&destCoordLong=11.986500&destCoordName=Sk%C3%A5negatan%2039%2C%20412%2052%20G%C3%B6teborg");


  function journeyClicked (elem,wantedDirectionStop) {
    console.log(elem);
    journeyIdTojourneyURL.forEach((val,key) => {
      console.log(elem.target.parentElement);
      if(key==elem.target.parentElement.id) {
        console.log('success - '+val);

        fetch(val, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.JourneyDetail);
          result.JourneyDetail.Stop.forEach(stp => {
            if(stp.name==wantedDirectionStop) {
              
              let timeDiffString='';
              if(stp.rtArrTime!=undefined){
                const timeDiff = stp.rtArrTime.split(':')[1].valueOf()-stp.arrTime.split(':')[1].valueOf();
                if (timeDiff!=undefined&&timeDiff!=null&&timeDiff!=0) {
                  timeDiffString = (timeDiff>0)? ' (+'+timeDiff+')' : ' ('+timeDiff+')';
                }
              }
              document.getElementById(key).childNodes[4].innerHTML=stp.arrTime+timeDiffString;
              document.getElementById(key).childNodes[5].innerHTML=stp.rtArrTime;

              //break;
            }
          });
          fetch(result.JourneyDetail.GeometryRef.ref, requestOptions)
          .then(response => response.json())
          .then(result => {
            let allPointArray = new Array();
            result.Geometry.Points.Point.forEach(pt => {
              allPointArray.push([pt.lon, pt.lat]);
            });
            console.log(allPointArray);
            //ooooooooooo


     /*       
      map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': allPointArray
        /*[
          [11.135498, 57.3223778], [12.9494377, 58.2625957]
        ]*//*
        }
        }
        });
        map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#458be6',
        'line-width': 6
        }
        });*/

        var directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/walking',
          controls: {
            profileSwitcher: false
          }
          });


        map.addControl(
          directions,
          'top-left'
          );
          directions.setOrigin(allPointArray[0]);

        ///OOOOOO




          });
        })
        .catch(error => console.log('error', error));

      }
      
    });










  }
//https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9021014005730000&date=2020-03-11&time=07%3A37&useVas=0&useLDTrain=0&useRegTrain=0&timeSpan=60&direction=9021014007487000&format=json