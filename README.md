# jQuery.responsiveNav plugin

## Usage
Select your navigation element (the parent of your nav's root <ul>) and call the __responsiveNav__ plugin.

```javascript
$(document).ready(function(){

    $('#nav').responsiveNav({...});

});
```

## Options

###### generateMenuHandle
Default is true. This generates a <a href="menu-handle generated"><i></i>__options.menuHandleText__<span></a> element. The <i> tag is intended for an icon.

###### menuHandleText
Default is "Menu".

###### generateBackLinks
Default is true. This generates a <li class="back generated"><a>Back</a></li> element at the top of a parent's child list. Use CSS to hide or display these at the necessary breakpoints.
You may also pass a function for this option, which should return the html/element you want to use for the back button.

##### backLinkText
Default is "Back".

###### generateSubSectionLinks
Default is true. This generates a copy of the parent link and places it in its child list, since parent only reveal their children during "small" behavior. You can use the __subSectionLinkExists__ parameter to exclude certain sections.
You may also pass a function for this option, which should return the html/element you want to use for the section link.

###### subSectionLinkExists
This function is passed a parent/section link and its child list (function($a, $ul){...}), which you can use to determine if a sub section link already exists. If this function returns true, a sub section link will not be generated.
By default, this function looks for a child link with the same URL as its section link.

###### sectionSecondTapGo
Goes to the URL the section link specifies, after it has been clicked to reveal its children.

###### generateFocusIcon
Default is true, which appends <i class="focus-handle generated"> to the links. This is typically the "plus" icon or "down" arrow that indicates the item expands/has children.
You may also pass a function for this option, which should return the html/element you want to use for the icon.

###### generateGoIcon
Default is true, which appends <i class="go-handle generated"> to the links. This is typically the "right" arrow indicating that the URL takes them somewhere.
You may also pass a function for this option, which should return the html/element you want to use for the icon.