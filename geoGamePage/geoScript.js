const UID = localStorage.getItem('UId');
const score = localStorage.getItem('geoScore');
function onLoad(){
    console.log(UID)
    firebase.database().ref('/geoDash/' + UID).once('value',checkScore)
    
};
function checkScore(snapshot){
    const dataScore = snapshot.val()['Score']
    console.log(dataScore)

    if(dataScore===0){
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
    }
    if(dataScore<score){
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
    }
};

function writeScore(snapshot){
    const Name = snapshot.val()['Name']
    firebase.database().ref('/geoDash/'+ UID ).set(
        {
            Name:Name,
            Score:score,
        }
    )
}
