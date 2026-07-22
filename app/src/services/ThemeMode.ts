export default function useThemes() {
  const ThemeVerifyMode = (): string => {
    if (typeof window === "undefined") {
      return "light";
    }
    // busco o tema salvo em local storage ou retorno o tema claro ('light') se não houver o campo salvo
    const currentTheme: string = localStorage.getItem("theme") || "light";

    // Verificação do tema do sistema: (para implementar)

    // const prefersDark = window.matchMedia(
    //   "(prefers-color-scheme: dark)",
    // ).matches;

    ThemeSetMode(currentTheme);
    return currentTheme;
  };

  const ThemeSetMode = (colorMode: string) => {
    // verificação de cor
    const normalizedMode = colorMode === "dark" ? "dark" : "light";
    // raiz do site
    const root = document.documentElement;

    // remove a classe antiga e adiciona a nova
    root.classList.remove("dark", "light");
    root.classList.add(normalizedMode);

    // define o tema
    localStorage.setItem("theme", normalizedMode);
  };

  return {ThemeVerifyMode, ThemeSetMode};
}
