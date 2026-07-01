import express from 'express';
import cors from 'cors';
import { pool, initDb } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/proposals', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM proposals ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/proposals', async (req, res) => {
  const data = req.body;
  const { rows } = await pool.query(
    `INSERT INTO proposals (title, region, designer, price, image, description, customer_request, detailed_plan)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [data.title, data.region, data.designer, data.price, data.image, data.description, data.customerRequest || {}, data.detailedPlan || {}]
  );
  res.json(rows[0]);
});

app.get('/api/guides', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM guides ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/guides', async (req, res) => {
  const g = req.body;
  const { rows } = await pool.query(
    `INSERT INTO guides (name, region, role, phone, memo, status, rating) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [g.name, g.region, g.role, g.phone, g.memo, g.status || 'Pending', g.rating || 5]
  );
  res.json(rows[0]);
});

app.patch('/api/guides/:id', async (req, res) => {
  const { id } = req.params;
  const g = req.body;
  const { rows } = await pool.query(
    `UPDATE guides SET
      name = COALESCE($1, name),
      region = COALESCE($2, region),
      role = COALESCE($3, role),
      phone = COALESCE($4, phone),
      status = COALESCE($5, status),
      rating = COALESCE($6, rating),
      memo = COALESCE($7, memo),
      updated_at = NOW()
     WHERE id = $8 RETURNING *`,
    [g.name, g.region, g.role, g.phone, g.status, g.rating, g.memo, id]
  );
  res.json(rows[0]);
});

app.delete('/api/guides/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM guides WHERE id = $1', [id]);
  res.json({ ok: true });
});

app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users_crm ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/users', async (req, res) => {
  const u = req.body;
  const { rows } = await pool.query(
    `INSERT INTO users_crm (name, type, contact, request, status) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [u.name, u.type || 'Customer', u.contact, u.request, u.status || 'Lead']
  );
  res.json(rows[0]);
});

app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const u = req.body;
  const { rows } = await pool.query(
    `UPDATE users_crm SET
      name = COALESCE($1, name),
      type = COALESCE($2, type),
      contact = COALESCE($3, contact),
      request = COALESCE($4, request),
      status = COALESCE($5, status),
      updated_at = NOW()
     WHERE id = $6 RETURNING *`,
    [u.name, u.type, u.contact, u.request, u.status, id]
  );
  res.json(rows[0]);
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users_crm WHERE id = $1', [id]);
  res.json({ ok: true });
});

app.listen(PORT, async () => {
  await initDb();
  console.log(`Server running on ${PORT}`);
});
