//code to display the profile picture
const HTML_Img =document.getElementById('profilePic')
const profPic = localStorage.getItem('photoPic')
HTML_Img.src = profPic
