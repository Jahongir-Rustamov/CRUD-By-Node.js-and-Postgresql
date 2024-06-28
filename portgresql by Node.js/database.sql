CREATE TABLE job(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(80) NOT NULL
);

CREATE TABLE employer(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name1 VARCHAR(50) NOT NULL,
    job_id BIGINT REFERENCES job(id),
    UNIQUE(job_id)
);