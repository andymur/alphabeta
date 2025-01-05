-- Таблица ролей пользователей
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- Название роли (e.g., "Developer", "Employer")
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE, -- Логин пользователя
    email VARCHAR(100) NOT NULL UNIQUE,    -- Email пользователя
    password_hash VARCHAR(255) NOT NULL,  -- Хеш пароля
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE, -- Роль пользователя
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица вакансий
CREATE TABLE vacancies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,          -- Название вакансии
    description TEXT NOT NULL,            -- Описание вакансии
    salary_min NUMERIC(10, 2),            -- Минимальная зарплата
    salary_max NUMERIC(10, 2),            -- Максимальная зарплата
    employer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Работодатель
    views_count INT DEFAULT 0,            -- Количество просмотров
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица отзывов и рейтингов
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Соискатель
    vacancy_id INT NOT NULL REFERENCES vacancies(id) ON DELETE CASCADE, -- Вакансия
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5), -- Рейтинг (1-5)
    comment TEXT,                            -- Текст отзыва
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, vacancy_id)             -- Один пользователь может оставить один отзыв на вакансию
);

-- Таблица откликов
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Соискатель
    vacancy_id INT NOT NULL REFERENCES vacancies(id) ON DELETE CASCADE, -- Вакансия
    resume TEXT NOT NULL,                  -- Резюме или сопроводительное письмо
    status VARCHAR(50) DEFAULT 'pending',  -- Статус отклика (pending, accepted, rejected)
    views_count INT DEFAULT 0,             -- Количество просмотров отклика
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица информации о разработчиках
CREATE TABLE developer_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE, -- Связь с пользователем
    city VARCHAR(100) NOT NULL,              -- Город проживания
    languages TEXT NOT NULL,                 -- Знание языков программирования (e.g., JSON: ["Java", "Python"])
    desired_position VARCHAR(100) NOT NULL, -- Желаемая должность (e.g., "Backend Developer")
    specialization VARCHAR(100),            -- Специализация (e.g., "Web Development", "Data Science")
    desired_salary NUMERIC(10, 2),          -- Желаемая зарплата
    employment_type VARCHAR(50) CHECK (employment_type IN ('full-time', 'part-time')), -- Тип занятости
    skills TEXT NOT NULL,                   -- Основные навыки (e.g., JSON: ["Spring Boot", "PostgreSQL", "Docker"])
    about TEXT,                             -- О себе (короткое описание)
    education TEXT,                         -- Образование
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица файлов резюме
CREATE TABLE resume_files (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL REFERENCES developer_profiles(id) ON DELETE CASCADE, -- Связь с профилем разработчика
    file_name VARCHAR(255) NOT NULL,        -- Название файла
    file_path TEXT NOT NULL,                -- Путь к файлу
    file_size BIGINT,                       -- Размер файла в байтах
    uploaded_at TIMESTAMP DEFAULT NOW()     -- Дата загрузки файла
);