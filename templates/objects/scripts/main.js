window.onargumentschanged = function (event) {
    var arguments = event.data;
    console.log(dpd.<%=model.model%>s);
    dpd.<%-model.model%>s.get({}).then (function (<%=model.model%>s) {
     
        var $tbody = $('table tbody');

        for (var i = 0; i < <%=model.model%>s; i++) {
            var <%=model.model%> = <%=model.model%>s[i];

            var tr = document.createElement('tr');
            <% _.each(model.fields, function (field) { %>
            tr.innerHTML += '<td>' + <%model.model%>.<%=field%> + '</td>';
            <% }); %>
            $tbody.append(tr);
        }
    });
}