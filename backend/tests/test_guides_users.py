"""T-P0-2 / T-P0-3 — guides · users CRUD 판정.

명세: docs/handoff/04-test-spec.md
"""


def test_health_does_not_touch_db(client):
    """T-P0-6 (일부) — /health 는 200 이고 DB 를 조회하지 않는다."""
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_guides_crud(client):
    """T-P0-2"""
    payload = {
        "name": "김가이드",
        "region": "다낭",
        "role": "현지 가이드",
        "phone": "010-0000-0000",
        "memo": "테스트",
    }

    created = client.post("/api/guides", json=payload)
    assert created.status_code == 200, created.text
    body = created.json()
    assert "id" in body
    assert body["status"] == "Pending", "status 기본값은 Pending 이어야 한다"
    assert body["name"] == "김가이드"
    guide_id = body["id"]

    listed = client.get("/api/guides")
    assert listed.status_code == 200
    assert any(g["id"] == guide_id for g in listed.json())

    patched = client.patch(f"/api/guides/{guide_id}", json={"status": "Active"})
    assert patched.status_code == 200, patched.text
    assert patched.json()["status"] == "Active"
    assert patched.json()["name"] == "김가이드", "부분 갱신이 다른 필드를 지우면 안 된다"

    assert client.patch("/api/guides/999999", json={"status": "Active"}).status_code == 404

    removed = client.delete(f"/api/guides/{guide_id}")
    assert removed.status_code in (200, 204), removed.text

    assert all(g["id"] != guide_id for g in client.get("/api/guides").json())
    assert client.delete(f"/api/guides/{guide_id}").status_code == 404


def test_users_crud(client):
    """T-P0-3"""
    payload = {"name": "박고객", "contact": "010-1111-1111", "request": "다낭 4박"}

    created = client.post("/api/users", json=payload)
    assert created.status_code == 200, created.text
    body = created.json()
    assert body["type"] == "Customer", "type 기본값은 Customer"
    assert body["status"] == "Lead", "status 기본값은 Lead"
    user_id = body["id"]

    assert any(u["id"] == user_id for u in client.get("/api/users").json())

    patched = client.patch(f"/api/users/{user_id}", json={"status": "Contacted"})
    assert patched.status_code == 200, patched.text
    assert patched.json()["status"] == "Contacted"
    assert patched.json()["contact"] == "010-1111-1111"

    assert client.delete(f"/api/users/{user_id}").status_code in (200, 204)
    assert client.delete(f"/api/users/{user_id}").status_code == 404


def test_users_table_name_is_users_crm():
    """T-P0-3 추가 — Postgres 예약어 user 회피."""
    import models

    assert models.UserCrm.__tablename__ == "users_crm"


def test_list_is_ordered_by_id_desc(client):
    """목록은 id 내림차순."""
    for name in ("A", "B", "C"):
        client.post(
            "/api/guides",
            json={"name": name, "region": "x", "role": "y", "phone": "z"},
        )
    ids = [g["id"] for g in client.get("/api/guides").json()]
    assert ids == sorted(ids, reverse=True)
