/*
 * button_core.js
 */


(function($) {

module( "Button: core deprecated" );

test( "Calling button on a checkbox input calls checkboxradio widget", function(){
	var checkbox = $( "#checkbox01" );

	expect( 2 );
	checkbox.button();

	ok( checkbox.is( ":ui-checkboxradio" ),
		"Calling button on a checkbox creates checkboxradio instance" );
	ok( !checkbox.checkboxradio( "option", "icon" ),
		"Calling button on a checkbox sets the checkboxradio icon option to false" );
});
test( "Calling buttonset calls controlgroup", function(){
	var controlgroup = $( ".buttonset" );

	expect( 1 );
	controlgroup.buttonset();

	ok( controlgroup.is( ":ui-controlgroup" ), "Calling buttonset creates controlgroup instance" );
});
})(jQuery);
