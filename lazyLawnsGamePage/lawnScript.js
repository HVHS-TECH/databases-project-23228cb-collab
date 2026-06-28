const UID = localStorage.getItem('UId');
function onLoad(){
    console.log(UID)
    firebase.database().ref('/lazyLawns/' + UID).once('value',checkScore)
    
};
function checkScore(snapshot){
    const dataScore = snapshot.val()['Score']
    console.log(dataScore)
    if(dataScore<timer){
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
        console.log("writing")
    }
};

function writeScore(snapshot){
    const Name = snapshot.val()['Name']
    firebase.database().ref('/lazyLawns/'+ UID ).set(
        {
            Name:Name,
            Score:timer,
        }
    )
}
function readScores(){
    firebase.database().ref('/lazyLawns').orderByValue().once('value', displayScores)

};

function displayScores(snapshot){
   // console.log(snapshot.val())
   let lazyLawnsDis = snapshot.val()
    let UIDKey= Object.keys(lazyLawnsDis)
    console.log(UIDKey)
    for(i=0; i< UIDKey.length;i++){
        let key= UIDKey[i];
        console.log(i+' is for '+key + "  " + lazyLawnsDis[key])
    }
}