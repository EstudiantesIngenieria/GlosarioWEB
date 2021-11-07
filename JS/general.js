$(() => {
  $(".tooltipped").tooltip({ delay: 50 });
  $(".modal").modal();

  // TODO: Evento boton inicio sesion
  $("#btnInicioSesion").click(() => {
    $("#modalRegistro").modal('close');
    $("#modalSesion").modal('open');

  });

  $("#btnRegistrarse").click(() => {
    $('#modalSesion').modal('close')
    $("#modalRegistro").modal('open');
  });
});
