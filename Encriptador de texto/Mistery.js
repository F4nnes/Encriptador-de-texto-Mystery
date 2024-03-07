//declaracion de variables
const campoTexto = document.querySelector("#texto-encriptado");
const campoMensaje = document.querySelector("#campo-mensaje");
const botonCopiar = document.getElementById("btncopiar");
const botonPegar = document.getElementById("btnpegar");

//restriccion de caracteres
const restriccion = (event) => {
    event.target.value = event.target.value.replace(/[^a-z ñ]/, '');
};
campoTexto.addEventListener("input", restriccion);
//dentro de [] agregar los caracteres permitidos
//"ñ" no se contemplara como un caracter especial dentro del idioma español

//matriz para funcionamiento
const matrizCode = [
    ["e","enter"],
    ["i", "imes"],
    ["a", "ai"],  
    ["o", "ober"],
    ["u", "ufat"]
];

//funcion de encriptar
function encriptar(fraseEncriptada){
    for(let i = 0; i < matrizCode.length; i++){
        if(fraseEncriptada.includes(matrizCode[i][0])){
            fraseEncriptada = fraseEncriptada.replace(
                new RegExp(matrizCode[i][0], "g"),
                matrizCode[i][1]
            );
        }
    }
    return fraseEncriptada.replace(/[^a-z ñ]/, '');
}

//boton de encriptar
function btnEncriptar(){
    const texto = encriptar(campoTexto.value);
    campoMensaje.value = texto;
}

//funcion desencriptar
function desencriptar(fraseEncriptada) {
    //modificacion de codigo para lectura de matriz de forma inversa
    for (let i = matrizCode.length - 1; i >= 0; i--) {
      if (fraseEncriptada.includes(matrizCode[i][1])) {
        fraseEncriptada = fraseEncriptada.replace(
          new RegExp(matrizCode[i][1], "g"),
          matrizCode[i][0]
        );
      }
    }
    return fraseEncriptada.replace(/[^a-z ñ]/, '');
}

//boton de desencriptar
function btnDesencriptar(){
    const texto = desencriptar(campoTexto.value);
    campoMensaje.value = texto;
}

//funcion de copiado
function copiarAlPortapapeles(){
    navigator.clipboard.writeText(campoMensaje.value)
    .then(() => {
        campoTexto.value = "";
        campoMensaje.value = "";
    })
    .catch((err) => {
      console.log('Error!', err);
    });
}
//funcion de pegado
function pegar() {
    navigator.clipboard.readText()
      .then(texto => {
        campoTexto.value = texto;
        encriptar();
      })
      .catch(err => {
        console.log('Error al leer desde el portapapeles: ', err);
      });
    campoMensaje.value = "";
}

/*
 /\_/\  
( o.o ) 
 > ^ <
 */
