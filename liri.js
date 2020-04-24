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
moment().format();

function concertThis(searchTerm){

  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events/?app_id=codingbootcamp").then(function(response) {
    console.log(commandArg);
    data = response.data;
    if(data.error === 'Not Found'){
        console.log("Sorry, no results found for that artist. Please try again.");
        console.log()
    }
    else {
      for (const event in data) {
        console.log(`Venue Name: ${data[event].venue.name}`+"\n"
        +`Location: ${data[event].venue.location}`+"\n"
        +`Date and time: ${moment(data[event].datetime).format('dddd, MMMM DD, YYYY \\at h:mma')}` +"\n");
      }
      // console.log(data);
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

function spotifyThis(searchTerm){
  spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
    var artistStr = "";
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else if (data){
      console.log(data.tracks.items[0]);
      if(data.tracks.items[0].artists.length>1){
        for (const i in data.tracks.items[0].artists) {
          artistStr += data.tracks.items[0].artists[i].name + ", ";
        }
        artistStr = artistStr.slice(0,-2);
        console.log(`Artists: ` + artistStr);
      }
      else{
        artistStr = data.tracks.items[0].artists[i].name;
        console.log("Artist: " + artistStr);
      }
      console.log("Track name: " + data.tracks.items[0].name);
      console.log("Track link: " + data.tracks.items[0].external_urls.spotify);
      console.log("Album name: " + data.tracks.items[0].album.name);
    }
    else{
      spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      });
    }
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

function run(command,searchTerm){
  console.log(command);
  console.log(searchTerm);
  switch(command){
    case "concert-this":
      concertThis(searchTerm);
      break;
    case "spotify-this-song":
      spotifyThis(searchTerm);
      break;
    case "movie-this":
      movieThis(searchTerm);
      break;
  }
}

run(commandArg[2],commandArg[3]);