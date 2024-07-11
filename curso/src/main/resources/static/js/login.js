// Call the dataTables jQuery plugin
$(document).ready(function() {

    //on ready

});

//Funcion que se usa en login.html
async function iniciarSesion(){

  let datos = {};
 datos.email = document.getElementById('txtEmailusuario').value;
 datos.password = document.getElementById('txtPasswordusuario').value;


  const request = await fetch('api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const respuesta = await request.text();
  if(respuesta != 'FAIL'){

      localStorage.token=respuesta;
      localStorage.email=datos.email;

      console.log("Aqui esta al usuario")
      window.location.href = 'usuarios.html'
  }else{
      console.log("Aqui entra al alert")
      alert("Password o email incorrectos verifique por favor");
  }
}
