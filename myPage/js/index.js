/*綁定 */
//頁面上的 ul 列表
const listUl = document.querySelector(".list")
//將 json 資料 copy 存放處
let datas = []

/*初始化，頁面開啟即運作 */
function init(){
  axios.get(`${_url}posts`)
  .then(function (response) {
    datas = response.data
    renderData()
  })
}

init()

/*渲染畫面 */
function renderData(){
  let str =""
  datas.forEach( data => {
    str += `<li>${data.body}<a style="font-size:8px;margin-left:16px;" href="myPage/pages/postDetail.html?id=${data.id}">查看貼文</a></li>`    
  })
  listUl.innerHTML=str
}