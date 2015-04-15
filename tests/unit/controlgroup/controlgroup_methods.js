module( "Controlgroup: methods" );

test( "destroy", function() {
	expect( 1 );
	domEqual( ".controlgroup", function() {
		$( ".controlgroup" ).controlgroup().controlgroup( "destroy" );
	});
});
test( "disable", function( assert ) {
	expect( 2 );
	var element = $( ".controlgroup" ).controlgroup().controlgroup( "disable" );
	assert.lacksClasses( element, "ui-state-disabled",
		"The widget does not get the disabled class we disable each child widget" );
	strictEqual( element.find( ".ui-state-disabled" ).length, 6,
		"Child widgets are disabled" );
});

test( "enable", function( assert ) {
	expect( 2 );
	var element = $( ".controlgroup" ).controlgroup().controlgroup( "enable" );
	assert.lacksClasses( element, "ui-state-disabled",
		"ui-state-disabled is not present on widget after enabling" );
	strictEqual( element.find( "ui-state-disabled" ).length, 0,
		"Child widgets are disabled" );
});

function hasCornerClass( element, className ) {
	if ( className ) {
		return element.hasClass( className );
	}

	return !!element.attr( "class" ).match( /ui-corner/g );
}
test( "refresh", function() {
	var tests = {
			"checkboxradio": "<input type='checkbox'>",
			"selectmenu": "<select><option>foo</option></select>",
			"button": "<button>"
		},
		orientations = {
			"horizontal": [
				"ui-corner-left",
				false,
				false,
				"ui-corner-right"
			],
			"vertical": [
				"ui-corner-top",
				false,
				false,
				"ui-corner-bottom"
			]
		};

	expect( 246 );

	$.each( tests, function( widget, html ) {
		$.each( orientations, function( name, classes ) {
			var i, control, currentClasses,
				controls = [],
				element = $( "<div>" ).controlgroup({
					direction: name
				}).appendTo( "body" );

			for ( i = 0; i < 4; i++ ) {
				control = $( html ).attr( "id", "id" + i )
					.add( $( "<label>" ).clone().attr( "for", "id" + i ) );

				controls.push( control );
				element.append( control );
			}
			element.controlgroup( "refresh" );
			for ( i = 0; i < 4; i++ ) {
				strictEqual( controls[ i ].is( ":ui-" + widget ), true,
					name + ": " + widget + " " + i + ": is a " + widget + " widget after refresh" );
			}
			checkCornerClasses( classes );
			iterateHidden( true );
			element.controlgroup( "option", "excludeInvisible", false );
			iterateHidden();

			controls[ 0 ].prop( "disabled", true );

			element.controlgroup( "refresh" );

			strictEqual( controls[ 0 ][ widget ]( "widget" ).hasClass( "ui-state-disabled" ), true,
				"Checkbox has ui-state-disabled after adding disabled prop and refreshing control group" );

			element.remove();

			function showElement( index, value ) {
				$( value )[ widget ]( "widget" ).show();
			}
			function iterateHidden( excludeInvisible ) {
				for ( i = 0; i < 4; i++ ) {
					$.each( controls, showElement );
					controls[ i ][ widget ]( "widget" ).hide();
					currentClasses = classes.slice( 0 );
					if ( excludeInvisible ) {
						if ( i === 0 ) {
							currentClasses[ i + 1 ] = classes[ i ];
							currentClasses[ i ] = false;
						} else if ( i === 3 ) {
							currentClasses[ i - 1 ] = classes[ i ];
							currentClasses[ i ] = false;
						}
					}
					element.controlgroup( "refresh" );
					checkCornerClasses( currentClasses );
				}
			}
			function checkCornerClasses( classList ) {
				for ( var j = 0; j < 4; j++ ) {
					strictEqual( hasCornerClass( controls[ j ][ widget ]( "widget" ), classList[ j ] ), !!classList[ j ],
						name + ": " + widget + " " + j + ": has class " + classList[ j ] + " after refresh" );
				}
			}
		});
	});
});