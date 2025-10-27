-- Database schema for the practice project
-- Run this script to create the required tables

-- Create the name_data table
CREATE TABLE IF NOT EXISTS name_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO name_data (name) VALUES 
    ('Sample Item 1'),
    ('Sample Item 2'),
    ('Sample Item 3')
ON CONFLICT DO NOTHING;
