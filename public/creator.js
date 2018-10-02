var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

var songs = [];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("signin_note").innerHTML = "Your soundtracks";
    db.collection("soundtrack-creator/soundtracks/" + user.uid).get().then(querySnapshot => {
      querySnapshot.forEach(song => {
        songs.push(song.data());
      });
      var pos = 0;
      songs.sort(song => -song.timestamp).forEach(song => {
        var button = document.createElement("button");
        button.innerHTML = song.name;
        button.id = "track" + pos.toString();
        button.setAttribute("class", "track");
        button.setAttribute("onclick", "load_track(" + (pos++).toString() + ")");
        document.getElementById("tracks").appendChild(button);
      });
    });
  }
});

var types = {
  percussion: {
    name: "Percussion",
    size: 3
  },
  bass: {
    name: "Bass",
    size: 4
  },
  melody: {
    name: "Melody",
    size: 5
  }
};

var instruments = {
  percussion: [
    {
      name: "Basic"
    }
  ],
  bass: [
    {
      name: "Basic"
    }
  ],
  melody: [
    {
      name: "Basic"
    }
  ]
};

document.addEventListener("DOMContentLoaded", function(event) {
  var table = document.getElementById("display");

  var rowcount = 0;
  for (var type in types) {
    for (var x = 0; x < types[type].size; x++) {
      var row = document.createElement("tr");
      if (x === 0) {
        var left = document.createElement("td");
        left.setAttribute("class", "instrument-header");
        left.setAttribute("id", "ih_" + type);
        left.setAttribute("rowspan", types[type].size);
        left.innerHTML = types[type].name;
        row.appendChild(left);
      }
      for (var y = 0; y < 16; y++) {
        var element = document.createElement("td");
        element.setAttribute("class", "notewrapper");
        var button = document.createElement("button");
        button.setAttribute("id", "button" + (rowcount + y * 12).toString());
        button.setAttribute("class", "note " + type);
        button.setAttribute("onclick", "toggle(" + (rowcount + y * 12).toString() + ")");
        element.appendChild(button);
        row.appendChild(element);
      }
      table.appendChild(row);
      rowcount++;
    }
  }
});

function load_track(pos) {
  var data = songs[pos];
  for (var type in types) {
    document.getElementById("ih_" + type).innerHTML = types[type].name + " (" + instruments[type][data.instruments[type]].name + ")";
  }
  var counter = 0;
  data.song.slice(0, 16).forEach(e => {
    for (var x = 0; x < 12; x++) {
      p = e % 2;
      e = Math.floor(e / 2);
      console.log(counter, p);
      var element = document.getElementById("button" + (counter++).toString());
      if (p) {
        element.className += " on";
      } else {
        element.className = element.className.replace(/(?:^|\s)on(?!\S)/g, "");
      }
    }
  });
  document.getElementById("display").hidden = false;
}