const UID = localStorage.getItem('UId')
function pageLoad(){
if(UID===0){
    document.getElementById('logout').style.display='none';
}
else{
    document.getElementById("authButton").style.display= 'none';
};
if(UID=== null){
    console.log('it is null')
    document.getElementById('logOut').style.display='none';
}
else{
    document.getElementById("authButton").style.display= 'none';
};
};
function logOut(){
     localStorage.setItem('UId', null)
     console.log(UID)
     pageLoad()
}
