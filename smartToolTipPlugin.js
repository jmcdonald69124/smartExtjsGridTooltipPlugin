/**
 * Created by joshuamcdonald69124 on 1/7/14.
 */
Ext.define('plugin.showConditionalToolTip', {
    extend : 'Ext.AbstractPlugin',
    alias : 'plugin.showConditionalToolTip',
    init: function(grid){
        grid.on('columnresize', function(){
            grid.getView().refresh();
        });
        grid.on('render', function(){
            var tm = new Ext.util.TextMetrics();
            Ext.Array.each(grid.columns, function(column) {
                if (column.hasCustomRenderer == true){
                    // This column already has a renderer applied to it
                    // so we will be adding only the tooltip after the
                    // custom renderer has formatted the data.
                    column.renderer = Ext.Function.createSequence(column.renderer,function(a,b,c,d,e,f,g){
                        // There could be instances where the column actually has no value, such as
                        // row expander, etc.. check for that and only apply the tooltip if the column
                        // has data.
                        if(a){

                            // Check to see if the entire data string is visible in the cell, if it is then disregard
                            // otherwise add the tooltip
                            if ((g.ownerCt.columns[e].getEl().getWidth() || 10) <= (((tm.getSize(a).width + 15) || 0))){
                                b.tdAttr += 'data-qtip="' + a + '"';
                            }
                        }
                    });

                } else {
                    // Here we do the same as above, just w/o the sequence as there is no existing renderer
                    column.renderer = function (a,b, c, d, e, f, g){
                        if(a){
                            if ((g.ownerCt.columns[e].getEl().getWidth() || 10) <= (((tm.getSize(a).width + 15) || 0))){
                                b.tdAttr += 'data-qtip="' + a + '"';
                            }
                            return a;
                        }
                    }
                }
            });
        });
    }
});