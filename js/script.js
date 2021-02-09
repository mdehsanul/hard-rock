const searchMusic = async () =>{
    const searchBox = document.getElementById("search-box").value;
    const url = "https://api.lyrics.ovh/suggest/:" + searchBox;
    try{
        const response = await fetch(url);
        const dataJson = await response.json();
        displayMusic(dataJson.data);
        document.getElementById('search-result').style.display = 'block';
    }
    catch(error){
        document.getElementById('search-result').style.display = 'none';
        displayErrorMessage('Something went Wrong!! Please try again later!!!');
    }
    document.getElementById('search-box').value = '';
    document.getElementById('music-lyrics').innerText = '';
}

// const searchMusic = () =>{
//     const searchBox = document.getElementById("search-box").value;
//     const url = "https://api.lyrics.ovh/suggest/:" + searchBox;
//     fetch(url)
//     .then(response => response.json())
//     .then(dataJson => {
//         displayMusic(dataJson.data);
//         document.getElementById('search-result').style.display = 'block';
//     })
//     .catch(error => {
//         // displayErrorMessage(error);
//         document.getElementById('search-result').style.display = 'none';
//         displayErrorMessage('Something went Wrong!! Please try again later!!!');
//     })
// }

const displayMusic = music =>{
    // console.log(music);
    const musicList = document.getElementById("music-list");
    musicList.innerHTML = ' ';
    music.forEach( singleMusic =>{
        const musicDiv = document.createElement('div');
        musicDiv.className = 'single-result row align-items-center my-3 p-3';
        musicDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${singleMusic.title}</h3>
            <p class="author lead">Album by <span>${singleMusic.artist.name}</span></p>
            <audio controls>
               <source src="${singleMusic.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getMusicLyrics('${singleMusic.artist.name}', '${singleMusic.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        musicList.appendChild(musicDiv);
    })
}

const getMusicLyrics = async (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(url);
    const dataJson = await response.json();
    displayMusicLyrics(dataJson.lyrics);
}

// const getMusicLyrics = (artist, title) =>{
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     console.log(url);
//     fetch(url)
//     .then(response => response.json())
//     .then(dataJson =>{
//         displayMusicLyrics(dataJson.lyrics);
//     })
// }

const displayMusicLyrics = (lyrics) =>{
    const musicLyrics = document.getElementById('music-lyrics');
    musicLyrics.innerText = lyrics;
}

const  displayErrorMessage = error =>{
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}
