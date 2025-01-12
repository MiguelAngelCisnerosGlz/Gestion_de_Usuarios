// Call the dataTables jQuery plugin
$(document).ready(function() {

  cargarUsuarios();

});

function actualizarEmailDelUsuario(){
  document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  };
}

async function cargarUsuarios(){

  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarios = await request.json();
  console.log("Usuarios obtenidos:", usuarios);

  let listadoHtml = '';

  for( let usuario of usuarios){

    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm">' + '<i class="fas fa-trash"></i></a>';

    let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;

    let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>' + usuario.email + '</td>' +
        '<td>' + telefonoTexto + '</td><td>'+botonEliminar+'</td></tr>';

    listadoHtml += usuarioHtml;

  }

  console.log(usuarios);


  document.querySelector('#usuarios tbody').innerHTML= listadoHtml

    $('#usuarios').DataTable();
    actualizarEmailDelUsuario();
}



async function  eliminarUsuario(id){

  if(!confirm('¿Desea eliminar el usuario?')){
    return;
  }

  const request = await fetch('api/usuarios/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}