let limit = 20;
let add = 0;
let all = '';
let url = `https://api.twitch.tv/kraken/streams/?limit=${limit}&language=zh-tw&offset=${add}`;
let connect = function () {
  console.log('抓取：' + add);
  console.log('限制：' + limit);
  console.log('網址：' + url)

  fetch(url, {
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
    imgSrc[index].style.opacity = 0;

    let image = new Image();
    let loadimg = data.preview.large;
    image.onload = function () {
      imgSrc[index].style.opacity = 1;
      imgSrc[index].src = this.src;
      // console.log(this.style);
    };
    image.src = data.preview.large;
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
                         <div class="placeholder"></div>
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
  });
  const dataList = document.querySelector('.wrapper ');
  all += list;
  dataList.innerHTML =all;
  imageLoad(datas);
  const creat = document.createElement('div'); //要增加的屬性
  creat.setAttribute('class', 'block');
  dataList.appendChild(creat);
  console.log(all);
});

let pageScroll = function () {
  console.log(window.pageYOffset);
  console.log('頁面' + document.documentElement.scrollHeight);
  console.log('頁面2:' + window.innerHeight);

  let scrollHeight = window.pageYOffset + window.innerHeight;
  let pageHeight = document.documentElement.scrollHeight;
  if (scrollHeight >= pageHeight - 100) {
    limit = 3;
    add += 3;
    url = `https://api.twitch.tv/kraken/streams/?limit=${limit}&language=zh-tw&offset=${add}`;
    connect();
  }
  console.log(limit);
  console.log(add);
}
window.onload = function () {
  connect();
}
window.addEventListener('scroll', pageScroll);