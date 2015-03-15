window.onargumentschanged = function (event) {
    var arguments = event.data;
    console.log(dpd.<%=model.model%>s);
    dpd.<%-model.model%>s.get(arguments[0]).then (function (<%=model.model%>) {
        console.log(<%=model.model%>);
        $('bungalow-header name').html(<%=model.model%>.name);
    });
}