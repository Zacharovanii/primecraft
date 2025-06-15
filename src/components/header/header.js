import headerHtml from "./header.html?raw";

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

export function renderHeader() {
	const placeholder = document.getElementById("header-placeholder");
	if (!placeholder) {
		console.error("Header placeholder not found");
		return;
	}

	const temp = document.createElement("div");
	temp.innerHTML = `
		<header class="header">
	<div class="header__inner">
		<a href="index.html" class="header__logo"></a>
		<nav class="header__nav">
			<button class="header__burger header__burger--in-nav">
				<i class="ph ph-x"></i>
			</button>
			<a id="link-home" href="index.html" class="header__link">
				<i class="ph ph-house"></i> Главная</a
			>
			<a id="link-catalog" href="catalog.html" class="header__link"
				><i class="ph ph-shopping-bag"></i> Каталог</a
			>
			<a id="link-about" href="about.html" class="header__link"
				><i class="ph ph-info"></i> О нас</a
			>
		</nav>
		<button class="header__burger"><i class="ph ph-list"></i></button>
	</div>
</header>

	`;
	const header = temp.firstElementChild;

	placeholder.replaceWith(header);

	setActiveLink();
	addBurgerActive();
}
