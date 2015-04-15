/*!
 * jQuery UI Controlgroup @VERSION
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/controlgroup/
 */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./core",
			"./widget"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

return $.widget( "ui.controlgroup", {
	version: "@VERSION",
	defaultElement: "<div>",
	options: {
		disabled: null,
		items: {
			"button": "input[type=button], input[type=submit], input[type=reset], button, a",
			"checkboxradio": "input[type='checkbox'], input[type='radio']",
			"selectmenu": "select"
		},
		direction: "horizontal",
		excludeInvisible: true
	},

	_create: function() {
		this._enhance();
	},

	// To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
	_enhance: function() {
		this.element.attr( "role", "toolbar" );
		this.refresh();
	},

	_destroy: function() {
		var that = this;
		$.each( this.options.items, function( widget, selector ) {
			that.element.find( selector ).map( function() {
				return $( this )[ widget ]( "widget" )[ 0 ];
			} ).removeData( "ui-controlgroup-data" );
		} );
		this._callChildMethod( "destroy" );
		this.element.removeAttr( "role" );
	},

	_callChildMethod: function( method ) {
		var that = this;

		this.childWidgets = $();

		// First we iterate over each of the items options
		$.each( this.options.items, function( widget, selector ) {
			var widgets,
				options = {};

			// We assume everything is in the middle to start cant determin
			// first last until all enhancment is done
			if ( that[ "_" + widget + "_options" ] ) {
				options = that[ "_" + widget + "_options" ]( "middle" );
			}

			// Make sure the widget actually exists and has a selector set
			if ( $.fn[ widget ] && selector ) {

				// Find instances of this widget inside controlgroup and run method or set options
				widgets = that.element.find( selector )[ widget ]( method ? method : options );

				// Don't set data or add to the collection if the method is destroy
				if (  method !== "destroy" )	{
					widgets.each( function() {

						// Set data on the widget element pointing to the this.element of the widget
						// and telling us what type of widget this is
						var widgetElement =
							$( this )[ widget ]( "widget" ).data( "ui-controlgroup-data", {
								"widgetType": widget,
								"element": $( this )
							} );

						// Add the current widget to the collection for tracking
						that.childWidgets = that.childWidgets.add( widgetElement );
					} );
				}
			}
		} );
	},

	_button_options: function( position, direction ) {
		return {
			classes: {
				"ui-button": {
					"middle": null,
					"first": "ui-corner-" + ( direction ? "top" : "left" ),
					"last": "ui-corner-" + ( direction ? "bottom" : "right" )
				}[ position ]
			}
		};
	},

	_checkboxradio_options: function( position, direction ) {
		return {
			classes: {
				"ui-checkboxradio-label": {
					"middle": null,
					"first": "ui-corner-" + ( direction ? "top" : "left" ),
					"last": "ui-corner-" + ( direction ? "bottom" : "right" )
				}[ position ]
			}
		};
	},

	_selectmenu_options: function( position, direction ) {
		return {
			width: direction ? "auto" : false,
			classes: {
				middle: {
					"ui-selectmenu-button-open": null,
					"ui-selectmenu-button-closed": null
				},
				first: {
					"ui-selectmenu-button-open":
					"ui-corner-" + ( direction ? "top" : "tl" ),
					"ui-selectmenu-button-closed":
					"ui-corner-" + ( direction ? "top" : "left" )
				},
				last: {
					"ui-selectmenu-button-open":
					direction ? null : "ui-corner-tr",
					"ui-selectmenu-button-closed":
					"ui-corner-" + ( direction ? "bottom" : "right" )
				}

			}[ position ]
		};
	},

	_setOption: function( key, value ) {
		var original = this.options[ key ];

		this._super( key, value );
		if ( key === "direction" ) {
			this._removeClass( "ui-controlgroup-" + original );
		}
		if ( key === "disabled" ) {
			this._callChildMethod( value ? "disable" : "enable" );
			return;
		}

		this.refresh();
	},

	refresh: function() {
		var children,
			that = this;

		this._addClass( "ui-controlgroup ui-controlgroup-" + this.options.direction );
		this._callChildMethod();

		children = this.childWidgets;

		// We filter here because we need to track all childWidgets not just the visible ones
		if ( this.options.excludeInvisible ) {
			children = children.filter( ":visible" );
		}

		if ( children.length ) {

			// We do this last because we need to make sure all enhancment is done
			// before determining first and last
			[ "first", "last" ].forEach( function( value ) {
				var data = children[ value ]().data( "ui-controlgroup-data" );
				if ( that[ "_" + data.widgetType + "_options" ] ) {
					data.element[ data.widgetType ](
						that[ "_" + data.widgetType + "_options" ](
							value,
							that.options.direction === "vertical"
						)
					);
				}
			} );

			// Finally call the refresh method on each of the child widgets.
			this._callChildMethod( "refresh" );
		}
	}

} );

} ) );
