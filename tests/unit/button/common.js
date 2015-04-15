define( [
	"lib/common",
	"ui/button"
], function( common ) {

common.testWidget( "button", {
	defaults: {
		classes: {
			"ui-button": "ui-corner-all"
		},
		disabled: null,
		showLabel: true,
		label: null,
		icon: null,
		iconPosition: "beginning",

		// Callbacks
		create: null
	}
});

} );
