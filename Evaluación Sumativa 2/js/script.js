function validar()
{
    const retValidarNombre = validarNombre();
    const retValidarContrasenha = validarContrasenha();
    const retValidarDireccion = validarDireccion();
    const retValidarTelefono = validarTelefono();
    const retValidarAficiones = validarAficiones();

    const todoValido = retValidarNombre && retValidarContrasenha && retValidarDireccion && retValidarTelefono && retValidarAficiones;

    if (todoValido)
    {
        const nombre = document.getElementById("nombre").value;
        const contrasenha = document.getElementById("contrasenha").value;
        const direccion = document.getElementById("direccion").value;
        const telefono = document.getElementById("telefono").value;

        const { comuna, url } = obtenerDatosExtra();

        const mensaje = 
            "Formulario válido. Datos ingresados:\n" +
            "Nombre: " + nombre + "\n" +
            "Contraseña: " + contrasenha + "\n" +
            "Dirección: " + direccion + "\n" +
            "Teléfono: " + telefono + "\n" +
            "Comuna: " + comuna + "\n" +
            "URL: " + url + "\n" +
            "Aficiones: " + listaAficiones.join(", ");

        alert(mensaje);
    }

    return todoValido;
}

function validarNombre()
{
    const inputNombre = document.getElementById("nombre");
    const errorNombre = document.getElementById("error-nombre");

    let nombre = inputNombre.value;

    if (nombre === "")
    {
        errorNombre.innerText = "Nombre obligatorio";
        errorNombre.className = "text-danger small";
        return false;
    }

    const regex = /^[A-Za-z][A-Za-z0-9]{4,9}$/;

    if (!regex.test(nombre))
    {
        errorNombre.innerText = "Debe contener minimo 5 y maximo 10 caracteres, comenzar con letra y no puede tener caracteres especiales (simbolos o acentos).";
        errorNombre.className = "text-danger small";
        return false;
    }

    const soloLetras = /^[A-Za-z]+/;
    const soloDigitosAlFinal = /[0-9]*$/;

    const letras = nombre.match(soloLetras)?.[0] ?? "";
    const digitos = nombre.slice(letras.length);

    if (/\d/.test(letras))
    {
        errorNombre.innerText = "Los números solo pueden ir al final";
        errorNombre.className = "text-danger small";
        return false;
    }

    errorNombre.innerText = "";
    return true;
}



function validarContrasenha()
{
    const inputContrasenha = document.getElementById("contrasenha");
    const errorContrasenha = document.getElementById("error-contrasenha");
    const inputContrasenha2 = document.getElementById("contrasenha2");
    const errorContrasenha2 = document.getElementById("error-contrasenha2");
    const inputNombre = document.getElementById("nombre");

    let contrasenha = inputContrasenha.value;
    let contrasenha2 = inputContrasenha2.value;
    let nombreUsuario = inputNombre.value.trim();

    let valido = true;

    if (contrasenha == "")
    {
        errorContrasenha.innerText = "Contraseña obligatoria";
        errorContrasenha.className = "text-danger small";
        valido = false;
    } else
    {
        if (contrasenha.length < 3 || contrasenha.length > 6)
        {
            errorContrasenha.innerText = "La contraseña debe tener entre 3 y 6 caracteres";
            errorContrasenha.className = "text-danger small";
            valido = false;
        }
        else if (!contieneLetraYDigito(contrasenha))
        {
            errorContrasenha.innerText = "La contraseña debe contener al menos una letra y un dígito";
            errorContrasenha.className = "text-danger small";
            valido = false;
        }
        else if (nombreUsuario !== "" && contrasenha.toLowerCase().includes(nombreUsuario.toLowerCase()))
        {
            errorContrasenha.innerText = "La contraseña no puede ser igual al nombre de usuario";
            errorContrasenha.className = "text-danger small";
            valido = false;
        } else
        {
            errorContrasenha.innerText = "";
            errorContrasenha.className = "";
        }
    }

    if (contrasenha2 == "")
    {
        errorContrasenha2.innerText = "Las contraseñas no son iguales";
        errorContrasenha2.className = "text-danger small";
        valido = false;
    } else
    {
        errorContrasenha2.innerText = "";
        errorContrasenha2.className = "";
    }

    if (contrasenha !== "" && contrasenha2 !== "" && contrasenha !== contrasenha2)
    {
        errorContrasenha2.innerText = "Las contraseñas no coinciden";
        errorContrasenha2.className = "text-danger small";
        valido = false;
    }
    return valido;
}


function validarDireccion()
{
    const inputDireccion = document.getElementById("direccion");
    const errorDireccion = document.getElementById("error-direccion");

    let direccion = inputDireccion.value;

    if (direccion == "")
    {
        errorDireccion.innerText = "Direccion obligatoria";
        errorDireccion.className = "text-danger small";
        return false;
    }
    else
    {
        errorDireccion.innerText = "";
        return true;
    }
}


function validarTelefono()
{
    const inputTelefono = document.getElementById("telefono");
    const errorTelefono = document.getElementById("error-telefono");

    let telefono = inputTelefono.value;

    if (telefono == "")
    {
        errorTelefono.innerText = "Telefono obligatorio";
        errorTelefono.className = "text-danger small";
        return false;
    }

    if (isNaN(telefono))
    {
        errorTelefono.innerText = "El telefono debe ser un numero";
        errorTelefono.className = "text-danger small";
        return false;
    }
    else
    {
        errorTelefono.innerText = "";
        return true;
    }
}

let listaAficiones = [];
document.getElementById("agregarAficion").addEventListener("click", function() {
    agregarAficion();
});

function validarAficiones() 
{
    const errorAficion = document.getElementById("error-aficion");

    if (listaAficiones.length < 2) {
        errorAficion.innerText = "Se requieren al menos dos aficiones para enviar.";
        errorAficion.className = "text-danger small";
        return false;
    } else
    {
    errorAficion.innerText = "";
    errorAficion.className = "";
    return true;
    }
}

function agregarAficion() {
    const inputAficion = document.getElementById("aficion");
    const errorAficion = document.getElementById("error-aficion");
    const lista = document.getElementById("listaAficiones");

    let aficion = inputAficion.value.trim();

    if (aficion === "") {
        errorAficion.innerText = "La afición no puede estar vacía";
        errorAficion.className = "text-danger small";
        return;
    } else {
        errorAficion.innerText = "";
        errorAficion.className = "";
    }

    listaAficiones.push(aficion);

    inputAficion.value = "";

    const li = document.createElement("li");
    li.textContent = aficion;
    li.className = "list-group-item";
    lista.appendChild(li);
}

function obtenerDatosExtra()
{
    const comuna = document.getElementById("comuna").value.trim();
    const url = document.getElementById("url").value.trim();

    return { comuna, url };
}

function contieneLetraYDigito(str)
{
    let tieneLetra = false;
    let tieneDigito = false;

    for (let i = 0; i < str.length; i++)
    {
        const c = str.charAt(i);
        if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')
        {
            tieneLetra = true;
        } else if (c >= '0' && c <= '9')
        {
            tieneDigito = true;
        }
        
        if (tieneLetra && tieneDigito)
        {
            return true;
        }
    }
    return tieneLetra && tieneDigito;
}