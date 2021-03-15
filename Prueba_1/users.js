startFunction();

//Función para esconder las diferentes secciones.
function startFunction(){
    $('#taskSection').hide();
    $('#postSection').hide();
}

//Extraer los usuarios e imprimirlos en una tabla.
fetch('https://jsonplaceholder.typicode.com/users')

  .then((response) => response.json())
  .then((json) => {

    json.map((item) => 
        $('#userTable').append(
            "<div class='row userRow' id='"+ item.id +"'>"+
                "<div class='col'>" +item.id+ "</div>"+
                "<div class='col'>" +item.name+ "</div>"+
            "</div>"
        )
    )
    //Al dar click a un usuario se extraerá su información y se llenará la sección con su info.
    $('.userRow').click(function(e){
        let userId = e.currentTarget.id;
        let userSelected;

        json.map((item) => {
            if(item.id == userId){
                userSelected = item;
            }
        });

        $('#taskSection').hide();
        $('#userDetails').html(
            "<h2>Información de usuario</h2>"+
            "<p>Name: "+ userSelected.name +"</p>"+
            "<p>User name: "+ userSelected.username +"</p>"+
            "<p>E-mail: "+ userSelected.email +"</p>"+
            "<p>Phone: "+ userSelected.phone +"</p>"+
            "<button id='"+ userId +"' class='btn btn-secondary' onclick='postFunction(this.id)'>Posts</button>"+
            "<button id='"+ userId +"' class='btn btn-secondary' onclick='allFunction(this.id)'>Todo</button>"
        )
    });
  });

// función para extraer los pendientes del usuario seleccionado e incorporarlas en la respectiva sección.
function allFunction(clicked_id){
    $('#postSection').hide();
    $('#taskSection').show();
    $('#allTasks').empty();
    $('.saveTask').attr('id', clicked_id);

    fetch('https://jsonplaceholder.typicode.com/users/'+ clicked_id +'/todos')

   .then((response) => response.json())
   .then((json) => {
        json.map((item) => {
            if(item.userId == clicked_id){
                $('#allTasks').append(
                    "<div class='taskItem'>"+
                        "<p>Tarea: "+ item.title +"</p>"+
                        "<p>Estado: "+ item.completed +"</p>"+
                    "</div>"
                );
            }
        })
    })
}

//Función para extraer los posts del usuario seleccionado, también como sus comentarios e incorporarlos en la respectiva sección.
function postFunction(clicked_id){
    $('#postSection').show();
    $('#taskSection').hide();
    $('#loadPost').empty();

    fetch('https://jsonplaceholder.typicode.com/users/'+ clicked_id +'/posts')

   .then((response) => response.json())
   .then((json) => {

        json.map((item) => {
            if(item.userId == clicked_id){
                let currentPostId = item.id;

                $('#loadPost').append(
                    "<div class='taskItem'>"+
                        "<h2>Publicación:</h2>"+
                        "<p>Título: "+ item.title +"</p>"+
                        "<p>Descripción: "+ item.body +"</p>"+
                        "<h4>Comentarios:</h4>"+
                    "</div>"
                );

                fetch('https://jsonplaceholder.typicode.com/posts/'+ currentPostId +'/comments')
                    .then((response) => response.json())
                    .then((json) => {
                        json.map((commentItem) => {
                            if(commentItem.postId == currentPostId){
                                $('.taskItem').append(
                                    "<div class='commentItem'>"+
                                        "<p>Nombre: "+ commentItem.name +"</p>"+
                                        "<p>E-mail: "+ commentItem.email +"</p>"+
                                        "<p>Comentario: "+ commentItem.body +"</p>"+
                                    "</div>"
                                );
                            }
                        })
                    })
            }
        })
    })
}

//Agregar la nueva tarea para el usuario seleccionado de la tabla (unicamente devuelve un JSON de operación éxitosa). 
$('.saveTask').click((e) => {
        const userId = e.target.id;
        const newTask = $('#titleInput').val();
        const taskCheck = $('#checkInput').is(':checked');

        fetch('https://jsonplaceholder.typicode.com/users/(userId)/todos', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                title: newTask,
                completed: taskCheck,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

    }
);