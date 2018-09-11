function login_process(event) {
  if (event.keyCode == 13) {
    login();
  }
}

function login() {
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  firebase.auth().signInWithEmailAndPassword(email, pwd).then(function(user) {
    console.log("Welcome, user.");
    window.open("/account.html", "_self");
  }).catch(function(error) {
    var em;
    switch(error.code) {
      case "auth/invalid-email":
        em = "Email address is invalid; check the spelling.";
        break;
      case "auth/user-disabled":
        em = "This account has been disabled. Contact an administrator if you believe this is a mistake.";
        break;
      case "auth/user-not-found":
        em = "No account exists with this email address.";
        break;
      case "auth/wrong-password":
        em = "Wrong password.";
        break;
    }
    if (em) {
      document.getElementById("errorslot").innerHTML = em;
    }
  });
}

function signup_process(event) {
  if (event.keyCode == 13) {
    signup();
  }
}

function signup() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  var rpwd = document.getElementById("rpwd").value;
  if (pwd === "") {
    document.getElementById("errorslot").innerHTML = "Password cannot be blank.";
  } else if (pwd == rpwd) {
    firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function(user) {
      window.open("/account.html#" + username, "_self");
    }).catch(function(error) {
      var em;
      switch(error.code) {
        case "auth/invalid-email":
          em = "Email address is invalid; check the spelling.";
          break;
        case "auth/operation-not-allowed":
          em = "This is an administration-side error. It should be fixed within a few hours, but if not, contact administration.";
          break;
        case "auth/email-already-in-use":
          em = "An account already exists with this email address.";
          break;
        case "auth/weak-password":
          em = "The password is too weak.";
          break;
      }
      if (em) {
        document.getElementById("errorslot").innerHTML = em;
      }
    });
  } else {
    document.getElementById("errorslot").innerHTML = "Passwords do not match!";
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("anon").hidden = true;
    document.getElementById("user").hidden = false;
  }
});