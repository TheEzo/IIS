var Web = {
    passwordControl: function () {
        var pass = $('#password').val();
        var check = $('#password_check').val();
        if (pass === check) {
            $('#pw-check').html('');
            $('#password_check').removeClass('is-invalid');
            $('#register-submit').prop('disabled', false);
        }
        else {
            $('#password_check').addClass('is-invalid');
            $('#pw-check').html('Hesla se neshodují');
            $('#register-submit').prop('disabled', true);
        }
    },

    confirmOrder: function (type,action,item) {
        $.ajax({
            url: '/cart',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({type: type, value: item, action: action}),
            success: function (res) {
                window.location.reload();
            }
        });
        return false;
    },

    updatePrice: function(){
        if ($("#datum_vraceni").val() == "")
            return;
        var d = $("#datum_vraceni").val().slice(0,2);
        var m = $("#datum_vraceni").val().slice(3,5);
        var y = $("#datum_vraceni").val().slice(6);
        var date = new Date(y + '-' + m + '-' + d);
        var now = new Date();
        var res = date.getDate() - now.getDate();
        $('#prizeee').text($('#order_prize').text()*res);
    }
};

var Admin = {
    usersDatatable: function () {
        $('#users-table').DataTable({
            processing: true,
            autoWidth: false,
            ajax: {
                url: "/users_data",
                type: "POST"
            },
            sPaginationType: "full_numbers",
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            columns: [
                {data: "name"},
                {data: "surename"},
                {data: "email"},
                {data: "city"},
                {data: 'addr'},
                {data: 'phone'},
                {data: 'membership'},
                {data: 'role'},
                {data: 'action'},
                {data: 'rc'}
            ],
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Czech.json"
            },
            pagingType: "full_numbers",
            columnDefs: [
                {targets: 2, orderable: false},
                {targets: 4, orderable: false},
                {targets: 5, orderable: false},
                {targets: 6, orderable: false},
                {targets: 7, orderable: false},
                {targets: 8, orderable: false},
                {targets: 9, className: 'hidden'}
            ],
            order: [[0, 'desc']]
        });
    },

    costumesDatatable: function () {
        $('#costumes-table').DataTable({
            processing: true,
            autoWidth: false,
            ajax: {
                url: "/costumes-data",
                type: "POST"
            },
            sPaginationType: "full_numbers",
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            columns: [
                {data: "name"},
                {data: "producer"},
                {data: "material"},
                {data: "size"},
                {data: 'amount'},
                {data: 'prize'},
                {data: 'color'},
                {data: 'detrition'},
                {data: 'action'}
            ],
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Czech.json"
            },
            pagingType: "full_numbers",
            order: [[0, 'desc']]
        });
    },

    accessoriesDatatable: function () {
        $('#accessories-table').DataTable({
            processing: true,
            autoWidth: false,
            ajax: {
                url: "/accessories-data",
                type: "POST"
            },
            sPaginationType: "full_numbers",
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            columns: [
                {data: "name"},
                {data: "producer"},
                {data: "material"},
                {data: 'size'},
                {data: "type"},
                {data: 'amount'},
                {data: 'prize'},
                {data: 'color'},
                {data: 'detrition'},
                {data: 'action'}
            ],
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Czech.json"
            },
            pagingType: "full_numbers",
            order: [[0, 'desc']]
        });
    },


    allOrdersDatatable: function(){
        $('#all-orders').DataTable({
            processing: true,
            autoWidth: false,
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Czech.json"
            },
            ajax: {
                url: "/orders-admin",
                type: "POST"
            },
            sPaginationType: "full_numbers",
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            columns: [
                {data: "name"},
                {data: "date_from"},
                {data: "date_to"},
                {data: 'costumes'},
                {data: 'accessories'},
                {data: "orderer"},
                {data: 'price'},
                {data: 'returned'},
                {data: 'actions'},
                {data: 'id'},
            ],
            columnDefs: [
                {targets: 7,
                render: function (data) {
                    if (data == 0)
                        return "Nevráceno <i style='color: red' class=\"fas fa-times-circle\"></i>"

                    else
                        return "Vráceno <i style='color: green' class=\"fas fa-check-circle\"></i>"
                    },
            },
            {targets: 9, className: 'hidden'}],
            pagingType: "full_numbers",
            order: [[0, 'desc']]
        });
    },

    usersModal: function (el) {
        var row = el.closest('tr').children();
        $('#user_name').html(row[0].innerHTML + ' ' + row[1].innerHTML);
        $('#edit-rc').val(row[9].innerHTML);
        var membership = row[6].innerHTML;
        var role = row[7].innerHTML;
        $('#edit-role option').each(function () {
            if ($(this).text() == role)
                $(this).prop('selected', true);
        });
        $('#edit-membership option').each(function () {
            if ($(this).text() == membership)
                $(this).prop('selected', true);
        });
    },

    sendEdit: function () {
        $.ajax({
            type: 'POST',
            url: '/users_edit',
            data: $('#users-update-form').serialize(),
            success: function () {
                window.location.reload();
            }
        })
    },

    ordersModal: function (el) {
        var row = el.closest('tr').children();
        $('#edit-id').val(row[9].innerHTML);
    },

    sendOrderEdit: function () {
        $.ajax({
            type: 'POST',
            url: '/orders_edit',
            data: $('#orders-update-form').serialize(),
            success: function () {
                window.location.reload();
            }
        })
    },


    ordersDatatable: function () {
        $('#orders-table').DataTable({
            processing: true,
            autoWidth: false,
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Czech.json"
            },
            ajax: {
                url: "/orders_data",
                type: "POST"
            },
            sPaginationType: "full_numbers",
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            columns: [
                {data: "action_name"},
                {data: "date_from"},
                {data: "date_to"},
                {data: "costumes"},
                {data: 'accessories'},
                {data: 'price'},
                {data: "returned"}
            ],
            columnDefs: [{
                targets: [6],
                render: function (data) {
                    if (data == 0){
                        return "Nevráceno <i style='color: red' class=\"fas fa-times-circle\"></i>"
                    }
                    else
                        return "Vráceno <i style='color: green' class=\"fas fa-check-circle\"></i>"
                }
            }],
            pagingType: "full_numbers",
        });
}
};


function loadData(url) {
    var limit = 6;
    var start = 0;
    var action = 'inactive';

    function load_data(limit, start) {
        $.ajax({
            url: url,
            method: "POST",
            dataType: 'json',
            data: JSON.stringify({limit: limit, start: start, url: url}),
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                $('#vypis').append(data);
                if (data == "") {
                    action = 'active';
                }
                else
                    action = 'inactive';
            }
        });
    }

    if (action == 'inactive') {
        action = 'active';
        load_data(limit, start);
    }

    $(window).scroll(function () {
        if (($(window).scrollTop() == $(document).height() - $(window).height()) &&
            action == 'inactive') {
            action = 'active';
            start = start + limit;
            setTimeout(function () {
                load_data(limit, start);
            }, 500);

        }

    })
}
