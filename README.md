# Publicación automática gratis (multi-página)

Este repositorio publica solo el contenido de **una o varias páginas** (CheckONOFF y otros proyectos) en **Instagram** y **Facebook**, sin pagar ninguna herramienta:

- `cuentas.json` → las páginas que maneja el sistema y el nombre del secreto con su token.
- `calendario.json` → qué se publica, en qué cuenta, cuándo (hora de Ciudad de México) y con qué texto.
- `contenido/<cuenta>/` → las imágenes (JPG) de cada cuenta.
- `.github/workflows/publicar.yml` → GitHub Actions revisa el calendario cada 15 minutos y publica lo que toque con la API oficial de Meta.
- `estado/publicados.json` → registro de lo ya publicado (evita duplicados).

Tipos de publicación: `imagen`, `carrusel` (2 a 10 imágenes) e `historia`.

---

## Configuración única (≈15 minutos)

> Solo se hace una vez. Meta exige que la persona dueña de la página autorice el acceso.

### 1. Requisitos
- Instagram de CheckONOFF como **cuenta profesional** (Empresa o Creador).
- Instagram **vinculado a la página de Facebook** Checkonoff (ya aparece así en Business Suite).

### 2. Crear la app de Meta (gratis)
1. Entra a <https://developers.facebook.com> con tu Facebook → **Mis apps** → **Crear app**.
2. Elige los casos de uso para **administrar una página** y **publicar contenido en Instagram** (los nombres pueden variar).
3. Deja la app en **modo desarrollo**: así puede publicar en tus propias cuentas sin revisión de Meta.

### 3. Obtener el token de la página
1. Abre el **Explorador de la API Graph**: <https://developers.facebook.com/tools/explorer>
2. Arriba a la derecha elige tu app → **Obtener token de usuario** y marca estos permisos:
   `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`, `business_management`
3. Pulsa **Generate Access Token** y acepta (selecciona la página Checkonoff y su Instagram).
4. Copia el token y ábrelo en el **Depurador de tokens**: <https://developers.facebook.com/tools/debug/accesstoken> → **Ampliar token de acceso** → copia el token largo.
5. Vuelve al Explorador, pega el token largo y consulta `me/accounts`.
6. En la respuesta aparece cada página que administras con su propio `access_token`. Ese es el **token de página** (por lo general no caduca).

### 4. Guardarlo en GitHub
1. En este repositorio: **Settings → Secrets and variables → Actions → New repository secret**
2. Nombre: el que diga `cuentas.json` para esa página (para CheckONOFF: `META_TOKEN_CHECKONOFF`) · Valor: su token de página.

### 5. Probar
**Actions → Publicar en redes → Run workflow** → modo `verificar`.
Debe mostrar cada cuenta con su página y su usuario de Instagram. ✅ Listo: desde ese momento se publica solo.

---

## Agregar otra página o proyecto
1. En el paso 3, al generar el token, marca también esa página y su Instagram (debes ser administrador de la página).
2. Agrega la cuenta en `cuentas.json`:
   ```json
   "dieloxia": { "nombre": "Dieloxia", "secreto": "META_TOKEN_DIELOXIA" }
   ```
3. Crea el secreto `META_TOKEN_DIELOXIA` con el token de esa página y agrega su línea en `.github/workflows/publicar.yml` (sección `env`):
   `META_TOKEN_DIELOXIA: ${{ secrets.META_TOKEN_DIELOXIA }}`
4. Sus publicaciones van en `contenido/dieloxia/` y en el calendario con `"cuenta": "dieloxia"`.

Las cuentas sin token simplemente se saltan (no generan errores).

> **Páginas de clientes:** si te agregan como administrador o editor de su página, funciona igual. Para que clientes se conecten solos a la app hace falta la **revisión de la app** y la **verificación del negocio** en Meta.

---

## Uso diario
No hay que hacer nada. El contenido nuevo se agrega a `contenido/` y `calendario.json`; el robot lo publica a su hora (puede tardar 5–15 minutos por la cola de GitHub).

Ejemplo de entrada:

```json
{
  "id": "2026-10-15-quincena",
  "cuenta": "checkonoff",
  "fecha": "2026-10-15T10:00:00-06:00",
  "tipo": "carrusel",
  "redes": ["instagram", "facebook"],
  "imagenes": ["contenido/checkonoff/2026-10-15-quincena/01.jpg", "contenido/checkonoff/2026-10-15-quincena/02.jpg"],
  "texto": "Texto con #hashtags"
}
```

## Notas
- Instagram solo acepta **JPG** por API. El flujo `Validar calendario` revisa formato, rutas y número de imágenes.
- Las historias por API no admiten stickers de enlace, encuesta ni música.
- Las entradas con más de 36 horas de atraso no se publican (para no saturar el feed si algo falló).
- Si la API de Meta cambia de versión, crea la variable `GRAPH_VERSION` (Settings → Variables) con la versión nueva, p. ej. `v27.0`.
