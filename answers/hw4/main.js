var connect = function () {
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

var update = (jsondata => {
    let datas = (jsondata);
    let list = '';
    datas.forEach((data, index) => {
        list += ` <div class="block">
                        <a  target="_blank" href="${datas[index].channel.url}">
                         <div class="display">
                             <img src="${datas[index].preview.large}" alt="">
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
        console.log(datas[index]);
    });
    const dataList = document.querySelector('.wrapper ');
    dataList.innerHTML = list;

});

window.onload = function () {
    connect();

}