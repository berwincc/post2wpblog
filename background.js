chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: 'search',
        title: 'post2blog',
        type: 'normal',
        contexts: ['selection','image'],
    });
    chrome.contextMenus.create({
        id: 'blog',
        title: '发布到博客',
        type: 'normal',
        contexts: ['selection'],
        parentId:'search',
    });
    chrome.contextMenus.create({
        id: 'image2blog',
        title: '发布到博客',
        type: 'normal',
        contexts: ['image'],
        parentId:'search',
    });
    chrome.contextMenus.create({
        id: 'weibo',
        title: '发布到微博',
        type: 'normal',
        contexts: ['selection'],
        parentId:'search',
    });
    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        var blog_api ="";
        var Jwt_token = "";

        if (info.menuItemId === "blog") { // here's where you'll need the ID
            // test data
            var postData = {
                "title": "随感123",
                "content": info.selectionText,
                "status": "publish"
            };
            console.log();

            var creatPost = new XMLHttpRequest();
            creatPost.open("POST",blog_api,true);
            creatPost.setRequestHeader("Authorization",Jwt_token);
            // creatPost.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
            creatPost.setRequestHeader("Content-Type","application/json;charset=UTF-8");
            creatPost.withCredentials = true;
            creatPost.send(JSON.stringify(postData));
            // creatPost.send("title=123&content=123&status=publish");

            creatPost.onreadystatechange = function(){
                    var json = creatPost.responseText;
                    console.log(creatPost);
                    console.log(json);
            }
        }
        else if (info.menuItemId === "weibo") { // here's where you'll need the ID
            // do something
            // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            //     if (request.method == "getStatus") {
            //         console.log(request.data);
            //         console.log(info.selectionText);
            //         sendResponse({data: info.selectionText});
            //     }
            // });
            chrome.runtime.onMessage.addListener(function(message,sender,sendResponse)
            {
                //alert(message.data);
                chrome.runtime.sendMessage({data:info.selectionText,url:info.pageUrl},function(response){

                });
            return true;              
            });


            chrome.windows.create({url: chrome.extension.getURL("popup.html"), type: "popup",width:400,height:500});
            // document.getElementById("title").onload()=function(){
            //         windows.open({url: chrome.extension.getURL("popup.html"), type: "panel",width:300,height:400,left:2});
            // }
            console.log('info',info)
            console.log('tab',tab)
        }
        else if (info.menuItemId === "image2blog") { // here's where you'll need the ID
            // do something
            console.log('info',info)
            console.log('tab',tab)
            saveContent(info.srcUrl,'123')
        }
    });
});


function authenticateUser(user, password)
{
    var token = user + ":" + password;

    // Base64 Encoding -> btoa
    var hash = btoa(token); 

    return "Basic " + hash;
}