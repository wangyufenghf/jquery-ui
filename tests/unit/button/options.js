define( [
	"jquery",
	"ui/button"
], function( $ ) {

module( "button: options" );

test( "disabled, explicit value", function( assert ) {
	expect( 8 );

	var element = $( "#button" ).button({ disabled: false });
	ok( !element.button( "option", "disabled" ), "disabled option set to false" );
	ok( !element.prop( "disabled" ), "Disabled property is false" );

	assert.lacksClasses( element.button( "widget" ), "ui-state-disabled ui-button-disabled" );

	element = $( "#button" ).button({ disabled: true });

	assert.hasClasses( element.button( "widget" ), "ui-state-disabled" );
	ok( !element.button( "widget" ).attr( "aria-disabled" ), "element does not get aria-disabled" );
	assert.hasClasses( element.button( "widget" ), "ui-button-disabled" );

	ok( element.button( "option", "disabled" ), "disabled option set to true" );
	ok( element.prop( "disabled" ), "Disabled property is set" );
});

// We are testing the default here because the default null is a special value which means to check
// the DOM. We need to make sure this happens correctly. Checking the options should never return
// null, it should always be true or false.
test( "disabled, null", function() {
	expect( 4 );
	var element = $( "#button" ),
		elementDisabled = $( "#button-disabled" );
	element.add( elementDisabled ).button({ disabled: null });
	ok( !element.button( "option", "disabled" ), "disabled option set to false" );
	ok( !element.prop( "disabled" ), "element is disabled" );
	ok( elementDisabled.button( "option", "disabled" ), "disabled option set to true" );
	ok( elementDisabled.prop( "disabled" ), "element is disabled" );
});

test( "showLabel, false, without icon", function( assert ) {
	expect( 1 );

	var button = $( "#button" ).button({
			showLabel: false
		});

	assert.hasClasses( button, "ui-corner-all ui-widget" );
});

test( "showLabel, false, with icon", function( assert ) {
	expect( 1 );
	$("#button").button({
		showLabel: false,
		icon: "iconclass"
	});
	assert.hasClasses( $( "#button" ), "ui-button ui-corner-all ui-widget ui-button-icon-only" );
});

test( "label, default", function() {
	expect( 2 );
	$( "#button" ).button();
	deepEqual( $( "#button" ).text(), "Label" );
	deepEqual( $( "#button" ).button( "option", "label" ), "Label" );
});

test( "label, explicit value", function() {
	expect( 2 );
	$( "#button" ).button({
		label: "xxx"
	});
	deepEqual( $( "#button" ).text(), "xxx" );
	deepEqual( $( "#button" ).button( "option", "label" ), "xxx" );
});

test( "label, default, with input type submit", function() {
	expect( 2 );
	deepEqual( $( "#submit" ).button().val(), "Label" );
	deepEqual( $( "#submit" ).button( "option", "label" ), "Label" );
});

test( "label, explicit value, with input type submit", function() {
	expect( 2 );
	var label = $( "#submit" ).button({
		label: "xxx"
	}).val();
	deepEqual( label, "xxx" );
	deepEqual( $( "#submit" ).button( "option", "label" ), "xxx" );
});

test( "icon", function() {
	expect( 1 );
	$("#button").button({
		showLabel: false,
		icon: "iconclass"
	});
	strictEqual( $( "#button" ).find( "span.ui-icon.iconclass" ).length, 1 );
});

} );
