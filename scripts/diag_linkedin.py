"""Diagnóstico del token de LinkedIn de la página (no imprime el token)."""
import json, os, urllib.request, urllib.error
t = os.environ.get("LINKEDIN_TOKEN_CHECKONOFF", "")
print("largo:", len(t), "| espacios/saltos alrededor:", t != t.strip(), "| empieza con AQ:", t.strip().startswith("AQ"))
t = t.strip()
pruebas = [
    ("v2/me", "https://api.linkedin.com/v2/me", {}),
    ("rest/organizationAcls", "https://api.linkedin.com/rest/organizationAcls?q=roleAssignee&state=APPROVED", {"LinkedIn-Version": "202509", "X-Restli-Protocol-Version": "2.0.0"}),
    ("v2/organizationAcls", "https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&state=APPROVED", {"X-Restli-Protocol-Version": "2.0.0"}),
    ("rest/organizations/144005971", "https://api.linkedin.com/rest/organizations/144005971", {"LinkedIn-Version": "202509"}),
]
for nombre, url, h in pruebas:
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {t}", **h})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print("✅", nombre, r.status, r.read().decode()[:300])
    except urllib.error.HTTPError as e:
        print("❌", nombre, e.code, e.read().decode()[:200])
