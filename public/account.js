firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("content").hidden = false;
    if (window.location.hash) {
      user.updateProfile({
        displayName: window.location.hash.slice(1)
      }).then(function() {
        document.getElementById("welcome").innerHTML = "Welcome, " + user.displayName + "!";
      });
    } else {
      document.getElementById("welcome").innerHTML = "Welcome, " + user.displayName + "!";
    }
  } else {
    window.open("/login.html", "_self");
  }
});

var changing_name = false;

function process_in_name_field(event) {
  if (event.keyCode == 13) {
    prompt_name_change();
  }
}

function prompt_name_change() {
  if (changing_name) {
    firebase.auth().currentUser.updateProfile({
      displayName: document.getElementById("username").value
    }).then(function() {
      document.getElementById("welcome").innerHTML = "Welcome, " + firebase.auth().currentUser.displayName + "!";
      cancel_name_change();
    }, function(error) {
      document.getElementById("uerror").innerHTML = "An unknown error occurred. Try again later.";
    });
  } else {
    document.getElementById("username").hidden = false;
    document.getElementById("username").focus();
    document.getElementById("name_cancel").hidden = false;
    changing_name = true;
  }
}

function cancel_name_change() {
  document.getElementById("uerror").innerHTML = "";
  document.getElementById("username").value = "";
  document.getElementById("username").hidden = true;
  document.getElementById("name_cancel").hidden = true;
  changing_name = false;
}

var changing_email = false;

function process_in_email_field(event) {
  if (event.keyCode == 13) {
    prompt_email_change();
  }
}

function prompt_email_change() {
  if (changing_email) {
    firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(
      firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        document.getElementById("epassword").value)).then(function() {
          firebase.auth().currentUser.updateEmail(document.getElementById("email").value).then(function() {
            alert("Email changed successfully!");
            cancel_email_change();
          }, function(error) {
            var em;
            switch (error.code) {
              case "auth/invalid-email":
                em = "Email address is invalid; check the spelling.";
                break;
              case "auth/email-already-in-use":
                em = "An account already exists with this email address.";
                break;
              case "auth/requires-recent-login":
                em = "?? needs re-auth, JS failure; contact admins please.";
                break;
            }
            document.getElementById("eerror").innerHTML = em || "An unknown error occurred. Try again later.";
          });
    }).catch(function(error) {
      if (error.code == "auth/wrong-password") {
        document.getElementById("eerror").innerHTML = "Wrong password.";
      } else {
        document.getElementById("eerror").innerHTML = "An unknown error occurred. Try again later.";
      }
    });
  } else {
    document.getElementById("epassword").hidden = false;
    document.getElementById("epassword").focus();
    document.getElementById("email").hidden = false;
    document.getElementById("email_cancel").hidden = false;
    changing_email = true;
  }
}

function cancel_email_change() {
  document.getElementById("eerror").innerHTML = "";
  document.getElementById("epassword").value = "";
  document.getElementById("epassword").hidden = true;
  document.getElementById("email").value = "";
  document.getElementById("email").hidden = true;
  document.getElementById("email_cancel").hidden = true;
  changing_email = false;
}

var changing_password = false;

function process_in_password_field(event) {
  if (event.keyCode == 13) {
    prompt_password_change();
  }
}

function prompt_password_change() {
  if (changing_password) {
    firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(
      firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        document.getElementById("ppassword").value)).then(function() {
          var password = document.getElementById("password").value;
          if (password == document.getElementById("rpassword").value) {
            firebase.auth().currentUser.updatePassword(password).then(function() {
              alert("Password changed successfully!");
              cancel_password_change();
            }, function(error) {
              var em;
              switch (error.code) {
                case "auth/weak-password":
                  em = "The password is too weak.";
                  break;
                case "auth/requires-recent-login":
                  em = "?? needs re-auth, JS failure; contact admins please.";
                  break;
              }
              document.getElementById("perror").innerHTML = em || "An unknown error occurred. Try again later.";
            });
          } else {
            document.getElementById("perror").innerHTML = "Passwords do not match!";
          }
    }).catch(function(error) {
      if (error.code == "auth/wrong-password") {
        document.getElementById("eerror").innerHTML = "Wrong password.";
      } else {
        document.getElementById("eerror").innerHTML = "An unknown error occurred. Try again later.";
      }
    });
  } else {
    document.getElementById("ppassword").hidden = false;
    document.getElementById("ppassword").focus();
    document.getElementById("password").hidden = false;
    document.getElementById("rpassword").hidden = false;
    document.getElementById("password_cancel").hidden = false;
    changing_password = true;
  }
}

function cancel_password_change() {
  document.getElementById("perror").innerHTML = "";
  document.getElementById("ppassword").value = "";
  document.getElementById("ppassword").hidden = true;
  document.getElementById("password").value = "";
  document.getElementById("password").hidden = true;
  document.getElementById("rpassword").value = "";
  document.getElementById("rpassword").hidden = true;
  document.getElementById("password_cancel").hidden = true;
  changing_password = false;
}