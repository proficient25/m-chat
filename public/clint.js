const socket = io()
let name;
let message;
let msg;
let textarea = document.querySelector('#textarea')
let messageArea= document.querySelector('.message__area')
do{
   name= prompt('please enter your name: ') 
}while(!name)

textarea.addEventListener('keyup',e=>{
    
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message){

    msg={
        user:name,
        text:message.trim()
    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrolltobottom()

    //sed to server
    socket.emit('message',msg)

}
function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup =`
    <h4>${msg.user}</h4>
    <p>${msg.text}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

//recieve
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrolltobottom
})

function scrolltobottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}