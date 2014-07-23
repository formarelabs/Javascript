/**
  *	SpyScroll 0.4 - Plugin que verifica scroll na tela
  * Copyroght Christoffer Lucas - Formare www.solucoesformare.com.br
**/


// Breve explicação sobre o this no javascript

//In typical usage you'll usually see them like this (the $this usage may vary):
/**

this - Refers to the DOM element in the handler you're currently
on, but this may be another object entirely in other situations, but it's always the context.

$this - Usually created by var $this = $(this) a cached version of
the jQuery wrapped version for efficiency (or chain off $(this) to get the same in many cases).



$(this) - The jQuery wrapped version of the element, so you have access
to all its methods (the ones in $.fn specifically).

**/
// fim da explicação

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "spyScroll",
		defaults = {
			tagTarget: ""
		};


		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function () {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like so: this.yourOtherFunction(this.element, this.settings).

				var arrHash = [];
				var items = [];


				items = (this.element.children);

				$(items).each(function(i, e) {
					var data = $(e).children().data("id");
					arrHash.push(data);
				});

				//console.log(arrHash, this.settings);
				this.spyScroll(items, arrHash);
			},

			spyScroll: function (items, arrHash) {

				$(window).scroll(function(event) {

					var pos = $(window).scrollTop();
					var height = $(window).scrollTop();
					var docHeight = $(document).scrollTop();

					//console.log(docHeight, pos, that, arrHash);

					for (var i=0; i < arrHash.length; i++) {
						var _data = arrHash[i];									// capturando cada id que identifica cada bloco que forma a página
						var _dataPos = $('#'+_data).offset().top;				// posicao de cada bloco que forma a página
						var _hashHeight = $('#'+_data).height();				// altura de cada bloco que forma a página

						console.log(pos, _dataPos);

						// se a página estiver na posição de algum dos blocos existentes
						if(pos >= _dataPos) {
							$(items).each(function(i,e){
								if($(e).children().data("id") == _data) {
									$(e).children().addClass('active');
									console.log($(e).children(), $(e).children().data("id"), $(e).children().data("id") == _data);
								} else {
									$(e).children().removeClass('active');
								}
							});
						}

					}
				});
			}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
			this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});
			// chain jQuery functions
			return this;
		};

})( jQuery, window, document );
