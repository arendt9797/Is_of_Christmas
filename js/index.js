// function start_Bgm() {
//     document.getElementById('jingleBell');
//     christmasBgm.play();
//     christmasBgm.volume = 0.1;
// };

const playPauseButton = document.getElementById("jingleBell");
const audio = document.getElementById("christmasBgm");
// const icon = document.getElementById("icon");

playPauseButton.addEventListener("click", () => {
    console.log('hello')
    if (audio.paused) {
        audio.play();
        audio.volume = 0.1;
        playPauseButton.classList.remove("muted")
        // icon.textContent = "⏸️"; // Change to Pause icon
        // playPauseButton.innerHTML = `<span id="icon">⏸️</span> Pause Music`;
    } else {
        audio.pause();
        audio.volume = 0.1;
        playPauseButton.classList.add("muted")
        // icon.textContent = "▶️"; // Change to Play icon
        // playPauseButton.innerHTML = `<span id="icon">▶️</span> Play Music`;
    }
});
