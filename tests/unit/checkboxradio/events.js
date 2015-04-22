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

	function assertChecked( checked ) {
		$.each( widgets, function( index ) {
			var method = index === checked ? "hasClasses" : "lacksClasses";

			assert[ method ]( widgets[ index ], "ui-checkboxradio-checked" );
		} );
	}

	function assertFormCount( count ) {
		equal( form1.data( "uiCheckboxradioCount" ), count, "Form1 has a count of " + count );
		equal( form2.data( "uiCheckboxradioCount" ), 3, "Form2 has a count of 3" );
	}

	function testForms( original, current, start ) {
		var count = 3 - current;
		assertChecked( original );

		if ( !start && current !== 0 ) {
			radios[ current - 1 ].checkboxradio( "destroy" );
		}

		assertFormCount( count );

		radios[ current ].prop( "checked", true );
		radios[ current ].trigger( "change" );
		assertChecked( current );

		form1.trigger( "reset" );
	}

	$( "#form2 input" ).checkboxradio();

	testForms( 2, 0, true );

	setTimeout( function() {
		testForms( 2, 0 );

		setTimeout( function() {
			testForms( 2, 1 );

			setTimeout( function() {
				testForms( 2, 2 );

				setTimeout( function() {
					radios[ 2 ].checkboxradio( "destroy" );
					assertChecked( false );
					start();
				} );
			});
		});
	});

} );

} );
