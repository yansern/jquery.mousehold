jquery.mousehold
================

Mousehold event for jQuery.

### Usage Example

```
$(elem)
	.on("mousehold",
		{
			duration: 1000,
			delay: 500,
			tolerance: 0
		},
		function(){
			console.log("User is holding the mouse button.");
		});
```

### Options

**duration** (default: 1000)

The amount of time in _milliseconds_ user should hold the mouse button until `mousehold` event is triggered.

**delay**

The amount of time in milliseconds after user presses on the mouse button until `mouseholdstart` event is triggered.

**tolerance** (default: 0)

During the delay period, if the user moves the mouse cursor beyond the number of _pixels_ specified by this option, then the user is considered to be not holding the mouse. 

`mouseholddeactivate` and `mouseholdcancel` event will be triggered if cursor movement exceeds tolerated number of pixels.

### Events

**mouseholdactivate**

This event is triggered when user presses the mouse button. At this point, mousehold is on a _delay phase_ where cursor movements will cancel the mousehold event.

**mouseholdstart**

This event is triggered when user is still holding the mouse button after the initial _delay phase_ as specified by the **delay** option. This event confirms that user is really holding the mouse button and not performing other operations like text selection.

**mousehold**

This event is triggered when user has been holding the mouse button for the amount of time specified by the **duration** option.

**mouseholdcancel**

This event is triggered when user releases the mouse button after passing the intial _delay phase_ but not long enough for the amount of time specified by the **duration** option.

**mouseholddeactivate**

This event is triggered everytime when user releases the mouse button.


### License
Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

Plugin written by [Jensen Tonne](mailto:jensen.tonne@gmail.com).
