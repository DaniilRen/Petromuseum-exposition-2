const toggleElementVisibility = (element_class: string) => {
	const element = document.querySelector(`.${element_class}`) as HTMLElement | null;
	if (element) {
		if (element.style.display === 'none') {
			element.style.display = 'block';
		} else {
			element.style.display = 'none';
		}
	}
};

export default toggleElementVisibility;