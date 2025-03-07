// LIÊN KẾT FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyCS9ZOMpaHckbzg8-OuFzUEifxeDh5jMns",
    authDomain: "heart-beat-1.firebaseapp.com",
    databaseURL: "https://heart-beat-1-default-rtdb.firebaseio.com",
    projectId: "heart-beat-1",
    storageBucket: "heart-beat-1.firebasestorage.app",
    messagingSenderId: "278742647787",
    appId: "1:278742647787:web:4c48c367169279ee05cfae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// ROOM -JAVA
var hearBeat = document.querySelectorAll('.heart-beat');
setInterval(function(){
    hearBeat.forEach(function(hearBeat){
        hearBeat.classList.toggle('zoom');
    });
}, 500);
//nhấn nút cảnh báo
var btnAlert = document.getElementById('btn-alert');
var warning = document.getElementById('warning');

var ledStage = 0;
btnAlert.onclick = function(){
    ledStage = !ledStage;
    warning.classList.toggle('bed1-func');
    if( ledStage == 1){
        database.ref("/room1").update({
            "Led": 1
        });
    }
    else{
        database.ref("/room1").update({
            "Led": 0
        });
    }
}
firebase.database().ref("/room1/Led").on("value",function(snapshot){
    var a = snapshot.val();
    if  (a == "1"){
        warning.classList.add('bed1-func');}
    else if (a == "0") {
        warning.classList.remove('bed1-func');}
    });

//get heartBeat-data
database.ref("/room1/HeartBeat").on("value",function(snapshot){
    var heartBeatdata = snapshot.val();
    document.getElementById('heartBeat-data').innerText = heartBeatdata;
});
//get Spo2-data
database.ref("/room1/Spo2").on("value",function(snapshot){
    var spo2data = snapshot.val();
    document.getElementById('spo2-data').innerText = spo2data;
});

