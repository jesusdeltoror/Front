import {html} from "./elementos.js";
import {app} from "./config.js";
import {    
        getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        onAuthStateChanged, 
        signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

window.onload = inicializar;

function inicializar(){

    const auth = getAuth();

    //Creamos nuevos usuarios singin
    html.btn_crear.addEventListener("click", ()=>{
        createUserWithEmailAndPassword(auth, html.input_email.value, html.input_pass.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    });

    //Entrar login
    html.btn_entrar.addEventListener("click", ()=>{
        signInWithEmailAndPassword(auth, html.input_email.value, html.input_pass.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    });

    //Salir logout
    html.btn_salir.addEventListener("click", ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    });

    //Obcerver
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            html.div_id.innerHTML = user.email;
          // ...
        } else {
            html.div_id.innerHTML = "Desconectado";
          // User is signed out
          // ...
        }
    });

}

