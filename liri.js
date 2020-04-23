var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");

var searchTerm = "Spice+Girls";

var alternativeBandsId = "110335a8e0788a1b9ccd54146d28af04";

var spotify = new Spotify(keys.spotify);

var command = "";

var commandArg = process.argv;

function concertThis(searchTerm){

  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "?app_id=codingbootcamp").then(function(response) {
  console.log(commandArg);
  data = response.data;
  if(data.error === 'Not Found'){
      console.log("Sorry, no results found for that artist. Please try again.");
      console.log()
  }
  else{
    console.log(data);}
  }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error!");
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log("Error!");
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function spotifyThis(searchTerm){
  spotify.search({ type: 'artist', query: searchTerm }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
  console.log(data.artists.items[0]); 
  });
}

function movieThis(searchTerm){
  axios.get("http://www.omdbapi.com/?apikey=4a96b10d&s=" + searchTerm).then(function(response) {
    console.log(commandArg);
    data = response.data;
    if(data.error === 'Not Found'){
        console.log("Sorry, no results found for that title. Please try again.");
        console.log()
    }
    else{
      console.log(data);
    }
  }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error!");
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log("Error!");
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

concertThis(searchTerm);
spotifyThis(searchTerm);
movieThis(searchTerm);