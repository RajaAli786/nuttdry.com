$('.dataTable').DataTable({
    dom: 'Bfrtip',
    buttons: [
        // 'copy', 'csv', 'excel', 'pdf', 'print'
        'excel'
    ],
    paging: true,
    searching: true,
    ordering: true,
    order: [[1, 'asc']], // default sort by School Name
    columnDefs: [
        { orderable: false, targets: 0 } // Sr No not sortable
    ]
});