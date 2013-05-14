# jQuery.responsiveNav plugin

## Usage
Select your navigation element (the parent of your nav's root <ul>) and call the __responsiveNav__ plugin.

```javascript
$(document).ready(function(){

    $('#nav').responsiveNav({...});

});
```

## Options

###### smallWidthMax
Default is 480. When the viewport is less than or equal to this number, the "small" (touch device, generally) behavior is activated.

###### smallShowsSingle
Default is false. When true, only one child list will be shown at a time for the "small" behavior.

###### generateBackLinks
Default is true. This generates a <li class="back-generated"><a>Back</a></li> element at the top of a parent's child list. Use CSS to hide or display these at the necessary breakpoints.

##### backLinkText
Default is "Back".

###### generateSubSectionLinks
Default is true. This generates a copy of the parent link and places it in its child list, since parent only reveal their children during "small" behavior. You can use the __subSectionLinkExists__ parameter to exclude certain sections.

###### subSectionLinkExists
This function is passed a parent/section link and its child list (function($a, $ul){...}), which you can use to determine if a sub section link already exists. If this function returns true, a sub section link will not be generated.
By default, this function looks for a child link with the same URL as its section link.

###### sectionSecondTapGo
Goes to the URL the section link specifies, after it has been clicked to reveal its children.