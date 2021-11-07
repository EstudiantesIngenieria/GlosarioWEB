$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()


  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    
    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  
})
