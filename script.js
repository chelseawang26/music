const genreCounts = {
    rock: 0,
    pop: 0,
    hiphop: 0,
    r_and_b: 0,
};
let bestSongsIndex = 0;
const bestSongs = [];
let index = 0;
const cards = [
    { id: "blinding", genre: "pop", audio: "blinding lights music"},
    { id: "wanna", genre: "rock", audio: "do i wanna know music"},
    { id: "die", genre: "pop", audio: "die w a smile music"},
    { id: "luther", genre: "r_and_b", audio: "luther music"},
    { id: "paint", genre: "hiphop", audio: "paint the town red music"},
    { id: "snooze", genre: "r_and_b", audio: "snooze music"},
    { id: "sweater", genre: "rock", audio: "sweater weather music"},
    { id: "rockstar", genre: "hiphop", audio: "rockstar music"}
]
const audio = document.getElementById("myAudio");
const audioSource = document.getElementById("audioSource")
function swipeRight() {
    document.getElementById(cards[index].id).classList.add('right');
    var moved = false;
    if (!audio.paused) {
        audio.pause();
        document.getElementById('pause').classList.add('right');
    } else {
        document.getElementById('play').classList.add('right');
        moved = true;
    }
    genreCounts[cards[index].genre]++;
    const nextIndex = index + 1;
    setTimeout(() => {
        if (nextIndex < cards.length) {
            document.getElementById(cards[index].id).classList.add('hidden');
            if (moved) {
                document.getElementById('play').classList.remove('right');
                document.getElementById('play').classList.remove('hidden');
            } else {
                document.getElementById('pause').classList.remove('right');
                document.getElementById('pause').classList.add('hidden');
                document.getElementById('play').classList.remove('hidden');
            }
            document.getElementById(cards[index + 1].id).classList.remove('hidden');    
            document.getElementById(cards[nextIndex].id).classList.remove('hidden');
            audio.pause();
            audio.currentTime = 0;
            audioSource.src = "./docs/assets/" + cards[nextIndex].audio + ".mp3";
            audio.load();
        } else {
            document.getElementById('playPause').disabled = true;
            document.getElementById('yes').classList.add('hidden');
            document.getElementById('no').classList.add('hidden');
            confetti();
            document.getElementById(cards[index].id).classList.add('hidden');
            for (let genre of Object.keys(genreCounts)) {
                if (genreCounts[genre] === 2) {
                    bestSongs.push(genre);
                }
            }
            if (bestSongs.length === 0) {
                for (let genre of Object.keys(genreCounts)) {
                    if (genreCounts[genre] === 1) {
                        bestSongs.push(genre);
                    }
                }
            }
            if (bestSongs.length > 1) {
                document.getElementById('right').classList.remove('hidden');
                document.getElementById('left').classList.remove('hidden');
            }
            document.getElementById(bestSongs[bestSongsIndex]).classList.remove('hidden');
        }
        index++;
    }, 600
    )
}

function swipeLeft() {
    document.getElementById(cards[index].id).classList.add('left');
    var moved = false;
    if (!audio.paused) {
        audio.pause();
        document.getElementById('pause').classList.add('left');
    } else {
        document.getElementById('play').classList.add('left');
        moved = true;
    }
    const nextIndex = index + 1;
    setTimeout(() => {
        if (nextIndex < cards.length) {
            document.getElementById(cards[index].id).classList.add('hidden');
            if (moved) {
                document.getElementById('play').classList.remove('left');
                document.getElementById('play').classList.remove('hidden');
            } else {
                document.getElementById('pause').classList.remove('left');
                document.getElementById('pause').classList.add('hidden');
                document.getElementById('play').classList.remove('hidden');
            }
            document.getElementById(cards[index + 1].id).classList.remove('hidden');    
            document.getElementById(cards[nextIndex].id).classList.remove('hidden');
            audio.pause();
            audio.currentTime = 0;
            audioSource.src = "./docs/assets/" + cards[nextIndex].audio + ".mp3";
            audio.load();
        } else {
            document.getElementById('playPause').disabled = true;
            document.getElementById('yes').classList.add('hidden');
            document.getElementById('no').classList.add('hidden');
            confetti();
            document.getElementById(cards[index].id).classList.add('hidden');
            for (let genre of Object.keys(genreCounts)) {
                if (genreCounts[genre] === 2) {
                    bestSongs.push(genre);
                }
            }
            if (bestSongs.length === 0) {
                for (let genre of Object.keys(genreCounts)) {
                    if (genreCounts[genre] === 1) {
                        bestSongs.push(genre);
                    }
                }
            }
            if (bestSongs.length > 1) {
                document.getElementById('right').classList.remove('hidden');
                document.getElementById('left').classList.remove('hidden');
            }
            document.getElementById(bestSongs[bestSongsIndex]).classList.remove('hidden');
        }
        index++;
    }, 600
    )
}
confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 0 }
});

function toggleAudio() {
    audio.addEventListener("timeupdate", () => {
        if (audio.currentTime >= 29) {
            document.getElementById('pause').classList.add('hidden');
            document.getElementById('play').classList.remove('hidden');
            audio.currentTime = 0;
            audio.pause();
        }
    })
    if (audio.paused) {
        document.getElementById('play').classList.add('hidden');
        document.getElementById('pause').classList.remove('hidden');
        audio.play();
    } else {
        document.getElementById('pause').classList.add('hidden');
        document.getElementById('play').classList.remove('hidden');
        audio.pause();
    }
}
function nextCardL() {
    console.log(bestSongsIndex);
    if (bestSongsIndex != 0) {
        document.getElementById(bestSongs[bestSongsIndex]).classList.add('left');
        setTimeout(() => {
            document.getElementById(bestSongs[bestSongsIndex]).classList.add('hidden');
            document.getElementById(bestSongs[bestSongsIndex]).classList.remove('left');
            document.getElementById(bestSongs[bestSongsIndex - 1]).classList.remove('hidden');
            bestSongsIndex--;
        }, 600
        )
    }
}
function nextCardR() {
    if (bestSongsIndex != bestSongs.length - 1) {
        document.getElementById(bestSongs[bestSongsIndex]).classList.add('right');
        setTimeout(() => {
            document.getElementById(bestSongs[bestSongsIndex]).classList.add('hidden');
            document.getElementById(bestSongs[bestSongsIndex]).classList.remove('right');
            document.getElementById(bestSongs[bestSongsIndex + 1]).classList.remove('hidden');
            bestSongsIndex++;
        }, 600
        )
    }
}