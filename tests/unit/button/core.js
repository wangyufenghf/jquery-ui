define( [
	"jquery",
	"ui/button"
], function( $ ) {

module( "Button: core" );

test( "input type submit, don't create child elements", function() {
	expect( 2 );
	var input = $("#submit");
	equal( input.children().length, 0 );
	input.button();
	equal( input.children().length, 0 );
});

asyncTest( "Disabled button maintains ui-state-focus", function() {
	expect( 1 );
	var element = $( "#button" ).button();
	element.simulate( "focus" );
	setTimeout(function() {

		// Todo: figure out why this fails in phantom put passes in browser
		// ok( element.is( ":focus" ), "Button is focused" );
		element.button( "disable" );
		ok( !element.is( ":focus" ), "Button has had focus removed" );
		start();
	});
});

} );
