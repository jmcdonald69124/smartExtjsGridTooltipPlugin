smartExtjsGridTooltipPlugin
===========================

Extjs 4 Plugin that adds tooltips only when text overflows the grid cell

Recently I was asked to make a tooltip appear with the text from a cell within when the user hovers over the cell – this is pretty straight forward, and examples exist everywhere, however, to throw a twist in the tooltip, the text was only supposed to show when the data actually overflowed the cell thus creating the ellipsis. I started to code and came up with a pretty straightforward solution, add a renderer to the column programmatically when the grid was rendered, however, I soon discovered that this method has some problems. First, if there was already a renderer present the new addition would simply overwrite the existing renderer – not cool. Second, in the case of a ‘tpl’ column like the row expander where the value in the value parameter (yes I meant to write it like that) is undefined then the whole thing blew up. It took a bit of time to overcome these obstacles so I wanted to take a few minutes and share my discoveries in case anyone else out there runs across the same issues.

Ext.Function contains quite a few features that everyone should become familiar with; I choose to chain the original renderer to the new function that handled the logic for the tooltip using the ‘createSequence’ method. http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.Function-method-createSequence I could do this because I was only appending the metadata’s tdAttr. The fact that the passed function is called with all of the original functions parameters gave me access to the original renderer’s value which are found here: http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.grid.column.Column-cfg-renderer. The parameters that we are concerned with are the value of the cell (a), the metadata (b), the column index so that  we can get the current width, and the view.

Next, I relied on Ext’s Text Metrics (http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.util.TextMetrics) utility that allows you to get the width and height in pixels of a string that you pass it.

Finally, this was added to the grid’s column render event which is called when the grid is first rendered, however, if the user decides to
