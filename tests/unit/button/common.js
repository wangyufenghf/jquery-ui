define( [
	"lib/common",
	"ui/button"
], function( common ) {

common.testWidget( "button", {
	defaults: {
		classes: {},
		disabled: null,
		showLabel: true,
		label: null,
		icon: null,
		iconPosition: "beginning",
		classes: {
			"ui-button": "ui-corner-all",
			"ui-button-icon-only": "",
			"ui-button-icon": ""
		},

		// Callbacks
		create: null
	}
});

} );
