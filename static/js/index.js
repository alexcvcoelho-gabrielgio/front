var changeState = function (val) {
    $("#brand").prop('disabled', val)
    $("#model").prop('disabled', val)
    $("#hd-id").prop('disabled', val)
}

var disable = function () {
    changeState(true)
}

var enable = function () {
    changeState(false)
}

var showLoading = function(){
    $("#loader").show()
}

var hideLoading = function () {
    $("#loader").hide()
}

var comeBack = function () {
    enable()
    hideLoading()
}

var getData = function () {
    return {
        brand: $("#brand").val(),
        model: $("#model").val(),
        "hd-id": $("#hd-id").val()
    }
}


var requestSession = function (session) {
    setTimeout(function () {
        $.get("/session/" + session, function (data) {
            console.log(data)
            $("#brand-lbl").text(data['brand'])
            $("#model-lbl").text(data['model'])
            $("#hd-id-lbl").text(data['hd-id'])
            comeBack()
        }).fail(function (err) {
            console.log(err)
        })
    }, 1000)
}

var clickSubmit = function (){
    disable()
    showLoading()
    $.post("/session", getData(), function(data){
        $("#session").text(data['session-id'])
        requestSession(data['session-id'])
    }).fail(function (err){
        $("#session").text('failed')
        comeBack()
    })
}

$("#loader").hide()
