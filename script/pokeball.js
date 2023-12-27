export default (() => {
    const starters = document.querySelector('.starters');
    starters?.addEventListener('click', (event) => {
        let starterContainer = event.target.closest('.starter-container');
        if (starterContainer.classList.contains('active')) {
            starterContainer.classList.remove('active');
        } else {
            starters.querySelector('.starter-container.active')?.classList.remove('active');
            starterContainer.classList.add('active');
        }
    });
})();