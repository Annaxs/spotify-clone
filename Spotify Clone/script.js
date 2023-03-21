console.log("Welcome to Spotify");
//initialise variable
let songIndex=0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementsByClassName('masterPlay')[0];
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem= Array.from(document.getElementsByClassName('songItem'));
//linking main problem hai yaha link nahi hora baki sab sahi hai tried two methods folder and path
let songs = [
    {songName:"It's Always Blue", filePath: "1.mp3",coverPath:"1.jpg"},
    {songName:"It's Always Blue", filePath: "2.mp3",coverPath:"2.jpg"},
    {songName:"It's Always Blue", filePath: "3.mp3",coverPath:"3.jpg"},
    {songName:"It's Always Blue", filePath: "4.mp3",coverPath:"4.jpg"},
    {songName:"It's Always Blue", filePath: "5.mp3",coverPath:"5.jpg"},
    {songName:"It's Always Blue", filePath: "6.mp3",coverPath:"6.jpg"},
    {songName:"It's Always Blue", filePath: "7.mp3",coverPath:"7.jpg"},
    {songName:"It's Always Blue", filePath: "8.mp3",coverPath:"8.jpg"},
    {songName:"It's Always Blue", filePath: "9.mp3",coverPath:"9.jpg"},
    {songName:"It's Always Blue", filePath: "10.mp3",coverPath:"10.jpg"},

]
let i = 0
songItem.forEach((element)=>{

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    i++;
})
// audioElement.play();
//handle pause play
console.log("audstart",audioElement.paused)

masterPlay.addEventListener('click',()=>{
    console.log("aud",audioElement.paused)
    if(audioElement.paused || audioElement.currentTime<=0){
        // audioElement.play().then(() => {
        //     console.log('playing')
        // }).catch(() => {
        //     console.log('error')
        // });
        console.log('playing')
        audioElement.play()
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=1;
    }else{
        console.log('pausing')
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
//updating seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);  
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays=()=>{
    // e.target.classList.add('fa-circle-pause');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex-1].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`./songs/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=10) songIndex=0;
    else{
        songIndex+=1;
    }
    audioElement.src=`./songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0) songIndex=10;
    else{
        songIndex-=1;
    }
    audioElement.src=`./songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
