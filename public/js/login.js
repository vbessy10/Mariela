var campos = [
    {id:'inputEmail', valido:false},
    {id:'inputPassword', valido:false}
];

$(document).ready(function(){
    $("input").keypress(function(e){
        if(e.which == 13)
            IniciarSesion();
    });
});

$('#btn-login').click(function(){
    IniciarSesion();
});

function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);

    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return;

    let usuario = {
        correo: document.getElementById('inputEmail').value,
        contrasenia: document.getElementById('inputPassword').value
    }

    return usuario;
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
    }else{
        $('#'+campo).addClass('is-invalid');
    }
}

function IniciarSesion(){
    
    let usuario = validarCampos();
    
    if (usuario==null || usuario == undefined)
        return;
    
    $.ajax({
        url:`usuarios/correo/${$('#inputEmail').val()}`,
        method:'GET',
        dataType:'json',
        success:(res)=>{ 
            /*
            for (let i = 0; i < res.length; i++) {
                console.log(res[i]);  
            }
            */
            if (res.contrasenia == $('#inputPassword').val()){
                location.href='../admin.html';
            }else{
                $('#inputEmail').addClass('is-invalid');
                $('#inputPassword').addClass('is-invalid');
                $('.respuesta').fadeIn(100);
            }
                /*
                setTimeout (()=>{location.href='../admin.html'}, 1000);}*/
        },
        error:(error)=>{
            $('#inputEmail').addClass('is-invalid');
            $('#inputPassword').addClass('is-invalid');
            $('.respuesta').fadeIn(100);
            console.error(error);
        }
    });
}