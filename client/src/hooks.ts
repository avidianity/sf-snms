import { Tooltip } from 'bootstrap';
import PerfectScrollbar from 'perfect-scrollbar';
import { useState, useEffect, useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { AuthContext } from './contexts';

export function useURL() {
	const match = useRouteMatch();

	const fragments = match.path.split('');

	if (fragments.last() === '/') {
		fragments.splice(fragments.length - 1, 1);
	}

	return (path: string) => `${fragments.join('')}${path}`;
}

export function useMode() {
	return useState<'Add' | 'Edit'>('Add');
}

export function useNullable<T>(data?: T) {
	return useState<T | null>(data || null);
}

export function useArray<T>(data?: T[]) {
	return useState<T[]>(data || []);
}

export function usePreventAuth() {
	const history = useHistory();
	const { user } = useContext(AuthContext);

	if (user) {
		history.goBack();
	}
}

export function useSetup() {
	function debounce(cb: any, wait: number, immediate?: any) {
		let h: any = null;
		let callable = (...args: any) => {
			clearTimeout(h);
			h = setTimeout(() => cb(...args), wait);
			const callNow = immediate && !h;
			if (callNow) {
				cb(...args);
			}
		};
		return callable;
	}

	function navbarBlurOnScroll(id: string) {
		let navbar = document.getElementById(id);
		let navbarScrollActive = navbar ? navbar.getAttribute('navbar-scroll') : false;
		let scrollDistance = 5;
		let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
		let toggleClasses = ['shadow-none'];

		if (navbarScrollActive == 'true') {
			window.onscroll = debounce(() => {
				if (window.scrollY > scrollDistance) {
					blurNavbar();
				} else {
					transparentNavbar();
				}
			}, 10);
		} else {
			window.onscroll = debounce(function () {
				transparentNavbar();
			}, 10);
		}

		function blurNavbar() {
			navbar?.classList.add(...classes);
			navbar?.classList.remove(...toggleClasses);

			toggleNavLinksColor('blur');
		}

		function transparentNavbar() {
			navbar?.classList.remove(...classes);
			navbar?.classList.add(...toggleClasses);

			toggleNavLinksColor('transparent');
		}

		function toggleNavLinksColor(type: string) {
			let navLinks = document.querySelectorAll('.navbar-main .nav-link');
			let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line');

			if (type === 'blur') {
				navLinks.forEach((element) => {
					element.classList.remove('text-body');
				});

				navLinksToggler.forEach((element) => {
					element.classList.add('bg-dark');
				});
			} else if (type === 'transparent') {
				navLinks.forEach((element) => {
					element.classList.add('text-body');
				});

				navLinksToggler.forEach((element) => {
					element.classList.remove('bg-dark');
				});
			}
		}
	}
	useEffect(() => {
		(() => {
			const mainpanel = document.querySelector('.main-content');
			if (mainpanel) {
				new PerfectScrollbar(mainpanel);
			}

			const sidebar = document.querySelector('.sidenav');
			if (sidebar) {
				new PerfectScrollbar(sidebar);
			}

			const navbarCollapse = document.querySelector('.navbar-collapse');
			if (navbarCollapse) {
				new PerfectScrollbar(navbarCollapse);
			}

			const fixedplugin = document.querySelector('.fixed-plugin');
			if (fixedplugin) {
				new PerfectScrollbar(fixedplugin);
			}
		})();

		// Verify navbar blur on scroll
		navbarBlurOnScroll('navbarBlur');

		// initialization of Tooltips
		const tooltipTriggerList = Array.from(document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'));
		const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new Tooltip(tooltipTriggerEl);
		});

		// Fixed Plugin

		if (document.querySelector('.fixed-plugin')) {
			const fixedPlugin = document.querySelector<HTMLDivElement>('.fixed-plugin');
			const fixedPluginButton = document.querySelector<HTMLButtonElement>('.fixed-plugin-button');
			const fixedPluginButtonNav = document.querySelector<HTMLDivElement>('.fixed-plugin-button-nav');
			const fixedPluginCard = document.querySelector<HTMLDivElement>('.fixed-plugin .card');
			const fixedPluginCloseButton = document.querySelectorAll<HTMLButtonElement>('.fixed-plugin-close-button');
			const navbar = document.getElementById('navbarBlur');
			const buttonNavbarFixed = document.getElementById('navbarFixed');

			if (fixedPluginButton && fixedPlugin) {
				fixedPluginButton.onclick = function () {
					if (!fixedPlugin.classList.contains('show')) {
						fixedPlugin.classList.add('show');
					} else {
						fixedPlugin.classList.remove('show');
					}
				};
			}

			if (fixedPluginButtonNav && fixedPlugin) {
				fixedPluginButtonNav.onclick = function () {
					if (!fixedPlugin.classList.contains('show')) {
						fixedPlugin.classList.add('show');
					} else {
						fixedPlugin.classList.remove('show');
					}
				};
			}

			fixedPluginCloseButton.forEach((el) => {
				el.onclick = function () {
					fixedPlugin?.classList.remove('show');
				};
			});

			const body = document.querySelector('body');

			if (body) {
				body.onclick = (e) => {
					const target: any = e.target;
					if (
						e.target != fixedPluginButton &&
						e.target != fixedPluginButtonNav &&
						e.target &&
						'closest' in e.target &&
						typeof target === 'function' &&
						target.closest('.fixed-plugin .card') != fixedPluginCard &&
						fixedPlugin
					) {
						fixedPlugin.classList.remove('show');
					}
				};
			}

			if (navbar) {
				if (navbar.getAttribute('navbar-scroll') == 'true' && buttonNavbarFixed) {
					buttonNavbarFixed.setAttribute('checked', 'true');
				}
			}
		}

		// Tabs navigation

		const total = document.querySelectorAll<HTMLUListElement>('.nav-pills');

		total.forEach(function (item, i) {
			let moving_div = document.createElement('div');
			const first_li = item.querySelector<HTMLLIElement>('li:first-child .nav-link');
			const tab: any = first_li?.cloneNode();
			if (first_li && tab && moving_div) {
				tab.innerHTML = '-';

				moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
				moving_div.appendChild(tab);
				item.appendChild(moving_div);

				moving_div.style.padding = '0px';
				moving_div.style.width = item.querySelector<HTMLLIElement>('li:nth-child(1)')?.offsetWidth + 'px';
				moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
				moving_div.style.transition = '.5s ease';

				item.onmouseover = function (event) {
					let target = getEventTarget(event);
					let li = target.closest('li'); // get reference
					if (li) {
						let nodes = Array.from(li.closest('ul').children); // get array
						let index = nodes.indexOf(li) + 1;
						const selected = item.querySelector<HTMLLIElement>('li:nth-child(' + index + ') .nav-link');
						if (selected) {
							selected.onclick = function () {
								const new_div = item.querySelector<HTMLDivElement>('.moving-tab');
								if (new_div) {
									moving_div = new_div;
								}
								let sum = 0;
								if (item.classList.contains('flex-column')) {
									for (var j = 1; j <= nodes.indexOf(li); j++) {
										sum += item.querySelector<HTMLLIElement>('li:nth-child(' + j + ')')?.offsetHeight || 0;
									}
									moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
									moving_div.style.height = `${
										item.querySelector<HTMLLIElement>('li:nth-child(' + j + ')')?.offsetHeight || 0
									}px`;
								} else {
									for (var j = 1; j <= nodes.indexOf(li); j++) {
										sum += item.querySelector<HTMLLIElement>('li:nth-child(' + j + ')')?.offsetWidth || 0;
									}
									moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
									moving_div.style.width = `${
										item.querySelector<HTMLLIElement>('li:nth-child(' + index + ')')?.offsetWidth || 0
									}px`;
								}
							};
						}
					}
				};
			}
		});

		// Tabs navigation resize

		window.addEventListener('resize', function (event) {
			total.forEach(function (item, i) {
				item.querySelector('.moving-tab')?.remove();
				const moving_div = document.createElement('div');
				const tab: any = item.querySelector<HTMLAnchorElement>('.nav-link.active')?.cloneNode();
				if (tab) {
					tab.innerHTML = '-';

					moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
					moving_div.appendChild(tab);

					item.appendChild(moving_div);

					moving_div.style.padding = '0px';
					moving_div.style.transition = '.5s ease';

					let li = item.querySelector('.nav-link.active')?.parentElement;

					if (li) {
						let nodes = Array.from(li.closest('ul')?.children || []); // get array
						let index = nodes.indexOf(li) + 1;

						let sum = 0;
						if (item.classList.contains('flex-column')) {
							for (var j = 1; j <= nodes.indexOf(li); j++) {
								sum += item.querySelector<HTMLLIElement>('li:nth-child(' + j + ')')?.offsetHeight || 0;
							}
							moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
							moving_div.style.width = `${
								item.querySelector<HTMLLIElement>('li:nth-child(' + index + ')')?.offsetWidth || 0
							}px`;
							moving_div.style.height = `${
								item.querySelector<HTMLLIElement>('li:nth-child(' + j + ')')?.offsetHeight || 0
							}px`;
						} else {
							for (var j = 1; j <= nodes.indexOf(li); j++) {
								sum += item.querySelector<HTMLLIElement>('li:nth-child(' + j + ')')?.offsetWidth || 0;
							}
							moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
							moving_div.style.width = `${
								item.querySelector<HTMLLIElement>('li:nth-child(' + index + ')')?.offsetWidth || 0
							}px`;
						}
					}
				}
			});

			if (window.innerWidth < 991) {
				total.forEach(function (item, i) {
					if (!item.classList.contains('flex-column')) {
						item.classList.add('flex-column', 'on-resize');
					}
				});
			} else {
				total.forEach(function (item, i) {
					if (item.classList.contains('on-resize')) {
						item.classList.remove('flex-column', 'on-resize');
					}
				});
			}
		});

		function getEventTarget(e: any) {
			e = e || window.event;
			return e.target || e.srcElement;
		}

		// End tabs navigation

		// Toggle Sidenav
		const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
		const iconSidenav = document.getElementById('iconSidenav');
		const sidenav = document.getElementById('sidenav-main');
		let body = document.getElementsByTagName('body')[0];
		let className = 'g-sidenav-pinned';

		if (iconNavbarSidenav) {
			iconNavbarSidenav.addEventListener('click', toggleSidenav);
		}

		if (iconSidenav) {
			iconSidenav.addEventListener('click', toggleSidenav);
		}

		function toggleSidenav() {
			if (body.classList.contains(className)) {
				body.classList.remove(className);
				setTimeout(function () {
					sidenav?.classList.remove('bg-white');
				}, 100);
				sidenav?.classList.remove('bg-transparent');
			} else {
				body.classList.add(className);
				sidenav?.classList.add('bg-white');
				sidenav?.classList.remove('bg-transparent');
				iconSidenav?.classList.remove('d-none');
			}
		}

		// Resize navbar color depends on configurator active type of sidenav

		let referenceButtons = document.querySelector('[data-class]');

		window.addEventListener('resize', navbarColorOnResize);

		function navbarColorOnResize() {
			if (window.innerWidth > 1200) {
				if (referenceButtons?.classList.contains('active') && referenceButtons?.getAttribute('data-class') === 'bg-transparent') {
					sidenav?.classList.remove('bg-white');
				} else {
					sidenav?.classList.add('bg-white');
				}
			} else {
				sidenav?.classList.add('bg-white');
				sidenav?.classList.remove('bg-transparent');
			}
		}

		// Deactivate sidenav type buttons on resize and small screens
		window.addEventListener('resize', sidenavTypeOnResize);
		window.addEventListener('load', sidenavTypeOnResize);

		function sidenavTypeOnResize() {
			let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
			if (window.innerWidth < 1200) {
				elements.forEach(function (el) {
					el.classList.add('disabled');
				});
			} else {
				elements.forEach(function (el) {
					el.classList.remove('disabled');
				});
			}
		}
		// eslint-disable-next-line
	}, []);

	//Set Sidebar Color
	function sidebarColor(a: HTMLElement) {
		const parent = Array.from(a.parentElement?.children || []);
		const color = a.getAttribute('data-color');

		parent.forEach((item) => item.classList.remove('active'));

		if (!a.classList.contains('active')) {
			a.classList.add('active');
		} else {
			a.classList.remove('active');
		}

		const sidebar = document.querySelector('.sidenav');
		sidebar?.setAttribute('data-color', color || '');

		const sidenavCard = document.querySelector('#sidenavCard');
		let sidenavCardClasses = ['card', 'card-background', 'shadow-none', 'card-background-mask-' + color];
		if (sidenavCard) {
			sidenavCard.className = '';
			sidenavCard.classList.add(...sidenavCardClasses);
		}

		const sidenavCardIcon = document.querySelector('#sidenavCardIcon');
		let sidenavCardIconClasses = ['ni', 'ni-diamond', 'text-gradient', 'text-lg', 'top-0', 'text-' + color];
		if (sidenavCardIcon) {
			sidenavCardIcon.className = '';
			sidenavCardIcon.classList.add(...sidenavCardIconClasses);
		}
	}
	function navbarFixed(el: Element) {
		let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
		const navbar = document.getElementById('navbarBlur');

		if (!el.getAttribute('checked')) {
			navbar?.classList.add(...classes);
			navbar?.setAttribute('navbar-scroll', 'true');
			navbarBlurOnScroll('navbarBlur');
			el.setAttribute('checked', 'true');
		} else {
			navbar?.classList.remove(...classes);
			navbar?.setAttribute('navbar-scroll', 'false');
			navbarBlurOnScroll('navbarBlur');
			el.removeAttribute('checked');
		}
	}

	function sidebarType(a: HTMLButtonElement) {
		a;
		const parent = Array.from(a.parentElement?.children || []);
		const color = a.getAttribute('data-class');

		parent.forEach((item) => item.classList.remove('active'));

		if (!a.classList.contains('active')) {
			a.classList.add('active');
		} else {
			a.classList.remove('active');
		}

		const sidebar = document.querySelector('.sidenav');
		sidebar?.classList.remove('bg-transparent');
		sidebar?.classList.remove('bg-white');

		if (color) {
			sidebar?.classList.add(color);
		}
	}

	return { sidebarColor, navbarFixed, sidebarType };
}
