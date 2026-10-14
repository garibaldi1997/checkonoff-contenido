# CheckONOFF · Publicación automática gratis

Este repositorio publica solo el contenido de CheckONOFF en **Instagram** y **Facebook**, sin pagar ninguna herramienta:

- `calendario.json` → qué se publica, cuándo (hora de Ciudad de México) y con qué texto.
- `contenido/` → las imágenes (JPG).
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
6. En la respuesta, copia el `access_token` de **Checkonoff**. Ese es el **token de página** (por lo general no caduca).

### 4. Guardarlo en GitHub
1. En este repositorio: **Settings → Secrets and variables → Actions → New repository secret**
2. Nombre: `META_PAGE_TOKEN` · Valor: el token de página.

### 5. Probar
**Actions → Publicar en redes → Run workflow** → modo `verificar`.
Debe mostrar el nombre de la página y el usuario de Instagram. ✅ Listo: desde ese momento se publica solo.

---

## Uso diario
No hay que hacer nada. El contenido nuevo se agrega a `contenido/` y `calendario.json`; el robot lo publica a su hora (puede tardar 5–15 minutos por la cola de GitHub).

Ejemplo de entrada:

```json
{
  "id": "2026-10-15-quincena",
  "fecha": "2026-10-15T10:00:00-06:00",
  "tipo": "carrusel",
  "redes": ["instagram", "facebook"],
  "imagenes": ["contenido/2026-10-15-quincena/01.jpg", "contenido/2026-10-15-quincena/02.jpg"],
  "texto": "Texto con #hashtags"
}
```

## Notas
- Instagram solo acepta **JPG** por API. El flujo `Validar calendario` revisa formato, rutas y número de imágenes.
- Las historias por API no admiten stickers de enlace, encuesta ni música.
- Las entradas con más de 36 horas de atraso no se publican (para no saturar el feed si algo falló).
- Si la API de Meta cambia de versión, crea la variable `GRAPH_VERSION` (Settings → Variables) con la versión nueva, p. ej. `v24.0`.
