// Start Aplayer
const aplayer = document.querySelector('#aplayer');
if (aplayer) {
    let dataSong = aplayer.getAttribute('data-song');
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute('data-singer');
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            lrc: dataSong.lyrics,
        }],
        autoplay: true // Lần đầu vào chi tiết bài nhạc sẽ phát còn reload lại thì không
    });
    const avatar1 = document.querySelector('.singer-detail .inner-avatar');
    const avatar2 = document.querySelector('.aplayer .aplayer-pic');

    let timeOutListener;
    ap.on('play', function () {
        avatar1.style.animationPlayState = 'running';
        avatar2.style.animationPlayState = 'running';
    });
    ap.on('canplay', function () {
        timeOutListener= ap.duration * 4/5 *1000;
    });
    setTimeout(() => {
        setTimeout(() => {
            ap.on('ended', function () {
                fetch(`/songs/listen/${dataSong._id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == 200) {
                            const innerNumberListen = document.querySelector(".singer-detail .inner-listen .inner-number");
                            innerNumberListen.innerHTML = data.listen;
                        }
                    })
            });
        },timeOutListener);
    },1000)

    ap.on('pause', function () {
        avatar1.style.animationPlayState = 'paused';
        avatar2.style.animationPlayState = 'paused';
    });
}
//End Aplayer


//Start Event like
const likeButton = document.querySelector('[button-like]');
if (likeButton) {
    likeButton.addEventListener('click', (e) => {
        const id = likeButton.getAttribute('button-like');
        const data = {
            id: id,
        }
        fetch('/songs/like', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    if (data.status == 'add') {
                        likeButton.classList.add('active');
                    } else {
                        likeButton.classList.remove('active');
                    }
                    const newNumberLike = likeButton.querySelector('.inner-number');
                    newNumberLike.innerHTML = data.newLikeCount + ' thích';
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Có lỗi xảy ra",
                        text: data.message,
                    });
                }
            })
    })
}
//End Event like

//Start Event favorite

const listFavoriteButton = document.querySelectorAll('[button-favorite]');
if (listFavoriteButton.length > 0) {
    listFavoriteButton.forEach((favoriteButton) => {
        favoriteButton.addEventListener('click', (e) => {
            const id = favoriteButton.getAttribute('button-favorite');
            const data = {
                id: id
            }
            fetch('/songs/favorite', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        if (data.status === 'add') {
                            favoriteButton.classList.add('active');
                        } else {
                            favoriteButton.classList.remove('active');
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Có lỗi xảy ra",
                            text: data.message,
                        });
                    }
                })
        })
    })
}
//End Event favorite

//Ẩn alert
const alertSuccess = document.querySelector('[show-alert]');
if (alertSuccess) {
    const time = Number(alertSuccess.getAttribute('show-alert')) || 3000;
    setTimeout(() => {
        alertSuccess.classList.add('hidden');
    }, time)
}


// Gợi ý tìm kiếm
const boxSearch = document.querySelector('.box-search');
if (boxSearch) {

    //Debounce Search
    const debounce = (callback, delay) => {
        let timeOutSearchBox = null;
        return (...args) => {
            clearTimeout(timeOutSearchBox);
            timeOutSearchBox = setTimeout(() => {
                callback(...args, delay);
            }, delay);
        }
    }

    const handleSearchBox = (e) => {
        const keyword = inputSearch.value.trim();
        fetch(`/songs/search/suggest?keyword=${keyword}`)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const htmlSong = data.songs.map(item => `
                        <a class="inner-item" href="/songs/detail/${item.slug}">
                          <div class="inner-image">
                            <img src="${item.avatar}">
                          </div>
                          <div class="inner-info">
                            <div class="inner-title">${item.title}</div>
                            <div class="inner-singer">
                              <i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}
                            </div>
                          </div>
                        </a>
                    `);
                    const elementInnerSuggest = boxSearch.querySelector('.inner-suggest');
                    const elementInnerList = elementInnerSuggest.querySelector('.inner-list');
                    elementInnerList.innerHTML = htmlSong.join('');
                    if (data.songs.length > 0) {
                        elementInnerSuggest.classList.add('show');
                    } else {
                        elementInnerSuggest.classList.remove('show');
                    }
                }
            })
    }
    const inputSearch = boxSearch.querySelector('input[name="keyword"]');
    inputSearch.addEventListener('keyup', debounce(handleSearchBox, 500));
}
// Hết Gợi ý tìm kiếm