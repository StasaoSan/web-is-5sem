document.addEventListener('DOMContentLoaded', function() {
    const buyButton = document.querySelector('.buy-button .button');

    function updateButtonText() {
        if (window.innerWidth <= 768) {
            buyButton.textContent = 'Купить';
        } else {
            buyButton.textContent = 'Купить лучший контроллер';
        }
    }

    updateButtonText();

    window.addEventListener('resize', updateButtonText);
});


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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tuning-form');
    const partNameInput = document.getElementById('part-name');
    const partPriceInput = document.getElementById('part-price');
    const priorityInput = document.getElementById('priority');
    const tuningList = document.getElementById('tuning-list');
    const sortPriorityCheckbox = document.getElementById('sort-priority');
    const sortPriceCheckbox = document.getElementById('sort-price');
    const clearCompletedButton = document.getElementById('clear-completed');

    let tuningItems = JSON.parse(localStorage.getItem('tuningItems')) || [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const partName = partNameInput.value.trim();
        const partPrice = parseFloat(partPriceInput.value.trim());
        const priority = parseInt(priorityInput.value, 10);

        if (partName === '' || isNaN(partPrice) || isNaN(priority)) {
            alert('Пожалуйста, введите корректные данные.');
            return;
        }

        const newItem = {
            name: partName,
            price: partPrice,
            priority: priority,
            completed: false
        };

        tuningItems.push(newItem);
        saveAndRenderItems();
        form.reset();
    });

    tuningList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            const index = e.target.dataset.index;
            tuningItems[index].completed = !tuningItems[index].completed;
            saveAndRenderItems();
        }
    });

    sortPriorityCheckbox.addEventListener('change', saveAndRenderItems);
    sortPriceCheckbox.addEventListener('change', saveAndRenderItems);

    clearCompletedButton.addEventListener('click', function() {
        tuningItems = tuningItems.filter(item => !item.completed);
        saveAndRenderItems();
    });

    function saveAndRenderItems() {
        localStorage.setItem('tuningItems', JSON.stringify(tuningItems));
        renderItems();
    }

    function renderItems() {
        tuningList.innerHTML = '';

        let itemsToRender = [...tuningItems];

        if (sortPriorityCheckbox.checked) {
            itemsToRender.sort((a, b) => b.priority - a.priority);
        }

        if (sortPriceCheckbox.checked) {
            itemsToRender.sort((a, b) => a.price - b.price);
        }

        let hasCompletedItems = false;

        itemsToRender.forEach((item, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            li.className = item.completed ? 'completed' : '';
            li.innerHTML = `${item.name} - ${item.price.toFixed(2)}₽ (Желанность: ${item.priority})`;
            tuningList.appendChild(li);

            if (item.completed) {
                hasCompletedItems = true;
            }
        });

        if (hasCompletedItems) {
            clearCompletedButton.style.display = 'block';
        } else {
            clearCompletedButton.style.display = 'none';
        }
    }

    renderItems();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-list a');

    const currentUrl = window.location.pathname.split('/').pop();

    menuLinks.forEach(link => {
        const linkUrl = link.getAttribute('href').split('/').pop();

        if (linkUrl === currentUrl) {
            link.classList.add('active');
        }
    });
});
