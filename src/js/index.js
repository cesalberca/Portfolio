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

    function resize () {
        let styles = window.getComputedStyle(document.body)
        let gutter = styles.getPropertyValue('--gutter')
        let defaultGutter = gutter.getPropertyValue

        if (window.innerWidth < 800)
            document.body.style.setProperty('--gutter', '0px')
        else
            document.body.style.setProperty('--gutter', defaultGutter)
    }

    function init () {
        let innerLinks = document.querySelectorAll('[data-scroll-to]')
        let elementToScroll = document.body
        let elementToScrollTo
        
        innerLinks.forEach(function (link) {
            if (link.dataset.scrollTo.length === 0)
                elementToScrollTo = 0
            else
                elementToScrollTo = document.querySelector(`#${link.dataset.scrollTo}`).offsetTop

            console.log(elementToScrollTo)
            link.addEventListener('click', function () {
                scrollTo(elementToScroll, elementToScrollTo, 500)
            })
        })

        let projects = document.querySelectorAll('[data-project-src]')
        let projectShowcase = document.querySelector('#project-showcase')
        let myDescription = document.querySelector('#my-description')

        projects.forEach(function (project) {
            project.addEventListener('click', function () {
                let url = `${location.origin}/projects/${project.dataset.projectSrc}`
                console.log(url)
                myDescription.style.display = 'none'
                projectShowcase.src = url
            })
        })

        resize()
    }

    window.onload = init
    window.onresize = resize
})()