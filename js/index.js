import { html } from "./elementos.js";
import { app, db } from "./config.js";
//Imports para autenticarse
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
//Imports v¡base de datos
import {
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

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
            html.form_log.style.display = "none";
            html.btn_salir.style.display = "block";
            // ...
        } else {
            html.div_id.innerHTML = `<i class="fa-solid fa-circle-user fa-2x icono"></i>`;
            html.form_log.style.display = "block";
            html.btn_salir.style.display = "none";
        }
    });

    //Guardar
    //USANDO .then .catch
    html.btn_guardar.addEventListener("click", async () => {
        addDoc(collection(db, "users"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        })
            .then(() => console.log("Almacenamiento exitoso"))
            .catch(err => console.log(err.message))
    });
    //Guardar
    //USANDO Async
    html.btn_guardar.addEventListener("click", async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    })
    //Guardar
    //USANDO set
    html.btn_guardar.addEventListener("click", async () => {
        const citiesRef = collection(db, "cities");
        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"]
        });
        await setDoc(doc(citiesRef, "LA"), {
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"]
        });
        await setDoc(doc(citiesRef, "DC"), {
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000,
            regions: ["east_coast"]
        });
        await setDoc(doc(citiesRef, "TOK"), {
            name: "Tokyo", state: null, country: "Japan",
            capital: true, population: 9000000,
            regions: ["kanto", "honshu"]
        });
        await setDoc(doc(citiesRef, "BJ"), {
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000,
            regions: ["jingjinji", "hebei"]
        });
    });
    //BUSCAR
    html.btn_buscar.addEventListener("click", async () => {
        const docRef = doc(db, "cities", "SF");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });

}

