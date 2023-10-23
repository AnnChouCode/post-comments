/*資料辨識 */
//獲得頁面 id 值，即為 postID 的意思
const postID = location.href.split("=")[1]

/*綁定 */
//post 標題
const postTitleH1 = document.querySelector("h1")
//內容顯示區塊
const contentDiv = document.querySelector(".content")

/*初始化，頁面開啟即運作 */
function init() {
    getComment()
    getPost()
}

init()

/*渲染 post */
function getPost() {
    //從路由的 posts 找相符 id 的貼文，並拓展 user 資料
    axios.get(`${_url}posts/${postID}?_expand=user`)
        .then(function (response) {
            postTitleH1.textContent=`${response.data.body}─${response.data.user.name}`
        })
}

/*渲染 comment */
function getComment() {
   let str = ""

   //從路由的 comments 找相符 postId 的貼文，再從中拓展 user 資料
    axios.get(`${_url}posts/${postID}/comments?_expand=user`)
        .then(function (response) {
            console.log(response.data)
            if (response.data.length === 0){
                str = `<p>目前沒有人留言</p>`
            }else{
                response.data.forEach(item => {
                    str += `<h6>留言人：${item.user.name}</h6><p>${item.body}</p>`
                })
            }
            //由於異步執行，所以要把這行寫在 axios 內，才能確保請求完成後才渲染
            contentDiv.innerHTML = str
        })
}