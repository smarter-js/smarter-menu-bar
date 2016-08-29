#Menu Bar

This is currently a work in progress.

## Basic Usage

### Classes:
`nav`: All navigation must have this class.

`hor`: Styles a horizontal navigation, with dropdown menus displaying beneith links.

`ver`: Styles a vertical navigation, with dropdown menus sliding in.

`acc`: Styles an accordion navigation, with dropdown menus expanding down when clicked.

`drop`: Add to all dropdown menus

### Javascript:

Call the `findMenuBars` function in your JS:

```
SmarterMenuBar.findMenuBars()
```

or create a new menu manually:

```
var el = document.querySelector('.nav')
var menu = new SmarterMenuBar(el)
```

### Basic example:
Creates a horizontal navigation menu with HTML:

```
<div class="nav hor">
	<ul>
		<li>
			<a href="#">Link A</a>
		</li>
		<li>
			<a href="#">Link B</a>
		</li>
		<li>
			<a href="#">Link C</a>
		</li>
	</ul>
</div>
```



### Dropdown Menus:

Creates a vertical menu with a dropdown sub-menu:

```
<div class="nav ver">
	<ul>
		<li>
			<a href="#">Link A</a>
			<ul class="drop">
				<li>
					<a href="#">Subnav Link A</a>
				</li>
				<li>
					<a href="#">Subnav Link B</a>
				</li>
				<li>
					<a href="#">Subnav Link C</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="#">Link B</a>
		</li>
		<li>
			<a href="#">Link C</a>
		</li>
	</ul>
</div>
```

### Responsive menu classes

Classes can be prefixed with `l-` and `m-` to target specific device sizes, large and medium respectively. If no prefix exists, it will target all devices (small and up).

`m-acc`: Styles an accordion menu for medium and up.

`l-acc`: Styles an accordion menu for large and up.

`m-ver`: Styles a vertical menu for medium and up.

`l-ver`: Styles a vertical menu for large and up.

`m-hor`: Styles a horizontal menu for medium and up.

`l-hor `: Styles a horizontal menu for large and up.

### Responsive example

The module is built with a "mobile" first approach. So unprefixed classes are considered mobile and up. Then you add the prefixed classes to set a different navigation for medium and large devices.

This example will product a vertical navigation for mobile, accordion for mobile, and horizontal for desktop and higher:

```
<div class="nav ver m-acc l-hor">
	<ul>
		<li>
			<a href="#">Link A</a>
			<ul class="drop">
				<li>
					<a href="#">Subnav Link A</a>
				</li>
				<li>
					<a href="#">Subnav Link B</a>
				</li>
				<li>
					<a href="#">Subnav Link C</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="#">Link B</a>
		</li>
		<li>
			<a href="#">Link C</a>
		</li>
	</ul>
</div>
```


## To Do:
- Test: Build before git push, after version bump
- Keep version and package info updated in config
- Reload gulp on change
- Fix height of vertical nav
- Animate open on accordion