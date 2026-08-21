(function () {
  const main = document.querySelector("main.site-content");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showPage() {
    document.documentElement.classList.remove("terminal-pending");
    document.body.classList.remove("is-booting");
  }

  if (!main || reduceMotion) {
    showPage();
    return;
  }

  const CHAR_MS = 11;
  const NEWLINE_MS = 77;
  const PUNCT_MS = 39;
  const originalHTML = main.innerHTML;
  const source = main.cloneNode(true);

  let active = true;
  let finished = false;

  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";
  cursor.setAttribute("aria-hidden", "true");

  function delayFor(ch) {
    if (ch === "\n") return NEWLINE_MS;
    if (".!?".indexOf(ch) !== -1) return PUNCT_MS;
    return CHAR_MS;
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      if (!active) {
        resolve();
        return;
      }
      setTimeout(resolve, ms);
    });
  }

  function complete(restore) {
    if (finished) return;
    finished = true;
    active = false;
    document.removeEventListener("click", skip);
    document.removeEventListener("keydown", skip);
    if (restore) {
      main.innerHTML = originalHTML;
      main.appendChild(cursor);
    }
    showPage();
    document.body.classList.add("is-booted");
  }

  async function typeInto(from, to) {
    const nodes = Array.prototype.slice.call(from.childNodes);
    for (let n = 0; n < nodes.length; n++) {
      if (!active) return;
      const node = nodes[n];
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = document.createTextNode("");
        to.insertBefore(textNode, cursor);
        const text = node.textContent || "";
        for (let i = 0; i < text.length; i++) {
          if (!active) return;
          textNode.textContent += text[i];
          await sleep(delayFor(text[i]));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node.cloneNode(false);
        to.insertBefore(el, cursor);
        el.appendChild(cursor);
        await typeInto(node, el);
        if (!active) return;
        to.appendChild(cursor);
      }
    }
  }

  function skip(event) {
    if (event.type === "click" && event.target.closest("a")) return;
    complete(true);
  }

  async function boot() {
    document.body.classList.add("is-booting");
    main.innerHTML = "";
    main.appendChild(cursor);
    document.documentElement.classList.remove("terminal-pending");

    document.addEventListener("click", skip);
    document.addEventListener("keydown", skip, { once: true });

    await Promise.race([
      document.fonts && document.fonts.ready
        ? document.fonts.ready.catch(function () {})
        : Promise.resolve(),
      sleep(700)
    ]);
    await sleep(125);
    if (!active) return;

    await typeInto(source, main);
    if (active) complete(false);
  }

  boot();
})();
