export function renderCatalog(data) {
	const catalogItems = document.getElementById("catalogItems");
	const categoryFilters = document.getElementById("categoryFilters");
	const categories = [...new Set(data.map((item) => item.category))];

	// Иконки для категорий
	const categoryIcons = {
		Креатин: "ph-lightning",
		"Цитруллин малат": "ph-heartbeat",
		// "BCAA 2:1:1": "ph-bottle",
		// "Сывороточный протеин": "ph-milk",
		Тестобустеры: "ph-test-tube",
		"Детские витамины": "ph-baby",
		"Батончики Plantago": "ph-cookie",
		Цинк: "ph-atom",
		CLA: "ph-leaf",
		"Энергетические напитки": "ph-lightning",
		"5-HTP": "ph-brain",
		Железо: "ph-anchor",
		"Многокомпонентный протеин": "ph-stack",
		DMAE: "ph-brain",
		Хром: "ph-atom",
		НОВИНКИ: "ph-sparkle",
		// "Коллаген (капсулы)": "ph-bone",
		"Альфа-липоевая кислота": "ph-flask",
		"STARTER PACK": "ph-package",
		"Протеиновые батончики Primebar": "ph-cookie",
		"Коэнзим Q10": "ph-heart",
		"Витамины и добавки": "ph-pill",
		// EAA: "ph-bottle",
		"Печенье Plantago": "ph-cookie",
		"Витаминные комплексы": "ph-pill",
		"Говяжий коллаген": "ph-bone",
	};

	// Рендеринг фильтров с иконками
	categoryFilters.innerHTML = categories
		.map((cat) => {
			const iconClass = categoryIcons[cat] || "ph-pill";
			return `
            <li data-category="${cat}">
                <a>
                    <i class="ph ${iconClass}"></i>
                    <span>${cat}</span>
                </a>
            </li>
            `;
		})
		.join("");

	// Инициализация сайдбара
	initSidebar();

	function updateCatalog(filterCategory = null) {
		const filtered = filterCategory
			? data.filter((item) => item.category === filterCategory)
			: data;
		catalogItems.innerHTML = filtered
			.map((item) => {
				const oldPrice = item.price.old
					? `<div class="catalog__price-old">${item.price.old} ₽</div>`
					: "";
				const discount = item.price.discount
					? `<div class="catalog__discount">${item.price.discount}</div>`
					: "";

				return `
                <div class="catalog__card" data-id="${item.id}">
                    <img src="${item.images[0].url}" alt="">
                    <div class="catalog__card-title">${item.title}</div>
                    <div class="catalog__card-prices">
                        <div class="catalog__price-current">${item.price.current} ₽</div>
                        ${oldPrice}
                        ${discount}
                    </div>
                </div>
                `;
			})
			.join("");
	}

	updateCatalog();

	// Обработчики событий для фильтров
	categoryFilters.addEventListener("click", (e) => {
		const li = e.target.closest("li");
		if (!li) return;

		document.querySelectorAll(".catalog__filter-list li").forEach((item) => {
			item.classList.remove("active");
		});

		li.classList.add("active");
		updateCatalog(li.dataset.category);
	});

	// Инициализация сайдбара
	function initSidebar() {
		const filterToggle = document.getElementById("filterToggle");
		const filterSidebar = document.querySelector(".catalog__sidebar");
		const sidebarClose = document.getElementById("sidebarClose");

		// Создаем кнопку закрытия если её нет
		if (!document.getElementById("sidebarClose")) {
			const closeBtn = document.createElement("button");
			closeBtn.id = "sidebarClose";
			closeBtn.className = "catalog__sidebar-close";
			closeBtn.innerHTML = '<i class="ph ph-x"></i>';
			filterSidebar.insertAdjacentElement("afterbegin", closeBtn);
		}

		// Переключение сайдбара на мобильных
		if (filterToggle) {
			filterToggle.addEventListener("click", () => {
				filterSidebar.classList.toggle("active");
			});
		}

		// Закрытие сайдбара
		if (sidebarClose) {
			sidebarClose.addEventListener("click", () => {
				filterSidebar.classList.remove("active");
			});
		}

		// Проверка sticky-позиционирования
		checkSticky();
	}

	// Обработчик кликов по карточкам товаров
	document.getElementById("catalogItems").addEventListener("click", (e) => {
		const card = e.target.closest(".catalog__card");
		if (!card) return;

		const product = data.find((p) => p.id === card.dataset.id);
		showProductModal(product);
	});

	// Функция показа модального окна
	function showProductModal(product) {
		const modal = document.getElementById("productModal");

		// Заполняем заголовок
		document.getElementById("modalTitle").textContent = product.title;

		// Заполняем изображения
		const imageContainer = document.getElementById("modalImageContainer");
		imageContainer.innerHTML = `
            <img src="${product.images[0].url}" alt="${
			product.title
		}" class="modal__main-image">
            ${
							product.images.length > 1
								? `
                <div class="modal__thumbnails">
                    ${product.images
											.map(
												(img) => `
                        <img src="${img.url}" alt="" class="modal__thumbnail">
                    `
											)
											.join("")}
                </div>
            `
								: ""
						}
        `;

		// Обработчик кликов на миниатюры
		imageContainer.querySelectorAll(".modal__thumbnail").forEach((thumb) => {
			thumb.addEventListener("click", () => {
				document.querySelector(".modal__main-image").src = thumb.src;
			});
		});

		// Заполняем цены
		document.getElementById("modalPrices").innerHTML = `
            <div class="modal__current-price">${product.price.current}</div>
            ${
							product.price.old
								? `<div class="modal__old-price">${product.price.old}</div>`
								: ""
						}
            ${
							product.price.discount
								? `<div class="modal__discount">${product.price.discount}</div>`
								: ""
						}
        `;

		// Заполняем свойства
		const propsHtml = Object.entries(product.properties)
			.map(
				([key, val]) => `
                <div class="modal__property">
                    <strong>${key}:</strong> 
                    <span>${val}</span>
                </div>
            `
			)
			.join("");

		document.getElementById("modalProperties").innerHTML = propsHtml;

		// Устанавливаем ссылку на товар
		const link = document.getElementById("modalLink");
		link.href = product.url;
		link.textContent = "Перейти к товару";

		// Показываем модальное окно
		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	// Закрытие модального окна
	function closeModal() {
		document.getElementById("productModal").style.display = "none";
		document.body.style.overflow = "auto";
	}

	document.getElementById("modalClose").onclick = closeModal;
	document.getElementById("modalOverlay").onclick = closeModal;

	// Проверка sticky-позиционирования
	function checkSticky() {
		const sidebar = document.querySelector(".catalog__sidebar");
		const catalog = document.querySelector(".catalog");

		if (sidebar && catalog) {
			const viewportHeight = window.innerHeight;
			const headerHeight = document.querySelector("header")?.offsetHeight || 0;
			sidebar.style.height = `${viewportHeight - headerHeight - 40}px`;
			catalog.style.minHeight = `${viewportHeight}px`;
		}
	}

	// Вызываем при загрузке и ресайзе
	checkSticky();
	window.addEventListener("resize", checkSticky);
}
