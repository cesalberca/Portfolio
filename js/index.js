(function () {
    function init () {
        let iframes = document.querySelectorAll('iframe')
        let aIframes = Array.from(iframes)

        aIframes.forEach(function (iframe) {
            iframe.sandbox = ''
        })
    }

    window.onload = init
})()