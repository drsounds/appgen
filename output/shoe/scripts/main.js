window.onargumentschanged = function (event) {
    var arguments = event.data;
    console.log(dpd.shoes);
    dpd.shoes.get(arguments[0]).then (function (shoe) {
        console.log(shoe[0]);
        $('bungalow-header name').html(shoe[0].name);
    });
}