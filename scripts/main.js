(function(){
    "use strict";
    $(function(){
        $( 'body' ).on( 'keyup', '.js-search-field', function( event ){
            event.preventDefault();
            tmdb.search( $( event.currentTarget ).val() );
        });

        $( 'body' ).on( 'click touchstart', '.add-to-list-button', function( event ){
            event.preventDefault();
            flexget.addMovie( $( this ).parents( '.result-wrapper' ).data( 'tmdb-id' ) );
        } );

        $( 'body' ).on( 'submit', '.js-search-form', function( event ){
            event.preventDefault();
        });

        $( 'body' ).on( 'mouseenter touchstart', '.result-wrapper', function( event ){
            $( event.currentTarget ).find( '.add-to-list-overlay ' ).velocity( 'transition.shrinkIn', 300 );
        });

        $( 'body' ).on( 'mouseleave touchend', '.add-to-list-overlay', function( event ){
            $( event.currentTarget ).velocity( 'transition.shrinkOut', 300 );
        });
    });
}(jQuery));
