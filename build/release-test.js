var shell = require( "shelljs" );
var Release = {
	define: function( props ) {
		for ( var key in props ) {
			Release[ key ] = props[ key ];
		}
	},
	exec: shell.exec,
	abort: function( error ) {
		console.log( error );
		process.exit( 1 );
	}
};

var script = require( "./release" );
script( Release );

// Ignores actual version installed, should be good enough for a test
if ( shell.exec( "npm ls --depth 0 | grep download.jqueryui.com" ).code === 1 ) {
	shell.exec( "npm install " + script.dependencies.join( " " ) );
}

// If AUTHORS.txt is outdated, this will update it
// Very annoying during an actual release
shell.exec( "grunt update-authors" );

Release.generateArtifacts( function() {
	console.log( "Done generating artifacts, verify output, should be in dist/cdn" );
} );
