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
            sAjaxSource: "users-data",
            columns: [
                {data: "time"},
                {data: "MeanCurrent"},
            ]
            // columns: [
            //     {"data": "name"},
            //     {"data": "position"},
            //     {"data": "office"},
            //     {"data": "extn"},
            //     {"data": "start_date"},
            //     {"data": "salary"}
            // ]
        });
    }
};