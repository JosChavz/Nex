DELETE FROM users;
DELETE FROM skills;

-- Users
INSERT INTO users (name, email, password, role, state) VALUES ('admin', 'admin@email.com', 'admin', 'Admin', 'Active');
INSERT INTO users (name, email, password, role, state) VALUES ('user', 'user@email.com', 'user', 'User', 'Active');
INSERT INTO users (name, email, password, role, state) VALUES ('moderator', 'moderator@email.com', 'moderator', 'Moderator', 'Active');
INSERT INTO users (name, email, password, role, state) VALUES ('nobody', 'nobody@email.com', 'nobody', 'User', 'Inactive');
INSERT INTO users (name, email, password, role, state) VALUES ('onboarding', 'onboarding@email.com', 'onboarding', 'User', 'Onboarding');

-- Skills
INSERT INTO skills (name) VALUES ('Management');
INSERT INTO skills (name) VALUES ('Communication');
INSERT INTO skills (name) VALUES ('Customer Service');
INSERT INTO skills (name) VALUES ('Leadership');
INSERT INTO skills (name) VALUES ('Sales');
INSERT INTO skills (name) VALUES ('Project Management');
INSERT INTO skills (name) VALUES ('Research');
INSERT INTO skills (name) VALUES ('Analytical Skills');
INSERT INTO skills (name) VALUES ('Marketing');
INSERT INTO skills (name) VALUES ('Teamwork');
INSERT INTO skills (name) VALUES ('Software Development');
INSERT INTO skills (name) VALUES ('SQL');
INSERT INTO skills (name) VALUES ('Finance');
INSERT INTO skills (name) VALUES ('Python');
INSERT INTO skills (name) VALUES ('Java');
INSERT INTO skills (name) VALUES ('Data Analysis');
INSERT INTO skills (name) VALUES ('JavaScript');
INSERT INTO skills (name) VALUES ('Cloud Computing');
INSERT INTO skills (name) VALUES ('Operations');
INSERT INTO skills (name) VALUES ('Customer Relationship Management');
INSERT INTO skills (name) VALUES ('Security');

