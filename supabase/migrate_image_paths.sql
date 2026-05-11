-- Migrate image paths after rename of room imagery to lowercase day/night convention.
-- Run once in Supabase SQL Editor. Idempotent: re-running has no effect once paths are migrated.
--
-- Before: ./assets/images/Salon 01.webp, ./assets/images/Cocina (2).jpg, etc.
-- After:  ./assets/images/salon/salon-day.png, ./assets/images/cocina/cocina-day.jpg, etc.

CREATE OR REPLACE FUNCTION pg_temp.migrate_image_paths(input TEXT) RETURNS TEXT AS $$
DECLARE
  r TEXT := input;
BEGIN
  IF r IS NULL THEN RETURN NULL; END IF;

  -- Salon
  r := REPLACE(r, './assets/images/Salon 01.webp',       './assets/images/salon/salon-day.png');
  r := REPLACE(r, './assets/images/salon/Salon 01.webp', './assets/images/salon/salon-day.png');
  r := REPLACE(r, './assets/images/Salon 01.png',        './assets/images/salon/salon-day.png');
  r := REPLACE(r, './assets/images/salon/Salon 01.png',  './assets/images/salon/salon-day.png');
  r := REPLACE(r, './assets/images/Salon noche.png',     './assets/images/salon/salon-night.png');
  r := REPLACE(r, './assets/images/salon/Salon noche.png', './assets/images/salon/salon-night.png');
  r := REPLACE(r, './assets/images/salon 02.webp',       './assets/images/salon/salon-day-02.webp');
  r := REPLACE(r, './assets/images/salon/salon 02.webp', './assets/images/salon/salon-day-02.webp');
  r := REPLACE(r, './assets/images/Salon 03.jpg',        './assets/images/salon/salon-day-03.jpg');
  r := REPLACE(r, './assets/images/salon/Salon 03.jpg',  './assets/images/salon/salon-day-03.jpg');
  r := REPLACE(r, './assets/images/Salon 04.jpg',        './assets/images/salon/salon-day-04.jpg');
  r := REPLACE(r, './assets/images/salon/Salon 04.jpg',  './assets/images/salon/salon-day-04.jpg');
  r := REPLACE(r, './assets/images/Salon 05.jpg',        './assets/images/salon/salon-day-05.jpg');
  r := REPLACE(r, './assets/images/salon/Salon 05.jpg',  './assets/images/salon/salon-day-05.jpg');

  -- Cocina
  r := REPLACE(r, './assets/images/Cocina (1).jpg',       './assets/images/cocina/cocina-day-02.jpg');
  r := REPLACE(r, './assets/images/cocina/Cocina (1).jpg',./assets/images/cocina/cocina-day-02.jpg');
  r := REPLACE(r, './assets/images/Cocina (2).jpg',       './assets/images/cocina/cocina-day.jpg');
  r := REPLACE(r, './assets/images/cocina/Cocina (2).jpg',./assets/images/cocina/cocina-day.jpg');
  r := REPLACE(r, './assets/images/Cocina (3).jpg',       './assets/images/cocina/cocina-day-03.jpg');
  r := REPLACE(r, './assets/images/cocina/Cocina (3).jpg',./assets/images/cocina/cocina-day-03.jpg');
  r := REPLACE(r, './assets/images/cocina noche.png',     './assets/images/cocina/cocina-night.png');
  r := REPLACE(r, './assets/images/cocina/cocina noche.png', './assets/images/cocina/cocina-night.png');

  -- Baño
  r := REPLACE(r, './assets/images/Baño (1).jpg',         './assets/images/bano/bano-day-02.jpg');
  r := REPLACE(r, './assets/images/bano/Baño (1).jpg',    './assets/images/bano/bano-day-02.jpg');
  r := REPLACE(r, './assets/images/Baño (2).jpg',         './assets/images/bano/bano-day.jpg');
  r := REPLACE(r, './assets/images/bano/Baño (2).jpg',    './assets/images/bano/bano-day.jpg');
  r := REPLACE(r, './assets/images/Baño (3).jpg',         './assets/images/bano/bano-day-03.jpg');
  r := REPLACE(r, './assets/images/bano/Baño (3).jpg',    './assets/images/bano/bano-day-03.jpg');
  r := REPLACE(r, './assets/images/baño noche.png',       './assets/images/bano/bano-night.png');
  r := REPLACE(r, './assets/images/bano/baño noche.png',  './assets/images/bano/bano-night.png');

  -- Dormitorio
  r := REPLACE(r, './assets/images/Dormitorio (1).jpg',         './assets/images/dormitorio/dormitorio-day.jpg');
  r := REPLACE(r, './assets/images/dormitorio/Dormitorio (1).jpg', './assets/images/dormitorio/dormitorio-day.jpg');
  r := REPLACE(r, './assets/images/Dormitorio (2).jpg',         './assets/images/dormitorio/dormitorio-night-02.jpg');
  r := REPLACE(r, './assets/images/dormitorio/Dormitorio (2).jpg', './assets/images/dormitorio/dormitorio-night-02.jpg');
  r := REPLACE(r, './assets/images/Dormitorio (3).jpg',         './assets/images/dormitorio/dormitorio-day-02.jpg');
  r := REPLACE(r, './assets/images/dormitorio/Dormitorio (3).jpg', './assets/images/dormitorio/dormitorio-day-02.jpg');
  r := REPLACE(r, './assets/images/Dormitorio noche.png',       './assets/images/dormitorio/dormitorio-night.png');
  r := REPLACE(r, './assets/images/dormitorio/Dormitorio noche.png', './assets/images/dormitorio/dormitorio-night.png');

  -- Terraza
  r := REPLACE(r, './assets/images/Terraza (1).jpg',       './assets/images/terraza/terraza-day-02.jpg');
  r := REPLACE(r, './assets/images/terraza/Terraza (1).jpg', './assets/images/terraza/terraza-day-02.jpg');
  r := REPLACE(r, './assets/images/Terraza (2).jpg',       './assets/images/terraza/terraza-day.jpg');
  r := REPLACE(r, './assets/images/terraza/Terraza (2).jpg', './assets/images/terraza/terraza-day.jpg');
  r := REPLACE(r, './assets/images/Terraza noche.png',     './assets/images/terraza/terraza-night.png');
  r := REPLACE(r, './assets/images/terraza/Terraza noche.png', './assets/images/terraza/terraza-night.png');

  RETURN r;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update projects table
UPDATE projects SET
  aerial_image = pg_temp.migrate_image_paths(aerial_image),
  hero_image   = pg_temp.migrate_image_paths(hero_image),
  gallery      = pg_temp.migrate_image_paths(gallery::text)::jsonb,
  nearby       = pg_temp.migrate_image_paths(nearby::text)::jsonb,
  amenities    = pg_temp.migrate_image_paths(amenities::text)::jsonb,
  materials    = pg_temp.migrate_image_paths(materials::text)::jsonb;

-- Update units table
UPDATE units SET
  hero_image     = pg_temp.migrate_image_paths(hero_image),
  thumbnail      = pg_temp.migrate_image_paths(thumbnail),
  plan_image     = pg_temp.migrate_image_paths(plan_image),
  gallery_images = pg_temp.migrate_image_paths(gallery_images::text)::jsonb;

-- Verify a sample
SELECT id, hero_image, thumbnail FROM units LIMIT 5;
SELECT slug, gallery FROM projects WHERE slug = 'las-conchas';
