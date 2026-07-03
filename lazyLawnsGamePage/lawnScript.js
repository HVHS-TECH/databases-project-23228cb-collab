//get the users UID from local storage
const UID = localStorage.getItem('UId');
// starts the score write process
function onLoad(){
    //reads the score in the database
    firebase.database().ref('/lazyLawns/' + UID).once('value',checkScore)
    
};
function checkScore(snapshot){
    //the score in the database
    const dataScore = snapshot.val()['Score']
    //checks if the score in the database is greater than the score that was just set
    if(dataScore>timer){
        //reads the users UID
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
    };
    //checks if the score is 0
    if(dataScore===0){
        //reads the users user info file
        firebase.database().ref('/userInfo/' + UID ).once('value', writeScore)
    };
};
//writes the score to the database
function writeScore(snapshot){
    //the user's name
    const Name = snapshot.val()['Name']
    //writes the highscore 
    firebase.database().ref('/lazyLawns/'+ UID ).set(
        {
            Name:Name,
            Score:timer,
        }
    )
};
//reads the scores on load and displays the profile pictures
function readScores(){
    //reads the entire game file
    firebase.database().ref('/lazyLawns').once('value', displayScores)
    //code for displaing profile picture
    const HTML_Img =document.getElementById('profilePic')
    const profPic = localStorage.getItem('photoPic')
    HTML_Img.src = profPic
};
//displays the highscores as a table
function displayScores(snapshot){
    //the <p> that is overwriten by highscore table
    const HTML_OUTPUT =document.getElementById('statusMessage')
    //the info in the game folder on the database
    let lazyLawnsDis = snapshot.val()
    //converts to an array from an object 
    let sorted = Object.entries(lazyLawnsDis)
    //filters out scores of 0
    .filter(([key, entery]) => entery.Score>0)
    //sorts from smallest to largest
    .sort((a, b) => Number(a[1].Score) - Number(b[1].Score))
    //gets the highscores and gives each them a number
    for(let i=0; i< sorted.length;i++){
        let [key,entery] = sorted[i]
    }
    //the html for the table
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
    //replaces the <p> with the table
    HTML_OUTPUT.innerHTML = tableHTML;
}