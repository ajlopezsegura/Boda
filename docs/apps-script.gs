/* ─────────────────────────────────────────────────────────────
   BODA PILAR Y PABLO · recogida de confirmaciones
   Copia de lo que hay desplegado en Apps Script, para no perderlo.

   Único cambio respecto a lo anterior: la dirección postal se
   escribe en la columna J, al final. No se toca ninguna otra
   columna ni se borra nada.
   ───────────────────────────────────────────────────────────── */

const TOKEN  = 'pilarypablo-12122026';
const HOJA   = 'Confirmaciones';
const CORREO = 'info@thevisualsboutique.com';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) return responder({ ok: false });
    if (d.web) return responder({ ok: true });        // trampa para bots

    obtenerHoja().appendRow([
      new Date(),
      corta(d.nombre),
      d.asiste === 'yes' ? 'Sí' : 'No',
      Number(d.acompanantes) || 0,
      corta((d.nombres || []).join(', ')),
      corta(d.autobus),
      corta(d.alergias),
      corta(d.mensaje),
      corta(d.idioma),
      corta(d.direccion),
    ]);

    avisar(d);
    return responder({ ok: true });
  } catch (err) {
    return responder({ ok: false });
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
        'Acompañante: ' + (corta((d.nombres || []).join(', ')) || 'no'),
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

function obtenerHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(HOJA);
    hoja.appendRow(['Fecha', 'Nombre', '¿Asiste?', 'Acompañantes', 'Nombres', 'Autobús', 'Alergias', 'Mensaje', 'Idioma', 'Dirección']);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function corta(v) { return String(v == null ? '' : v).slice(0, 500); }

function responder(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
