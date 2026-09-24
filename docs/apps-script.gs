const TOKEN  = 'pilarypablo-12122026';
const LIBRO  = '1fCVgnI2sap8NgaACi4EIVZldGhkdftIPw_k4pmPNuSk';
const HOJA   = 'Confirmaciones';
const CORREO = 'info@thevisualsboutique.com';

function doPost(e) {
  try {
    console.log('llega: ' + JSON.stringify(e && e.parameter));

    const d = leerDatos(e);
    if (!d) { console.log('MOTIVO: no se entienden los datos'); return responder({ ok: false, error: 'sin datos' }); }
    if (d.token !== TOKEN) { console.log('MOTIVO: token distinto, ha llegado "' + d.token + '"'); return responder({ ok: false, error: 'token' }); }
    if (d.web) { console.log('MOTIVO: campo trampa con "' + d.web + '"'); return responder({ ok: true }); }

    obtenerHoja().appendRow([
      new Date(),
      corta(d.nombre),
      d.asiste === 'yes' ? 'Sí' : 'No',
      Number(d.acompanantes) || 0,
      corta(lista(d.nombres)),
      corta(d.autobus),
      corta(d.alergias),
      corta(d.mensaje),
      corta(d.idioma),
      corta(d.direccion),
    ]);
    console.log('GUARDADA la fila de ' + d.nombre);

    avisar(d);
    return responder({ ok: true });
  } catch (err) {
    console.log('MOTIVO: ha fallado — ' + err);
    return responder({ ok: false, error: String(err) });
  }
}

// La web puede mandar los datos de dos formas: como cuerpo JSON o como un
// campo de formulario. Se aceptan las dos.
function leerDatos(e) {
  if (e && e.parameter && e.parameter.payload) {
    try { return JSON.parse(e.parameter.payload); } catch (err) { /* se sigue */ }
  }
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (err) { /* se sigue */ }
  }
  return null;
}

// Sirve para comprobar desde el navegador que el script llega a la hoja
function doGet(e) {
  if (!e || !e.parameter || e.parameter.t !== TOKEN) {
    return responder({ ok: true, vivo: true });
  }
  try {
    const hoja = obtenerHoja();
    return responder({
      ok: true,
      libro: SpreadsheetApp.openById(LIBRO).getName(),
      hoja: hoja.getName(),
      filas: hoja.getLastRow(),
      columnas: hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0],
    });
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  }
}

// El correo va en su propio try: si falla, la fila ya está guardada y no tiene
// sentido decirle al invitado que algo ha ido mal.
function avisar(d) {
  try {
    MailApp.sendEmail({
      to: CORREO,
      subject: 'Boda P&P — ' + corta(d.nombre) + (d.asiste === 'yes' ? ' viene' : ' no puede'),
      body: [
        'Nombre: ' + corta(d.nombre),
        '¿Asiste?: ' + (d.asiste === 'yes' ? 'Sí' : 'No'),
        'Acompañante: ' + (corta(lista(d.nombres)) || 'no'),
        'Autobús: ' + (corta(d.autobus) || '—'),
        'Alergias: ' + (corta(d.alergias) || '—'),
        'Dirección: ' + (corta(d.direccion) || '—'),
        'Mensaje: ' + (corta(d.mensaje) || '—'),
        'Idioma: ' + corta(d.idioma),
      ].join('\n'),
    });
  } catch (err) {
    // da igual: lo importante ya está en la hoja
  }
}

// Se abre la hoja por su identificador, no por vinculación: así funciona
// aunque el proyecto no cuelgue del documento.
function obtenerHoja() {
  const libro = SpreadsheetApp.openById(LIBRO);
  let hoja = libro.getSheetByName(HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(HOJA);
    hoja.appendRow(['Fecha', 'Nombre', '¿Asiste?', 'Acompañantes', 'Nombres', 'Autobús', 'Alergias', 'Mensaje', 'Idioma', 'Dirección']);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function lista(v) { return Array.isArray(v) ? v.join(', ') : String(v == null ? '' : v); }

function corta(v) { return String(v == null ? '' : v).slice(0, 500); }

function responder(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
