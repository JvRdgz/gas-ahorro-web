const themeScript = `
  try {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light";
    const root = document.documentElement;
    const body = document.body;
    root.style.colorScheme = theme;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      body.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
      body.removeAttribute("data-theme");
    }
  } catch {}
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
