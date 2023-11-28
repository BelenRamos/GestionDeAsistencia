let alumnos = []; 

window.onload = function() {
  cargarAlumnosDesdeStorage();
}

function containsOnlyLetters(palabra) {
  let lettersOnlyRegex = /^[a-zA-Z]+$/;
  return lettersOnlyRegex.test(palabra);
}

function calcularInasistenciasTotales(inasF, inasM) {
  return inasF + inasM;
}

function calcularTotalAlumnos(cantAlF, cantAlM) {
  return cantAlF + cantAlM;
}

function calcularAsistenciaFemenina(diasHabiles, cantAlF, inasF) {
  return diasHabiles * cantAlF - inasF;
}

function calcularAsistenciaMasculina(diasHabiles, cantAlM, inasM) {
  return diasHabiles * cantAlM - inasM;
}

function calcularAsistenciaTotal(asisF, asisM) {
  return asisF + asisM;
}

function calcularAsistenciaFMedia(asisF, diasHabiles) {
  return asisF / diasHabiles;
}

function calcularAsistenciaMMedia(asisM, diasHabiles) {
  return asisM / diasHabiles;
}

function calcularAsistenciaMediaTotal(asisF, asisM, diasHabiles) {
  return (asisF + asisM) / (2 * diasHabiles);
}

function calcularAsistenciaPerfecta(totalAlumnos, diasHabiles) {
  return totalAlumnos * diasHabiles;
}

function calcularPorcentajeAsistencia(asisTotal, asistenciaPerfecta) {
  return (asisTotal / asistenciaPerfecta) * 100;
}


function calcularAsistenciaPromedioTotal() {
  if (alumnos.length === 0) {
    return "No hay alumnos registrados.";
  }

  let totalPorcentaje = 0;
  for (let i = 0; i < alumnos.length; i++) {
    const porcentaje = parseFloat(calcularAsistenciaAlumno(alumnos[i].nombre));
    totalPorcentaje += porcentaje;
  }

  const promedio = totalPorcentaje / alumnos.length;
  return promedio.toFixed(2) + "%";
}

function calcularPromediosAsistencias() {
  const diasHabiles = parseInt(document.getElementById('diasHabiles').value);
  const cantAlF = parseInt(document.getElementById('cantAlF').value);
  const inasF = parseInt(document.getElementById('inasF').value);
  const cantAlM = parseInt(document.getElementById('cantAlM').value);
  const inasM = parseInt(document.getElementById('inasM').value);

  const inasistenciasTotales = calcularInasistenciasTotales(inasF, inasM);
  const totalAlumnos = calcularTotalAlumnos(cantAlF, cantAlM);
  const asisF = calcularAsistenciaFemenina(diasHabiles, cantAlF, inasF);
  const asisM = calcularAsistenciaMasculina(diasHabiles, cantAlM, inasM);
  const asistenciaTotal = calcularAsistenciaTotal(asisF, asisM);
  const asisFMedia = calcularAsistenciaFMedia(asisF, diasHabiles);
  const asisMMedia = calcularAsistenciaMMedia(asisM, diasHabiles);
  const asisMediaTotal = calcularAsistenciaMediaTotal(asisF, asisM, diasHabiles);
  const asistenciaPerfecta = calcularAsistenciaPerfecta(totalAlumnos, diasHabiles);
  const porcentajeAsistencia = calcularPorcentajeAsistencia(asistenciaTotal, asistenciaPerfecta);

  const resultadoCalculadora = document.getElementById('resultadoCalculadora');
  resultadoCalculadora.innerHTML = `
    <p>Inasistencias Totales: ${inasistenciasTotales}</p>
    <p>Asistencia Femenina: ${asisF}</p>
    <p>Asistencia Masculina: ${asisM}</p>
    <p>Asistencia Total: ${asistenciaTotal}</p>
    <p>Asistencia Femenina Media: ${asisFMedia}</p>
    <p>Asistencia Masculina Media: ${asisMMedia}</p>
    <p>Asistencia Media Total: ${asisMediaTotal}</p>
    <p>Asistencia Perfecta: ${asistenciaPerfecta}</p>
    <p>Porcentaje de Asistencia: ${porcentajeAsistencia.toFixed(2)}%</p>
  `;
}



// Funciones para gestion de alumnos
function alumno(nombre, edad, genero) {
  this.nombre = nombre;
  this.edad = edad;
  this.genero = genero;
  this.asistencia = [0];
}


function agregarAlumno() {
  let nombre = prompt("Ingrese el nombre del alumno:");
  let esPalabra = containsOnlyLetters(nombre);
  
  if (esPalabra == false) {
    console.log("Error: No puede haber números en el nombre");
    return;
  }

  let genero = prompt("Ingrese el género del alumno: (F/M)");
  if (genero.toLowerCase() === 'f' || genero.toLowerCase() === 'm') {
    genero = genero.toUpperCase(); // Convertir a mayúscula
    genero = genero === 'F' ? 'Femenino' : 'Masculino';
    console.log(`El género es: ${genero}`);
  } else {
    console.log("Error: El género debe ser 'F' o 'M'.");
    return;
  }

  let edad = parseInt(prompt("Ingrese la edad del alumno:"));
  if (typeof edad !== 'number' || isNaN(edad)) {
    console.log("Error: La edad debe ser un número.");
    return;
  }

  const alumnoExistente = alumnos.find(alumno => alumno.nombre === nombre);
  if (!alumnoExistente) {
    const nuevoAlumno = {
      nombre: nombre,
      edad: edad,
      genero: genero,
      asistencia: [0]
    };

    alumnos = [...alumnos, nuevoAlumno]; // Utilizando spread operator para agregar el nuevo alumno al arreglo
    console.log("¡Alumno agregado exitosamente!");
    guardarAlumnosEnStorage();
    mostrarListaAlumnos();
  } else {
    console.log("¡El alumno ya existe!");
  }
}


function eliminarAlumno(nombre) {
  const confirmar = confirm(`¿Estás seguro de eliminar al alumno ${nombre}?`);
  if (confirmar) {
    alumnos = [...alumnos.filter(alumno => alumno.nombre !== nombre)];
    guardarAlumnosEnStorage();
    mostrarListaAlumnos(); // Mostrar la lista actualizada después de eliminar
    console.log(`Alumno ${nombre} eliminado con éxito.`);
  }
}


function actualizarAlumno(nombre) {
  let esPalabra = containsOnlyLetters(nombre);
  if (esPalabra == false) {
    console.log("Error: No puede haber números en el nombre");
    return;
  }

  let genero = prompt("Ingrese el género del alumno: (F/M)");
  if (genero.toLowerCase() === 'f' || genero.toLowerCase() === 'm') {
    genero = genero.toUpperCase(); // Convertir a mayúscula
    genero = genero === 'F' ? 'Femenino' : 'Masculino';
    console.log(`El género es: ${genero}`);
  } else {
    console.log("Error: El género debe ser 'F' o 'M'.");
    return;
  }

  let edad = parseInt(prompt("Ingrese la edad del alumno:"));
  if (typeof edad !== 'number' || isNaN(edad)) {
    console.log("Error: La edad debe ser un número.");
    return;
  }

  const alumnoActualizado = {
    nombre: nombre,
    edad: edad,
    genero: genero,
    asistencia: alumnos.find(alumno => alumno.nombre === nombre)?.asistencia ?? [0]
  };

  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  if (index !== -1) {
    // Actualizar los datos del alumno utilizando spread operator
    alumnos = [
      ...alumnos.slice(0, index),
      alumnoActualizado,
      ...alumnos.slice(index + 1)
    ];
    guardarAlumnosEnStorage();
    mostrarListaAlumnos(); 
    console.log(`Alumno ${nombre} actualizado con éxito.`);
  } else {
    console.log(`Error: No se encontró al alumno ${nombre}.`);
  }
}


function cargarAsistencia(nombre, presente) {
  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  if (index !== -1) {
    const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

    // Registrar la asistencia para el alumno
    alumnos[index].asistencia.push({ fecha: fechaActual, presente: presente });
    console.log(`Asistencia registrada para el alumno ${nombre}. Fecha: ${fechaActual}. Estado: ${presente ? 'Presente' : 'Ausente'}.`);
    guardarAlumnosEnStorage();
    // Mostrar la lista actualizada de alumnos después de registrar la asistencia
    mostrarListaAlumnos();
  }
}


function calcularAsistenciaAlumno(nombre) {
  const alumno = alumnos.find(alumno => alumno.nombre === nombre);
  const totalDias = alumno?.asistencia?.length ?? 0;
  const diasPresente = alumno?.asistencia?.filter(dia => dia.presente)?.length ?? 0;

  if (alumno) {
    const porcentajeAsistencia = (diasPresente / totalDias) * 100;
    return porcentajeAsistencia.toFixed(2) + "%";
  } else {
    return "El alumno no existe.";
  }
}


function mostrarListaAlumnos() {
  const listaAlumnos = document.getElementById('alumnosLista');
  listaAlumnos.innerHTML = ''; // Limpiar la lista antes de mostrar los nuevos alumnos

  alumnos.forEach(alumno => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
    const nombreAlumno = document.createElement('span');
    nombreAlumno.textContent = alumno.nombre;

    const generoAlumno = document.createElement('span');
    generoAlumno.textContent = alumno.genero;

    const edadAlumno = document.createElement('span');
    edadAlumno.textContent = alumno.edad;

    const btnPresente = document.createElement('button');
    btnPresente.classList.add('btn', 'btn-success', 'me-2');
    btnPresente.textContent = 'Presente';
    btnPresente.onclick = function() {
      cargarAsistencia(alumno.nombre, true);
    };

    const btnAusente = document.createElement('button');
    btnAusente.classList.add('btn', 'btn-danger');
    btnAusente.textContent = 'Ausente';
    btnAusente.onclick = function() {
      cargarAsistencia(alumno.nombre, false);
    };

    const btnCalcularAsistencia = document.createElement('button');
    btnCalcularAsistencia.classList.add('btn', 'btn-info');
    btnCalcularAsistencia.textContent = 'Calcular Asistencia';
    btnCalcularAsistencia.onclick = function() {
      mostrarAsistenciaAlumno(alumno.nombre);
    };

    const btnEliminarAlumno = document.createElement('button');
    btnEliminarAlumno.classList.add('btn', 'btn-danger', 'me-2');
    btnEliminarAlumno.textContent = 'Eliminar';
    btnEliminarAlumno.onclick = function() {
      eliminarAlumno(alumno.nombre);
    };

    const btnActualizarAlumno = document.createElement('button');
    btnActualizarAlumno.classList.add('btn', 'btn-primary');
    btnActualizarAlumno.textContent = 'Actualizar';
    btnActualizarAlumno.onclick = function() {
      actualizarAlumno(alumno.nombre);
    };

    listItem.appendChild(nombreAlumno);
    listItem.appendChild(generoAlumno);
    listItem.appendChild(edadAlumno);
    listItem.appendChild(btnPresente);
    listItem.appendChild(btnAusente);
    listItem.appendChild(btnCalcularAsistencia);
    listItem.appendChild(btnEliminarAlumno);
    listItem.appendChild(btnActualizarAlumno);
    listaAlumnos.appendChild(listItem);
  });
}

function mostrarAsistenciaAlumno(nombre) {
  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  if (index !== -1) {
    const asistencia = alumnos[index].asistencia;
    const totalDias = asistencia.length;
    const diasPresente = asistencia.filter(dia => dia.presente).length;
    const porcentajeAsistencia = (diasPresente / totalDias) * 100;
    
    // Mostrar el resultado en la interfaz
    const output = document.getElementById('output');
    output.innerHTML = `Asistencia de ${nombre}: ${porcentajeAsistencia.toFixed(2)}%`;
  } else {
    const output = document.getElementById('output');
    output.innerHTML = "El alumno no existe.";
  }
}

// Función para guardar los datos de los alumnos en localStorage
function guardarAlumnosEnStorage() {
  localStorage.setItem('alumnosData', JSON.stringify(alumnos));
}

// Función para cargar los datos de los alumnos desde localStorage
function cargarAlumnosDesdeStorage() {
  const data = localStorage.getItem('alumnosData');
  if (data) {
    alumnos = JSON.parse(data);
    // Luego de cargar los datos, puedes actualizar la interfaz si es necesario
    mostrarListaAlumnos();
  }
}





