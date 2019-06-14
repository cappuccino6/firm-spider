
const param =  query => 
  Object.keys(query)
    .map(key => {
      const value = query[key]
      if (value !== undefined && value !== null) {
        return `${key}=${encodeURIComponent(value)}`
      }
      return false
    })
    .filter(Boolean)
    .join('&')

getQuery = url => {
  if (!url) {
    return {}
  }

  const [, qs] = url.match(/\?([^#]+)/) || []
  return qs
    ? qs.split('&').reduce((o, pair) => {
      const [key, value] = pair.split('=')
      o[key] = decodeURIComponent(value)
      return o
    }, {})
    : {}
}

addQuery = (url, query) => {
  const queryString = param({ ...getQuery(url), ...query })
  if (!queryString) {
    return url
  }

  if (/\?([^#]+)/.test(url)) {
    return url.replace(/\?([^#]+)/, `?${queryString}`)
  } else if (/(#[\w]+)$/.test(url)) {
    return url.replace(/(#[\w]+)$/, `?${queryString}$1`)
  }

  return `${url}?${queryString}`
}

module.exports = {
  param, getQuery, addQuery
}