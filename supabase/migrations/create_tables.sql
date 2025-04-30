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

-- Insert initial brand
INSERT INTO brands (name) VALUES ('Fenty Beauty');

-- Insert initial product
INSERT INTO products (brand_id, name, description, price, image_url)
VALUES (
    (SELECT id FROM brands WHERE name = 'Fenty Beauty'),
    'Soft''lit Naturally Luminous Longwear Foundation',
    'A naturally luminous foundation that delivers medium, buildable coverage and a natural finish that looks like your skin, but better.',
    40.00,
    NULL
);

-- Insert initial shades
INSERT INTO shades (product_id, shade_number, undertone, skin_depth, pro_filtr, eaze_drop, soft_lit)
VALUES
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '185', 'N', 'LIGHT-MEDIUM', true, '5', true),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '190', 'W', 'LIGHT-MEDIUM', true, '5', true),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '200', 'C', 'LIGHT-MEDIUM', true, '6', true),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '235', 'W', 'LIGHT-MEDIUM', true, '8', true),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '350', 'C', 'MEDIUM-DEEP', true, '15', true),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '385', 'N', 'MEDIUM-DEEP', true, '17', true),
    ((SELECT id FROM products WHERE name LIKE 'Soft%lit%'), '420', 'W', 'MEDIUM-DEEP', true, '20', true); 