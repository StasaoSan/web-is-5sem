(function() {
    window.addEventListener('load', function() {
        let timing = performance.getEntriesByType('navigation')[0];

        const pageLoadTime = timing.loadEventEnd - timing.responseEnd;

        if (pageLoadTime < 0) {
            setTimeout(function() {
                const correctedPageLoadTime = timing.loadEventEnd - timing.responseEnd;
                displayLoadTime(correctedPageLoadTime);
            }, 100);
        } else {
            displayLoadTime(pageLoadTime);
        }

        function displayLoadTime(loadTime) {
            const footer = document.querySelector('footer');
            const statElement = document.createElement('div');
            statElement.textContent = `Время загрузки страницы: ${loadTime} мс`;
            footer.appendChild(statElement);
        }
    });
})();
