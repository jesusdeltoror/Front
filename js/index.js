import { html } from "./elementos.js";
import { app } from "./config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    getRedirectResult,
    signInWithRedirect,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

window.onload = inicializar;

function inicializar() {

    const auth = getAuth();
    const providerGoogle = new GoogleAuthProvider();
    const providerFacebook = new FacebookAuthProvider();

    //Creamos nuevos usuarios singin
    html.btn_crear.addEventListener("click", () => {
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
    html.btn_entrar.addEventListener("click", () => {
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
    html.btn_salir.addEventListener("click", () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    });

    //Autenticacion con Google
    html.btn_google.addEventListener("click", () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    });

    //Autenticacion con Facebook
    html.btn_facebook.addEventListener("click", () => {
        signInWithPopup(auth, providerFacebook)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;
      
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
      
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
      
          // ...
        });
    });

    //Obcerver indica el estado de la autenticacion
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            html.div_id.innerHTML = user.email;
            // ...
        } else {
            html.div_id.innerHTML = `<i class="fa-solid fa-circle-user fa-1x" style="color:Tomato"></i>`;
            // User is signed out
            // ...
        }
    });


}

