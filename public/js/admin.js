var campos=[
  'nav-entrada',
  'nav-usuario',
  'nav-pagina',
  'a-escritorio',
  'a-medios',
  'a-paginas',
  'a-entradas',
  'a-usuarios',
  'btn-addUsuario'
];
for(let i=0;i<campos.length;i++){
  $(`#${campos[i]}`).click(function(){
    $('.active').removeClass('active');
    $('.mostrar').addClass('oculto');
    $('.mostrar').removeClass('mostrar');

    if(campos[i] == 'nav-entrada' || campos[i] == 'a-entradas'){
      $('#a-entradas').addClass('active');
      $('#entrada').removeClass('oculto');
      $('#entrada').addClass('mostrar');
      CargarEntradas();
    }

    if(campos[i] == 'nav-usuario' || campos[i] == 'a-usuarios'){
      
      $('#a-usuarios').addClass('active');
      $('#usuarios').removeClass('oculto');
      $('#usuarios').addClass('mostrar');
      CargarUsuarios();
    }

    if(campos[i] == 'nav-pagina' || campos[i] == 'a-paginas'){
      $('#a-paginas').addClass('active');
      $('#paginas').removeClass('oculto');
      $('#paginas').addClass('mostrar');
    }

    if(campos[i] == 'a-escritorio'){
      $('#a-escritorio').addClass('active');
      $('#escritorio').removeClass('oculto');
      $('#escritorio').addClass('mostrar');
    }

    if(campos[i] == 'a-medios'){
      $('#a-medios').addClass('active');
      $('#medios').removeClass('oculto');
      $('#medios').addClass('mostrar');
    }
    
    if(campos[i] == 'btn-addUsuario'){
      $('#add-user').removeClass('oculto');
      $('#add-user').addClass('mostrar');
      
      AgregarUsuario();
    }

  });
}

$("#contraer-menu").click(function(){
  alert('presiono cerrar sesion');
  $('#nav-lateral').css({'max-width ':'5%'});
});

$(".e-perfil").click(function(){
  $('.active').removeClass('active');
  $('#a-usuarios').addClass('active');
  $('.mostrar').addClass('oculto');
  $('.mostrar').removeClass('mostrar');
  $('#ed-perfil').removeClass('oculto');
  $('#ed-perfil').addClass('mostrar');
  
  cargarEdPerfil('5d93b6d972b3c8238cfffc59');
});

$("#btn-newContraseña").click(function(){
  $('#newPassword').removeAttr('disabled');
});

$("#btn-verContrasenia").click(function(){
  if("password" == $('#contrasenia').attr("type")){
    $('#contrasenia').removeAttr('type');
    $('#contrasenia').attr({type:"text"});
  }else{
    $('#contrasenia').removeAttr('type');
    $('#contrasenia').attr({type:"password"});
  }
});

$('#agregar-entrada').click(()=>{
  $('.mostrar').addClass('oculto');
  $('.mostrar').removeClass('mostrar');
  $('#add-post').removeClass('oculto');
  $('#add-post').addClass('mostrar'); 
  $.ajax({
    url:'admin/post.html',
    method:'GET',
    dataType:'html',
    success:(res)=>{
      $('#add-post').html(res);
    },
    error:(error)=>{
      console.error(error);
    }
  });
});


function cargarEdPerfil(id){
  $('.mostrar').addClass('oculto');
  $('.mostrar').removeClass('mostrar');
  $('#ed-perfil').removeClass('oculto');
  $('#ed-perfil').addClass('mostrar');
  $.ajax({
    url:'admin/ed_perfil.html',
    method:'GET',
    dataType:'html',
    success:(res)=>{
      $('#ed-perfil').html(res);
      cargarUsuario(id)
    },
    error:(error)=>{
      console.error(error);
    }
  });
};

function cargarUsuario(id){
  //id = '5d93b6d972b3c8238cfffc59'; //Matu
  $.ajax({
    url:`usuarios/${id}`,
    method:'GET',
    dataType:'json',
    success:(user)=>{
        document.getElementById('_id').value = id;
        document.getElementById('acNombre').value = user.nombre;
        document.getElementById('acApellido').value = user.apellido;
        document.getElementById('acEmail').value = user.correo;
        document.getElementById('acPassword').value = user.contrasenia;
        (user.fechaNacimiento==undefined || user.fechaNacimiento==null)?'':document.getElementById('acNacimiento').value=user.fechaNacimiento;
        document.getElementById('acTipo').value=user.tipoUsuario.id;
        document.getElementById('usuario').innerHTML=user.usuario;
        let opcionesGenero = document.querySelectorAll('input[type="radio"][name="genero"]');
        for(let i=0; i<opcionesGenero.length;i++){ 
            if (opcionesGenero[i].value == user.genero){
                opcionesGenero[i].checked = true;
            }
        };  
        (user.imagen==undefined || user.imagen==null)?null:document.getElementById('perfil-img').src = user.imagen;
        document.getElementById('newPassword').value='';
        document.getElementById('newPassword').setAttribute("disabled", "disabled");
    },
    error:(error)=>{
        console.error(error);
    }
  });
}

$('#btn-actualizar').click(()=>{
  actualizarUsuario();
})

function actualizarUsuario(){
  let campos = [
    {id:'acNombre', valido:false},
    {id:'acApellido', valido:false},
    {id:'acEmail', valido:false},
    {id:'acTipo', valido:false},
    {id:'acPassword', valido:false}
  ];

  let persona = validarCampos(campos);
    
  if (persona==null || persona == undefined)
      return;
  
  let parametros = $('#ac-perfil').serialize();
  let id = document.getElementById('_id').value;

  $.ajax({
    url:`usuarios/${id}`,
    method:'PUT',
    data:parametros,
    dataType:'json',
    success:(res)=>{
        if (res.ok == 1){
          $('.respuesta').fadeIn(100);
          cargarUsuario(id);
        }
    },
    error:(error)=>{
        console.error(error);
    }
  });
};

function validarCampos(campos){
  for (let i = 0; i<campos.length; i++)
      campos[i].valido = validarCampoVacio(campos[i].id);

  for (let i = 0; i<campos.length; i++)
      if (!campos[i].valido)
          return;
          
  let usuario = enviarDatos(campos);
  return usuario;
}

function enviarDatos(campos){
  for (let i = 0; i<campos.length; i++){
    (campos[i].id=='nombre'|| campos[i].id=='acNombre')? nom=campos[i].id:null;
    (campos[i].id=='apellido'|| campos[i].id=='acApellido')? apel=campos[i].id:null;
    (campos[i].id=='correo'|| campos[i].id=='acEmail')? email=campos[i].id:null;
    (campos[i].id=='tipo'|| campos[i].id=='acTipo')? tUser=campos[i].id:null;
    (campos[i].id=='contrasenia'|| campos[i].id=='acPassword')? pass=campos[i].id:null;
    (campos[i].id=='usuario')? user=campos[i].id:null;
    (campos[i].id=='nacimiento')? date=campos[i].id:null;
  }

  let usuario = {
    nombre:document.getElementById(nom).value,
    apellido: document.getElementById(apel).value,
    tipo: document.getElementById(tUser).value, 
    correo: document.getElementById(email).value,
    contrasenia: document.getElementById(pass).value
  }
  
  return usuario;
};

function validarCampoVacio(id){
  let resultado = ($("#"+id).val()=="")?false:true;
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
  }else{
      $('#'+campo).addClass('is-invalid');
  }
}

function AgregarUsuario(){
  $.ajax({
    url:'admin/new-user.html',
    method:'GET',
    dataType:'html',
    success:(res)=>{
      $('#add-user').html(res);
    },
    error:(error)=>{
      console.error(error);
    }
  });
};

$('#btn-guardar').click(()=>{
  crearUsuario();
});

function crearUsuario(){
  let campos = [
    {id:'nombre', valido:false},
    {id:'apellido', valido:false},
    {id:'usuario', valido:false},
    {id:'correo', valido:false},
    {id:'tipo', valido:false},
    {id:'nacimiento', valido:false},
    {id:'contrasenia', valido:false}
  ];

  let persona = validarCampos(campos);

  if (persona==null || persona == undefined){
    $('#respuesta1').fadeIn(100);
    return;
  }

  $('#respuesta1').fadeOut(100);
  let parametros = $('#NF-user').serialize();

  $.ajax({
    url:`usuarios/`,
    method:'POST',
    data:parametros,
    dataType:'json',
    success:(res)=>{
        $('#respuesta').fadeIn(100);
    },
    error:(error)=>{
        console.error(error);
    }
  });
};

function CargarUsuarios(){
  document.getElementById('tbl-usuarios').innerHTML = '';
  $.ajax({
    url:'usuarios/',
    method:'GET',
    dataType:'json',
    success:(user)=>{
      document.getElementById('tbl-usuarios').innerHTML = '';
      for (let i = 0; i < user.length; i++) {
        anexarUsuarioFila(user[i]);
      }
    },
    error:(error)=>{
        console.error(error);
    }
  });
}

function anexarUsuarioFila(usuario){
  
  document.getElementById('tbl-usuarios').innerHTML +=
      `<tr id="${usuario._id}">
          <td class="checkbox"><input type="checkbox"></td>
          <td><a href="#ed-perfil" onclick="cargarEdPerfil('${usuario._id}')" class="td-a">${usuario.usuario}</a></td>
          <td>${usuario.nombre+' '+usuario.apellido}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.tipoUsuario.tUsuario}</td>
          <td>0</td>
          <td><button type="button" onclick="eliminarUsuario('${usuario._id}')" title="Eliminar"><i class="fas fa-trash-alt i-eliminar"></i></button></td>
      </tr>`;
}

function eliminarUsuario(id){
  $.ajax({
    url:`usuarios/${id}`,
    method:'delete',
    dataType:'json',
    success:(res)=>{
        if (res.ok == 1)
            $(`#${id}`).remove();
    },
    error:(error)=>{
        console.error(error);
    }
});
}

function CargarEntradas(){
  document.getElementById('tbl-entradas').innerHTML = '';
  
  $.ajax({
    url:'posts/',
    method:'GET',
    dataType:'json',
    success:(post)=>{
      document.getElementById('tbl-entradas').innerHTML = '';
      for (let i = 0; i < post.length; i++) {
        anexarPostFila(post[i]);
      }
    },
    error:(error)=>{
        console.error(error);
    }
  });
}

function anexarPostFila(post){
  let date = post.fecha;
  date = date.split(" ");
  let mes = date[1];
  let dia = date[2];
  let anio = date[3];
  //console.log(date);
  document.getElementById('tbl-entradas').innerHTML += 
    `<tr id="${post._id}">
        <td class="checkbox"><input type="checkbox"></td>
        <td><a href="vista_post.html?id=${post._id}" target="_blank" class="td-a">${post.titulo}</a></td>
        <td>${post.autor}</td>
        <td>${post.categoria.categoria}</td>
        <td>${dia}-${mes}-${anio}</td>
        <td><button type="button" onclick="eliminarPost('${post._id}')" title="Eliminar"><i class="fas fa-trash-alt i-eliminar"></i></button></td>
    </tr>`;
}

function eliminarPost(id){
  $.ajax({
    url:`posts/${id}`,
    method:'delete',
    dataType:'json',
    success:(res)=>{
        if (res.ok == 1)
            $(`#${id}`).remove();
    },
    error:(error)=>{
        console.error(error);
    }
  });
}