export class customHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header class="header">
		<div class="container">
			<div class="header__inner">
				<a class="header__logo" href="/">Github users</a>
				<nav class="nav">
					<a class="nav__link nav__link_black" href="./index.html">Search</a>
					<a class="nav__link" href="./faves.html">Favorites</a>
				</nav>
			</div>
		</div>
	</header>`;
  }
}

customElements.define("custom-header", customHeader);
