var Axios = require("axios");
var Spotify = require("node-spotify-api");
var Moment = require("moment");
var DotEnv = require("dotenv");

var alternativeBandsId = "110335a8e0788a1b9ccd54146d28af04";

Axios
  .get("https://rest.bandsintown.com/artists/" + "Brand+New" + "?app_id=codingbootcamp")
  .then(function(response) {
    data = response.data;
    if(data.error === 'Not Found'){
        console.log("Sorry, no results found for that artist. Please try again.");
        console.log()
    }
    else{
        console.log(data);
    }
  })
  .catch(function(error) {
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