import _ from 'lodash'
import type { cFormat } from '~/types/Commons'
/**
 * Format a value according to the field cFormat
 * @param value - value to be formatted
 * @param cFormat - FormatConfig object
 * @returns - formatted value
 */
export function useFormatter(value: any, cFormat: Partial<cFormat>) {
  const config = {
    type: cFormat.type || 'text',
    locale: cFormat.locale || localStorage.getItem('language') || 'pt-BR',
    d_style: cFormat.d_style || 'long',
    dt_style: cFormat.dt_style || null,
    n_style: cFormat.n_style || 'decimal',
    n_currency: cFormat.n_currency || 'BRL',
    n_currencyDisplay: cFormat.n_currencyDisplay || 'symbol',
    n_minimumFractionDigits: cFormat.n_minimumFractionDigits || 2,
    n_maximumFractionDigits: cFormat.n_maximumFractionDigits || 2,
    t_length: cFormat.t_length || 20,
    t_suffix: cFormat.t_suffix || '...',
    l_separator: cFormat.l_separator || '|',
  }
  const dateFormat = {
    dateStyle: config.d_style,
    timeStyle: config.dt_style,
  }

  switch (config.type) {
    case 'date':
      try {
        value = new Intl.DateTimeFormat(config.locale, _.pickBy(dateFormat, _.identity)).format(new Date(value))
      }
      catch (error) {
        value = '--'
      }

      break
    case 'number':
      value = _.toNumber(value)
      value = new Intl.NumberFormat(config.locale, {
        style: config.n_style,
        currency: config.n_currency,
        currencyDisplay: config.n_currencyDisplay,
        minimumFractionDigits: config.n_minimumFractionDigits,
        maximumFractionDigits: config.n_maximumFractionDigits,
      }).format(value)
      if (value === 'NaN')
        value = '--'
      break
    case 'text':
      value = _.toString(value).replace(/<[^>]*>?/gm, '')
      if (cFormat.t_length && value.length > cFormat.t_length)
        value = `${value.substring(0, cFormat.t_length)}${cFormat.t_suffix}`
      break
    case 'boolean':
      value = value ? 'Sim' : 'Não'
      break
    case 'byte':
      value = _.toNumber(value)
      if (value === 0)
        value = '0 KB'
      value = `${parseFloat((value / 1024 ** Math.floor(Math.log(value) / Math.log(1024))).toFixed(2))} ${['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][Math.floor(Math.log(value) / Math.log(1024))]}`
      break
    case 'list':
      value = _.join(value, ` ${config.l_separator} `)
      break
    case 'object':
      value = JSON.stringify(value)
      break
    default:
      value = _.toString(value)
      break
  }

  return value
}

/**
 * Async function to sleep
 *
 * @param ms time to sleep in ms
 * @returns Promise
 */
export function useAsyncSleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
