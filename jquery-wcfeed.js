/*
 *  jQuery ICC World Cup Feed 2015 - v1.0.0
 *  A plugin to add a news scroller in any webpage for getting latest cricket scores.
 *
 *  Made by Sourav B
 *	Developed using jQuery Boilerplate-v3.3.4 and Yahoo Pipes
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

		var pluginName = 'wcfeed',
				defaults = {
				feed_url: 'http://pipes.yahoo.com/pipes/pipe.run?_id=77f6d817238499a113ec2e7fed114b8a&_render=json',
				feed_format: 'json',
				refresh_frequency: 300000,	/* time interval in milliseconds */
				slide_interval: 5000	/* time interval in milliseconds */
		};

		/* plugin constructor */
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		$.extend(Plugin.prototype, {
				init: function () {
					this.fetchFeed();
					var that = this;
					setInterval(function(){ 
						that.fetchFeed();
					}, this.settings.refresh_frequency);
				},
				fetchFeed: function () {
					var that = this;
					$.ajax({
				      url: this.settings.feed_url,
				      type: 'GET',
				      dataType: this.settings.feed_format,
				      success: function(data, textStatus, jqXHR) {
				        that.filterFeed({'feeds': data});
				      },
				      error: function(jqXHR, textStatus, errorThrown) {
				        console.log(jqXHR);
				        that.filterFeed({'feeds': false});
				      }
				    });
				},
				filterFeed: function (data) {
					var filter1 = 'Pool';
					var filter2 = 'Final';
					var filter3 = ' v ';
					var dataArr = [];
					if(!data.feeds) {
						dataArr.push({"title": "Not able to fetch data."});
					} else {
						var tmparr = data.feeds.value.items;
						$.each(tmparr, function( index, value ) {
							if(~value.title.indexOf(filter3)) {
								if(~value.title.indexOf(filter1) || ~value.title.indexOf(filter2)) {
									dataArr.push(value);
								}
							}
						});
					}
					this.createHtml(dataArr);
				},
				createHtml: function(data) {
					var tmpstr = '<ul class="cric-feed">';
					$.each(data, function( index, value ) {
							tmpstr += '<li>';
							tmpstr += '<p class="feed-time"> Last updated on ' + value.pubDate + '</p>';
							tmpstr += '<p class="feed-title">' + value.title + '</p>';
							tmpstr += '<p class="feed-desc">' + value.description + '</p>';
							tmpstr += '</li>';
					});
					tmpstr += '</ul>';
					$(this.element).html(tmpstr);
					this.animateHtml();
				},
				animateHtml: function() {
					var $el = $(this.element).find('li')
					var tmplen = $el.length;
					var i = tmplen;
					var that = this;
					(function k() {
				        $el.hide();
				        $el.eq(tmplen-i).fadeIn(400);
				        setTimeout(k, that.settings.slide_interval);
				        i--;
				        if(i==0) i = tmplen;
				    })()
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, 'plugin_' + pluginName ) ) {
								$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
						}
				});
				return this;
		};

})( jQuery, window, document );