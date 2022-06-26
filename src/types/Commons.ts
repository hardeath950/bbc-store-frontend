export interface cFormat {
  type?: string
  locale?: Locales | string
  n_style?: NumberStyles
  n_currency?: Currency | string
  n_unitDisplay?: NumberUnits
  n_currencyDisplay?: CurrencyDisplay | string
  n_minimumIntegerDigits?: number
  n_minimumFractionDigits?: number
  n_maximumFractionDigits?: number
  l_separator?: string
  dt_style?: DateStyles
  d_style?: DateStyles
  t_length?: number
  t_suffix?: string
  translate?: boolean
}

type Currency = 'BRL' | 'USD'
type CurrencyDisplay = 'symbol' | 'code' | 'name'
type NumberStyles = 'currency' | 'decimal' | 'percent'
type DateStyles = 'short' | 'medium' | 'long' | 'full'
type NumberUnits = 'short' | 'long' | 'narrow' | undefined
type Locales = 'en' | 'pt-BR'
