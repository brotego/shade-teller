-- Drop existing table if it exists
DROP TABLE IF EXISTS shade_recommendations;

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

-- Enable Row Level Security (RLS)
ALTER TABLE shade_recommendations ENABLE ROW LEVEL SECURITY;

-- Create policy
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