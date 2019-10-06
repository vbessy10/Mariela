(()=>{
    let url= window.location.search.substring(1);
    url = url.split("=");
    let id= url[1];
    cargarVistaPost(id);
})();

function cargarVistaPost(id){
    $.ajax({
      url:`posts/${id}`,
      method:'get',
      dataType:'json',
      success:(res)=>{
          document.getElementById('vpTitulo').innerHTML = res.titulo;
          document.getElementById('div-vpCPost').innerHTML = res.post;
      },
      error:(error)=>{
          console.error(error);
      }
    });
  }