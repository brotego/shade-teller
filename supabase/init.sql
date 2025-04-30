-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS recommendations;
DROP TABLE IF EXISTS shades;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS shade_recommendations;

-- Drop existing types if they exist
DROP TYPE IF EXISTS undertone_type;
DROP TYPE IF EXISTS skin_depth_type;
DROP TYPE IF EXISTS formula_type;

-- Create enum types
CREATE TYPE undertone_type AS ENUM ('C', 'W', 'N');
CREATE TYPE skin_depth_type AS ENUM ('LIGHT-MEDIUM', 'MEDIUM-DEEP');
CREATE TYPE formula_type AS ENUM ('moisturizing', 'oil-control', 'adaptive');

-- Create brands table
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create shades table
CREATE TABLE shades (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    shade_number TEXT NOT NULL,
    undertone undertone_type NOT NULL,
    skin_depth skin_depth_type NOT NULL,
    pro_filtr BOOLEAN DEFAULT false,
    eaze_drop TEXT,
    soft_lit BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create recommendations table
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    shade_id INTEGER REFERENCES shades(id),
    undertone undertone_type NOT NULL,
    skin_depth skin_depth_type NOT NULL,
    formula_type formula_type NOT NULL,
    seasonal_recommendation BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create the recommendations table
CREATE TABLE shade_recommendations (
    id SERIAL PRIMARY KEY,
    survey_answers JSONB NOT NULL,
    recommended_shade TEXT NOT NULL,
    undertone TEXT NOT NULL,
    skin_depth TEXT NOT NULL,
    formula_type TEXT NOT NULL,
    image_url TEXT,
    price DECIMAL(10,2) DEFAULT 40.00,
    seasonal_recommendation BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on the JSONB column for better query performance
CREATE INDEX idx_survey_answers ON shade_recommendations USING GIN (survey_answers);

-- Insert initial data
INSERT INTO brands (name) VALUES ('Fenty Beauty');

INSERT INTO products (brand_id, name, description, price, image_url)
VALUES (
    (SELECT id FROM brands WHERE name = 'Fenty Beauty'),
    'Soft''lit Naturally Luminous Longwear Foundation',
    'A naturally luminous foundation that delivers medium, buildable coverage and a natural finish that looks like your skin, but better.',
    40.00,
    NULL
);

-- Insert shades with image URLs
INSERT INTO shades (product_id, shade_number, undertone, skin_depth, pro_filtr, eaze_drop, soft_lit, image_url)
VALUES
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '185', 'N', 'LIGHT-MEDIUM', true, '5', true, NULL),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '190', 'W', 'LIGHT-MEDIUM', true, '5', true, NULL),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '200', 'C', 'LIGHT-MEDIUM', true, '6', true, '/200.webp'),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '235', 'W', 'LIGHT-MEDIUM', true, '8', true, NULL),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '350', 'C', 'MEDIUM-DEEP', true, '15', true, NULL),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '385', 'N', 'MEDIUM-DEEP', true, '17', true, NULL),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '420', 'W', 'MEDIUM-DEEP', true, '20', true, '/420.webp');

-- Enable Row Level Security (RLS)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shades ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE shade_recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON brands FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON shades FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON recommendations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for authenticated users" ON recommendations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read access for all users" ON shade_recommendations FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON shade_recommendations FOR INSERT WITH CHECK (true);

-- Insert some sample data
INSERT INTO shade_recommendations (
    survey_answers,
    recommended_shade,
    undertone,
    skin_depth,
    formula_type,
    image_url,
    seasonal_recommendation
) VALUES
(
    '{"1": "A", "2": "A", "3": "B", "4": "A", "5": "B", "6": "A", "7": "A", "8": "A", "9": "A", "10": "A"}'::jsonb,
    '200',
    'C',
    'LIGHT-MEDIUM',
    'moisturizing',
    '/200.webp',
    false
),
(
    '{"1": "B", "2": "B", "3": "A", "4": "B", "5": "A", "6": "C", "7": "B", "8": "B", "9": "B", "10": "B"}'::jsonb,
    '420',
    'W',
    'MEDIUM-DEEP',
    'oil-control',
    '/420.webp',
    true
); 