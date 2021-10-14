window.onload = function () {
    setTimeout(
        function () {
            $("#onload").fadeOut();
            $('.hidden').removeClass('hidden');
        }, 1500
    )
}
$('.closebtn').click(function (e) { 
    e.preventDefault();
    $('.alert').hide();
});

$('#btnRegistroPost').click(function (e) { 
    e.preventDefault();
    $('.alert').show();
});