$('.dataTable').DataTable({
    dom: 'Bfrtip',
    dom: '<"d-flex justify-content-between mb-2"Bf>rtip',
    buttons: [
       {
        extend: 'excel',
            text: 'Export Excel',
            className: 'btn btn-success btn-sm',
            exportOptions: {
                columns: ':not(:last-child)', // skip last column (Action)
                format: {
                    body: function (data, row, column, node) {
                        // agar select tag hai, selected text return karo
                        if ($(node).find('select').length) {
                            return $(node).find('option:selected').text();
                        }
                        return data;
                    }
                }
            }
       }
    ],
    paging: true,
    searching: true,
    ordering: true,
    order: [[1, 'asc']], // default sort by School Name
    columnDefs: [
        { orderable: false, targets: 0 }, // Sr No not sortable
        { orderable: false, targets: -1 } // Action not sortable
    ]
});