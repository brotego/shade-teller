-- Add feedback columns to shade_recommendations
ALTER TABLE shade_recommendations
ADD COLUMN feedback_helpful BOOLEAN,
ADD COLUMN feedback_submitted_at TIMESTAMP WITH TIME ZONE; 