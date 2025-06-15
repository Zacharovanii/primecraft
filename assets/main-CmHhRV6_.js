(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();function o(){const t=document.querySelectorAll(".header__burger"),n=document.querySelector(".header__nav");t.forEach(i=>{i.addEventListener("click",()=>{n.classList.toggle("active")})})}function s(){const t=window.location.pathname;console.log(t),t.endsWith("index.html")||t==="/"||t==="/index.html"?document.getElementById("link-home").classList.add("header__link--active"):t.endsWith("catalog.html")?document.getElementById("link-catalog").classList.add("header__link--active"):t.endsWith("blog.html")?document.getElementById("link-blog").classList.add("header__link--active"):t.endsWith("about.html")&&document.getElementById("link-about").classList.add("header__link--active")}function c(){const t=document.getElementById("header-placeholder");if(!t){console.error("Header placeholder not found");return}const n=document.createElement("div");n.innerHTML=`
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

	`;const i=n.firstElementChild;t.replaceWith(i),s(),o()}c();
