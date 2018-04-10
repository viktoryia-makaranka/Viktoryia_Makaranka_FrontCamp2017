export const getStringParameter = (searchedParamName, url) => {
  try {
    let result = ''
    decodeURIComponent(url).split('?')[1].split('&').forEach(param => {
      const paramName = param.split('=')[0]
      if (searchedParamName === paramName) {
        result = param.split('=')[1]
      }
    })
    return result
  } catch (err) {
    return err
  }
}