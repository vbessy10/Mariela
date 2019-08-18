$("#nav-entrada").click(function(){
  $('.active').removeClass('active');
  $('#a-entradas').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#entrada').removeAttr('hidden');
});
$("#nav-usuario").click(function(){
  $('.active').removeClass('active');
  $('#a-usuarios').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#entrada').removeAttr('hidden');
});
$("#nav-pagina").click(function(){
  $('.active').removeClass('active');
  $('#a-paginas').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#paginas').removeAttr('hidden');
});
$("#a-escritorio").click(function(){
  $('.active').removeClass('active');
  $('#a-escritorio').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#escritorio').removeAttr('hidden');
});
$("#a-medios").click(function(){
  $('.active').removeClass('active');
  $('#a-medios').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#medios').removeAttr('hidden');
});
$("#a-paginas").click(function(){
  $('.active').removeClass('active');
  $('#a-paginas').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#paginas').removeAttr('hidden');
});
$("#a-usuarios").click(function(){
  $('.active').removeClass('active');
  $('#a-usuarios').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#entrada').removeAttr('hidden');
});
$("#a-entradas").click(function(){
  $('.active').removeClass('active');
  $('#a-entradas').addClass('active');
  $('section').attr({hidden: "hidden"});
  $('#entrada').removeAttr('hidden');
});

$("#contraer-menu").click(function(){
  alert('presiono cerrar menu');
  $('#nav-lateral').css({'max-width ':'5%'});
});