
// Cargar Paginas en select
(()=>{
    document.getElementById('paginaPadre').innerHTML ='';
    $.ajax({
        url:'paginas/',
        method:'GET',
        dataType:'json',
        success:(res)=>{
            document.getElementById('paginaPadre').innerHTML ='<option value=""></option>';
            for (let i = 0; i < res.length; i++) {
                cargarPaginas(res[i]);    
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
})();

function cargarPaginas(pagina){
    document.getElementById('paginaPadre').innerHTML +=
            `<option value="${pagina._id}">${pagina.titulo}</option>`;     
}

$('#btn-guardarPagina').click(()=>{
    // Obtener el contenido del editor CKEditor
    let pagina = CKEDITOR.instances['ed-pagina'].getData();
    
    let id = '5d93b6d972b3c8238cfffc59'; //Matu
    let fecha= new Date();    

    let parametros=
            'titulo='+$('#titulo').val()+'&'+
            'descripcion='+$('#descripcion').val()+'&'+
            'autor='+id+'&'+
            'fecha='+fecha+'&'+ 
            //'idpadre='+$('#paginaPadre').val()+'&'+
            //'padre='+$('#paginaPadre option:selected').text()+'&'+
            'favicon='+document.getElementById("img-favicon").src+'&'+
            'logotipo='+document.getElementById("img-logotipo").src+'&'+
            'cpagina='+pagina
            if($('#paginaPadre').val()!=null||$('#paginaPadre').val()!=''){
                +'&'+'idpadre='+$('#paginaPadre').val()+'&'+
                'padre='+$('#paginaPadre option:selected').text()
            };

    //console.log(parametros);
    $.ajax({
        url:'paginas/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            //console.log(res);
            if (res._id != undefined){
                $('#repuesta-pagina').fadeIn(100); 
                $('#btn-guardarPagina').fadeOut(100); 
                $('#btn-verPagina').attr('style',"display: block;"); 
                $('#_id').val(res._id);
                cargarPaginas(res);
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
});

$('#btn-verPagina').click(()=>{
    let id = $('#_id').val();
    location.href='../vista_pagina.html?id='+id;
});

Dropzone.autoDiscover = false;
//if (this.element.dropzone) { return this.element.dropzone; } 
var favicon = new Dropzone('#favicon-dropzone', {
    url:'/cargar-favicon',
    method:'POST',
    previewTemplate: document.querySelector('#preview-template').innerHTML,
    parallelUploads: 1,
    thumbnailHeight: 120,
    thumbnailWidth: 120,
    maxFilesize: 3,
    maxFiles: 1,
    filesizeBase: 2,
    acceptedFiles: ".ico",
    thumbnail: function(file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove("dz-file-preview");
        var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i];
          thumbnailElement.name = 'img-favicon';
          thumbnailElement.id = 'img-favicon';
          thumbnailElement.alt = file.name;
          thumbnailElement.src = dataUrl;
        }
        setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
      }
    },
    init: function() {
        this.on("maxfilesexceeded", function(file) {
              this.removeAllFiles();
              this.addFile(file);
        });
  } 

});

var logotipo = new Dropzone('#logotipo-dropzone', {
    url:'/cargar-logotipo',
    method:'POST',
    previewTemplate: document.querySelector('#preview-template').innerHTML,
    parallelUploads: 1,
    thumbnailHeight: 120,
    thumbnailWidth: 120,
    maxFilesize: 3,
    maxFiles: 1,
    acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
    thumbnail: function(file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove("dz-file-preview");
        var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i];
          thumbnailElement.name = 'img-logotipo';
          thumbnailElement.id = 'img-logotipo';
          thumbnailElement.alt = file.name;
          thumbnailElement.src = dataUrl;
        }
        setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
      }
    },
    init: function() {
        this.on("maxfilesexceeded", function(file) {
              this.removeAllFiles();
              this.addFile(file);
        });
  }  
});

  
  // Now fake the file upload, since GitHub does not handle file uploads
  // and returns a 404

  var minSteps = 6,
      maxSteps = 60,
      timeBetweenSteps = 100,
      bytesPerStep = 100000;


  favicon.uploadFiles = function(files) {

    var self = this;
  
    for (var i = 0; i < files.length; i++) {
  
      var file = files[i];
      totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));
  
      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);
        setTimeout(function(file, totalSteps, step) {
          return function() {
            file.upload = {
              progress: 100 * (step + 1) / totalSteps,
              total: file.size,
              bytesSent: (step + 1) * file.size / totalSteps
            };
  
            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
            if (file.upload.progress == 100) {
              file.status = Dropzone.SUCCESS;
              self.emit("success", file, 'success', null);
              self.emit("complete", file);
              self.processQueue();
              
              //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
            }
          };
        }(file, totalSteps, step), duration);
      }
    }
  };

  logotipo.uploadFiles = function(files) {
    var self = this;
  
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));
  
      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);
        setTimeout(function(file, totalSteps, step) {
          return function() {
            file.upload = {
              progress: 100 * (step + 1) / totalSteps,
              total: file.size,
              bytesSent: (step + 1) * file.size / totalSteps
            };
  
            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
            if (file.upload.progress == 100) {
              file.status = Dropzone.SUCCESS;
              self.emit("success", file, 'success', null);
              self.emit("complete", file);
              self.processQueue();
              //console.error('Aqui estoy en logotipo');
              //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
            }
          };
        }(file, totalSteps, step), duration);
      }
    }
  };
