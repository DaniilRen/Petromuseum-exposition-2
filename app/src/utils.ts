const toggleArrowButton = () => {
	const arrowBack = document.querySelector('.back-arrow') as HTMLElement | null;
	if (arrowBack) {
		if (arrowBack.style.display === 'none') {
			arrowBack.style.display = 'block';
		} else {
			arrowBack.style.display = 'none';
		}
	}
};


export default toggleArrowButton;