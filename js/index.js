(function () {
    function scrollTo(element, to, duration) {
        let start = element.scrollTop
        , change = to - start
        , currentTime = 0
        , increment = 20
        
        const animateScroll = function () {        
            currentTime += increment
            let val = Math.easeInOutQuad(currentTime, start, change, duration)
            element.scrollTop = val

            if (currentTime < duration) {
                setTimeout(animateScroll, increment)
            }
        }

        animateScroll()
    } 

    // http://robertpenner.com/easing/
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t + b
        t--
        return -c/2 * (t*(t-2) - 1) + b
    }

    function init () {
        let innerLinks = document.querySelectorAll('[data-scroll-top]')
        let elementToScrollTo = document.body
        
        innerLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                scrollTo(elementToScrollTo, 0, 500)
            })
        })
    }

    window.onload = init
})()