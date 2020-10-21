export default (() => {
    function resetElements(stepElements) {
        stepElements.forEach(element => {
            element.classList.remove('active');
        });
    }

    return {
        showStep: (stepNumber, stepElements) => {
            resetElements(stepElements);
            stepElements[stepNumber - 1].classList.add('active');
        },
        updateNavigation: (currentStep, formNavigationEl) => {
            const steps = [...formNavigationEl.querySelectorAll('[data-target]')];

            resetElements(steps);
            steps[currentStep - 1].classList.add('active');
        }
    };
})();