/***************************************************************/
//Google sign in
/**************************************************************/
var GLOBAL_user;  // Google's user object
var authenticationListener
function authenticate() {
    // authenticate with Google
    authenticationListener = firebase.auth().onAuthStateChanged(handleLogin);
}

function popupLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        GLOBAL_user = result.user;  // Save the user details object to a global variable
        console.log("User has logged in")
    });
}

function handleLogin(_user) {
    const HTML_OUTPUT =document.getElementById('statusMessage')
    if (_user) {
        GLOBAL_user = _user;//Save the user details object to a global variable
        console.log(_user.displayName + " is logged in")   
        document.getElementById("authButton").style.display ="none"
        document.getElementById("logOutButton").style.display = ""
        //HTML_OUTPUT.innerHTML = GLOBAL_user.displayName + " is logged in"
    }
    else{
        document.getElementById("authButton").style.display = ""
        document.getElementById("logOutButton").style.display = "none"
    }
};

function logout(){
    firebase.auth().signOut();
}
/**************************************************************/
//write the data
/**************************************************************/

async function writeUsrData() {
    let UID = GLOBAL_user.uid
    let DisName = GLOBAL_user.displayName
    let PicURL = GLOBAL_user.photoURL
    let usrEmail = GLOBAL_user.email
    const usrName = document.getElementById("usrName").value
    const usrAge = document.getElementById("usrAge").value
    await firebase.database().ref('/userInfo/' + UID).set(
    {
      Name: usrName,
      Display_Name: DisName,
      Age: usrAge,
      PhotoId: PicURL,
      Email: usrEmail,
    }
  )
    firebase.database().ref('/geoDash/'+ UID ).set(
        {
            Name:usrName,
            Score:0,
        }
    )
    firebase.database().ref('/lazyLawns/'+ UID ).set(
        {
            Name:usrName,
            Score:0,
        }
    )
    alert("sign in successful")
    window.location.href = '../index.html'
    localStorage.setItem('UId', UID)
};
