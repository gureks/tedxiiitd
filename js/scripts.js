(function($) {
	'use strict';

	var project = {};

	project.name = 'UX Talks';
	project.currentBreakpoint = {};

	project.init = function() {
		$('body').data('project', project);

		project.currentBreakpoint.getBreakpoint();
		project.waypoints();
		project.smoothScrolling();
    	project.addCustomEvents();
	};

	project.currentBreakpoint.getBreakpoint = function() {
		var currentValue  = window.getComputedStyle(
			document.querySelector('body'), ':before')
			.getPropertyValue('content').replace(/\"/g, '');
		if(currentValue !== this.value) {
			this.value = currentValue;
			$(window).trigger('modechanged');
		}
	};

	project.updateNav = function(anchor) {
		if(anchor !== '') {
			$('.footer a').not('.btn').removeClass('active');
			$('.footer').find('a[href=#'+anchor+']:not(.btn)').addClass('active');
		} else {
			$('.footer a').not('.btn').removeClass('active');
		}
	};

	project.smoothScrolling = function() {
		$('.footer a[href*="#"]:not([href="#"]):not(.btn)').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html, body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		});
	};

	project.waypoints = function() {
		var footer = document.querySelector('.footer');
		var waypoint1 = new Waypoint({
			element: document.getElementById('join'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav();
				footer.className = 'footer';
				this.element.className += ' active';
			},
			offset: -10
		}),
		waypoint1_1 = new Waypoint({
			element: document.getElementById('join'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav('event');
				footer.className += ' middle';
			},
			offset: -40
		}),
		waypoint2 = new Waypoint({
			element: document.getElementById('event'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav('event');
				this.element.className += ' active';
			},
			offset: 300
		}),
		waypoint2_1 = new Waypoint({
			element: document.getElementById('event'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav('event');
				this.element.className += ' active';
			},
			offset: function(){
				return -this.element.clientHeight + 301;
			}
		}),
		waypoint3 = new Waypoint({
			element: document.getElementById('speakers'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav('speakers');
				this.element.className += ' active';
			},
			offset: 300
		}),
		waypoint3_1 = new Waypoint({
			element: document.getElementById('speakers'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav('speakers');
				this.element.className += ' active';
			},
			offset: function(){
				return Waypoint.viewportHeight() -this.element.clientHeight - 400;
			}
		}),
		waypoint4 = new Waypoint({
			element: document.getElementById('sponsors'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				project.updateNav('sponsors');
				this.element.className += ' active';
			},
			offset: 200
		}),
		waypoint4_1 = new Waypoint({
			element: document.getElementById('sponsors'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				footer.className = footer.className.replace(/ bottom/g, '');
				footer.className += ' middle';
				var btn = document.querySelector('.footer .btn');
				btn.style.top = project.buttonPosition('.footer .btn', true).Y;
				btn.style.left = project.buttonPosition('.footer .btn', true).X;
				this.element.className += ' active';
			},
			offset: function(){
				return Waypoint.viewportHeight() -this.element.clientHeight + 10;
			}
		}),
		waypoint5 = new Waypoint({
			element: document.getElementById('sponsors'),
			handler: function() {
				var el = document.querySelectorAll('.scroll-section');
				[].forEach.call(el, function(item) {
					item.className = item.className.replace(/ active/g,'');
				});
				footer.className = footer.className.replace(/ middle/g, '');
				footer.className += ' bottom';
				var btn = document.querySelector('.footer .btn');
				btn.style.top = project.buttonPosition('.footer .btn', false).Y;
				btn.style.left = project.buttonPosition('.footer .btn', false).X;
				this.element.className += ' active';
			},
			offset: 'bottom-in-view'
		});
	};

	project.buttonPosition = function(selector, reset) {
		if(!reset) {
			if($(selector).length) {
				var button = {
					posX: $(selector).offset().left,
					posY: $(selector).offset().top
				},
				target = {
					posY: $('.sponsors .content-box').offset().top + $('.sponsors .content-box').outerHeight(),
					posX: $('.sponsors .content-box').offset().left
				},
				translate = {
					X: target.posX - button.posX + 50 + 'px',
					Y: target.posY - button.posY + 'px'
				}
				return translate;
			}
		} else {
			var translate = {
				X: 0,
				Y: 0
			}
			return translate;
		}
	};

	project.addCustomEvents = function() {
		$(window).on('modechanged', function() {

		}).trigger('modechanged');

		$(window).on('resize', function() {
			project.currentBreakpoint.getBreakpoint();
		}).trigger('resize');
	};

	$(document).ready(project.init);
})(jQuery);

