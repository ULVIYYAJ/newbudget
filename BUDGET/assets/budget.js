$(document).ready(function () {

    $(document).on("click", '#budget-submit', function () {
        var budget = ($("#budget-input").val());
        $("#budget-amount").html(budget);
        $("#balance-amount").html(budget);
        $("#budget-input").val("");
        $(".balance").css('color', 'green');
    });
    var totalValue = 0;

    $(document).on("click", '#expense-submit', function () {
        var services = $('#services');
        var tr = $('<tr/>');
        var deleteIcon = $('<button/>');
        var td_expense = $('<td/>');
        var td_amount = $('<td/>');
        var td_delete = $('<td/>');
        var expense = ($("#expense-input").val());
        var amount = ($("#amount-input").val());

        $(td_expense).append(expense);
        $(td_amount).append(amount);
        $(td_delete).append(deleteIcon);

        $(tr).append(td_expense);
        $(tr).append(td_amount);
        $(tr).append(td_delete);

        $(deleteIcon).addClass("btn btn-danger delete");
        $(deleteIcon).append($("<i class='fas fa-trash-alt'></i>"));

        $(services).append(tr);

        var id;
        $(deleteIcon).attr("data-id", id);
        $(tr).attr("data-id", id);

        var valfirst = parseInt($("#balance-amount").text());
        var valsecond = parseInt($("#amount-input").val());
        var vallast = valfirst - valsecond;
        $("#balance-amount").text(vallast);
        var balanceamount = ($("#balance-amount").text());
        if (balanceamount <= 0) {
            $(".balance").css('color', 'black');
        }

        totalValue += Number(amount);
        $("#expense-amount").text(totalValue);
        $("#expense-input").val("");
        $("#amount-input").val("");

    });

    $(document).on("click", '.delete', function () {
        var id = $(this).attr("data-id");
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Əminsiniz?',
            text: "Məlumat geri qayıtmayacaq!",
            icon: 'Xəbərdarlıq',
            showCancelButton: true,
            confirmButtonText: 'Sil!',
            cancelButtonText: 'Saxla!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Silindi!',
                    'Məlumat silindi.',
                    'Uğurlu'
                )
                $(this).closest('tr').remove();
                var thisamount = ($(this).closest('tr').find('td:nth-child(2)').text());
                totalValue = Number(thisamount);
                var valnext = parseInt($("#balance-amount").text());
                $("#balance-amount").text(valnext + totalValue);

                var valamount = parseInt($("#expense-amount").text());
                $("#expense-amount").text(valamount - totalValue);
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Təxirə salındı',
                    'Məlumat saxlanıldı :)',
                    'xəta'
                )
            }
        })
    });
})


