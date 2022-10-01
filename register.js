import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBJO90beDoe35ISCsOtzUABeR9C6OHOTdA",
    authDomain: "translator-b58ae.firebaseapp.com",
    projectId: "translator-b58ae",
    storageBucket: "translator-b58ae.appspot.com",
    messagingSenderId: "692437232571",
    appId: "1:692437232571:web:417a9bc113b43f28b3729e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);
const register = document.getElementById('Register');
register.addEventListener('click', registerpressed);
function registerpressed() {
    var fullname = document.getElementById('fullname').value
    var mail = document.getElementById('mail').value
    var username = document.getElementById('username').value
    var  pass = document.getElementById('pass').value
    var lang = 'te'
    if(validateusername(username) == false){
        alert('username should be greater than 6 characters');
        return
    }
    if(validatefullname(fullname) == false){
        alert('fullname should be greater than 6 characters');
        return
    }
    if(validatemail(mail) == false){
        alert('email is not in correct format')
        return
    }
    if(validatepass(pass) == false){
        alert('password should be greater than 8 characters ')
        return
    }
    console.log('after validation')
    createUserWithEmailAndPassword(auth, mail, pass)
        .then((udata)=>{
            const user = udata.user;
            console.log('inside create method')
            set(ref(db,'users/'+username),{
                FullName : fullname,
                Mail : mail,
                Password : pass,
                Lang : lang
            
            }).catch((error)=>{
                const errorMessage = error.message;
                console.log(errorMessage)
                alert(errorMessage)
            });
            alert("User created successfully");
            window.location.href = "./login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            alert(errorMessage)
            // ..
        });
    
}

// validation of password
function validatepass(password){
    if(password < 8){
        return false;
    }else{
        return true;
    }
}
// validation of mail
function validatemail(mail){
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
    if( expression.test(mail) == true){
        return true;
    }else{
        return false;
    }
}
// validation of username and fullname
function validateusername(username){
    if(username == null ){
        return false;
    }
    if(username.length < 6 ){
        return false;
    }else{
        return true;
    }
}
function validatefullname(fullname){
    if(fullname == null ){
        return false;
    }
    if(fullname.length < 6 ){
        return false;
    }else{
        return true;
    }
}