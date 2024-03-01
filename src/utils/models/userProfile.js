export const parseUserProfile = (data) => {
  if (!data) return null
  try {
    let parsedData = []
    const keyValues = Object.entries(data)

    keyValues.forEach(([key, value]) => {
      let newValue = value
      if (newValue) {
        if (key === 'birthdate') {
          newValue = new Date(newValue)
        }
        parsedData.push([key, newValue])
      }
      if (key === 'location') {
        parsedData.push(['location_id', value?.id])
      }
    })

    return Object.fromEntries(parsedData)
  } catch (error) {
    console.log('parseUserProfile error', error)
    return data
  }
}
