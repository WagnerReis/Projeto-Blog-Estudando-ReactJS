import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBJe5U7qDiLa06LqKCf0cpAvE9rtzQ25ug",
    authDomain: "projetoblog-2493b.firebaseapp.com",
    databaseURL: "https://projetoblog-2493b.firebaseio.com",
    projectId: "projetoblog-2493b",
    storageBucket: "projetoblog-2493b.appspot.com",
    messagingSenderId: "171946474426",
    appId: "1:171946474426:web:f639055156ba7373063b83",
    measurementId: "G-W8HGNFK46P"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        //Referenciando a database para acessar em outros locais
        this.app = app.database();

        this.storage = app.storage();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
          return null;
        }
    
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }
}

export default new Firebase();