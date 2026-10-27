// Match Next 16's supported floor: Chrome/Edge/Firefox 111 and Safari 16.4.
// Their native Array, Object, String, Symbol and Promise methods do not need
// Next's legacy shims. URL.canParse arrived later in some of those browsers.
if (typeof URL.canParse !== "function") {
  URL.canParse = (input, base) => {
    try {
      new URL(input, base);
      return true;
    } catch {
      return false;
    }
  };
}
