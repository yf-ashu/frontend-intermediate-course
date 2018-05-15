let limit = 20;
let add = 0;
const dataList = document.querySelector('.wrapper');
let isLoad = false;
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
// let imageLoad = (datas) => {
//   let imgSrc = document.querySelectorAll('.display img');
//   console.log(imgSrc.length)
//   datas.forEach((data, index) => {
//     imgSrc[index].style.opacity = 0;

//     let image = new Image();
//     let loadimg = data.preview.large;
//     image.onload = function () {
//       imgSrc[index].style.opacity = 1;
//       imgSrc[index].src = this.src;
//       // console.log(this.style);
//     };
//     image.src = data.preview.large;
//   })


// }
let update = (jsondata => {
  isLoad = true;
  let datas = (jsondata);
  let list = '';
  datas.forEach((data, index) => {
    list = ` 
                        <a  target="_blank" href="${datas[index].channel.url}">
                         <div class="display">
                         <div class="placeholder"></div>
                         <img src="${data.preview.large}" onload="this.style.opacity=1;" />
                         </div>
                         <div class="person">
                            <div class="image">
                                 <img src="${datas[index].channel.logo}" alt="" >
                                </div>
                             <div class="title">
                             <p>${datas[index].channel.status}</p>
                             <p>${datas[index].channel.display_name}</p>
                         </div>
                      </div>
                      </a>
                     `;
    var div = document.createElement('div');
    div.setAttribute('class', 'block');
    div.innerHTML = list;
    dataList.appendChild(div);
  });

  // imageLoad(datas);
  // const creat = document.createElement('div'); //要增加的屬性
  // creat.setAttribute('class', 'block');
  // dataList.appendChild(creat);
  // console.log(all);
  isLoad = false;
});

let pageScroll = function () {
  console.log(window.pageYOffset);
  console.log('頁面' + document.documentElement.scrollHeight);
  console.log('頁面2:' + window.innerHeight);

  let scrollHeight = window.pageYOffset + window.innerHeight;
  let pageHeight = document.documentElement.scrollHeight;
  if (scrollHeight >= pageHeight - 100 && isLoad === false) {
    limit = 3;
    add += 3;
    url = `https://api.twitch.tv/kraken/streams/?limit=${limit}&language=zh-tw&offset=${add}`;
    connect();
  }

}
window.onload = function () {
  connect();
}
window.addEventListener('scroll', pageScroll);