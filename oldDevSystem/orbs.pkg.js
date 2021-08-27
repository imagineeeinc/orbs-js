(function() {
	window.onOrbsLoad = () => null
	let set = document.querySelector("orbs-settings")
	set = set.getAttribute("s")	
	set = JSON.parse(set)
	let s = document.createElement('script')
	fetch('https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.min.js')
	.then(response => response.text())
	.then(data => {
		s.textContent = data.replace(`window.onOrbsLoad = () => null
		setTimeout(() => {window.onOrbsLoad()}, 30)`, "");
		document.head.appendChild(s)
	})
	if (set.getComponents == true) {
		fetch('https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.components.js')
		.then(response => response.text())
		.then(data => {
			s.textContent = data
			document.head.appendChild(s)
		})
	}
	setTimeout(() => {window.onOrbsLoad()}, 30)
    })()
    //https://cdn.jsdelivr.net/gh/imagineeeinc/orbs-js/src/orbs.min.js