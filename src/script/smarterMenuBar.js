



// MenuBar prototype/default options
let proto = {
	jsHover: true,
	classes: {
		nav: 'nav',
		vertical: 'ver',
		open: 'open'
	},


	// Closes all dropdowns
	closeAll: function(el){
		if(el){
			let els = el.querySelectorAll('li')
				, i
			for(i = els.length; i--;){
				els[i].classList.remove(this.classes.open)
			}
		}
		else{
			for(i = this.mainLinks.length; i--;){
				this.mainLinks[i].classList.remove(this.classes.open)
			}
		}
	},



	// Open or close on hover if MenuBar hasn't changed to vertical
	hoverOpen: function(el){
		let display = getComputedStyle(el).display
		if(display !== 'block' && display !== 'list-item'){
			el.classList.add(this.classes.open)
		}
	},
	hoverClose: function(el){
		let display = getComputedStyle(el).display
		if(display !== 'block' && display !== 'list-item'){
			el.classList.remove(this.classes.open)
		}
	},



	// Click forward/back on vertical
	clickOpen: function(el, e){
		let display = getComputedStyle(el).display
		if(display === 'block'){
			e.preventDefault()
			el.classList.add(this.classes.open)
			this.adjustHeight(el.querySelector('ul'))
		}
		// If accordion, expand new menu
		else if(display === 'list-item'){
			e.preventDefault()
			e.stopPropagation()
			if(!el.classList.contains(this.classes.open)){
				// Don't close all, only close on current level
				this.closeAll(el.parentElement)
				el.classList.add(this.classes.open)
			}
			// If does contain, only close current level
			else{
				this.closeAll(el.parentElement)
			}
		}
	},
	clickBack: function(el, e){
		e.stopPropagation()
		if(e.target.tagName === 'UL'){
			let parent = el.parentElement
			parent.classList.remove(this.classes.open)

			parent = parent.parentElement
			if(parent.parentElement.classList.contains(this.classes.vertical)){
				this.parent.style.height = '100%'
			}
			else{
				this.adjustHeight(parent)
			}
		}
	},




	// Adjust size after every vertical menu change
	// Gets overwritten by CSS often?
	// Detect which media query we're on?
	adjustHeight: function(el){
		//this.parent.style.height = el.offsetHeight + 'px'
	}
}




// Constructor function
function SmarterMenuBar(config){
	let i
	for(i in config){
		this[i] = config[i]
	}

	// Back pseudo element click
	this.mainLinks = []
	this.dropdowns = this.parent.querySelectorAll('ul ul')

	for(i = this.dropdowns.length; i--;){
		this.dropdowns[i].addEventListener('click', this.clickBack.bind(this, this.dropdowns[i]))
		this.mainLinks.push(this.dropdowns[i].parentElement)
	}

	// Attach hover and click events
	for(i = this.mainLinks.length; i--;){
		if(this.jsHover){
			this.mainLinks[i].addEventListener('mouseover', this.hoverOpen.bind(this, this.mainLinks[i]))
			this.mainLinks[i].addEventListener('mouseout', this.hoverClose.bind(this, this.mainLinks[i]))
		}
		this.mainLinks[i].addEventListener('click', this.clickOpen.bind(this, this.mainLinks[i]))
	}

	return this
}
SmarterMenuBar.prototype = proto





// Finds each .nav on page and processes
SmarterMenuBar.findMenuBars = function(){
	var navs = document.querySelectorAll('.' + proto.classes.nav)
	for(var i = navs.length; i--;){
		new SmarterMenuBar({
			parent: navs[i]
		})
	}
}











