var campos = [
    {id:'correo', valido:false},
    {id:'contrasenia', valido:false},
    {id:'nombre', valido:false},
    {id:'apellido', valido:false},
    {id:'usuario', valido:false}
];

$(document).ready(function(){
    $("input").keypress(function(e){
        if(e.which == 13)
            registrarUsuario();
    });
});


function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);

    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return;
    
    let persona = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        usuario: document.getElementById('usuario').value, 
        correo: document.getElementById('correo').value,
        contrasenia: document.getElementById('contrasenia').value
    }

    return persona;
}

function validarCampoVacio(id){
    let resultado = ($("#"+id).val()=="")?false:true;
    marcarInput(id, resultado);
    return resultado; 
}

function validarCorreo(correo){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo.value);
    marcarInput(correo.id, resultado);
    return resultado;
}

function validarContrasenia(contrasenia){
    var re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    let resultado = re.test(contrasenia.value);
    marcarInput(contrasenia.id, resultado);
    return resultado;
}

function marcarInput(campo, valor){
    if(valor){
        $('#'+campo).removeClass('is-invalid');
        $('#'+campo).addClass('is-valid');
    }else{
        $('#'+campo).removeClass('is-valid');
        $('#'+campo).addClass('is-invalid');
    }
}


$('#btn-registro').click(function(){
    registrarUsuario();
});


function registrarUsuario(){
    let persona = validarCampos();
    
    if (persona==null || persona == undefined)
        return;
    
    let parametros = $('#form-registro').serialize();
     
    $.ajax({
        url:'usuarios/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            if (res._id != undefined){
                $('.respuesta').fadeIn(100);
                setTimeout (()=>{location.href='../login.html'}, 1000);}
        },
        error:(error)=>{
            console.error(error);
        }
    });
    
}