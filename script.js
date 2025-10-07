// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		navMenu.classList.toggle('active');
	});
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
	if (hamburger && navMenu) {
		hamburger.classList.remove('active');
		navMenu.classList.remove('active');
	}
}));

// Read More Functionality
function myFunction() {
	const dots = document.getElementById("dots");
	const moreText = document.getElementById("more");
	const btnText = document.getElementById("myBtn");

	if (!dots || !moreText || !btnText) return;

	if (dots.style.display === "none") {
		dots.style.display = "inline";
		btnText.innerHTML = '<i class="fas fa-arrow-down"></i> อ่านเพิ่มเติม';
		moreText.style.display = "none";
	} else {
		dots.style.display = "none";
		btnText.innerHTML = '<i class="fas fa-arrow-up"></i> อ่านน้อยลง';
		moreText.style.display = "inline";
	}
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (!href || href === '#') return;
		const target = document.querySelector(href);
		if (!target) return;
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});
