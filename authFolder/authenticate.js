/***************************************************************/
//Google sign in
/**************************************************************/
var GLOBAL_user;  // Google's user object
var authenticationListener //checks for changes in the auth state
function authenticate() {
    // authenticate with Google
    authenticationListener = firebase.auth().onAuthStateChanged(handleLogin);
}
//starts the google popup
function popupLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        GLOBAL_user = result.user;  // Save the user details object to a global variable
        console.log("User has logged in")
    });
}
//checks if user is signed in
function handleLogin(_user) {
    const HTML_OUTPUT =document.getElementById('statusMessage')
    //shows the log out and hides the log in when the user is logged in
    if (_user) {
        GLOBAL_user = _user;//Save the user details object to a global variable
        console.log(_user.displayName + " is logged in")   
        document.getElementById("authButton").style.display ="none"
        document.getElementById("logOutButton").style.display = "block"
        HTML_OUTPUT.innerHTML = _user.displayName + " is logged in"
    }
    //shows the log in button and hides the log out when the user is logged out
    else{
        document.getElementById("authButton").style.display = "block"
        document.getElementById("logOutButton").style.display = "none"
    }
};
//signs out the user
function logout(){
    firebase.auth().signOut();
}
/**************************************************************/
//write the data
/**************************************************************/

async function writeUsrData() {
    //user's UID
    let UID = GLOBAL_user.uid
    //user's display name
    let DisName = GLOBAL_user.displayName
    //url for the user's profile picture
    let PicURL = GLOBAL_user.photoURL
    //user's email adress
    let usrEmail = GLOBAL_user.email
    //user name from the form
    const usrName = document.getElementById("usrName").value
    //user's age from the form
    const usrAge = document.getElementById("usrAge").value
    //trims the spaces form the usrName 
    const checkVal = usrName.trim();
    //checks if the inputed age is 13 or greater, and if the amount of charitures in the nsrName is greater than 0
    if (usrAge>=13&&checkVal.length>0){
    //writes the user info
    await firebase.database().ref('/userInfo/' + UID).set(
    {
      Name: usrName,
      Display_Name: DisName,
      Age: usrAge,
      PhotoId: PicURL,
      Email: usrEmail,
    }
  )
    //writes the name to the game folder
    firebase.database().ref('/geoDash/'+ UID ).set(
        {
            Name:usrName,
            Score:0,
        }
    )
    //writes the name to the game folder
    firebase.database().ref('/lazyLawns/'+ UID ).set(
        {
            Name:usrName,
            Score:0,
        }
    )
    //gives an alert
    alert("sign in successful")
    //redirects to the home page
    window.location.href = '../index.html'
    //stores the UID localy
    localStorage.setItem('UId', UID)
    //stores the profile picture localy
    localStorage.setItem('photoPic',PicURL)
}
//errors
else{
    //shows the age error
    document.getElementById('ageError').innerHTML = "please check age is greater than or equal to 13"
    //shows the name error
    document.getElementById('nameError').innerHTML = "please check feild is not empty"
}
};