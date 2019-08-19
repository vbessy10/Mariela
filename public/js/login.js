var campos = [
    {id:'inputEmail', valido:false},
    {id:'inputPassword', valido:false}
];

$(document).ready(function(){
    $("input").keypress(function(e){
        if(e.which == 13)
            validarCampos();
    });
});

$('#btn-login').click(function(){
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
    if(id=='inputEmail'&& resultado){
        let valor = validarCorreo($('#'+id).val());
        resultado = valor;
    }
    marcarInput(id, resultado);
    return resultado; 
}

function validarCorreo(correo){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo);
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