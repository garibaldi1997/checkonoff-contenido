// Post: 2027 llega con dos cambios (estándar premium)
const { FOTO, C, ast, bb, logo, ph, G, render } = require('./premium_base');
render([['d27_01', `${ph('mx_estres2', -40)}
${bb(36, 330, 'n l', '① Jornada máxima:<br><span style="color:#7DD818">46 h</span> a la semana')}
${bb(726, 110, 'm r', '② Registro<br>electrónico', 'r')}
${ast(940, 330, .7)}
<div class="box n" style="bottom:140px;font-size:56px">El 1 de enero de 2027 llegan ${G('2 cambios')} a la vez.<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">¿Tu empresa ya está lista? 📌 Guárdalo</div></div>
${logo}`]], 'out_2027');
