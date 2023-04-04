const content = document.querySelector(".content"),
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-titles .name"),
musicArtist = content.querySelector(".music-titles .artist"),
Audio = document.querySelector(".main-song"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
prevBtn = content.querySelector("#prev"),
nextBtn = content.querySelector("#next"),
progressBar = content.querySelector(".progress-bar"),
progressDetails = content.querySelector(".progress-details"),
repeatBtn = content.querySelector("#repeat"),
shuffleBtn = content.querySelector("#shuffle");

let wave = document.getElementById('wave');
let volume_slider = document.querySelector('.volume_slider');

let colorCount = 0;
let index = 1;

window.addEventListener("load", () => {
    loadData(index);
});

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue - 1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    Playimage.src = "Img/"+songs[indexValue - 1].img+".jpg";
    Audio.src = "Music/"+songs[indexValue - 1].audio+".mp3";
    random_bg_color()
}


// BACKGROUND
function random_bg_color(){
    // let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    // let a;

    // function populate(a){
    //     for(let i=0; i<6; i++){
    //         let x = Math.round(Math.random() * 14);
    //         let y = hex[x];
    //         a += y;
    //     }
    //     return a;
    // }
    // let Color1 = populate('#');
    // let Color2 = populate('#');
    // var angle = 'to right';

    // let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ')';
    // document.body.style.backgroundColor = gradient;
    
    let colors =["#404E5C", "#92BCEA", "#171A21", "#153B50", "#016FB9", "#182825", "#003554", "#3F2E56", "#0E3B43", "#226F54"];
    if(colorCount<9){
      document.body.style.backgroundColor = colors[colorCount];
       colorCount++;
     }
     else{
        colorCount=0;
     }
    
}


//PLAY PAUSE
playBtn.addEventListener("click", ()=>{
    const isMusicPaused = content.classList.contains("paused")
    if(isMusicPaused){
        pauseSong();
    }
    else{
        playSong();
    }
})

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    wave.classList.add('loader');
    Audio.play();
}

function pauseSong(){
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    wave.classList.remove('loader');
    Audio.pause();
}


// NEXT - PREV BUTTON
nextBtn.addEventListener("click", () => {
    nextSong();
    random_bg_color()
});

prevBtn.addEventListener("click", () => {
    prevSong();
    random_bg_color()
});

function nextSong(){
    index++;
    if(index > songs.length){
        index = 1;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
}

function prevSong(){
    index--;
    if(index <= 0){
        index = songs.length;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
}


// TIME SLIDER
Audio.addEventListener("timeupdate", (e) => {
    const initialTime = e.target.currentTime; // Get current music time
    const finalTime = e.target.duration; // Get music duration
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth+"%";

    progressDetails.addEventListener("click", (e) => {
        let progressValue = progressDetails.clientWidth; // Get width of progress bar
        let clickOffsetX = e.offsetX; // Get offset x value
        let MusicDuration = Audio.duration; // Get total music durations

        Audio.currentTime = (clickOffsetX / progressValue) * MusicDuration; 
    })

    //Timer Logic
    Audio.addEventListener("loadeddata", () => {
        let finalTimeData = content.querySelector(".final")


        //Update finalDuration
        let AudioDuration = Audio.duration;
        let finalMinutes = Math.floor(AudioDuration / 60);  //floor - rounds up to the nearest whole number
        let finalSeconds = Math.floor(AudioDuration % 60);
        if(finalSeconds < 10){
            finalSeconds = "0"+finalSeconds;
        }
        finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
    });

    //Update Current Duration
    let currentTimeData = content.querySelector(".current")
    let CurrentTime = Audio.currentTime;
    let currentMinutes = Math.floor(CurrentTime / 60);
    let currentSeconds = Math.floor(CurrentTime % 60);
    if(currentSeconds < 10){
        currentSeconds = "0"+currentSeconds;
    }
    currentTimeData.innerText = currentMinutes + ":" + currentSeconds;

    //repeat button logic 
    repeatBtn.addEventListener("click", () => {
        Audio.currentTime = 0;
    })
});

//Shuffle logic
shuffle.addEventListener("click", () => {
    var randIndex = Math.floor(Math.random() * songs.length) + 1; //Select random number between 1 and song array length
    loadData(randIndex);
    playSong();
});

Audio.addEventListener("ended", () => {
    index++;
    if(index > songs.length){
        index = 1;
    }
    loadData(index);
    playSong();
});

function setVolume(){
    Audio.volume = volume_slider.value / 100;
}