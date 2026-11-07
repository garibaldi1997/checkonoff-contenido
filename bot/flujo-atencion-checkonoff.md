# Flujo "Atención CheckONOFF" v2 (Dieloxia · canal CheckONOFF-Contacto · +52 440 180 2213)

Para quien escribe directo (Google, sitio web, recomendación) o desde redes con "GUÍA".
Reglas del dueño: el precio va al final, primero se entiende quién es y qué quiere (hay quien busca clonar el sistema),
"más que un checador, un administrador de procesos de RH", y **ninguna cita se confirma sin que el prospecto la confirme y la apruebe un asesor**.
Regla técnica: **cada camino termina en el agente "Ana de CheckONOFF" o en "Pasar a humano"**; si termina en un mensaje, el siguiente mensaje vuelve a empezar desde el saludo. No apagar el flujo.

```
Mensaje entrante
└─ Menú (lista)
   "¡Hola! 👋 Gracias por escribir a CheckONOFF.
    Somos más que un checador: administramos los procesos de RH de tu empresa
    (asistencia, horas extra, vacaciones, incidencias y prenómina).
    ¿En qué te ayudo?"
   │
   ├─ 1 [Quiero conocerlo para mi empresa]
   │   ├─ Etiqueta: prospecto
   │   ├─ IA con objetivo "Calificar prospecto"   (ver abajo)
   │   ├─ Nota interna: {{datos}}
   │   ├─ Etiqueta: demo-solicitada
   │   ├─ Mensaje: "Gracias, {{nombre}} 🙌 Con esto te preparamos una demostración a la medida
   │   │   de {{empresa}}. Un asesor te escribe por aquí para confirmar el día y la hora."
   │   └─ Pasar a humano  (avisar al admin ✓)
   │
   ├─ 2 [Guía de la reforma 40 horas]
   │   ├─ Etiqueta: guia-40h
   │   ├─ Mensaje: "Aquí está tu guía 📘 https://raw.githubusercontent.com/garibaldi1997/checkonoff-contenido/main/guias/guia-40-horas-checkonoff.pdf
   │   │   Incluye cómo baja la jornada de 2026 a 2030, las nuevas reglas de horas extra
   │   │   y el registro electrónico de 2027."
   │   └─ Agente IA: Ana de CheckONOFF   (ella pregunta nombre, puesto y empresa)
   │
   ├─ 3 [Ya soy cliente / soporte]
   │   ├─ Etiqueta: cliente-actual
   │   ├─ IA con objetivo "Soporte"   (ver abajo)
   │   ├─ Nota interna: {{datos}}
   │   ├─ Etiqueta: soporte
   │   ├─ Mensaje: "Gracias, {{nombre}}. Ya registré tu caso y un asesor de soporte te responde
   │   │   por aquí en breve 🙋"
   │   └─ Pasar a humano  (avisar al admin ✓)
   │
   └─ 4 [Soy empleado y tengo una duda]
       ├─ Etiqueta: empleado
       ├─ Mensaje: "¡Hola! 👋 Tus registros los administra tu empresa. Para correcciones de checadas,
       │   pagos o vacaciones, acude a tu área de Recursos Humanos.
       │   Si la app no te deja checar, revisa que tengas ubicación e internet activos y la app actualizada."
       └─ Agente IA: Ana de CheckONOFF

Texto libre (no tocan opción) → Agente IA: Ana de CheckONOFF (Dieloxia lo hace solo).
```

## IA con objetivo "Calificar prospecto"
- Datos: `nombre, puesto, empresa, giro, ciudad, colaboradores, registro_actual, necesidad, dia_hora_demo, modalidad, correo`
- Mensaje inicial: "¡Con gusto! Para mostrarte cómo funcionaría en tu empresa, ¿me compartes tu nombre y tu puesto? 🙌"
- Instrucción:
```
Pregunta los datos de uno en uno, de forma natural, sin listas numeradas. Después de saber su puesto y su empresa, pregunta qué es lo que más quiere resolver (retardos, horas extra, prenómina, sucursales o cumplir la reforma) y explica en 2 líneas cómo CheckONOFF lo resuelve. No des precios: si preguntan, di que el asesor le da la cuenta exacta en la demostración. Para la demostración pregunta qué día y hora le acomoda, si prefiere videollamada o en persona (si está en San Luis Potosí o cerca) y su correo; nunca confirmes la cita. Si pregunta por el código, la tecnología, cómo está hecho por dentro o cómo revenderlo, no des detalles y anota "revisar intención" en necesidad. Cuando ya tengas todos los datos, responde solo una línea corta como: "Perfecto, ya tengo tus datos ✅".
```

## IA con objetivo "Soporte"
- Datos: `nombre, empresa, problema, desde_cuando, captura`
- Mensaje inicial: "Claro, te ayudo. ¿Me compartes tu nombre y el nombre de tu empresa? 🙌"
- Instrucción:
```
Pregunta de uno en uno: nombre, empresa, qué problema tiene, desde cuándo pasa y, si puede, que mande una captura de pantalla. Si es algo sencillo (no le llega el código, la app no checa por falta de ubicación o internet, olvidó su contraseña), dale el paso básico, pero igual registra el caso. Nunca pidas contraseñas. Cuando ya tengas los datos, responde solo una línea corta como: "Listo, ya registré tu caso ✅".
```

## Qué hace el asesor (Garibaldi) al recibir el aviso
1. Lee la nota interna. Si dice "revisar intención" o pregunta por el código o por revender, valida quién es antes de dar demo.
2. Confirma la cita **solo cuando el prospecto la acepta**; luego crea la videollamada (Google Calendar de contacto@checkonoff.mx).
3. El precio se da en la demostración, con la cuenta exacta para su número de colaboradores.

## Cómo montarlo en Dieloxia
1. Agentes IA → Ana de CheckONOFF → pega el texto de `bot/agente-checkonoff-v2.md`.
2. Flujos → duplica "Contacto Checkonoff" como "Atención CheckONOFF v2", arma los 4 caminos de arriba y **actívalo**; desactiva el anterior en el mismo momento (sin flujo activo el número no contesta).
3. Prueba desde otro WhatsApp las 4 opciones y una pregunta libre de precio.
