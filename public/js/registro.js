var campos = [
    {id:'inputEmail', valido:false},
    {id:'inputPassword', valido:false},
    {id:'nombre', valido:false},
    {id:'apellido', valido:false},
    {id:'usuario', valido:false}
];

$(document).ready(function(){
    $("input").keypress(function(e){
        if(e.which == 13)
            validarCampos();
    });
});

$('#btn-registro').click(function(){
    validarCampos();
});

function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);

    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return;
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