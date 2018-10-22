$(document).ready(function(){

    const tableLinks = $('#paginateNav ul li a');

    if (tableLinks.length > 0){

        const pagedTables = $('.pagedTable');

        pagedTables[0].className = `pagedTable.active`;

        tableLinks.click(function(){

            var pageNo = $(this)[0].textContent;

            pagedTables.each( function(){
                if ($(this)[0].id !== `page${pageNo}`){
                  $(this)[0].className = `pagedTable`;
                } else {
                  $(this)[0].className = `pagedTable.active`;
                }
            });

        });
    }
});
