(function () {
    var AniJSHelper = AniJS.getHelper();
    
    AniJSHelper.scrollReveal = function (animationContext, config, parameters) {
        var scrollFactor = 0.07;
        var behaviorTargetList = animationContext.behaviorTargetList;
        var actions = config.after;
        
        // If parameters contain a scroll factor, use it; otherwise, default to 0.07
        if (!isNaN(parseFloat(parameters[0]))) {
            scrollFactor = parameters[0];
        }
        
        // If there's only one parameter and it's not 'repeat', add fireOnce to after actions
        if (parameters.length < 2 && parameters[0] !== 'repeat' && actions.length < 1) {
            actions.push(AniJSHelper.fireOnce);
        }
        
        for (var i = 0; i < behaviorTargetList.length; i++) {
            var element = behaviorTargetList[i];
            if (isElementInViewport(element, scrollFactor)) {
                if (!element.isRevealed) {
                    element.isRevealed = true;
                    config.run();
                }
            } else {
                element.isRevealed = false;
            }
        }
    };
    
    function isElementInViewport(element, scrollFactor) {
        var docElem = window.document.documentElement;
        var viewportHeight = getViewportHeight(docElem);
        var pageYOffset = window.pageYOffset;
        var elementOffsetTop = getOffset(element).top;
        var elementHeight = element.offsetHeight;
        var elementBottom = elementOffsetTop + elementHeight;
        
        return (pageYOffset + viewportHeight >= elementOffsetTop + elementHeight * scrollFactor && elementBottom >= pageYOffset) ||
            (window.getComputedStyle(element, null).position === "fixed");
    }
    
    function getViewportHeight(docElem) {
        var clientHeight = docElem.clientHeight;
        var innerHeight = window.innerHeight;
        return innerHeight > clientHeight ? innerHeight : clientHeight;
    }
    
    function getOffset(element) {
        var offsetTop = 0;
        var offsetLeft = 0;
        
        do {
            if (!isNaN(element.offsetTop)) {
                offsetTop += element.offsetTop;
            }
            if (!isNaN(element.offsetLeft)) {
                offsetLeft += element.offsetLeft;
            }
        } while (element = element.offsetParent);
        
        return { top: offsetTop, left: offsetLeft };
    }
    
    window.scroll(window.scrollX, window.scrollY + 1);
})(window);
