/*
*   Carga la imagen, la convierte a una URL Base64 y la guarda en el local storage.
*/

/*
*   Permitir poder cambiar la imagen que subimos a la web.
*   Crear la constante lector.
*   Cargar la imagen al local storage con el nombre "recent-image"
*   y renderizarla.
*/
document.getElementById('subirFoto').addEventListener('change', function(e) {
    const canvas = document.getElementById('micanvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    /*
    *   Carga la imagen al local storage con el nombre "recent-image".
    */
    reader.addEventListener("load", () =>(
        localStorage.setItem("recent-image", reader.result)        
    ));
    reader.readAsDataURL(this.files[0]);
    /*
    *   let canvas indica donde queremos dibujar nuestro lienzo,
    *   ctx da contexto sobre que vision queremos del lienzo
    *   una 2d o 3d.
    */
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    ctx.drawImage(imagen, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const asciiStr = imageToAscii(data, canvas.width, canvas.height);
    document.getElementById('mipre').textContent = asciiStr;
});
/*
*   Ya definida la constante recentImageDataUrl1
*   el script cambia la ruta de acceso a esa foto subida,
*   por la de local storage,
*   en otras palabras, actualiza nuestra nueva foto.
*/
const imagen = new Image();
document.addEventListener("DOMContentLoaded", ()=>{
    const recentImageDataUrl1 = localStorage.getItem("recent-image");
    if (recentImageDataUrl1){
        document.querySelector("#img").setAttribute("src", recentImageDataUrl1);
        document.querySelector("#img").setAttribute("hidden","true")
        imagen.setAttribute("src", recentImageDataUrl1);
    }
    imagen.src = recentImageDataUrl1;
})

/*
*   Crea el formato Ascii.
*/

function imageToAscii(data, width, height) {
    /*
    *   let chars representa los símbolos que usará cada escala de gris.
    */
    //const chars = '#&%$!mnusa+=-_,.'/*valores originales*/
    const chars = '@#$mnusa+=-.'
    //const chars = '█▀▄anvcxzoue=+'//movil
    //const chars = '█▀▄nuza=+'//movil
    //const chars = 'anvcxzoue=+' /*valores para dispositivos móviles*/
    /*
    *   let asciiJump es el salto de línea.
    */
    let asciiJump = '';
    /*
    *   const size define el ancho y el alto
    *   de la representación de pre.
    */
    const sizeWidth = 10;//30 movil
    const sizeHeight = 20;//60 movil
    /*
    *   El búcle for recorrerá los pixeles del eje Y y del eje X.
    */
    for (let y = 0; y < height; y += sizeHeight) {
        for (let x = 0; x < width; x += sizeWidth) {
            let graySum = 0;
            /*
            *   let pixeles define cuantos pixeles interpretará el script.
            */
            let pixeles = 0;
            /*
            *   El búcle for recorerrá el eje X y el eje Y
            *   en busca de la escala de grises del pixel.
            */
            for (let sizey = 0; sizey < sizeHeight; sizey++) {
                for (let sizex = 0; sizex < sizeWidth; sizex++) {
                    if (x + sizex < width && y + sizey < height) {
                        const offset = ((y + sizey) * width + (x + sizex)) * 4;
                        const r = data[offset];
                        const g = data[offset + 1];
                        const b = data[offset + 2];
                        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
                        graySum += gray;
                        pixeles++;
                    }
                }
            }
            const grayAvg = graySum / pixeles;
            const charIndex = Math.floor((grayAvg / 255) * (chars.length - 1));
            asciiJump += chars[charIndex];
        }
        asciiJump += '\n';
    }
    return asciiJump;
}
/*
*   Botón para copiar el contenido de <pre>.
*/
/*
function copiarAscii(f){
    var temporalLet = document.createElement("input");
    document.getElementsByTagName("body")[0].appendChild(temporalLet);
    temporalLet.value = f.innerHTML;
    temporalLet.select();
    document.execCommand("copy");
    document.getElementsByTagName("body")[0].removeChild(temporalLet);
}
*/