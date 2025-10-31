let colorsArr = [];

async function generateColorScheme() {
	const seedColor = document.getElementById('seed-color').value;
	const scheme = document.getElementById('scheme').value;

	const hexColor = seedColor.replace('#', '');

	await fetch(
		`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${scheme.toLowerCase()}`
	)
		.then((res) => res.json())
		.then((data) => {
			colorsArr = data.colors;

			renderColorPalette();
		});
}

function renderColorPalette() {
	return (document.getElementById('color-palette').innerHTML = colorsArr
		.map((color) => {
			return `
     <li
      data-hex="${color.hex.value}"
      role="button"
     >
      <div style="background-color: ${color.hex.value}">
        <span>Copy</span>
      </div>
      <p>${color.hex.value}</p>
     </li>
    `;
		})
		.join(''));
}

document
	.getElementById('get-color-btn')
	.addEventListener('click', generateColorScheme);

document.addEventListener('click', (e) => {
	if (e.target.dataset.hex) {
		const spanEl = e.target.querySelector('span');
		spanEl.textContent = 'Copied!';

		navigator.clipboard.writeText(e.target.dataset.hex);

		setTimeout(() => {
			spanEl.textContent = 'Copy';
		}, 800);
	}
});

generateColorScheme();
