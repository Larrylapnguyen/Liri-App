// Spotify
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// Axios
var axios = require("axios");
// Moment
var moment = require('moment');
// FS
var fs = require("fs");
// Arugments
var command = process.argv[2];

var nodeArgs = process.argv;

let search;
for (var i = 3; i < nodeArgs.length; i++) {
	if (i > 3 && i < nodeArgs.length) {
		search = process.argv[3] + "+" + nodeArgs[i];
	} else {
		search += nodeArgs[i];
	}
}

function spot(song) {
	if (song === undefined || null) {
		song = "The Sign Ace of Base";
	}
	spotify.search({
		type: 'track',
		query: song,
		limit: 1
	}, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		// Artist
		console.log("Song: " + data.tracks.items[0].artists[0].name);
		// Song Name
		console.log("Band: " + data.tracks.items[0].name);
		//Preview URL
		console.log("Song Preview: " + data.tracks.items[0].preview_url);
		//Album name
		console.log("Album: " + data.tracks.items[0].album.name);
	});
}

function concert(artist) {
	if (artist == undefined || null) {
		artist = "The Rolling Stones";
	}
	axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
		response.data.forEach(function (element) {
			let venue = element.venue
			console.log("Band  Name: " + artist);
			console.log("Venue Name: " + venue.name);
			console.log("Venue City: " + venue.city + ", " + venue.country);
			console.log("Event Date: " + moment(element.datetime).format("MM-DD-YYYY"));
			console.log("\n********************************");
		})
	})
}

function movie(title) {
	if (title == undefined || null) {
		title = "Mr.Nobody";
	}
	console.log("Title:---------------------------------" + title);

	axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(function (response) {
		// console.log(response);
		console.log("Movie Title: " + response.data.Title);
		console.log("Year Released: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.Ratings[0].Value);
		console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
		console.log("Country(s): " + response.data.Country);
		console.log("Plot: " + response.data.Plot);
		console.log("Actors: " + response.data.Actors);
	})
}

function doIt() {
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		spot(data);
	});
}

if (command === "spotify-this-song") {
	console.log("Search =====" + search);
	spot(search);
} else if (command === "concert-this") {
	console.log("Search =====" + search);
	concert(search);
} else if (command === "movie-this") {
	console.log("Search =====" + search);
	movie(search);
} else if (command === "do-what-it-says") {
	console.log("Search =====" + search);
	doIt();
}