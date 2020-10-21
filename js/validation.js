import formData from './formData';

export default (() => {
    const message = {
        name: '',
        prefix: 'Select prefix',
        number: '',
        chess: 'Select answer',
        date: '',
        day: '',
        month: 'Select month',
        year: 'Select year',
        default: 'Invalid data'
    }

    function validateStep(step) {
        let valid = false;

        resetWarnings();

        switch(step) {
            case 1:
                valid = true;
                break;
            case 2:
                valid = validateStep2();
                break;
            case 3:
                valid = true;
                break;
            default:
                valid = true;
        }

        return valid;
    }

    function validateStep2() {
        const nameEl = document.querySelector('.form__name');
        const prefixEl = document.querySelector('.phone__prefix');
        const numberEl = document.querySelector('.phone__number');
        const chessEl = document.querySelector('.form__chess');
        const dateEl = document.querySelector('.form__date');

        const name = validateName(nameEl);
        const prefix = validatePrefix(prefixEl);
        const number = validatePhoneNumber(numberEl);
        const chess = validateChess(chessEl);
        const date = validateDate(dateEl);

        return name && prefix && number && chess && date;
    }

    function validateName(el) {
        if(el.value.length >= 3) return true;
        showWarning(el, message.default);

        return false;
    }

    function validatePrefix(el) {
        if(el.value !== '') return true;
        showWarning(el, message.prefix);

        return false;
    }

    function validatePhoneNumber(el) {
        const reg = new RegExp('^[0-9]+$');

        if(el.value.length === 9 && isNumber(el.value)) return true;
        showWarning(el, message.default);

        return false;
    }

    function isNumber(string) {
        return /^\s*[-+]?((\d+(\.\d+)?)|(\d+\.)|(\.\d+))(e[-+]?\d+)?\s*$/.test(string);
    };

    function validateChess(el) {
        const radios = [...document.querySelectorAll('input[name="chess"]')];
        let isChecked = false;

        radios.forEach(radio => {
            if(radio.checked) isChecked = true;
        });

        if(isChecked) return true;
        showWarning(el, message.chess);

        return false;
    }

    function validateDate(el) {
        const dayEl = el.querySelector('.date__day');
        const monthEl = el.querySelector('.date__month');
        const yearEl = el.querySelector('.date__year');

        const day = validateDay(dayEl, monthEl.value, yearEl.value);
        const month = validateMonth(monthEl);
        const year = validateYear(yearEl);

        return day && month && year;
    }

    function validateDay(el, month, year) {
        const chosenMonth = month || new Date().getMonth();
        const chosenYear = year || new Date().getFullYear();
        const days = daysInMonth(chosenMonth, chosenYear);

        if(el.value !== '' && el.value <= days) return true;

        showWarning(el, message.default);

        return false;
    }

    function validateMonth(el) {
        if(el.value !== '') return true;
        showWarning(el, message.month);

        return false;
    }

    function validateYear(el) {
        if(el.value !== '') return true;
        showWarning(el, message.year);

        return false;
    }

    function daysInMonth (month, year) {
        const monthNumber = typeof month === 'string' ? formData.monthsNumbers[month] : month;
        return new Date(year, monthNumber, 0).getDate();
    }

    function showWarning(el, message) {
        const messageEl = document.createElement('span');

        messageEl.classList.add('warning');
        messageEl.textContent = message;
        messageEl.style.left = `${calculateOffset(el)}px`;

        el.insertAdjacentElement("afterend", messageEl);
    }

    function resetWarnings() {
        const warnings = [...document.querySelectorAll('.warning')];

        warnings.forEach(warning => warning.remove());
    }

    function calculateOffset(el) {
        const parent = el.closest('.form__row');
        const elOffset = el.getBoundingClientRect()
        const parentOffset = parent.getBoundingClientRect();

        return Math.floor(elOffset.left - parentOffset.left);
    }

    return {
        init: step => {
            console.log('step', step)
            return validateStep(step);
        }
    }
})();