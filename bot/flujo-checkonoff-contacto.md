# Flujo "Contacto Checkonoff" (Dieloxia · canal CheckONOFF-Contacto)

Regla de oro: **cada camino termina en el agente "Ana de CheckONOFF"** (bloque Agente IA / IA libre).
Si un camino termina en un mensaje o imagen, la conversación se cierra y el siguiente mensaje vuelve a empezar desde el saludo.
No apagar el flujo: sin flujo activo el número no contesta.

```
Mensaje entrante
└─ Menú (botones)
   "¡Hola! 👋 Soy Ana de CheckONOFF. Ayudamos a las empresas a controlar asistencia,
    horas extra y prenómina, y a prepararse para la reforma de 40 horas. ¿Qué te interesa?"
   ├─ [Guía 40 horas]
   │   ├─ Etiqueta: Interesado_Reforma40h
   │   ├─ Imagen/Doc/Video: guia-40-horas-checkonoff.pdf
   │   ├─ Mensaje: "Aquí está tu guía 📘 Incluye cómo baja la jornada de 2026 a 2030, las nuevas
   │   │   reglas de horas extra y qué cambia con el registro electrónico en 2027.
   │   │   ¿Cuántos colaboradores tiene tu empresa y cómo registran hoy su asistencia?"
   │   └─ Agente IA: Ana de CheckONOFF
   ├─ [Precios y prueba]
   │   ├─ Etiqueta: Pregunta_Precios
   │   ├─ Mensaje: "Precios por colaborador al mes, más IVA:
   │   │   • Esencial $39 (mínimo 13)
   │   │   • Profesional $59 (mínimo 9)
   │   │   • Corporativo $89 (mínimo 6)
   │   │   Prueba gratis 14 días, sin tarjeta: https://app.checkonoff.mx/registro-empresa
   │   │   ¿Cuántos colaboradores tiene tu empresa? Te hago la cuenta."
   │   └─ Agente IA: Ana de CheckONOFF
   └─ [Hablar con asesor]
       ├─ IA con objetivo: nombre, empresa, colaboradores
       ├─ Etiqueta: Interesado_Demo
       └─ Pasar a humano (avisar al admin ✓):
           "Gracias, {{nombre}}. Ya le pasé tus datos a un asesor y te escribe por aquí en breve 🙋"
```

Si escriben otra cosa en lugar de tocar un botón, el menú le pasa la pregunta a la IA (así está programado Dieloxia).

## Ajustes que salieron de las pruebas (28/10/2026)
- El menú llega como lista numerada; contestar 1, 2 o 3 funciona.
- La guía va como **enlace** en un mensaje (subir el PDF al bloque Imagen/Doc/Video falló).
- Agente de IA (ai_goal-10): datos `nombre, empresa, colaboradores, registro`; mensaje inicial "Para recomendarte lo mejor para tu empresa, ¿me compartes tu nombre y el de tu empresa? 🙌"; sin listas numeradas.
- **Nunca pedirle a la IA que no conteste al terminar**: Dieloxia manda primero la última respuesta de la IA y luego sigue el flujo; si la respuesta sale vacía, WhatsApp la rechaza y el flujo se detiene. Por eso la instrucción es: "Cuando ya tengas todos los datos, responde solo una línea corta como: 'Perfecto, ya tengo tus datos ✅'".
- Objetivo alcanzado → Nota interna (datos) → mensaje de gracias + prueba gratis → Etiqueta Interesado_Demo → Pasar a humano (avisar al admin).
