jugador1 = firebase.database().ref("Jugador1");
jugador2 = firebase.database().ref("Jugador2");

/*Se obtienen los datos de nombres y puntuaciones para mandarlos a la página */
jugador1.child("Nombre").get().then((snap) => {
    if(snap.exists()){
        document.getElementById("player1").innerHTML = snap.val();
    }
})
jugador2.child("Nombre").get().then((snap) => {
    if(snap.exists()){
        document.getElementById("player2").innerHTML = snap.val();
    }
})
jugador1.child("Puntuacion").get().then((snap) => {
    if(snap.exists()){
        document.getElementById("pun1").innerHTML = snap.val();
    }
})
jugador1.child("Puntuacion").get().then((snap) => {
    if(snap.exists()){
        document.getElementById("pun2").innerHTML = snap.val();
    }
})