CREATE TABLE smashtrak.Match (
	id INT NOT NULL AUTO_INCREMENT,
	winner INT NOT NULL,
	loser INT NOT NULL,
	tournament INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	createdBy INT,
	updatedAt DATETIME,
	updatedBy INT,
	deletedAt DATETIME,
	CONSTRAINT PK_MATCH PRIMARY KEY (id)
)
