/***************************************************************/
//Google sign in
/**************************************************************/
var GLOBAL_user;  // Google's user object
 function authenticate(){
    // authenticate with Google
    firebase.auth().onAuthStateChanged(handleLogin);
}
function popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;  // Save the user details object to a global variable
    console.log("User has logged in")
  });
}
function handleLogin(_user) {
    if (_user) {
        GLOBAL_user = _user;//Save the user details object to a global variable
        console.log(_user.displayName+" is logged in")

    } else {
        console.log("User is NOT logged in - Starting the popup process")
        popupLogin();
    }
}
/**************************************************************/
//Write the scores
/**************************************************************/
let displayName = GLOBAL_user.displayName;
