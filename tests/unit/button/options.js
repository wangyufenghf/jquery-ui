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

test( "icon", function( assert ) {
	expect( 4 );
	var button = $("#button").button({
			showLabel: false,
			icon: "iconclass"
		}),
		icon = button.find( ".ui-icon" );

	assert.hasClasses( icon, "iconclass" );
	equal( icon.length, 1, "button with icon option set has icon" );

	button.button( "option", "icon", false );
	equal( button.find( ".ui-icon" ).length, 0, "setting icon to false removes the icon" );

	button.button( "option", "icon", "iconclass" );
	ok( button.find( ".ui-icon" ).length, "setting icon to a value adds the icon" );

});

test( "icon position", function( assert ) {
	expect( 21 );

	var button = $( "#button" ).button( {
			icon: "ui-icon-gear"
		} ),
		icon = button.find( ".ui-icon" ),
		space = button.find( ".ui-button-icon-space" );

	equal( icon.length, 1, "button with icon option set has icon" );
	equal( button.button( "option", "iconPosition" ), "beginning",
		"Button has iconPosition beginning by default" );
	equal( button.contents()[ 0 ], icon[ 0 ], "icon is prepended when position is begining" );
	equal( icon.next()[ 0 ], space[ 0 ], "icon is followed by a space when position is begining");
	equal( space.text(), " ",
		"ui-button-icon-space contains a breaking space iconPosition:beginning" );
	assert.lacksClasses( icon, "ui-widget-icon-block" );

	button.button( "option", "iconPosition", "end" );
	equal( icon.length, 1, "Changing position to end does not re-create or duplicate icon" );
	equal( button.button( "option", "iconPosition" ), "end", "Button has iconPosition end" );
	equal( button.contents().last()[ 0 ], icon[ 0 ], "icon is appended when position is end" );
	equal( icon.prev()[ 0 ], space[ 0 ], "icon is preceeded by a space when position is end");
	equal( space.text(), " ",
		"ui-button-icon-space contains a breaking space iconPosition:beginning" );
	assert.lacksClasses( icon, "ui-widget-icon-block" );

	button.button( "option", "iconPosition", "top" );
	equal( icon.length, 1, "Changing position to top does not re-create or duplicate icon" );
	equal( button.button( "option", "iconPosition" ), "top", "Button has iconPosition top" );
	equal( button.contents()[ 0 ], icon[ 0 ], "icon is prepended when position is top" );
	ok( !button.find( "ui-button-icon-space" ).length,
		"Button should not have an iconSpace with position: top" );

	button.button( "option", "iconPosition", "bottom" );
	equal( icon.length, 1, "Changing position to bottom does not re-create or duplicate icon" );
	equal( button.button( "option", "iconPosition" ), "bottom", "Button has iconPosition top" );
	equal( button.contents().last()[ 0 ], icon[ 0 ], "icon is prepended when position is bottom" );
	ok( !button.find( "ui-button-icon-space" ).length,
		"Button should not have an iconSpace with position: bottom" );
	assert.hasClasses( icon, "ui-widget-icon-block" );

} );

} );
