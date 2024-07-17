const readline = require('readline');

// Crear interfaz de lectura
const rdln = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para verificar la validez de las coordenadas
const ValidCoord = (lat, lon) => {
  // Verificar que no haya comas en las coordenadas
  if (lat.includes(',') || lon.includes(',')) {
    return false;
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  return latNum >= -90 && latNum <= 90 && lonNum >= -180 && lonNum <= 180;

};

// Solicitar latitud y longitud al usuario
rdln.question('Ingrese la latitud: ', lat => {
  rdln.question('Ingrese la longitud: ', lon => {
    if (ValidCoord(lat, lon)) {
      console.log(`Las coordenadas (${lat}, ${lon}) son válidas`);
    } else {
      console.log(`Las coordenadas (${lat}, ${lon}) no son válidas`);
    }
    rdln.close();
  });
});

