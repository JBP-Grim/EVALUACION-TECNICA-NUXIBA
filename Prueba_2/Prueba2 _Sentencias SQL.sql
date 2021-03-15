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

select * from logDial where tipoDeLlamada = 'Cel LD' and month(fechaDeLlamada)=2;

select AVG(tiempoDialogo) from logDial where tipoDeLlamada = 'Cel LD' and month(fechaDeLlamada)=2;

select TIME_TO_SEC(logDial.tiempoDialogo)/60, costos.costo * logDial.tiempoDialogo/60 from logDial, costos where month(fechaDeLlamada)=1;