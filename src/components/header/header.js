function addBurgerActive() {
	const burger = document.querySelectorAll(".header__burger");
	const nav = document.querySelector(".header__nav");

	burger.forEach((btn) => {
		btn.addEventListener("click", () => {
			nav.classList.toggle("active");
		});
	});
}

function setActiveLink() {
	const path = window.location.pathname;

	console.log(path);

	if (path.endsWith("index.html") || path === "/" || path === "/index.html") {
		document.getElementById("link-home").classList.add("header__link--active");
	} else if (path.endsWith("catalog.html")) {
		document
			.getElementById("link-catalog")
			.classList.add("header__link--active");
	} else if (path.endsWith("blog.html")) {
		document.getElementById("link-blog").classList.add("header__link--active");
	} else if (path.endsWith("about.html")) {
		document.getElementById("link-about").classList.add("header__link--active");
	}
}

export async function renderHeader() {
	await fetch("/src/components/header/header.html")
		.then((response) => response.text())
		.then((data) => {
			const placeholder = document.getElementById("header-placeholder");
			const temp = document.createElement("div");
			temp.innerHTML = data;
			const header = temp.firstElementChild;
			placeholder.replaceWith(header);
		});

	setActiveLink();
	addBurgerActive();
}
