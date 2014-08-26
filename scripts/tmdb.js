(function( $ ){
    tmdb = {
        apiKey : false,
        apiEndpoint : 'https://api.themoviedb.org/3/',
        searchEndpoint : 'search/multi?query=',
        movieTemplate : '<div class="result-wrapper" data-tmdb-id="<%= id %>">' +
                    '<img src="https://image.tmdb.org/t/p/w92/<%= poster_path %>" onerror="this.src=\'design/broken.jpg\';">' +
                    '<h3><%= title %></h3>' +
                    '<small><%= release_date %></small>' +
                    '<div class="add-to-list-overlay">' +
                    '<button class="info add-to-list-button">Add to list</button>' +
                    '</div>' +
                    '</div>',
        tvTemplate : '<div class="result-wrapper" data-tmdb-id="<%= id %>">' +
                    '<img src="https://image.tmdb.org/t/p/w92/<%= poster_path %>" onerror="this.src=\'design/broken.jpg\';">' +
                    '<h3><%= name %></h3>' +
                    '<small><%= first_air_date %></small>' +
                    '<div class="add-to-list-overlay">' +
                    '<button class="info add-to-list-button">Add to list</button>' +
                    '</div>' +
                    '</div>',
        lastSearchTerm : false,
        doRequest : _.debounce( function( url ){
            var _this = this;
            if( url.indexOf( '?' ) !== false ){
                url = url + '&api_key=' + this.apiKey;
            } else {
                url = url + '?api_key=' + this.apiKey;
            }

            _this.clearOutput();

            $.ajax({
                url : url,
                success : function( response ){
                    _this.printResponse( response );
                }
            });
        }, 300 ),
        search : function( term ){
            var _this = this;

            term = $.trim( term );

            if( term.length <= 0 ){
                return false;
            } else if( term === _this.lastSearchTerm ) {
                return false;
            }

            _this.lastSearchTerm = term;

            this.doRequest( this.buildUrl( 'search' ) + term );

            return true;
        },
        buildUrl : function( type ){
            switch( type ) {
                case 'search':
                    return this.apiEndpoint + this.searchEndpoint;
                default:
                    return false;
            }
        },
        removeElements : function( wrapper ){
            $( wrapper ).find( '.result-wrapper' ).remove();
        },
        clearOutput : function(){
            var $movieTarget = $( '.js-movie-results-wrapper' ),
                $tvTarget = $( '.js-tv-results-wrapper' ),
                _this = this;

            $movieTarget
                .velocity( 'fadeOut' );

            $tvTarget
                .velocity( 'fadeOut' );
        },
        printResponse : function( response ){
            var $movieTarget = $( '.js-movie-results-wrapper' ),
                $tvTarget = $( '.js-tv-results-wrapper' ),
                _this = this,
                hasTv,
                hasMovie;

            hasTv = false;
            hasMovie = false;

            // Make sure there are no results left
            _this.removeElements( $movieTarget );
            _this.removeElements( $tvTarget );

            $movieTarget.find( 'h2' ).hide();
            $tvTarget.find( 'h2' ).hide();

            $.each( response.results, function( index, data ){
                console.log( data );
                switch( data.media_type ){
                    case 'tv':
                        $tvTarget.append( _.template( _this.tvTemplate, data ) );
                        hasTv = true;
                        break;
                    case 'movie':
                        $movieTarget.append( _.template( _this.movieTemplate, data ) );
                        hasMovie = true;
                        break;
                    default:
                        break;
                }
            });

            if( hasMovie ) {
                $movieTarget
                    .velocity( 'stop' )
                    .velocity( 'fadeIn' );
            }

            if( hasTv ){
                $tvTarget
                    .velocity( 'stop' )
                    .velocity( 'fadeIn' );
            }

            $( '.result-wrapper, h2' ).velocity( 'transition.slideUpIn', {
                stagger: 100
            });
        }
    };

    window.tmdb = tmdb;
}( jQuery ));
