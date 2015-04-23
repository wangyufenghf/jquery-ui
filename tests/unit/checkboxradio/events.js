define( [
	"jquery",
	"ui/checkboxradio"
], function( $ ) {

module( "Checkboxradio: events" );

asyncTest( "form reset / click", function( assert ) {
	expect( 35 );

	var radios = [
			$( "#radio11" ).checkboxradio(),
			$( "#radio12" ).checkboxradio(),
			$( "#radio13" ).checkboxradio()
		],
		widgets = [
			radios[ 0 ].checkboxradio( "widget" ),
			radios[ 1 ].checkboxradio( "widget" ),
			radios[ 2 ].checkboxradio( "widget" )
		],
		form1 = $( "#form1" ),
		form2 = $( "#form2" );

	// Checkes that only the specified radio is checked in the group
	function assertChecked( checked ) {
		$.each( widgets, function( index ) {
			var method = index === checked ? "hasClasses" : "lacksClasses";

			assert[ method ]( widgets[ index ], "ui-checkboxradio-checked" );
		} );
	}

	// Checks the form count on each form
	function assertFormCount( count ) {
		equal( form1.data( "uiCheckboxradioCount" ), count, "Form1 has a count of " + count );
		equal( form2.data( "uiCheckboxradioCount" ), 3, "Form2 has a count of 3" );
	}

	// Run the tests
	function testForms( current, start ) {
		assertChecked( 2 );

		if ( !start && current !== 0 ) {
			radios[ current - 1 ].checkboxradio( "destroy" );
		}

		assertFormCount( 3 - current );

		radios[ current ].prop( "checked", true );
		radios[ current ].trigger( "change" );
		assertChecked( current );

		form1.trigger( "reset" );
	}

	// Recourse run the tests in a recursive set timeout with call back for the resets
	function interate( i ) {
		setTimeout( function() {
			if ( i < 3 ) {
				testForms( i );
				interate( i + 1 );
				return;
			}
			radios[ 2 ].checkboxradio( "destroy" );
			assertChecked( false );
			start();
		} );
	}

	$( "#form2 input" ).checkboxradio();

	// Check the starting state then kick everything off
	testForms( 0, true );
	interate( 0 );

} );

} );
