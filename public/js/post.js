// Para Posts y para Categorias

$('#btn-guargarCat').click(()=>{
    let valido=ValidarCategoria();
    
    if(!(valido))
        return;
        
    let parametros = $('#form-categoria').serialize();
    console.log(parametros);
    $.ajax({
        url:'categorias/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            if (res._id != undefined){
                $('#repuesta-categoria').fadeIn(100);  
                cargarCategorias(res); 
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
});

function ValidarCategoria(){
    let valido=false;
    if(!($('#inputCategoria').val()==''||$('#inputCategoria').val()==undefined))
        valido=true;
    return valido;
}

// Cargar Categorias en select
(()=>{
    document.getElementById('categoria').innerHTML ='';
    $.ajax({
        url:'categorias/',
        method:'GET',
        dataType:'json',
        success:(res)=>{
            document.getElementById('categoria').innerHTML ='';
            for (let i = 0; i < res.length; i++) {
                cargarCategorias(res[i]);    
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
})();

function cargarCategorias(categoria){
    document.getElementById('categoria').innerHTML +=
            `<option value="${categoria._id}">${categoria.nombre}</option>`;     
}

$('#btn-guardarPost').click(()=>{
    // Obtener el contenido del editor CKEditor
    let post = CKEDITOR.instances['ed-post'].getData();

    let comentario = document.getElementsByName('v-comentario');
    for(i=0; i<comentario.length; i++){
        if(comentario[i].checked)
            var valComentario=comentario[i].value;
    }
    
    let id = '5d93b6d972b3c8238cfffc59'; //Matu
    let fecha= new Date();    
    let parametros=
            'titulo='+$('#titulo').val()+'&'+
            'autor='+id+'&'+
            'fecha='+fecha+'&'+ 
            'idCategoria='+$('#categoria').val()+'&'+
            'categoria='+$('#categoria option:selected').text()+'&'+
            'vComentario='+valComentario+'&'+
            'post='+post;

    //console.log(parametros);
    
    $.ajax({
        url:'posts/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            //console.log(res);
            if (res._id != undefined){
                $('#repuesta-post').fadeIn(100); 
                $('#btn-guardarPost').fadeOut(100); 
                $('#btn-verPost').attr('style',"display: block;"); 
                $('#_id').val(res._id);
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
});

$('#btn-verPost').click(()=>{
    let id = $('#_id').val();
    location.href='../vista_post.html?id='+id;
});
