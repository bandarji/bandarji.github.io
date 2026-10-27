/**
 * Typed command demo for the home terminal.
 */
(function () {
	const SPEED = 85;
	const START_DELAY = 1600;
	const HOLD = 4800;
	const el = document.querySelector("#main-terminal code");
	if (!el || typeof COMMANDS === "undefined" || !COMMANDS.length) {
		return;
	}

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const promptHtml = '<span class="prompt">$ </span>';

	function show(item) {
		el.innerHTML =
			promptHtml +
			escapeText(item.cmd) +
			"\n" +
			item.lines.join("\n") +
			"\n" +
			promptHtml;
		el.classList.remove("no-animation");
	}

	function escapeText(s) {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}

	function typeCommand(item, done) {
		el.classList.add("no-animation");
		el.innerHTML = promptHtml;
		let i = 0;
		function tick() {
			if (i < item.cmd.length) {
				el.innerHTML += escapeText(item.cmd.charAt(i));
				i += 1;
				window.setTimeout(tick, SPEED);
				return;
			}
			el.innerHTML += "\n" + item.lines.join("\n") + "\n" + promptHtml;
			el.classList.remove("no-animation");
			done();
		}
		tick();
	}

	function shuffledCommands(avoidFirst) {
		const order = COMMANDS.slice();
		for (let i = order.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			const tmp = order[i];
			order[i] = order[j];
			order[j] = tmp;
		}
		if (avoidFirst && order.length > 1 && order[0] === avoidFirst) {
			const swap = 1 + Math.floor(Math.random() * (order.length - 1));
			order[0] = order[swap];
			order[swap] = avoidFirst;
		}
		return order;
	}

	let queue = shuffledCommands();

	function cycle(index) {
		const item = queue[index];
		const next = function () {
			if (COMMANDS.length < 2) {
				return;
			}
			window.setTimeout(function () {
				let nextIndex = index + 1;
				if (nextIndex >= queue.length) {
					queue = shuffledCommands(item);
					nextIndex = 0;
				}
				cycle(nextIndex);
			}, HOLD);
		};
		if (reduced) {
			show(item);
			next();
			return;
		}
		typeCommand(item, next);
	}

	el.innerHTML = promptHtml;
	window.setTimeout(function () {
		cycle(0);
	}, reduced ? 0 : START_DELAY);
})();
