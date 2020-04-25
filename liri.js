var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var commandArg = process.argv;
var command = commandArg[2];
var searchTerm = commandArg[3];

moment().format();

function concertThis(searchTerm){

  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events/?app_id=codingbootcamp").then(function(response) {
    data = response.data;
    if(data.error === 'Not Found'){
        console.log("Sorry, no results found for that artist. Please try again.");
        console.log()
    }
    else {
      for (const event in data) {
        console.log(`\nVenue Name: \t${data[event].venue.name}`+"\n"
        +`Location: \t${data[event].venue.location}`+"\n"
        +`Date and time: \t${moment(data[event].datetime).format('dddd, MMMM DD, YYYY \\at h:mma')}`);
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
    //Checking if track exists
    else if (data.tracks.items[0]){
      //For displaying multiple artists
      if(data.tracks.items[0].artists.length>1){
        for (const i in data.tracks.items[0].artists) {
          artistStr += data.tracks.items[0].artists[i].name + ", ";
        }
        artistStr = artistStr.slice(0,-2);
        console.log("\nArtists: \t" + artistStr);
      }
      //Displaying single artist
      else{
        artistStr = data.tracks.items[0].artists[0].name;
        console.log("\nArtist: \t" + artistStr);
      }
      //Displaying the rest of the info
      console.log("Track name: \t" + data.tracks.items[0].name);
      console.log("Track link: \t" + data.tracks.items[0].external_urls.spotify);
      console.log("Album name: \t" + data.tracks.items[0].album.name);
    }
    //Default case if no track exists for search term
    else {
      spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else{
          artistStr = data.tracks.items[0].artists[0].name;
          console.log("\nArtist: \t" + artistStr);
          console.log("Track name: \t" + data.tracks.items[0].name);
          console.log("Track link: \t" + data.tracks.items[0].external_urls.spotify);
          console.log("Album name: \t" + data.tracks.items[0].album.name);
        }
      });
    }
  });
}

function movieThis(searchTerm){
  axios.get("http://www.omdbapi.com/?apikey=4a96b10d&t=" + searchTerm).then(function(response) {
    data = response.data;
    if(data.error === 'Not Found'){
        console.log("Sorry, no results found for that title. Please try again.");
        console.log()
    }
    else if (data.Title){
      console.log("\nTitle: \t\t" + data.Title + "\nYear: \t\t" + data.Year
      + "\nIMDB Rating: \t" + data.Ratings[0].Value + "\nRT Rating: \t" 
      + data.Ratings[1].Value + "\nCountry: \t" + data.Country 
      + "\nLanguage(s): \t" + data.Language + "\nPlot: \t\t" + data.Plot
      + "\nActors: \t" + data.Actors);
    }
    else{
      console.log("\nCouldn't find that movie, sorry. Here's Mr. Nobody, though.");
      searchTerm="Mr.+Nobody";
      movieThis(searchTerm);
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

function randomThis(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    data = data.split(",");
    // We will then re-display the content as an array for later use.
    run(data[0],data[1]);
  });
}

function run(command,searchTerm){
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
    case "do-what-it-says":
      randomThis();
  }
}

run(command,searchTerm);