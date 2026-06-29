const UID = localStorage.getItem('UId');
function onLoad(){
    
    console.log(UID)
    firebase.database().ref('/lazyLawns/' + UID).once('value',checkScore)
    
};
function checkScore(snapshot){
    const dataScore = snapshot.val()['Score']
    console.log(dataScore)
    if(dataScore>timer){
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
        console.log("writing")
    };
    if(dataScore===0){
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
        console.log("writing")
    };
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
    firebase.database().ref('/lazyLawns').once('value', displayScores)

};

function displayScores(snapshot){
    const HTML_OUTPUT =document.getElementById('statusMessage')
    let lazyLawnsDis = snapshot.val()
    let sorted = Object.entries(lazyLawnsDis)
    .filter(([key, entery]) => entery.Score>0)
    .sort((a, b) => Number(a[1].Score) - Number(b[1].Score))
    for(let i=0; i< sorted.length;i++){
        let [key,entery] = sorted[i]
    }
    let tableHTML =`
    <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                ${sorted.map(([ key, entery], index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${entery.Name}</td>
                        <td>${entery.Score}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    HTML_OUTPUT.innerHTML = tableHTML;
}