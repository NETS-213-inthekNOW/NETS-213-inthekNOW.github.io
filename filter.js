$(document).ready( function () {
    var table = $('#locations').DataTable({

        paging: false,
        ordering: false,

        //below code sourced mostly from https://datatables.net/examples/api/multi_filter_select.html
        initComplete: function () {
            this.api().columns([2, 3, 4, 5]).every( function () {
                var column = this;
                var select = $('<select><option value>No selection</option></select>')
                    .appendTo( $(column.header()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function (value, index) {
                    var text_val = $('<div/>').html(value).text();
                    select.append( '<option value="' + text_val + '">' + text_val + '</option>' );
                } );
            } );
        }
    } );

    $('#locations tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        console.log(row.child);
        if ( row.child.isShown() ) {
            row.child(format( tr.data('description'), tr.data('url') )).hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format( tr.data('description'), tr.data('url') )).show();
            tr.addClass('shown');
        }
    } );
} );

function format (description, url) {
    return '<div>' + description + '<br /><a href="' + url + '">Open Google Maps Location</a></div>';
}