var Debug = {
    /**
     * Logs object into the console with specific label.
     *
     * @param {object} object
     * @param {string} label
     * @param {object} style: default style is green background with white font color; object style is css object in the correct form
     */
    log: function (object, label, style) {
        var default_style = {'background-color': '#007F04', 'color': 'white'};
        style = decodeURIComponent($.param($.extend(default_style, ((typeof style === 'undefined') ? {} : style))))
            .replace(/=/g, ': ').replace(/&/g, '; ');

        var obj_specifier;
        switch (typeof object) {
            case 'string':
            case 'undefined':
                obj_specifier = '%s';
                break;

            case 'boolean':
            case 'number':
                obj_specifier = ((parseInt(object) !== parseFloat(object)) ? '%f' : '%d');
                break;

            case 'object':
            case 'function':
            case 'xml':
            default:
                obj_specifier = '%O';
                break;
        }

        console.log('%c ' + ((typeof label === 'undefined') ? 'debug' : label) + ': %c  ' + obj_specifier, style, 'background-color: white;', object);
    }
};

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
    }
};

var Admin = {
    usersDatatable: function () {
        $('#users-table').DataTable({
            processing: true,
            serverSide: true,
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
                {data: 'role'},
                {data: 'action'}
            ],
            language: {
                processing: 'Loading...',
                infoFiltered: "" // remove text "filtered from XY entried"
            },
            pagingType: "full_numbers",
            columnDefs: [
                {targets: 2, orderable: false},
                {targets: 4, orderable: false},
                {targets: 5, orderable: false},
                {targets: 6, orderable: false},
                {targets: 7, orderable: false}
            ],
            order: [[0, 'desc']]
        });
    }
};


function loadData(url){
        var limit = 6;
        var start = 0;
        var action = 'inactive';
        function load_data(limit,start) {
            $.ajax({
                url: url,
                method: "POST",
                dataType: 'json',
                data: JSON.stringify({limit:limit,start:start,url:url}),
                contentType: 'application/json;charset=UTF-8',
                success:function (data) {
                    $('#vypis').append(data);
                    if (data == ""){
                        action = 'active';
                    }
                    else
                        action = 'inactive';
                }
                });
        }
        if(action == 'inactive') {
            action = 'active';
            load_data(limit, start);
        }

        $(window).scroll(function () {
            if(($(window).scrollTop() == $(document).height() - $(window).height()) &&
                action == 'inactive')
            {
                action = 'active';
                start = start + limit;
                setTimeout(function () {
                    load_data(limit,start);
                },1000);
                load_data(limit,start);
            }

        })
}
