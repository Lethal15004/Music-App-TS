// Start Aplayer
const aplayer = document.querySelector('#aplayer');
if(aplayer){
    let dataSong=aplayer.getAttribute('data-song');
    dataSong=JSON.parse(dataSong);
    let dataSinger=aplayer.getAttribute('data-singer');
    dataSinger=JSON.parse(dataSinger);
    const ap = new APlayer({ 
        container: aplayer,
        audio: [
            {
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar
            }
        ],
        autoplay:true// Lần đầu vào chi tiết bài nhạc sẽ phát còn reload lại thì không
    });
    const avatar1= document.querySelector('.singer-detail .inner-avatar');
    const avatar2= document.querySelector('.aplayer .aplayer-pic');
    ap.on('play', function () {
        avatar1.style.animationPlayState='running';
        avatar2.style.animationPlayState='running';
    });
    ap.on('pause', function () {
        avatar1.style.animationPlayState='paused';
        avatar2.style.animationPlayState='paused';
    });
}
//End Aplayer


//Start Event like
const likeButton=document.querySelector('[button-like]');
if(likeButton){
    likeButton.addEventListener('click',(e)=>{
        const id=likeButton.getAttribute('button-like');
        const data={
            id: id,
        }
        if(likeButton.classList.contains('active')){
            likeButton.classList.remove('active');
            data.type='dislike';
        }else{
            likeButton.classList.add('active');
            data.type='like';
        }
        fetch('/songs/like',{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.code===200){
                const newNumberLike=likeButton.querySelector('.inner-number');
                newNumberLike.innerHTML=data.updateSongLike + ' thích';
            }else{
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

const favoriteButton=document.querySelector('[button-favorite]');
if(favoriteButton){
    favoriteButton.addEventListener('click',(e)=>{
        const id=favoriteButton.getAttribute('button-favorite');

        const data={
            id: id
        }
        fetch('/songs/favorite',{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.code===200){
                if(data.status==='add'){
                    favoriteButton.classList.add('active');
                }else{
                    favoriteButton.classList.remove('active');
                } 
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Có lỗi xảy ra",
                    text: data.message,
                });
            }
        })
    })
}
//End Event favorite

//Ẩn alert
const alertSuccess=document.querySelector('[show-alert]');
if(alertSuccess){
    const time= Number(alertSuccess.getAttribute('show-alert'))||3000;
    setTimeout(()=>{
        alertSuccess.classList.add('hidden');
    },time)
}