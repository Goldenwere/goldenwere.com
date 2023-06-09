type Color = string
type FontFamily = string

/**
 * Corresponds to .css theme file stored in /content. Typically these .css files should define CSS variables under the `:root` scope
 * 
 * Note that variable names are converted to a typical CSS theme variable name in kebab-case with two trailing dashes.
 * E.g.: `themeAccentABg` becomes `--theme-accent-a-bg` in .css
 */
export interface Theme {
  themeFontBody: FontFamily
  themeFontDisplay: FontFamily
  themeFontMono: FontFamily
  themeBodyBg: Color
  themeBodyFg: Color
  themeCodeBg: Color
  themeCodeFg: Color
  themeModalBg: Color
  themeModalFg: Color
  themeAccentABg: Color
  themeAccentAFg: Color
  themeAccentBBg: Color
  themeAccentBFg: Color
  themeTransitionFunction: string
  themeHighlightFg: Color
  themeHighlightBg: Color
  themeBodyBorder: Color
}
