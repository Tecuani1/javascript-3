const readline = require('readline')

// Crear interfaz de lectura
const rdln = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Función para verificar la validez de las coordenadas
const ValidCoord = (lat, lon) => {
  // Verifica si las coordenadas contienen caracteres no numéricos o comas
  if (
    /[^0-9.\-]/.test(lat) ||
    /[^0-9.\-]/.test(lon) ||
    lat.includes(',') ||
    lon.includes(',')
  ) {
    return false
  }

  // Convierte las entradas a números
  const latNum = parseFloat(lat)
  const lonNum = parseFloat(lon)

  // Verifica si la conversión fue exitosa y si las coordenadas están dentro de los rangos válidos
  return (
    !isNaN(latNum) &&
    !isNaN(lonNum) &&
    latNum >= -90 &&
    latNum <= 90 &&
    lonNum >= -180 &&
    lonNum <= 180
  )
}

// Función para solicitar la latitud y la longitud
const askCoordinates = callback => {
  let lat, lon

  const Lat = () => {
    rdln.question('Ingrese la latitud: ', inputLat => {
      if (ValidCoord(inputLat, '0')) {
        lat = inputLat
        Lon()
      } else {
        console.log(
          `La latitud (${inputLat}) no es válida. Por favor, inténtelo de nuevo.`
        )
        Lat()
      }
    })
  }

  const Lon = () => {
    rdln.question('Ingrese la longitud: ', inputLon => {
      if (ValidCoord(lat, inputLon)) {
        lon = inputLon
        callback(lat, lon)
      } else {
        console.log(
          `La longitud (${inputLon}) no es válida. Por favor, inténtelo de nuevo.`
        )
        Lon()
      }
    })
  }
  Lat()
}

// Función principal para obtener y validar las coordenadas
const getValidCoordinates = () => {
  askCoordinates((lat, lon) => {
    console.log(`Las coordenadas (${lat}, ${lon}) son válidas`)
    rdln.close()
  })
}

// Iniciar la solicitud de coordenadas
getValidCoordinates()
