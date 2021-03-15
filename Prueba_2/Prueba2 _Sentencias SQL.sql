Create database Prueba2;

use Prueba2;

create table costos(tipoDeLlamada varchar(15) not null unique Primary Key,
costo decimal(10,4) not null)

create table logDial(
idLlamada varchar(10) not null Primary Key unique,
fechaDeLlamada dateTime not null,
tiempoDialogo smallint not null,
telefono varchar(10) not null,
tipoDeLlamada varchar(15) not null,
Foreign Key(tipoDeLlamada) references costos(tipoDeLLamada)
);

INSERT INTO costos(tipoDeLlamada, costo)
VALUES ("Cel", 0.4),
       ("LD nacional", 0.12),
			 ("Cel LD", 0.5);
			 
INSERT INTO logDial(idLlamada, fechaDeLlamada, tiempoDialogo, telefono, tipoDeLlamada)
VALUES ("197463",'2020-01-01 00:00:00',60,"8000000001","Cel LD"),
			 ("197464","2020-01-02 01:26:45",60,"8000000002","Cel LD"),
			 ("197465","2020-02-03 01:26:45",240,"8000000003","Cel LD"),
			 ("197466","2020-02-04 01:26:45",60,"8000000004","Cel LD"),
			 ("197467","2020-02-05 01:26:45",60,"8000000005","Cel LD"),
			 ("197468","2020-02-06 01:26:45",60,"8000000006","Cel LD"),
			 ("197469","2020-01-07 01:26:45",60,"8000000007","Cel"),
			 ("197470","2020-01-08 01:26:45",120,"8000000008","LD nacional"),
			 ("197471","2020-01-09 01:26:45",60,"8000000009","Cel LD"),
			 ("197472","2020-01-10 01:26:45",60,"8000000010","Cel LD");

select * from logDial where tipoDeLlamada = 'Cel LD' and month(fechaDeLlamada)=2;

select AVG(tiempoDialogo) from logDial where tipoDeLlamada = 'Cel LD' and month(fechaDeLlamada)=2;

select logDial.tiempoDialogo/60 as tiempoDialogoEnMinutos, costos.costo * logDial.tiempoDialogo/60 as CostoLlamada from logDial Left Join costos on logDial.TipoDeLlamada = costos.TipoDeLlamada where month(fechaDeLlamada)=1;