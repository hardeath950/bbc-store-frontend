import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      lavender: { // PRIMARY COMPLEMENT DERIVATED
        50: '#F4EEFE',
        100: '#DECDFC',
        200: '#D3BDFB',
        300: '#B18BF8',
        400: '#8955E9',
        500: '#5E3A9F',
        550: '#41286E',
        600: '#321F56',
        700: '#1D1231',
      },
      pacific: { // PRIMARY DEFAULT DERIVATED
        50: '#E6EEFA',
        100: '#CEDEF5',
        200: '#9CBCEC',
        300: '#528ADD',
        400: '#0858CF',
        500: '#053987',
        600: '#031F48',
        700: '#021229',
      },
      burning: { // SECONDARY DEFAULT DERIVATED
        50: '#FCE5DF',
        100: '#FACBBF',
        200: '#F7A894',
        300: '#F38569',
        400: '#F0623D',
        500: '#CA4522',
        600: '#9B351A',
        700: '#3C140A',
      },
      marigold: { // SECONDARY COMPLEMENT DERIVATED
        50: '#FEF2D9',
        100: '#FEECC7',
        200: '#FDDFA1',
        300: '#FCD27B',
        400: '#FBC556',
        500: '#D5A239',
        600: '#A37C2C',
        700: '#3F3011',
      },
      success: {
        half: '#1dd1a1',
        full: '#10ac84',
      },
      info: {
        half: '#54a0ff',
        full: '#2e86de',
      },
      warning: {
        half: '#feca57',
        full: '#ff9f43',
      },
      danger: {
        half: '#ff6b6b',
        full: '#ee5253',
      },
    },
  },
  shortcuts: [
    // ANIMATION
    ['default-transition', 'transition-all duration-300'],
    // BACKGROUNDS
    ['bg-primary', 'text-pacific-50 bg-pacific-300 dark:(bg-lavender-300 text-lavender-700) default-transition'],
    ['enl-ground', 'bg-pacific-50 dark:bg-lavender-700 default-transition'],
    ['enl-ground-grad', 'bg-gradient-to-tr from-pacific-50 to-pacific-100 dark:(from-lavender-700 to-pacific-700) default-transition'],
    ['enl-surface', 'bg-white/90 dark:bg-lavender-550/50 default-transition enl-text'],
    ['enl-surface-solid', 'bg-white/90 dark:bg-lavender-600/90 default-transition'],
    // TEXTS SIZES
    ['h1', 'enl-title font-bold text-3xl'],
    ['h2', 'enl-text font-bold text-2xl my-3'],
    ['h3', 'enl-text font-bold text-xl my-2'],
    ['h4', 'enl-text font-bold text-lg'],
    ['h5', 'enl-text font-bold my-1'],
    ['h6', 'enl-text font-bold text-sm'],
    // TEXT COLORS
    ['enl-title', 'text-burning-400 dark:text-lavender-100'],
    ['enl-card', 'card enl-surface animate-fade-in animate-count-1 animate-duration-500 shadow-md'],
    ['enl-subtitle', 'text-pacific-600 dark:text-lavender-100'],
    ['enl-text-low', 'text-pacific-300 dark:text-marigold-500'],
    ['enl-text', 'text-pacific-500 dark:text-lavender-100'],
    ['enl-link', 'text-pacific-400 hover:text-lavender-400 dark:(text-marigold-300 hover:text-burning-400) default-transition cursor-pointer'],
    ['enl-menu', 'enl-text hover:(bg-pacific-400/80 text-pacific-100) dark:(hover:bg-burning-400/70 !hover:text-lavender-600)'],
    // BORDER
    ['enl-border', 'border-pacific-100 !dark:border-lavender-550'],
    // ANIMATION
    ['enl-anim-grow-xs', 'hover:scale-101 transition-all duration-300'],
    ['enl-anim-grow-sm', 'hover:scale-105 transition-all duration-300'],
    ['enl-anim-grow-md', 'hover:scale-110 transition-all duration-300'],
    ['enl-anim-grow-lg', 'hover:scale-120 transition-all duration-300'],
    // INPUTS
    ['f-outer', 'mb-2'],
    ['f-label', 'block mb-1 font-bold'],
    ['f-inner', 'mb-2 rounded-xl overflow-hidden focus-within:border-blue-500'],
    ['f-input', 'w-full p-1rem enl-text enl-ground placeholder-gray-400 dark:placeholder-gray-500 caret-lavender-200'],
    ['f-help', 'text-sm enl-text-low pl-2'],
    ['f-messages', 'text-burning-400 dark:text-burning-300 text-sm pl-2'],
    // BUTTONS
    ['btn-success', 'text-white bg-success-half hover:bg-success-full'],
    ['btn-info', 'text-white bg-info-half hover:bg-info-full'],
    ['btn-danger', 'text-white bg-danger-half hover:bg-danger-full'],
    ['btn-warn', 'text-dark bg-warning-half hover:bg-warning-full'],
    ['btn', 'py-2 px-4 m-2 font-semibold rounded-xl shadow-lg transition-all duration-500'],
    ['btn-primary', 'text-white bg-pacific-400 hover:bg-lavender-400 dark:(text-lavender-550 bg-marigold-300 hover:bg-burning-400)'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.3,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Roboto 700',
        serif: 'DM Serif Display',
        mono: 'Fira Code',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
