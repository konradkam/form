export default (() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsNumbers = {
        'January' : 1,
        'February' : 2,
        'March' : 3,
        'April' : 4,
        'May' : 5,
        'June' : 6,
        'July' : 7,
        'August' : 8,
        'September' : 9,
        'October' : 10,
        'November' : 11,
        'December' : 12
    }

    const years = generateYears();

    function generateYears () {
        const firstYear = 1920;
        const currentYear = new Date().getFullYear();
        let years = [];

        for(let i = 0; i < currentYear - firstYear + 1; i++) {
            years.push(firstYear + i);
        }

        years.reverse();

        return years;
    }

    return {
        months, monthsNumbers, years
    }
})();