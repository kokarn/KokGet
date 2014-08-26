<?php
    $command = 'flexget movie-queue add tmdb_id=[[TMDBID]] "720p bluray"';
    if( isset( $_GET[ 'tmdb_id' ] ) ) :
        $command = str_replace( '[[TMDBID]]', $_GET[ 'tmdb_id' ], $command );
        echo $command;
    endif;
