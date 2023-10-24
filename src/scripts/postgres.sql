

CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_HEROIS (NOME, PODER)
VALUES 
    ('Flash', 'Velocidade'),
    ('Homem de ferro', 'Genialidade'),
    ('Homem formiga', 'Ficar pequeno')


UPDATE TB_HEROIS
SET NOME = 'Goku', PODER = 'FODA'
WHERE ID = 1;