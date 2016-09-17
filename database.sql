CREATEDB task_list;


CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	description VARCHAR(150),
	status BOOLEAN
);
