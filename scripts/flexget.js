(function( $ ){
    var flexget = {
        addMovie : function( tmdbId ){
            $.ajax({
                url: 'actions/flexget.php',
                data : 'tmdb_id=' + tmdbId,
                success : function( response ){
                    console.log( response );
                }
            });
        }
    };

    window.flexget = flexget;
}( jQuery ));
