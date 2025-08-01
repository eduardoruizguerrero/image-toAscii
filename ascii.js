/*




                    *****************************************************
                    *   This code is made from Eduardo Ruiz Guerrero.   *
                    *****************************************************




        %%%%%%%%%%%%%%%%%@@@%%%%%%%%%%%%@%%*%%%@@%%=-=*%%%%%%%%%%%%*********************
        %%%%%%%%%%%%%%%%@@@@%%%%%%%%%%%%@%%**%%@@@%%=::-*%%%%*%%%%%%%**+++*******%%*****
        %%%%%%%%%%%%%%%%@@@%%%%%%%%%%%%%*%%%*%%%@@%%%=:.:-*%%%%*%%%%%%%*+=+++++*********
        %%%%%%%%%%%%%%%@@@@%%%%%%%%%%%%%=*%%%*%%@@@%%%=:..:=*%%%**%%%%%%%*++++++=++++++=
        %%%%%%%%%%%%%%%@@@@%%%%%%%%%%%%+-=%%%*%%%@%=%%%=:.:::+%%*%%%%%%%%%%+=++++++=====
        %%%%%%%%%%%%%%%@@@@%%%%%%%%%%%*=::%%%%%%%%%:+%%*-::..:-*%=*%%%%%%%%%+===========
        %%%%%%%%%%%%%%%@@@@%%%%%%%%%%%=:.:+%%%%%%%%::+%%=-....::+%-=%%%%%@@%%+==========
        %%%%%%%%%%%%%%%%@@@%%%%%%%%%%+--==+%%%%%%%%-.:+%+-:....::=*--*%%%%@@%%**++++====
        %%%@%%%%%%%%%%%%@@@%%%%%%%%%+-::..:*%%%%%%%::.:**:-:.....:-*:=+%%%%@@%%++****+++
        %%%@%%%%%%%%%%%%@@@%%%%%%%%*:..::..+%%%%%%*:...:*=::.......-*::=%%%%@@%+====+++*
        %%%@%%%%%%%%%%%%%@@%%%%%%%%-.......-%%%%%%+:....=+:-:......:==..=%%%@@%*====-==+
        %%%@%%%%%%%%%%%%%@@%%%%%%%=.:.....::%%%%%%=.....:*:::........=-::-%%@@@%+===-==+
        %%%@%%%%%%%%%%%%%%@@%%%%%*::......::*+*%%*:......=-:-.......:-==*%%%%@@%*====-==
        %%%%@%%%%%%%%%%%%%@@%%%%%-......::::+=-%%+:.:....:=.-:......:-%@%*%=*@@@%=-==-:-
        %%%%@%%%%%%%%%%%%%%@%%%%=::.....::::==-*%=-::....:=.-:......:*%@%=+:=*@@*=======
        %%%%%%%%%%%%%%%%%%%%%%%+:.::-=+*%%%@@%**+:::::....-:::......:*:%@-=.-==%+==-====
        %%@%%@%%%%%%%%%%%%%%@%*::+%@@@@@@@@@%%%@@%+:::....::........:%*@@-:.-===+=------
        %%@%%%%%%%%%%%%%%%%%%%-+@@@@@%**%%@@@@%+=+**:..............:-@@@@:..====-=------
        %%%%%%@%%%%%%%%%%%%%%%%@@@@%+=+*:.:%@@@@=:--:..............:-@%**..:=-=---------
        %:.=%%%%%%%%%%%%%%%%%%@@@@%===@-...%@%@@%:.:................:%%+:.::+-=-==------
        +..:*%%%%%%%%%%%%%%%%%%*@@*=-+@*=-+@@@@@@+...................:==::::*========---
        *:::-%%%%%%@%%%%%%%%%%%*=@%=:*@@@@@@@@@@@*..:....................:.:*==++====---
        %::-:+%%%@%%@%%%%%%%%%%%=-%+.=@@@@@@@@%%@*......................::.:*+=+=++=====
        @+:---*%%%@%@@%%%%%%%%%%%::=-.*@@@%*++++=-.......................:.:************
        @@=:..-%%%%%%@%%%%%%%%%%%*::::.+@@%++++**...:................:....:++*****++++==
        %@@=:.:=%%%%@@@@@@%%%%%%%%*::...:+%%%%*=:..::...............::...:=%=+++++++++==
        %%%@*-::+%%%%@@@@@@@@%%%%%%+:.......:---::......................:+%*++++++++++++
        %%%%@@%+:*%%%%@@@@@@@@@@%%%%+:::......::::....................:-*@%**********+**
        %%%%%@@@%%@%%%%@@@@@@@@@+:-+*+:.......:.:::..................:+%@%%%****++*%*+**
        %%%%%%@@@%%@%%%%@@@@@@@@%=:.:--:.........::...........:-=:.:-%@@@%@%*****+**++++
        %%%%%%%@@%%%@%%%%@@@@@@@%%=::........................:=-:.:+@@@@%%%%*****+++=---
        *%%%%%%%@@%%%@%%%%%@@@@@@%%+:.......................:.:..=%@@@@@%%%%%****++-----
        *%@%%%%%%@%%@@@%%%%%@@@@@@%%*=-:::..:..................:+%@@@@@%%%%%%%%%%*=:==--
        **@%%%%%%@@%@@@@@%%%%%@@@@@%%%++++=---::::::::::::::-=*@@%@@@@%%%%%%%%%%%=:-----
        %%@%%%%%%%@@%%%@@@%%%%%@@@@@%%%*==+++++=========+++%@@@@@@@@%%%%%%%%%%%*=--=----
        %%@%@%%%%%@%%%%%%@@%%%%%%@@@@%%%*+=====+++++++++***%%%%%%@@%@%%%%%%%%%*---------
        %%@%%%%%%%@%%%%%%%%%%%%%@%%@@@%%%%+==========+*%%%%%%*=%%%%%%%%++**%**---====---
        *%%%%%%%%%%%%%%%%%%%%%%%%@%%%@@%%%%*+=======+**%%%**++=%%@%%%%*=**%%+=*%%%%%%%%%
        +*%%%%%%%@%%%%%%%%%%%%%%%%%%%%%%%%%%%*+====++=****===++%%@%%%*++***=*%@@@@@@@@@@
        %*%%%%%%%@%%%%%%%%%%%%%%%%%%@%%%%%%%%%@%**++=-+==+=+=*%%%%%*+*+***=+%%=---------




*/



//  Lista de cadenas ascii para cada modo.
const modes = {
    one: "#@%*+=-:. ",
    two: "@#%*+=-_. ",
    three: "█▓▒░ ",
    four: "⣿⡿⠿⠛⠁"
}
chars = modes.one;  //  Cadena ascii inicial.

let imageData, imageWidth, imageHeight; //  Variables globales para los datos de la imagen.

//  Subir imagen.
document.getElementById("uploadinput").addEventListener("change", function (e) {
    /*
        "change" se activa cuando se sube una imagen,
        el código toma el contexto 2d del canvas y crea un lector de archivos.
    */
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const reader = new FileReader();
    
    //  Leer el archivo.
    reader.onload = () => {
        //  Crear un objeto de imagen con los datos obtenidos.
        const imagen = new Image();
        imagen.src = reader.result;
        AsciiSizeRange.value = SizeRangeValues.max;
    
        //  Carga la imagen y realiza el escalado, para luego dibujar en el canvas.
        imagen.onload = () => {
            const scale = 2;
            //  Se crea un canvas temporal para escalar la imagen.
            const TemporalCanvas = document.createElement("canvas");
            const TemporalCtx = TemporalCanvas.getContext("2d", { willReadFrequently: true });
            
            //  Establece el nuevo tamaño.
            TemporalCanvas.width = imagen.width * scale;
            TemporalCanvas.height = imagen.height * scale;
            TemporalCtx.drawImage(imagen, 0, 0, TemporalCanvas.width, TemporalCanvas.height);
    
            //  Ajusta el canvas principal a las medidas escaladas previamente.
            canvas.width = TemporalCanvas.width;
            canvas.height = TemporalCanvas.height;
    
            //  Dibujar la imagen ya escalada en el canvas principal.
            ctx.drawImage(TemporalCanvas, 0, 0);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            imageWidth = canvas.width;
            imageHeight = canvas.height;
                
            updateAscii();  //  Actualiza la imagen ascii.
        };
    };

    //  Lee el archivo como una url de datos
    reader.readAsDataURL(this.files[0]);
});

//  Input Range para modificar el tamaño de la imagen ascii generada.
let AsciiSizeRange = document.getElementById("AsciiSizeRange")
const SizeRangeValues = {
    max: 40,
    min: 10,
    step: 2
}

//  Actualiza la imagen ascii.
function updateAscii() {
    if (!imageData) return; //  Si no existe algún dato de imagen, retornar.
    
    //  Variables para definir el ancho y alto de la imagen ascii.
    AsciiSizeRange.max = SizeRangeValues.max;
    AsciiSizeRange.min = SizeRangeValues.min;
    AsciiSizeRange.step = SizeRangeValues.step;

    //  Renderizamos la imagen.
    const renderAscii = () => {
        //  Ancho y alto dinámicos.
        let sizeWidth = parseInt(AsciiSizeRange.value);
        let sizeHeight = sizeWidth * 2;
        //  Datos de la imagen.
        const asciiString = imageToAscii(imageData.data, imageWidth, imageHeight, sizeWidth, sizeHeight);
        //  Imprimir la imagen en el elemento 'pre' Html.
        document.getElementById("pre").textContent = asciiString;

        updateButtonStates();
    }

    renderAscii();
    AsciiSizeRange.addEventListener("input", renderAscii)  //  Cuando modifiquemos el valor del input range se modificará la imagen ascii generada.
}

/*
    Convierte la imagen en formato de datos a una cadena ascii.
    Utiliza los datos de color y escala de grises para determinar qué carácter imprimir.
*/
function imageToAscii(data, width, height, sizeWidth, sizeHeight) {
    let asciiJump = "";

    /*
        Búcle para recorrer los píxeles de la imagen en bloques.
    */
    for (let y = 0; y < height; y += sizeHeight){
        for (let x = 0; x < width; x += sizeWidth) {
            let graySum = 0;
            let pixeles = 0;

            //  Búcle para cada píxel dentro del bloque de tamaño definido.
            for (let sizey = 0; sizey < sizeHeight; sizey++){
                for (let sizex = 0; sizex < sizeWidth; sizex++){
                    if (x + sizex < width && y + sizey < height){
                        const offset = ((y + sizey) * width + (x + sizex)) * 4;
                        const r = data[offset];
                        const g = data[offset + 1];
                        const b = data[offset + 2];
                        //  Cálculo de la escala de grises, si se aumentan los parámetros la imagen es más clara, caso contrario más oscura.
                        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
                        graySum += gray;
                        pixeles++;
                    }
                }
            }

            /*
            -   Promedio de la ecala de grises del bloque.
            -   Determina el índice del carácter para la escala.
            -   Agrega el carácter correspondiente.
            */
            const grayAvg = graySum / pixeles;
            const charIndex = Math.floor((grayAvg / 255) * (chars.length - 1));
            asciiJump += chars[charIndex];
        }

        asciiJump += '\n';  //  Salto de línea al final de cada fila.
    }

    return asciiJump;   //  Retorna la cadena ascii generada.
}





/*

    Limpiar y Copiar.

*/

//  Limpiar el canvas, el input file y el pre.
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    const uploadinput = document.getElementById("uploadinput");
    const pre = document.getElementById("pre");
    const canvas = document.getElementById("canvas");
    
    uploadinput.value = "";
    canvas.width = 0;
    canvas.height = 0;
    pre.textContent = "";

    updateButtonStates();
    AsciiSizeRange.value = SizeRangeValues.max;
});

//  Copiar el texto ascii al portapapeles.
const copy = document.getElementById("copy");
copy.addEventListener("click", () => {
    const pre = document.getElementById("pre").textContent;
    navigator.clipboard.writeText(pre);
    
    const text = document.getElementById("pre")
    const rango = document.createRange();
    rango.selectNodeContents(text);
    const seleccion = window.getSelection();
    seleccion.removeAllRanges();
    seleccion.addRange(rango);
});





/*

    Modos.

*/

const modeone = document.getElementById("modeone");
modeone.addEventListener("click", () => {
    chars = modes.one;
    if (imageData) updateAscii();
});

const modetwo = document.getElementById("modetwo");
modetwo.addEventListener("click", () => {
    //chars = "X@#&%$!mnuwsa+=-_,.";
    chars = modes.two;
    if (imageData) updateAscii();
});

const modethree = document.getElementById("modethree");
modethree.addEventListener("click", () => {
    chars = modes.three;
    if (imageData) updateAscii();
});

const modefour = document.getElementById("modefour");
modefour.addEventListener("click", () => {
    chars = modes.four;
    if(imageData) updateAscii();
})





/*

    Descargar la imagen generada en un fondo blanco con letras en negro.

*/

const download = document.getElementById("download");
download.addEventListener("click", () => {
    const pre = document.getElementById("pre");
    const style = getComputedStyle(pre);
    const lines = pre.textContent.split("\n");
    const screenWidth = window.innerWidth;
    const lineHeight = parseInt(style.lineHeight) || (screenWidth <= 720 ? 22 : 15);
    const padding = 2;
    const fontSize = parseInt(style.fontSize)
    const fontFamily = style.fontFamily;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = pre.offsetWidth + padding * 2;
    const height = lines.length * lineHeight - (screenWidth <= 720 ? 25 : 15);

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = style.backgroundColor || "#000";
    ctx.fillRect (0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = style.color || "#fff";
    ctx.textBaseline = "top";

    lines.forEach((line, i) => {
        ctx.fillText(line, padding, padding + i * lineHeight);
    });

    // Mantener el nombre original del archivo y agregar "-ascii.png".
    const inputfile = document.getElementById("uploadinput");
    const archivo = inputfile.files[0];
    const nombre = archivo.name.split('.').slice(0, -1).join('.');

    const link = document.createElement("a");
    link.download = `${nombre}-ascii.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
});

//  Habilitar o deshabilitar los botones en función de si hay o no hay una imagen ascii creada.
const ascii = document.getElementById("pre");
function updateButtonStates() {
    const avaiblecontent = ascii.textContent !== "";    //  Deshabilitar si no hay contenido.
    clear.disabled = !avaiblecontent;
    copy.disabled = !avaiblecontent;
    modeone.disabled = !avaiblecontent;
    modetwo.disabled = !avaiblecontent;
    modethree.disabled = !avaiblecontent;
    modefour.disabled = !avaiblecontent;
    download.disabled = !avaiblecontent;
    AsciiSizeRange.disabled = !avaiblecontent;
}

updateButtonStates();   //  Llamar a la función para actualizar el estado de los botones.
