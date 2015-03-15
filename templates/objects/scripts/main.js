window.onargumentschanged = function (event) {
    var arguments = event.data;
    console.log(dpd.<%=model.model%>s);
    dpd.<%-model.model%>s.get(function (<%=model.model%>s) {
        console.log(<%=model.model%>s);
        fill_table(<%=model.model%>s);
    });
}

function fill_table(<%=model.model%>s) {
    var $tbody = $('table tbody');
    $tbody.html("");

    for (var i = 0; i < <%=model.model%>s.length; i++) {
        var <%=model.model%> = <%=model.model%>s[i];
        console.log(<%=model.model%>);
        var tr = document.createElement('tr');
        <% _.each(model.fields, function (field) { %>
        <% if (field.id == 'name') { %>
        tr.innerHTML += '<td><a data-uri="bungalow:<%=model.model%>:' + <%=model.model%>.id + '">' + <%=model.model%>.<%=field.id%> + '</a></td>';
        <% } else { %>
        tr.innerHTML += '<td>' + <%=model.model%>.<%=field.id%> + '</td>';
        <% }
        }); %>
        tr.innerHTML += '<td><a class="btn btn-danger" onclick="delete(\'' + <%=model.model%>.id + '\')">Delete</a></td>';
        tr.innerHTML += '<td><a class="btn btn-default" onclick="delete(\'' + <%=model.model%>.id + '\')">View</a></td>';
        $tbody.append(tr);
    }
}

function show_add(event) {
    $('#form').popover({
        'anchor': '#addbtn'
    });
}

function add(event) {
    event.preventDefault();

    var <%=model.model%> = {
        <% _.each(model.fields, function (field) { %>
        '<%=field.id%>': $('#field_<%=field.id%>').val(),
        <% });%>
    };
    console.log(<%=model.model%>);
    dpd.<%=model.model%>s.post(<%=model.model%>).then(function (err, done) {
        dpd.<%=model.model%>s.get(function (<%=model.model%>s) {
            fill_table(<%=model.model%>s);
        });
    });
    $('#form').fadeOut();
    return false;
}