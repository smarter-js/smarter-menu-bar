/*! Smarter Menu Bar v0.0.0 | MIT License | Kennedy Rose <kennedy@kennedyrose.com> (https://kennedyrose.com) */ 
;(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory)
	} else if (typeof exports === 'object') {
		module.exports = factory()
	} else {
		root.SmarterMenuBar = factory()
	}
}(this, function() {
	'use strict'
	// MenuBar prototype/default options
	var proto = {
		jsHover: true,
		classes: {
			nav: 'nav',
			vertical: 'ver',
			open: 'open'
		},
		// Closes all dropdowns
		closeAll: function closeAll(el) {
			if (el) {
				var els = el.querySelectorAll('li'),
					_i = void 0
				for (_i = els.length; _i--;) {
					els[_i].classList.remove(this.classes.open)
				}
			} else {
				for (i = this.mainLinks.length; i--;) {
					this.mainLinks[i].classList.remove(this.classes.open)
				}
			}
		},
		// Open or close on hover if MenuBar hasn't changed to vertical
		hoverOpen: function hoverOpen(el) {
			var display = getComputedStyle(el).display
			if (display !== 'block' && display !== 'list-item') {
				el.classList.add(this.classes.open)
			}
		},
		hoverClose: function hoverClose(el) {
			var display = getComputedStyle(el).display
			if (display !== 'block' && display !== 'list-item') {
				el.classList.remove(this.classes.open)
			}
		},
		// Click forward/back on vertical
		clickOpen: function clickOpen(el, e) {
			var display = getComputedStyle(el).display
			if (display === 'block') {
				e.preventDefault()
				el.classList.add(this.classes.open)
				this.adjustHeight(el.querySelector('ul'))
			} // If accordion, expand new menu
			else if (display === 'list-item') {
				e.preventDefault()
				e.stopPropagation()
				if (!el.classList.contains(this.classes.open)) {
					// Don't close all, only close on current level
					this.closeAll(el.parentElement)
					el.classList.add(this.classes.open)
				} // If does contain, only close current level
				else {
					this.closeAll(el.parentElement)
				}
			}
		},
		clickBack: function clickBack(el, e) {
			e.stopPropagation()
			if (e.target.tagName === 'UL') {
				var parent = el.parentElement
				parent.classList.remove(this.classes.open)
				parent = parent.parentElement
				if (parent.parentElement.classList.contains(this.classes.vertical)) {
					this.parent.style.height = '100%'
				} else {
					this.adjustHeight(parent)
				}
			}
		},
		// Adjust size after every vertical menu change
		// Gets overwritten by CSS often?
		// Detect which media query we're on?
		adjustHeight: function adjustHeight(el) {}
	}
	// Constructor function
	function SmarterMenuBar(config) {
		var i = void 0
		for (i in config) {
			this[i] = config[i]
		}
		// Back pseudo element click
		this.mainLinks = []
		this.dropdowns = this.parent.querySelectorAll('ul ul')
		for (i = this.dropdowns.length; i--;) {
			this.dropdowns[i].addEventListener('click', this.clickBack.bind(this, this.dropdowns[i]))
			this.mainLinks.push(this.dropdowns[i].parentElement)
		}
		// Attach hover and click events
		for (i = this.mainLinks.length; i--;) {
			if (this.jsHover) {
				this.mainLinks[i].addEventListener('mouseover', this.hoverOpen.bind(this, this.mainLinks[i]))
				this.mainLinks[i].addEventListener('mouseout', this.hoverClose.bind(this, this.mainLinks[i]))
			}
			this.mainLinks[i].addEventListener('click', this.clickOpen.bind(this, this.mainLinks[i]))
		}
		return this
	}
	SmarterMenuBar.prototype = proto
	// Finds each .nav on page and processes
	SmarterMenuBar.findMenuBars = function() {
		var navs = document.querySelectorAll('.' + proto.classes.nav)
		for (var i = navs.length; i--;) {
			new SmarterMenuBar({
				parent: navs[i]
			})
		}
	}
	return SmarterMenuBar
}))