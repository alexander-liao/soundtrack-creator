var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("signin_note").innerHTML = "Your soundtracks";
    console.log(db.collection("soundtrack-creator"));
  }
});