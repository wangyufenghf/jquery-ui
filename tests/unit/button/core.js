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

asyncTest( "Disabled button loses focus", function() {
	expect( 2 );
	var element = $( "#button" ).button();

	element.focus();
	setTimeout(function() {

		ok( element.is( document.activeElement ), "Button is focused" );

		element.button( "disable" );
		ok( !element.is( document.activeElement ), "Button has had focus removed" );
		start();
	});
});

} );
