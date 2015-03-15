window.onargumentschanged = function (event) {
    var arguments = event.data;
    console.log(dpd.<%=model.model%>s);
    dpd.<%-model.model%>s.get(arguments[0]).then (function (<%=model.model%>) {
        console.log(<%=model.model%>);
        $('bungalow-header name').html(<%=model.model%>.name);
  

    <% if ('relations' in model) {
        for (var i = 0; i < model.relations.length; i++) { 
            var relatedModel = model.relations[i]; %>
            dpd.<%=relatedModel.model%>s.get({'<%=relatedModel.field%>': <%=model.model%>.<%=relatedModel.foreignKey%>}, function (<%=relatedModel.model%>s) {
                var $<%=relatedModel.model%>Collection = $('#collection_<%=relatedModel.model%>');
                for (var i = 0; i < <%=relatedModel.model%>s.length; i++) {
                    var <%=relatedModel.model%> = <%=relatedModel.model%>s[i];

                    var elm = document.createElement('bungalow-item');
                    $elm = $(elm);
                    $elm.html('<name>' + <%=relatedModel.model%>.<%=relatedModel.titleField%> + '</name>');
                    $elm.attr('uri', 'bungalow:<%=relatedModel.model%>:' + <%=relatedModel.model%>.id);
                    $elm.attr('type', '<%=relatedModel.model%>');
                    $<%=relatedModel.model%>Collection.append($elm);
                }
            });
            <%
        } 
    }
     %>
       });
}