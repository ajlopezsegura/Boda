-- ──────────────────────────────────────────────────────────────────────────
-- DEMO LEADS SEED — Las Conchas
-- Paste in Supabase → SQL Editor → Run.
-- Inserts 8 realistic leads (4 hot, 4 cold) for the admin panel demo.
-- Safe to re-run; cleans previous demo leads first (identified by marker email domain).
-- ──────────────────────────────────────────────────────────────────────────

BEGIN;

-- Clean previous demo runs (leads with @demo.lasconchas.test email domain)
DELETE FROM leads
WHERE project_slug = 'las-conchas'
  AND (contact->>'email') LIKE '%@demo.lasconchas.test';

-- ── HOT LEADS (source: decision/summary, score 15) ─────────────────────────

INSERT INTO leads (project_slug, source_page, intent, unit_ids, primary_unit_id, unit_snapshot, contact, session_trail, lead_score, lead_temperature, status, created_at, timestamp) VALUES

('las-conchas', 'decision', 'visit', '["3C"]', '3C',
 '[{"unit_id":"3C","typology":"4 Dormitorios","floor":3,"bedrooms":4,"surface":165,"price":720000,"status":"available"}]',
 '{"name":"Carlos Mendoza Vidal","email":"carlos.mendoza@demo.lasconchas.test","phone":"+34 611 234 567","preferred_date":"2026-04-29","message":"Muy interesado en la 3C. Querría visitarla con mi esposa este miércoles o jueves si es posible."}',
 '[{"page":"/","t":1713600000000},{"page":"/proyecto","t":1713600040000},{"page":"/availability","t":1713600180000},{"page":"/availability/3c","t":1713600320000},{"page":"/inmersion/3c","t":1713600480000},{"page":"/decision","t":1713600720000},{"page":"/contact","t":1713600810000}]',
 15, 'hot', 'new', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),

('las-conchas', 'summary', 'call', '["4A"]', '4A',
 '[{"unit_id":"4A","typology":"4 Dormitorios","floor":4,"bedrooms":4,"surface":180,"price":810000,"status":"available"}]',
 '{"name":"Isabel Fernández Ruiz","email":"isabel.fernandez@demo.lasconchas.test","phone":"+34 622 345 678","preferred_date":"2026-04-24","message":"Tengo financiación aprobada hasta 850k. Quiero cerrar rápido si las condiciones son buenas."}',
 '[{"page":"/","t":1713510000000},{"page":"/proyecto","t":1713510060000},{"page":"/availability","t":1713510200000},{"page":"/availability/4a","t":1713510380000},{"page":"/inmersion/4a","t":1713510540000},{"page":"/decision","t":1713510780000},{"page":"/summary/4a","t":1713510900000},{"page":"/contact","t":1713511000000}]',
 15, 'hot', 'new', NOW() - INTERVAL '18 hours', NOW() - INTERVAL '18 hours'),

('las-conchas', 'decision', 'info', '["3A","4A"]', '3A',
 '[{"unit_id":"3A","typology":"3 Dormitorios","floor":3,"bedrooms":3,"surface":130,"price":560000,"status":"available"},{"unit_id":"4A","typology":"4 Dormitorios","floor":4,"bedrooms":4,"surface":180,"price":810000,"status":"available"}]',
 '{"name":"Andreas Müller","email":"a.muller@demo.lasconchas.test","phone":"+49 171 4567 890","preferred_date":null,"message":"Looking to relocate from Munich. Need info on taxes and residency process for non-EU. Prefer 4A but 3A also interesting."}',
 '[{"page":"/","t":1713340000000},{"page":"/proyecto","t":1713340080000},{"page":"/map","t":1713340200000},{"page":"/availability","t":1713340320000},{"page":"/availability/3a","t":1713340500000},{"page":"/availability/4a","t":1713340680000},{"page":"/compare","t":1713340850000},{"page":"/decision","t":1713341000000},{"page":"/contact","t":1713341100000}]',
 15, 'hot', 'contacted', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

('las-conchas', 'summary', 'visit', '["ATICO-1"]', 'ATICO-1',
 '[{"unit_id":"ATICO-1","typology":"Ático","floor":5,"bedrooms":4,"surface":280,"price":1150000,"status":"available"}]',
 '{"name":"Javier Álvarez-Cascos","email":"j.alvarez@demo.lasconchas.test","phone":"+34 639 876 543","preferred_date":"2026-04-26","message":"Interesado exclusivamente en el ático. Disponibilidad sábado mañana para visita presencial."}',
 '[{"page":"/","t":1713430000000},{"page":"/proyecto","t":1713430090000},{"page":"/availability","t":1713430250000},{"page":"/availability/atico-1","t":1713430400000},{"page":"/inmersion/atico-1","t":1713430600000},{"page":"/decision","t":1713430880000},{"page":"/summary/atico-1","t":1713431000000},{"page":"/contact","t":1713431120000}]',
 15, 'hot', 'new', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- ── COLD LEADS (source: unit_detail/general, score 3) ──────────────────────

('las-conchas', 'unit_detail', 'info', '["2A"]', '2A',
 '[{"unit_id":"2A","typology":"2 Dormitorios","floor":2,"bedrooms":2,"surface":100,"price":440000,"status":"available"}]',
 '{"name":"Laura Gómez Santos","email":"lgomez@demo.lasconchas.test","phone":"+34 655 123 789","preferred_date":null,"message":"¿Está incluido el garaje en el precio? ¿Plazo de entrega?"}',
 '[{"page":"/","t":1713260000000},{"page":"/proyecto","t":1713260060000},{"page":"/availability","t":1713260180000},{"page":"/availability/2a","t":1713260340000},{"page":"/contact","t":1713260450000}]',
 3, 'cold', 'new', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

('las-conchas', 'unit_detail', 'info', '["3B"]', '3B',
 '[{"unit_id":"3B","typology":"2 Dormitorios","floor":3,"bedrooms":2,"surface":105,"price":475000,"status":"available"}]',
 '{"name":"Marc Delacroix","email":"marc.delacroix@demo.lasconchas.test","phone":"+33 6 12 34 56 78","preferred_date":null,"message":"Is rental income expected during low season? Looking for a second home with investment upside."}',
 '[{"page":"/","t":1713080000000},{"page":"/availability","t":1713080150000},{"page":"/availability/3b","t":1713080280000},{"page":"/contact","t":1713080400000}]',
 3, 'cold', 'new', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),

('las-conchas', 'general', 'call', '[]', NULL,
 '[]',
 '{"name":"María del Carmen Ortega","email":"mcortega@demo.lasconchas.test","phone":"+34 677 445 221","preferred_date":"2026-05-02","message":"Me interesa conocer más sobre el proyecto en general, sin vivienda concreta aún."}',
 '[{"page":"/","t":1712900000000},{"page":"/proyecto","t":1712900080000},{"page":"/contact","t":1712900220000}]',
 3, 'cold', 'new', NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),

('las-conchas', 'unit_detail', 'visit', '["1A"]', '1A',
 '[{"unit_id":"1A","typology":"2 Dormitorios","floor":1,"bedrooms":2,"surface":98,"price":420000,"status":"sold"}]',
 '{"name":"Tomás Rivera Peña","email":"tomas.rivera@demo.lasconchas.test","phone":"+34 699 112 334","preferred_date":"2026-04-28","message":"Vi que 1A ya está vendida. ¿Hay alternativas similares en planta baja?"}',
 '[{"page":"/","t":1712700000000},{"page":"/proyecto","t":1712700070000},{"page":"/availability","t":1712700200000},{"page":"/availability/1a","t":1712700350000},{"page":"/contact","t":1712700480000}]',
 3, 'cold', 'closed', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days');

COMMIT;

-- Confirm
SELECT lead_temperature, source_page, intent,
       contact->>'name'  AS name,
       contact->>'email' AS email,
       primary_unit_id,
       status,
       created_at
FROM leads
WHERE project_slug = 'las-conchas'
  AND (contact->>'email') LIKE '%@demo.lasconchas.test'
ORDER BY created_at DESC;
