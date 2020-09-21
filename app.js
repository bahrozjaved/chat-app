var name, email, photoUrl, uid, emailVerified;

const facebook_login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;
            // console.log("user===>", user.displayName)
            window.location="home.html";
       
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
                   
        })
        .catch(function (error) {
      
      
            console.log(error.message)
        });
}

const view = () => {
    var user = firebase.auth().currentUser;
    var name1, email, photoUrl, uid, emailVerified;
    
    if (user != null) {
      name1 = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
console.log("user===>",name);

console.log("user===>",name1);

}












const signout = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location = "index.html"
        })
        .catch(() => {

        })
}