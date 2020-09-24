var user = firebase.auth().currentUser;    
var name1, email, photoUrl, uid, emailVerified;
const facebook_login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;
            
            console.log(user);
            console.log("user===>", user.displayName)
            console.log("user===>", user.photoURL)
            console.log("user id: " + firebase.auth().currentUser.uid);
            name1 = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
            document.location.reload(true);                   
        })
        .catch(function (error) {
      
      
            console.log(error.message)
        });
}
const signout = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location = "index.html"
        })
        .catch(() => {

        })
}
const messagescreen = document.getElementById("messages");
const messageform= document.getElementById("messageform");
const msgBtn= document.getElementById("msg-btn");
const msginput= document.getElementById("msg-input");
const db = firebase.database();
const msgref=db.ref("/msgs");
let name ;

messageform.addEventListener("submit",event =>{
event.preventDefault();
const text =msginput.value;
var user = firebase.auth().currentUser;    
if(user != null){
var name=user.displayName; 
   
if (!name)
return alert('please login first');
else if(!text.trim() ) return alert('you have to type an message');
else{
var user = firebase.auth().currentUser;
    var name1, email, photoUrl, uid, emailVerified;
    
    if (user != null) 
      name1 = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; 
const msg={
    uid,
    name,
    text

}

msgref.push(msg);

msginput.value ="";
}
}
else{alert("login first");}

});

const update= data =>{
    var user = firebase.auth().currentUser;
if(user != null){
    var  uid;
    uid = user.uid;
    const {uid:userid,name:username,text} = data.val();
    const msg = `<li class="msg ${uid == userid  && "my"}  ">
    <span>
    <i class="name">${username} </i>${text}</span></li>`;
messagescreen.innerHTML+=msg; 

}
else if(user == null){
        const {uid:userid,name:username,text} = data.val();
        const msg = `<li class="msg">
        <span>
        <i class="name">${username} </i>${text}</span></li>`;
    messagescreen.innerHTML+=msg; 
    
}
};
msgref.on('child_added',update);