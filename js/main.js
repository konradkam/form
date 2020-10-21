import steps from './steps';
import validation from './validation';
import formData from './formData';

(function () {
    const formButtonEl = document.querySelector('.form-button');
    const formNavigationEl = document.querySelector('.form__navigation');
    const stepElements = [...document.querySelectorAll('[data-step]')];
    const numberOfSteps = stepElements.length;
    let currentStep = 2;

    populateSelects();
    addEventListeners();

    updateStep(currentStep, stepElements);

    function populateSelects() {
        const monthsEl = document.querySelector('.date__month');
        const yearsEl = document.querySelector('.date__year');
        const months = formData.months;
        const years = formData.years;
        const monthsFragment = createSelectFragment(months);
        const yearsFragment = createSelectFragment(years);

        monthsEl.appendChild(monthsFragment);
        yearsEl.appendChild(yearsFragment);
    }

    function createSelectFragment(array) {
        const selectFragment = document.createDocumentFragment();

        array.forEach((value) => {
            const optionEl = document.createElement('option');

            optionEl.value = value;
            // optionEl.value = typeof value === 'string' ? value.toLowerCase() : value;
            optionEl.textContent = value;

            selectFragment.appendChild(optionEl);
        });

        return selectFragment;
    }

    function addEventListeners() {
        formButtonEl.addEventListener('click', handleFormButton);
        formNavigationEl.addEventListener('click', handleNavigationClick);
    }

    function handleFormButton() {
        if(!validation.init(currentStep)) return;

        if(currentStep >= numberOfSteps) {
            console.log('submit');
        } else {
            currentStep++;
            updateStep(currentStep, stepElements);
        }
    }

    function updateStep(currentStep, stepElements) {
        steps.showStep(currentStep, stepElements);
        steps.updateNavigation(currentStep, formNavigationEl);
        updateButton();
    }

    function updateButton() {
        formButtonEl.textContent = currentStep >= numberOfSteps ? 'Submit' : 'Continue';
    }

    function handleNavigationClick(e) {
        const target = e.target;

        if(!target.hasAttribute('data-target')) return;

        setCurrentStep(parseInt(target.dataset.target));
        updateStep(currentStep, stepElements);
    }

    function setCurrentStep(step) {
        currentStep = step;
    }
})();