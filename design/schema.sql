CREATE TABLE user (
  id INT(10) UNSIGNED NOT NULL auto_increment,
  name VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(128) NOT NULL UNIQUE,
  password BINARY(32) NOT NULL,
  role VARCHAR(8) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into user(name,email,password, role) values ('dave','dave@abc.com','1234', 'user');
insert into user(name,email,password, role) values ('admin','admin@abc.com','1234', 'admin');

CREATE TABLE customer (
  id INT(10) UNSIGNED NOT NULL auto_increment,
  name VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(64),
  phone VARCHAR(32),
  address VARCHAR(128),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
