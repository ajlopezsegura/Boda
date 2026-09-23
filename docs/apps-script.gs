/* ─────────────────────────────────────────────────────────────
   BODA PILAR Y PABLO · recogida de confirmaciones
   Pegar entero en Apps Script (Extensiones → Apps Script),
   guardar e Implementar → Gestionar implementaciones → editar →
   Versión nueva → Implementar.

   Este script NO borra nada. Si algún día la web manda un dato
   nuevo, crea la columna al final de la hoja él solo. No hay que
   volver a tocarlo.
   ───────────────────────────────────────────────────────────── */

var HOJA    = 'Confirmaciones';
var TOKEN   = 'pilarypablo-12122026';
var CORREO  = 'info@thevisualsboutique.com';

/* El orden de esta lista es el orden en que se crearían las
   columnas si la hoja estuviera vacía. En una hoja que ya tiene
   datos manda el orden real de la hoja: aquí solo se dice qué
   cabecera busca cada dato. */
var COLUMNAS = [
  ['Fecha',        function (d) { return new Date(); }],
  ['Nombre',       function (d) { return texto(d.nombre); }],
  ['¿Asiste?',     function (d) { return d.asiste === 'yes' ? 'Sí' : 'No'; }],
  ['Acompañantes', function (d) { return Number(d.acompanantes) || 0; }],
  ['Nombres',      function (d) { return texto((d.nombres || []).join(', ')); }],
  ['Autobús',      function (d) { return texto(d.autobus); }],
  ['Alergias',     function (d) { return texto(d.alergias); }],
  ['Mensaje',      function (d) { return texto(d.mensaje); }],
  ['Idioma',       function (d) { return texto(d.idioma); }],
  ['Dirección',    function (d) { return texto(d.direccion); }]
];

/* ── Entrada ─────────────────────────────────────────────── */

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);

    // Señuelo: los bots rellenan todos los campos, las personas no ven este
    if (d.web) return respuesta({ ok: true });
    if (d.token !== TOKEN) return respuesta({ ok: false, error: 'token' });
    if (!String(d.nombre || '').trim()) return respuesta({ ok: false, error: 'nombre' });

    guardar(d);
    avisar(d);          // si el correo falla, la fila ya está guardada
    return respuesta({ ok: true });

  } catch (err) {
    return respuesta({ ok: false, error: String(err) });
  }
}

function doGet() {
  return respuesta({ ok: true, vivo: true });
}

/* ── Guardar ─────────────────────────────────────────────── */

function guardar(d) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA)
          || SpreadsheetApp.getActiveSpreadsheet().insertSheet(HOJA);

  // Bloqueo: si entran dos confirmaciones a la vez, una espera
  var cerrojo = LockService.getScriptLock();
  cerrojo.waitLock(20000);
  try {
    var ancho = Math.max(hoja.getLastColumn(), 1);
    var cabeceras = hoja.getRange(1, 1, 1, ancho).getValues()[0];

    // Se busca cada columna por su nombre; la que no exista se crea
    // AL FINAL. Nunca se inserta en medio ni se reordena nada.
    var fila = [];
    for (var i = 0; i < COLUMNAS.length; i++) {
      var nombre = COLUMNAS[i][0];
      var pos = buscarColumna(cabeceras, nombre);

      if (pos === -1) {
        pos = cabeceras.length;
        // Si la hoja está recién creada la fila 1 está vacía
        if (pos === 1 && !String(cabeceras[0]).trim()) pos = 0;
        cabeceras[pos] = nombre;
        hoja.getRange(1, pos + 1).setValue(nombre).setFontWeight('bold');
      }
      fila[pos] = COLUMNAS[i][1](d);
    }

    // Huecos (columnas tuyas que el script no toca) se dejan vacíos
    for (var j = 0; j < cabeceras.length; j++) {
      if (fila[j] === undefined) fila[j] = '';
    }

    hoja.appendRow(fila);
    hoja.setFrozenRows(1);

  } finally {
    cerrojo.releaseLock();
  }
}

/* Compara ignorando mayúsculas, tildes, signos y espacios, para
   que 'Autobús', 'autobus' y 'Autobus ' sean la misma columna. */
function buscarColumna(cabeceras, nombre) {
  var buscado = normalizar(nombre);
  for (var i = 0; i < cabeceras.length; i++) {
    if (normalizar(cabeceras[i]) === buscado) return i;
  }
  return -1;
}

function normalizar(v) {
  return String(v == null ? '' : v)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

function texto(v) {
  return String(v == null ? '' : v).slice(0, 2000);
}

/* ── Aviso por correo ────────────────────────────────────── */

function avisar(d) {
  try {
    var asiste = d.asiste === 'yes';
    var lineas = [
      'Nombre: '       + texto(d.nombre),
      '¿Asiste?: '     + (asiste ? 'Sí' : 'No'),
      'Acompañantes: ' + (Number(d.acompanantes) || 0),
      'Nombres: '      + texto((d.nombres || []).join(', ')),
      'Autobús: '      + texto(d.autobus),
      'Alergias: '     + texto(d.alergias),
      'Dirección: '    + texto(d.direccion),
      'Mensaje: '      + texto(d.mensaje),
      'Idioma: '       + texto(d.idioma)
    ];
    MailApp.sendEmail({
      to: CORREO,
      subject: (asiste ? '✔ ' : '✖ ') + 'Boda Pilar y Pablo · ' + texto(d.nombre),
      body: lineas.join('\n')
    });
  } catch (err) {
    // El correo es un extra. Si falla, la confirmación ya está a salvo
    // en la hoja y el invitado no tiene por qué enterarse.
    console.error('No se pudo enviar el aviso: ' + err);
  }
}

/* ── Respuesta ───────────────────────────────────────────── */

function respuesta(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
