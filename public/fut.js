/*Fondo
se carga la imagen de fondo*/
imagen = document.getElementById("imagen");

/*Canvas
se cargan los elementos del canvas*/
const canvas = document.getElementById("fut");
const ctx = canvas.getContext('2d');
 /*Imagenes y Sonidos
 Se crean los objetos de imagen y audio que se reproducirán a lo largo del juego
 */
fondoSl = new Image();
fondoSl.src = "https://image.freepik.com/foto-gratis/luces-noche-estadio-futbol-3d-rendering_3544-1244.jpg";
fondoLuz = new Image();
fondoLuz.src = "https://img.freepik.com/foto-gratis/estadio-futbol-3d-renderizado-estadio-futbol-campo-arena_3544-1363.jpg?size=626&ext=jpg";
jugador = new Image();
jugador.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/messi.png?alt=media&token=eee9d320-259b-4c7b-8c03-68da35d9ff2f";
jugador2 = new Image();
jugador2.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/neymah.png?alt=media&token=5652567c-a705-48d6-accf-de14634309f5";
jugador3 = new Image();
jugador3.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/cr7.png?alt=media&token=3a865be6-d3f4-44a6-8b70-95c7beaa613c";
jugador4 = new Image();
jugador4.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/salah.png?alt=media&token=7980dc8b-925c-46a3-b692-6f5b90db93d0";
jugador5 = new Image();
jugador5.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/zlatan.png?alt=media&token=54576627-0e27-432c-913e-e6e6017dcde9";
bola = new Image();
bola.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/balon.png?alt=media&token=e350419a-a34a-41c9-8e9c-cd942abcd653";
porteria = new Image();
porteria.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/porteria%20sin%20fondo2.png?alt=media&token=8c72d667-19eb-4815-a48d-9e92629d2bb1";
porteria2 = new Image();
porteria2.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/porteria%20sin%20fondo3.png?alt=media&token=f1bc34e0-e66b-436e-a97c-5cb7f34f6534";
marcador = new Image();
marcador.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/pnghut_uefa-champions-league-scoreboard-premier-afc-sport-hardware.png?alt=media&token=9c494718-65a2-46b1-917d-b587fcc39713";
ambiente = new Audio();
ambiente.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/ambiente.mpeg?alt=media&token=27a1ec29-4dbe-4070-a6c1-9f039de7cd70";
goal = new Audio();
goal.src = "https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/gol.wav?alt=media&token=a761fb7b-2650-427c-8575-e2b75f640e16";

/*Firebase
Se cargan todas las variables de firebase que recibirán datos
movimientos, puntuaciones, nombres, estado
 */
TempL = firebase.database().ref("Temp");
move = firebase.database().ref("Jugador1").child("posMono");
jump = firebase.database().ref("Jugador1").child("Salto");
name1 = firebase.database().ref("Jugador1").child("Nombre");
move2 = firebase.database().ref("Jugador2").child("posMono");
jump2 = firebase.database().ref("Jugador2").child("Salto");
name2 = firebase.database().ref("Jugador2").child("Nombre");
servidor = firebase.database().ref("Servidor");
ser = firebase.database().ref("Server");
Ready = firebase.database().ref("Jugador1").child("Ready");
Ready2 = firebase.database().ref("Jugador2").child("Ready");
Puntuacion = firebase.database().ref("Jugador1");
Puntuacion2 = firebase.database().ref("Jugador2");

/*Servidor
Se obtiene un dato de la base de datos al cargar la página
si este dato es un 0, entonces significa que no hay una página actuando como servidor
por lo tanto esta actuará como tal, guardando un 1 en el objeto ball.
Si en cambio el dato es un 1, entonces significa que ya hay un servidor
y esta página actuará como cliente.
*/
ser.child("s1").get().then((snap) => {
    if(snap.exists()){
        s1 = snap.val();
        if(s1 == 0){
            ser.set({
                s1:1
            });
            ball.server = 1;
        }else{
            ser.set({
                s1:0
            });
            ball.server = 0;
        }
    }
})
r1="0";
r2="0";

/*Datos de firebase
Se obtienen los datos de firebase para comprobar si un jugador está listo
*/
Ready.on('value', function(snap){
    r1 = snap.val()
})
Ready2.on('value', function(snap){
    r2 = snap.val()
})

t=0;
s=60;

/*Datos de firebase 
Se obtienen los datos de los sensores de luz y de temperatura
Como dichos datos se guardan juntos en un string, entonces se separan,
obteniendo los datos de la temperatura separados a los de la luz*/
TempL.on('value', function(snap){
    luces = snap.val();
    temp = luces.substring(0,4);
    luz = luces.substring(5,8);
    fondo.temp = temp;
    fondo.luz = luz;
});

/*Datos de firebase 
Se obtienen los datos que son mandados por el celular para comprobar si se está moviendo
hacia la izquierda o hacia la derecha, o si está saltando.
Esto se obtiene para cada jugador.*/
name1.on('value', function(snap){
    namej1 = snap.val();
    user.name = namej1;
})

move.on('value', function(snap){
    move1 = snap.val();
    user.move = move1;
})

jump.on('value', function(snap){
    jump1 = snap.val();
    user.jump = jump1;
})

name2.on('value', function(snap){
    namej2 = snap.val();
    user2.name = namej2;
})

move2.on('value', function(snap){
    move2 = snap.val();
    user2.move = move2;
})

jump2.on('value', function(snap){
    jump2 = snap.val();
    user2.jump = jump2;
})

/*Objetos 
Aqui se crean todos los objetos del juego con sus respectivos atributos
guardando en ellos por ejemplo los datos que cambiarán el fondo, los datos de posición y dimensiones de 
las porterías, datos de posiciones, tamaños y velocidades tanto del balón como de los jugadores.*/
const fondo = {
    temp: "29.0",
    luz: "101"
}

const arc = {
    x : 0,
    y : 372,
    w : 130,
    h : 228
}

const arc2 = {
    x : canvas.width-130,
    y : 372,
    w : 130,
    h : 228
}

const ball = {
    //y : canvas.height/4,
    x : (canvas.width/2)-17,
    y : (canvas.height/2)-17,
    radius : 17,
    w: 34,
    h: 34,
    velocityX : 0,
    velocityY : 5,
    speed : 20,
    server:0 //guarda el dato de si eres servidor o cliente
}

/*Objetos 
name guarda los nombres de la base de datos, move guarda 1 si está moviendose a la izquierda y 2 si es hacia la derecha,
jump guarda 1 o 0 en caso de que se haya dado un salto o no, bool guarda false o true dependiendo de si ya se terminó
el salto o aún está saltando (para que no exista el doble salto)*/
const user = {
    name: "",
    move : 0,
    jump : 0,
    bool : false,
    x : canvas.width/2-300,
    y : 550,
    w : 70,
    h : 150,
    speed : 15,
    score : 0
}

const user2 = {
    name: "",
    move : 0,
    jump : 0,
    bool : false,
    x : canvas.width/2+225,
    y : 550,
    w : 70,
    h : 150,
    speed : 10,
    score : 0
}

/*Tiempo 
Este conjunto de funciones sirven para calcular y mostrar el tiempo jugado (como un temporizador)
tempo() solo regresa false si ya se terminaron los 3 minutos de juego
tempo1() regresa numeros dependiendo del minuto en el que se encuentre
tempo2() calcula los retrocesos de tiempo, es decir, 59, 58, 57,...,0*/
function tempo(){
    t += 1;
    if(t >= 10800)
        return false;
    else
        return true;
}
function tempo1(){
    if(t < 60)
        return'03';
    else if(t < 3660)
        return '02';
    else if(t < 7260)
        return '01';
    else if(t <= 10800)
        return '00';
}
function tempo2(){
    if(t<60){
        return 0;
    }
    if(t>=60 && t<3600){
        if(t%60 == 0)
            s-=1;
        return s;
    }
    if(t>=3600 && t<3660){
        s=60;
        return 0;
    }
    if(t>=3660 && t<7200){
        if(t%60 == 0)
            s-=1;
        return s;
    }
    if(t>=7200 && t<7260){
        s=60;
        return 0;
    }
    if(t>=7260 && t<=10800){
        if(t%60 == 0)
            s-=1;
        return s;
    }
}

/*Draw 
estas funciones se encargan de dibujar todos los objetos del juego
haciendo que, por ejemplo en drawFondo se dibuje uno u otro fondo dependiendo de la luz y la temperatura
Player, Ball, Arc y Score solo se encargan de dibujar al jugador, la pelota, la portería y el marcador respectivamente
*/
function drawFondo(temp, luz){
    if(luz.substring(2,3) == "%")
        luz = luz.substring(0,2);
    
    if(luz < 250){
        ctx.drawImage(fondoLuz, 0, 0, canvas.width, canvas.height)
    }
    else{
        ctx.drawImage(fondoSl, 0, 0, canvas.width, canvas.height)
    }
    
    if(temp > 28.0){
        imagen.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/fondo%20calor.jpeg?alt=media&token=2ab22ece-1317-4faa-8c1a-2344d91d12ce')";
    }
    else{
        imagen.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/fondo%20nevado.jpg?alt=media&token=2a76a267-cbdc-4ff8-82a3-ab10911653e2')";
    }
}
function drawPlayer(j, x, y, w, h){
    ctx.drawImage(j, x, y, w, h)
}
function drawBall(x, y){
    ctx.drawImage(bola, x, y, 35, 35)
}
function drawArc(p, x, y, w, h){
    ctx.drawImage(p, x, y, w, h)
}
function drawScore(w, h){
    ctx.drawImage(marcador, (canvas.width/2)-(w/2), 10, w, h);
}

/*Textos 
estas son funciones que se encargan de dibujar los textos de juego
como los puntajes, los nombres, el tiempo y algún dato extra*/
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px calibri";
    ctx.textAllign = "center";
    ctx.fillText(text, x, y);
}
function drawNum(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "40px aharoni";
    ctx.textAllign = "center";
    ctx.fillText(text, x, y);
}
function drawName(text, x, y){
    ctx.fillStyle = "#000";
    ctx.font = "25px comic sans ms";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}
function drawTime(text, x, y){
    ctx.fillStyle = "#FFF";
    ctx.font = "20px calibri";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

/*Movimientos 
Se encarga de traducir los clics en los botones android a movimientos reales del jugador
si el movimiento está en 1 se restará en x el movimiento (hacia la izquierda), o si está en dos lo aumentará.
Se comprueba si se está saltando o no, en caso de ser falso si permite hacer un salto.
Por último, si se inició el salto se aplican operaciones sobre el jugador en la posición y y en su velocidad
para lograr un efecto de salto con disminución de velocidad (si está yendo hacia arriba) y con aumento de velocidad
si está cayendo, para lograr así un efecto de gravedad. */
function movements(player){
    if(player.move == "1.0"){
        player.x -= 10;
    }  
    else if(player.move == "2.0"){
        player.x += 10;
    }
    
    if(player.y == canvas.height-player.h){
        player.bool = false;
        if(player.jump == "1.0") player.y -= 1;
    }
    else{
        player.bool = true;
    }

    if(player.bool){
        player.y = player.y - player.speed;
        if(player.speed > 0)
            player.speed *= 0.98;
        else
            player.speed *= 1.2;
        if(player.y <= 360)
            player.speed *= -1;
        if(player.y >= canvas.height-player.h){
            player.y = canvas.height-player.h;
            player.speed = 15;
        }  
    }
}

/*Colisiones 
Al igual que en el pong solo se comprueba si está chocando un objeto con otro, en cualquier parte de los dos objetos*/
function colision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.h;
    p.left = p.x;
    p.right = p.x + p.w;

    b.top = b.y;
    b.bottom = b.y + b.h;
    b.left = b.x;
    b.right = b.x + b.w;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

/*Reset 
Se reinicia a su posición inicial tanto al balón como a los jugadores*/
function resetBall(){
    ball.y = canvas.height/4
    ball.x = (canvas.width/2)-17
    ball.velocityX = 0
    ball.velocityY = 5
    user.x = canvas.width/2-300
    user.y = 550
    user2.x = canvas.width/2+225
    user2.y = 550
}

/*Cálculos y comprobación de servidor */
function update(){
    /*Servidor 
    Se comprueba si la página en la que se está corriendo el juego es servidor o no*/
    if(ball.server == 1){
        movements(user)//se llama a los movimientos de los jugadores
        movements(user2)
        if(user.x+user.w >= user2.x){//se comprueba si los jugadores están chocando, dando un efecto de ser cuerpos físicos
            user.x = user2.x-user.w
            user2.x = user.x+user.w
        }
        if(ball.velocityY < 0){//Si el balón está yendo hacia arriba se le aplica gravedad
            ball.velocityY *= 0.88
            if(ball.velocityY >= -0.4)//si la velocidad es muy pequeña, se cambia su dirección
                ball.velocityY = 0.4
        }
        else
            if(ball.velocityY < 20)//Si el balón está cayendo, se agrega gravedad para aumentar su velocidad
                ball.velocityY *= 1.15
    
        if(ball.y+ball.h > canvas.height){//si el balón choca con el piso, se reinicia su velocidad y rebota
            ball.velocityY = 25
            ball.velocityY *= -1
        }
        if(ball.x < 0)//si el balón choca con alguna de las paredes, rebota
            ball.velocityX *= -1
        if(ball.x+ball.w > canvas.width)
            ball.velocityX *= -1
        
        ball.x += ball.velocityX;//movimientos del balón en "x" y en "y"
        ball.y += ball.velocityY;
    
        let player = (ball.x < user.x+user.w) ? user : user2;//se usan variables para saber que portería o que jugador chocó con el balón.
        let arco = (ball.x < canvas.width/2) ? arc : arc2;
        
        /*Colisiones con las porterías 
        Se checa si el balón chocó con alguna de las porterías*/
        if(colision(ball, arco)){
            collidePoint = ((ball.y+ball.radius) - (arco.y + 5));//para comprobar si el balón está por encima o por debajo del travesaño
            if(collidePoint < -6){//si el balón choca con la parte de arriba de la portería, rebota
                ball.velocityY = 15
                ball.velocityY *= -1
            }
            else{
                let angleRad = 0
                /*Si el balón choca con el travesaño, rebota en un ángulo de 49.5º */
                if(collidePoint < 0){
                    angleRad = ((Math.PI/4)*1.1)*-1
                    let direction = (ball.x < canvas.width/2) ? 1 : -1;
    
                    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
                    ball.velocityY = ball.speed * Math.sin(angleRad);
                }
                /*Si no
                Significa que está debajo del travesaño, es decir, el área abierta de la portería.
                Se comprueba si el balón está del lado de la portería de la izquierda o de la derecha
                y se comprueba si la mitad del balón cruza la "linea de gol.
                Se agrega un punto al jugador correspondiente, se reproduce el sonido de gol y se reinicia
                tanto a jugadores, como al balón"*/
                else{
                    if(ball.x < canvas.width/2){
                        if(ball.x + ball.radius < arco.x+arco.w){
                            user2.score += 1
                            Puntuacion.update({
                                gol : true
                            })
                            goal.play()
                            resetBall()
                        }
                    }
                    else{
                        if(ball.x + ball.radius > arco.x){
                            user.score += 1
                            Puntuacion.update({
                                gol : true
                            })
                            goal.play()
                            resetBall()
                        }
                    }
                }
            }
        }
        /*Colisiones con los jugadores 
        Se comprueba si hubo una colisión del balón con algún jugador*/
        if(colision(ball, player)){
            let collidePoint = 0;
            collidePoint = ((ball.y+ball.h) - (player.y + player.h/4));//para checar si chocó en la parte de la cabeza del jugador
            
            //si golpea justo en la parte de arriba de la cabeza (no en la frente), rebota el balón
            if(collidePoint < -1*(ball.h)){
                ball.velocityY = 15
                ball.velocityY *= -1
            }
            /*Si no 
            Se comprueba si el punto de choque está en la cabeza y si lo es, el balón rebota en un ángulo de 54º
            */
            else{
                let angleRad = 0
                if(collidePoint < 0)
                    angleRad = ((Math.PI/4)*1.2)*-1
                else{
                    collidePoint = ((ball.y+ball.h) - (player.y + (player.h-5)));//para checar si chocó en el pie
                    //si choca el balón en el cuerpo del jugador, rebota solo en sentido opuesto
                    if(collidePoint < 0)
                        angleRad = 2*Math.PI
                    //Si choca en el pie, rebota en un ángulo de 58.5º
                    else
                        angleRad = ((Math.PI/4)*1.3)*-1
                }
                
                /*Aqui se manejan las direcciones y velocidades del balón */
                let direction = (ball.x < player.x) ? -1 : 1;
    
                ball.velocityX = direction * ball.speed * Math.cos(angleRad);
                ball.velocityY = ball.speed * Math.sin(angleRad);
            }
        }
        /*Posciones
        Aquí se mandan las posiciones del balón, jugadores y puntuaciones después de cálculos a firebase
        Como en este punto eres el servidor, hay que mandar estos datos para que el cliente solo reciba datos a mostrar
        */
        servidor.update({
            x1:ball.x,
            y1:ball.y,
        });
        Puntuacion.update({
            Puntuacion:user.score,
            PosicionX: user.x,
            PosicionY: user.y
        })
        Puntuacion2.update({
            Puntuacion:user2.score,
            PosicionX: user2.x,
            PosicionY: user2.y
        })
    }
    /*Cliente 
    Si en la carga de la página obtienes el valor de 0 significa que serás el cliente
    por lo tanto, no son necesarios los cálculos
    simplemente se obtienen las posiciones del balón, usuarios y puntajes para luego dibujarlos dentro de la página.
    Como el sonido de gol solo se está ejecutando en el servidor, es necesario obtener el dato de si se hizo un gol o no
    para ejecutar el sonido también del lado del cliente*/
    else{
        servidor.child("x1").on('value',function(snap){
            ball.x = snap.val();
        });
        servidor.child("y1").on('value',function(snap){
            ball.y = snap.val();
        });
        Puntuacion.child("PosicionX").on('value', function(snap){
            user.x = snap.val();
        });
        Puntuacion2.child("PosicionX").on('value', function(snap){
            user2.x = snap.val();
        });
        Puntuacion.child("PosicionY").on('value', function(snap){
            user.y = snap.val();
        });
        Puntuacion2.child("PosicionY").on('value', function(snap){
            user2.y = snap.val();
        });
        Puntuacion.child("Puntuacion").on('value', function(snap){
            user.score = snap.val();
        });
        Puntuacion2.child("Puntuacion").on('value', function(snap){
            user2.score = snap.val();
        });
        Puntuacion.child("gol").on('value', function(snap){
            gol = snap.val();
            if(gol){
                goal.play()
            }
        });
        Puntuacion2.child("gol").on('value', function(snap){
            gol = snap.val();
            if(gol){
                goal.play()
            }
        });
    }
    /*se vuelve a falso el valor de gol para que evitar que se ejecute indefinidamente  
    el sonido de gol*/
    Puntuacion.update({
        gol:false
    })
    Puntuacion2.update({
        gol:false
    })
}

/*Render 
Se manda a llamar a todas las funciones que dibujan los objetos*/
function render(){
    drawFondo(fondo.temp, fondo.luz)
    /*Skin
    Se comprueba que skin eligió cada jugador para mostrarlo en pantalla.
    Se obtiene el dato de firebase.
    */
    Puntuacion.child("Skin").on('value', function(snap){
        skin = snap.val()
        if(skin == "1.0")
            drawPlayer(jugador, user.x, user.y, user.w, user.h)
        else if(skin == "2.0")
            drawPlayer(jugador2, user.x, user.y, user.w, user.h)
        else if(skin == "3.0")
            drawPlayer(jugador3, user.x, user.y, user.w, user.h)
        else if(skin == "4.0")
            drawPlayer(jugador4, user.x, user.y, user.w, user.h)
        else if(skin == "5.0")
            drawPlayer(jugador5, user.x, user.y, user.w, user.h)
    })
    Puntuacion2.child("Skin").on('value', function(snap){
        skin = snap.val()
        if(skin == "1.0")
            drawPlayer(jugador, user2.x, user2.y, user2.w, user2.h)
        else if(skin == "2.0")
            drawPlayer(jugador2, user2.x, user2.y, user2.w, user2.h)
        else if(skin == "3.0")
            drawPlayer(jugador3, user2.x, user2.y, user2.w, user2.h)
        else if(skin == "4.0")
            drawPlayer(jugador4, user2.x, user2.y, user2.w, user2.h)
        else if(skin == "5.0")
            drawPlayer(jugador5, user2.x, user2.y, user2.w, user2.h)
    })
    drawBall(ball.x, ball.y)
    drawArc(porteria, arc.x, arc.y, arc.w, arc.h)
    drawArc(porteria2, arc2.x, arc2.y, arc2.w, arc2.h)
    drawScore(400, 100)
    drawNum(user.score, (canvas.width/2)-35, 50)
    drawText('-', (canvas.width/2)+2, 55)//Se le da un poco de formato a las puntuaciones
    drawNum(user2.score, (canvas.width/2)+38, 50)
    drawName(user.name, (canvas.width/2)-140, 45)
    drawName(user2.name, (canvas.width/2)+140, 45)
    drawTime(tempo1(), (canvas.width/2)-20, 82)
    drawTime(':', (canvas.width/2), 82)//se le da formato al tiempo
    drawTime(tempo2(), (canvas.width/2)+20, 82)
}

/*Juego 
Es el punto de entrada al juego, comprueba si ambos jugadores están listos, si no no empieza el juego o se pausa.
Se comprueba si el tiempo terminó o si aún sigue corriendo*/
function game(){
    
    if(r1 == "1" && r2 == "1"){
        if(tempo()){
            ambiente.play()
            update();
            render();
        }
        else{
            drawText('El juego terminó', canvas.width/2, canvas.height/2)
        }
    }
}

let framePerSecond = 60;
let loop = setInterval(game,1000/framePerSecond);
