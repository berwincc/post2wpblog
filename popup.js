// console.log("pop.js")
// chrome.runtime.sendMessage({ method: "getStatus", data: "xxx" }, function (res) {
//     console.log(res.data);
//     console.log(document.getElementById("contentText"));
//     document.getElementById("contentText").value = res.data;
//     // return true;
// });
var title = '123';
var content = '123';
var pageUrl = '123';
var imgUrl  = '';
var api_post ='' ;
var Jwt_token = ' ';



chrome.runtime.sendMessage({data:"Handshake"},function(response){
    return true;
	
});
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse)
{
    str = JSON.parse(JSON.stringify(message.data))
    url = JSON.parse(JSON.stringify(message.url))
    console.log(str);
    content = str;
    pageUrl = url;
    document.getElementById("contentText").value = content;
    document.getElementById("wptitle").value = pageUrl;

    

    return true;
});



document.addEventListener("DOMContentLoaded", function(event) {
    let chosenButton = document.getElementById('closeWin');
    chosenButton.addEventListener('click', function() {

        var postData = {
            "title": pageUrl,
            "content": content,
            "status": "publish"
        };
        console.log(postData);

        window.opener=null;
        window.open('','_self');
        window.close();
    
 })});


document.addEventListener("DOMContentLoaded", function(event) {
    let chosenButton = document.getElementById('postToServer');
    chosenButton.addEventListener('click', function() {
        var creatPost = new XMLHttpRequest();
        content=document.getElementById("contentText").value;
        pageUrl=document.getElementById("wptitle").value;
        var postData = {
            "title": pageUrl,
            "content": content,
            "status": "publish"
        };
        console.log(postData);
        creatPost.open("POST",api_post,true);
        creatPost.setRequestHeader("Authorization",Jwt_token);
        // creatPost.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
        creatPost.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        creatPost.withCredentials = true;
        creatPost.send(JSON.stringify(postData));
        alert("publishing")
        
        // creatPost.send("title=123&content=123&status=publish");
        
        
        creatPost.onreadystatechange = function(){
            var json = creatPost.responseText;
            console.log(json);
            if(creatPost.status==201){
                alert("publish success!"+creatPost.status);
                window.opener=null;
                window.open('','_self');
                window.close();
            } 
               
        }
        
 },false)
},false);

