var workspace = {};
var isFirefox = !(window.mozInnerScreenX == null);

$.fn.is_on_screen = function(contener){
    
    var viewport = contener.offset();
    
    viewport.right = viewport.left + contener.get()[0].clientWidth;
    viewport.bottom = viewport.top + contener.get()[0].clientHeight;
    
    viewport.is_on = function(x11, y11, x12, y12){
    	var x21 = viewport.left;
        var y21 = viewport.top;
        var x22 = viewport.right;
        var y22 = viewport.bottom;
        
        var x_overlap = Math.max(0, Math.min(x12,x22) - Math.max(x11,x21));
        var y_overlap = Math.max(0, Math.min(y12,y22) - Math.max(y11,y21));
        
        return (x_overlap * y_overlap > 0);
    }
     
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
         
    return (viewport.is_on(bounds.left, bounds.top, bounds.right, bounds.bottom));
};

// générateur de nombre aléatoire
function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
} 
