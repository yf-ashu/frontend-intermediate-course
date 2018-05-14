let connect = function () {
    fetch('https://api.twitch.tv/kraken/streams/?limit=20&language=zh-tw', {
            method: 'get',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'nlaj8j1wugbfbfut03otbsi49efqii'
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            return update(jsonData.streams);
        }).catch((err) => {
            console.log('錯誤:', err);
        });
}
let imageLoad = (datas) => {
    let imgSrc = document.querySelectorAll('.display img');
    datas.forEach((data, index) => {
        imgSrc[index].style.opacity=0;

        let image = new Image();
        let loadimg = data.preview.large;
        image.onload = function () {
            imgSrc[index].style.opacity=1;

            imgSrc[index].src = this.src;
            console.log(this.style);
        };
        image.src =data.preview.large;
    })

    // image.src ="https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg";
    // var image = document.images[0];
    // var downloadingImage = new Image();
    // downloadingImage.onload = function(){
    //      image.src = this.src;   
    // };
    // downloadingImage.src = "http://an.image/to/aynchrounously/download.jpg";
}
let update = (jsondata => {
    let datas = (jsondata);
    let list = '';
    datas.forEach((data, index) => {
        list += ` <div class="block">
                        <a  target="_blank" href="${datas[index].channel.url}">
                         <div class="display">
                         <img src="https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg" />
                         </div>
                         <div class="person">
                            <div class="image">
                                 <img src="${datas[index].channel.logo}" alt="">
                                </div>
                             <div class="title">
                             <p>${datas[index].channel.status}</p>
                             <p>${datas[index].channel.display_name}</p>
                         </div>
                      </div>
                      </a>
                     </div>`;
        // console.log(datas[index]);
        // imageLoad(data, index);
    });
    const dataList = document.querySelector('.wrapper ');
    dataList.innerHTML = list;
    imageLoad(datas);
    const creat = document.createElement('div'); //要增加的屬性
    creat.setAttribute('class', 'block');
    dataList.appendChild(creat);

});


window.onload = function () {
    connect();

}