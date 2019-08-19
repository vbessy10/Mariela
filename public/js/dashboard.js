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
  console.log(campos[i]);
  $(`#${campos[i]}`).click(function(){
    $('.active').removeClass('active');
    $('.mostrar').addClass('oculto');
    $('.mostrar').removeClass('mostrar');

    if(campos[i] == 'nav-entrada' || campos[i] == 'a-entradas'){
      $('#a-entradas').addClass('active');
      $('#entrada').removeClass('oculto');
      $('#entrada').addClass('mostrar');
    }

    if(campos[i] == 'nav-usuario' || campos[i] == 'a-usuarios'){
      $('#a-usuarios').addClass('active');
      $('#usuarios').removeClass('oculto');
      $('#usuarios').addClass('mostrar');
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
    }

  });
}

$("#contraer-menu").click(function(){
  alert('presiono cerrar menu');
  $('#nav-lateral').css({'max-width ':'5%'});
});

$(".e-perfil").click(function(){
  $('.active').removeClass('active');
  $('#a-usuarios').addClass('active');
  $('.mostrar').addClass('oculto');
  $('.mostrar').removeClass('mostrar');
  $('#ed-perfil').removeClass('oculto');
  $('#ed-perfil').addClass('mostrar');
});

$("#btn-newContraseña").click(function(){
  $('#newPassword').removeAttr('disabled');
});

$("#btn-verContrasenia").click(function(){
  if("password" == $('#inputPassword').attr("type")){
    $('#inputPassword').removeAttr('type');
    $('#inputPassword').attr({type:"text"});
  }else{
    $('#inputPassword').removeAttr('type');
    $('#inputPassword').attr({type:"password"});
  }
});
