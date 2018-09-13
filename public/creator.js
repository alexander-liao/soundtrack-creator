var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true })

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("signin_note").innerHTML = "Your soundtracks";
    db.collection("soundtrack-creator/soundtracks/" + user.uid).get().then(querySnapshot => {
      var songs = [];
      querySnapshot.forEach(song => {
        songs.push(song.data())
      });
      var pos = 0;
      songs.sort(song => -song.timestamp).forEach(song => {
        var button = document.createElement("button");
        button.innerHTML = song.name;
        button.id = "track" + (++pos).toString();
        button.setAttribute("onclick", "load_track(" + pos.toString() + ")");
        document.getElementById("tracks").appendChild(button);
      });
    });
  }
});