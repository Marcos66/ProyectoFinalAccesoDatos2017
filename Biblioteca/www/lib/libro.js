/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint
$.libro={};
// Configuración del HOST y URL del servicio
$.libro.HOST = 'http://localhost:8080';
// $.alumno.URL = '/GA-JPA/webresources/com.iesvdc.acceso.entidades.alumno';
//http://localhost:8080/Libreria-JPA/webresources/com.iesvdc.acceso.entidades.libro
$.libro.URL = '/Libreria-JPA/webresources/com.iesvdc.acceso.entidades.libro';

$.libro.LibroReadREST = function(id) {
    if ( id === undefined ) {
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Listado de Libros</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>Autor</th>', '<th>Isbn</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    tbody.append($('<tr />').append('<td>' + json[clave].id + '</td>',
                                '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].autor + '</td>', '<td>' + json[clave].isbn + '</td>'));
                }
                table.append(tbody);

                $('#r_libro').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Error conectando al servidor</h3>');
                $('#r_libro').append('<p>Inténtelo más tarde</p>');
            }
        });
    } else {
        $.ajax({
            url: 'http://localhost:8080/Libreria-JPA/webresources/com.iesvdc.acceso.entidades.libro',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                
            },
            error: function (xhr, status) {
                this.error('Imposible leer alumno','Compruebe su conexión e inténtelo de nuevo más tarde');
            }
        });
    }
};

$.libro.LibroCreateREST = function(){
    var datos = {
        'nombre' : $("#c_lib_nombre").val(),
        'autor': $("#c_lib_autor").val(),
        'isbn': $("#c_lib_isbn").val()
    };
    
    // comprobamos que en el formulario haya datos...
    if ( datos.nombre.length>2 && datos.autor.length>2  ) {
        $.ajax({
            url: $.libro.HOST+$.libro.URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.libro.LibroReadREST();
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.libro.error('Error: Alumno Create','No ha sido posible crear el alumno. Compruebe su conexión.');
            }
        });
        
        // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
        $.afui.clearHistory();
        // cargamos el panel con id r_alumno.
        $.afui.loadContent("#r_libro",false,false,"up");
    }
    
};

$.libro.LibroDeleteREST = function(id){
    // si pasamos el ID directamente llamamos al servicio DELETE
    // si no, pintamos el formulario de selección para borrar.
    if ( id !== undefined ) {
        id = $('#d_lib_sel').val();
        $.ajax({
            url: $.libro.HOST+$.libro.URL+'/'+id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            // data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.libro.LibroReadREST();
                // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
                $.afui.clearHistory();
                // cargamos el panel con id r_alumno.
                $.afui.loadContent("#r_libro",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.libro.error('Error: Alumno Delete','No ha sido posible borrar el alumno. Compruebe su conexión.');
            }
        });    
    } else{
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#d_libro').empty();
                var formulario = $('<div />');
                formulario.addClass('container');
                var select = $('<select id="d_lib_sel" />');
                select.addClass('form-group');
                for (var clave in json){
                    select.append('<option value="'+json[clave].id+'">'+json[clave].nombre+' ' + json[clave].autor+' '+ json[clave].isbn+'</option>');
                }
                formulario.append(select);
                formulario.append('<div class="btn btn-danger" onclick="$.libro.LibroDeleteREST(1)"> eliminar! </div>');
                $('#d_libro').append(formulario).append(select);
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.libro.error('Error: Alumno Delete','No ha sido posible conectar al servidor. Compruebe su conexión.');
            }
        });
    }
    
};

$.libro.LibroUpdateREST = function(id, envio){
    if ( id === undefined ) {
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#u_libro').empty();
                $('#u_libro').append('<h3>Pulse sobre un libro</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>autor</th>', '<th>isbn</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    // le damos a cada fila un ID para luego poder recuperar los datos para el formulario en el siguiente paso
                    tbody.append($('<tr id="fila_'+json[clave].id+'" onclick="$.libro.LibroUpdateREST('+json[clave].id+')"/>').append('<td>' + json[clave].id + '</td>',
                    '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].autor + '</td>', '<td>' + json[clave].isbn + '</td>'));
                }
                table.append(tbody);

                $('#u_libro').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $.libro.error('Error: Alumno Update','Ha sido imposible conectar al servidor.');
            }
        });
    } else if (envio === undefined ){
        var seleccion = "#fila_"+id+" td";
        var lib_id = ($(seleccion))[0];
        var lib_nombre = ($(seleccion))[1];
        var lib_autor = ($(seleccion))[2];
        var lib_isbn = ($(seleccion))[3];
        
        $("#u_lib_id").val(lib_id.childNodes[0].data);
        $("#u_lib_nombre").val(lib_nombre.childNodes[0].data);
        $("#u_lib_autor").val(lib_autor.childNodes[0].data);
        $("#u_lib_isbn").val(lib_isbn.childNodes[0].data);
        // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
        $.afui.clearHistory();
        // cargamos el panel con id r_alumno.
        $.afui.loadContent("#uf_libro",false,false,"up");
    } else {
        //HACEMOS LA LLAMADA REST
            var datos = {
                'id' : $("#u_lib_id").val(),
                'nombre' : $("#u_lib_nombre").val(),
                'autor': $("#u_lib_autor").val(),
                'isbn': $("#u_lib_isbn").val()
                
            };

            // comprobamos que en el formulario haya datos...
            if ( datos.nombre.length>2 && datos.autor.length>2 ) {
                $.ajax({
                    url: $.libro.HOST+$.libro.URL+'/'+$("#u_lib_id").val(),
                    type: 'PUT',
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(datos),
                    success: function(result,status,jqXHR ) {
                       // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                        $.libro.LibroReadREST();
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        $.libro.error('Error: Alumno Create','No ha sido posible crear el alumno. Compruebe su conexión.');
                    }
                });

                // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
                $.afui.clearHistory();
                // cargamos el panel con id r_alumno.
                $.afui.loadContent("#r_libro",false,false,"up");
            }
    }
};

$.libro.error = function(title, msg){
    $('#err_libro').empty();
    $('#err_libro').append('<h3>'+title+'</h3>');
    $('#err_libro').append('<p>'+msg+'</p>');
    // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
    $.afui.clearHistory();
    // cargamos el panel con id r_alumno.
    $.afui.loadContent("#err_libro",false,false,"up");
};