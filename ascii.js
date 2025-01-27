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




let chars = "#@%*+=-:. ";
let imageData, imageWidth, imageHeight;

//  Subir imagen.
document.getElementById("uploadinput").addEventListener("change", function (e) {
    /*
        Toma el contexto (la imagen cargada) y la transforma a 2d, eje x & eje y.
        Crea un lector de archivos.
    */
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const reader = new FileReader();
    
    //  Cargar archivo
    reader.onload = () => {
        //  Crear la imagen.
        const imagen = new Image();
        imagen.src = reader.result;
    
        //  Cargar la reciente imagen.
        imagen.onload = () => {
            const scale = 2;
            //  Crear un canvas temporal para escalar la imagen.
            const TemporalCanvas = document.createElement("canvas");
            const TemporalCtx = TemporalCanvas.getContext("2d", { willReadFrequently: true });
            TemporalCanvas.style.display = "none";
            
            TemporalCanvas.width = imagen.width * scale;
            TemporalCanvas.height = imagen.height * scale;
            TemporalCtx.drawImage(imagen, 0, 0, TemporalCanvas.width, TemporalCanvas.height);
    
            //  Asignar las características de la imagen escalada al canvas.
            canvas.width = TemporalCanvas.width;
            canvas.height = TemporalCanvas.height;
    
            //  Dibujar la imagen con sus datos.
            ctx.drawImage(TemporalCanvas, 0, 0);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            imageWidth = canvas.width;
            imageHeight = canvas.height;
                
            updateAscii();
        };
    };
    
    reader.readAsDataURL(this.files[0]);
});
    
function updateAscii() {
    if (!imageData) return;
    
    //  Definir el ancho y alto de la imagen ascii dependiendo de que imagen subimos.
    let sizeWidth, sizeHeight;
    if (imageWidth < 500){
        sizeWidth = 5;
        sizeHeight = 10;
    }
    if (imageWidth >= 500){
        sizeWidth = 10;
        sizeHeight = 20;
    }
    if (imageWidth >= 1000){
        sizeWidth = 25;
        sizeHeight = 50;
    }
    
    const asciiString = imageToAscii(imageData.data, imageWidth, imageHeight, sizeWidth, sizeHeight);
    document.getElementById("pre").textContent = asciiString;

    updateButtonStates();
}

/*
    Con los datos necesarios, representar la imagen en formato ascii,
    definiendo los chars utilizados,
    el ancho y alto de la imagen final,
    los niveles de iluminación,
    y la escala de grises a utilizar.
*/
function imageToAscii(data, width, height, sizeWidth, sizeHeight) {
    let asciiJump = "";

    /*
        Definir variables y e x, en búcles for que recorran la imagen,
        y sean de menor tamaño que el ancho del canvas (la imagen).
    */
    for (let y = 0; y < height; y += sizeHeight){
        for (let x = 0; x < width; x += sizeWidth) {
            let graySum = 0;
            let pixeles = 0;

            for (let sizey = 0; sizey < sizeHeight; sizey++){
                for (let sizex = 0; sizex < sizeWidth; sizex++){
                    if (x + sizex < width && y + sizey < height){
                        const offset = ((y + sizey) * width + (x + sizex)) * 4;
                        const r = data[offset];
                        const g = data[offset + 1];
                        const b = data[offset + 2];
                        //const gray = 0.3 * r + 0.59 * g + 0.11 * b;   //  escala original, si aumentás los parámetros es más claro, caso contrario más oscuro.
                        const gray = 0.29 * r + 0.58 * g + 0.10 * b;
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

    Botones.

*/

//  Limpiar el canvas, el pre y el input file.
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
});

//  Copiar el texto de pre.
const copy = document.getElementById("copy");
copy.addEventListener("click", () => {
    const pre = document.getElementById("pre").innerHTML;
    navigator.clipboard.writeText(pre);
    
    const text = document.getElementById("pre")
    const rango = document.createRange();
    rango.selectNodeContents(text);
    const seleccion = window.getSelection();
    seleccion.removeAllRanges();
    seleccion.addRange(rango);
});

//  Cambiar los chars al mode one.
const modeone = document.getElementById("modeone");
modeone.addEventListener("click", () => {
    chars = "#@%*+=-:. ";
    if (imageData) updateAscii();
});

//  Cambiar los chars al mode two.
const modetwo = document.getElementById("modetwo");
modetwo.addEventListener("click", () => {
    chars = "█▓▒░ ";
    if (imageData) updateAscii();
});

//  Descargar la imagen ascii.
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

    //  Mantener nombre orginal y agregar "-ascii.png".
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
    const avaiblecontent = ascii.textContent !== "";
    clear.disabled = !avaiblecontent;
    copy.disabled = !avaiblecontent;
    modeone.disabled = !avaiblecontent;
    modetwo.disabled = !avaiblecontent;
    download.disabled = !avaiblecontent;
}

updateButtonStates();
