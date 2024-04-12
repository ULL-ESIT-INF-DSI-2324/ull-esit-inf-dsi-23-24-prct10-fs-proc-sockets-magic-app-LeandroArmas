/* eslint-disable @typescript-eslint/no-unused-vars */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Carta, Color, Tipo, Rareza, ImprimirConColor } from './carta.js';
import chalk from 'chalk';
import net from 'net';

const cliente = net.connect({ port: 60300 });

  /**
   * Configuración yargs para el comando 'add'.
   */  
  let argv = yargs(hideBin(process.argv))
    .command(
      'add',
      'Añade una carta',
      {
        usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
        id: { description: 'ID de la carta', type: 'number', demandOption: true },
        nombre: { description: 'Nombre de la carta', type: 'string', demandOption: true },
        costeMana: { description: 'Coste de maná de la carta', type: 'number', demandOption: true },
        color: { description: 'Color de la carta', type: 'string', choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor'], demandOption: true },
        tipo: { description: 'Tipo de la carta', type: 'string', choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'], demandOption: true },
        rareza: { description: 'Rareza de la carta', type: 'string', choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], demandOption: true },
        textoReglas: { description: 'Reglas del texto de la carta', type: 'string', demandOption: true },
        fuerzaResistencia: { description: 'Fuerza y resistencia de la carta tipo Criatura', type: 'array', coerce: (arg) => arg.map(Number) },
        marcasLealtad: { description: 'Lealtad de la carta tipo Planeswalker', type: 'number' },
        valorMercado: { description: 'Valor de mercado de la carta', type: 'number', demandOption: true },
      },
      (argv) => {
        if (argv.tipo === 'Criatura' && argv.fuerzaResistencia === undefined) {
          throw new Error('Las criaturas necesitan también un atributo Fuerza/Resistencia');
        }
        if (argv.tipo === 'Planeswalker' && argv.marcasLealtad === undefined) {
          throw new Error('Los Planeswalkers necesitan también un atributo Marcas de Lealtad');
        }
        const carta: Carta = new Carta (
          argv.id,
          argv.nombre,
          argv.costeMana,
          argv.color as Color,
          argv.tipo as Tipo,
          argv.rareza as Rareza,
          argv.textoReglas,
          argv.valorMercado,
          argv.fuerzaResistencia,
          argv.marcasLealtad,
        );
        const info = JSON.stringify({ accion: 'añadir',  carta: carta, usuario: argv.usuario, fin: 'FIN' });
        cliente.write(info);
      },
    )
  .help().argv;

  /**
   * Configuración yargs para el comando 'update'.
   */
  argv = yargs(hideBin(process.argv))
    .command(
      'update',
      'Actualiza una carta',
      {
        usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
        id: { description: 'ID de la carta', type: 'number', demandOption: true },
        nombre: { description: 'Nombre de la carta', type: 'string', demandOption: true },
        costeMana: { description: 'Coste de maná de la carta', type: 'number', demandOption: true },
        color: { description: 'Color de la carta', type: 'string', choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor'], demandOption: true },
        tipo: { description: 'Tipo de la carta', type: 'string', choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'], demandOption: true },
        rareza: { description: 'Rareza de la carta', type: 'string', choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], demandOption: true },
        textoReglas: { description: 'Reglas del texto de la carta', type: 'string', demandOption: true },
        fuerzaResistencia: { description: 'Fuerza y resistencia de la carta tipo Criatura', type: 'array', coerce: (arg) => arg.map(Number) },
        marcasLealtad: { description: 'Lealtad de la carta tipo Planeswalker', type: 'number' },
        valorMercado: { description: 'Valor de mercado de la carta', type: 'number', demandOption: true },
      },
      (argv) => {
        if (argv.tipo === 'Criatura' && argv.fuerzaResistencia === undefined) {
          throw new Error('Las criaturas necesitan también un atributo Fuerza/Resistencia');
        }
        if (argv.tipo === 'Planeswalker' && argv.marcasLealtad === undefined) {
          throw new Error('Los Planeswalkers necesitan también un atributo Marcas de Lealtad');
        }
        const carta: Carta = new Carta (
          argv.id,
          argv.nombre,
          argv.costeMana,
          argv.color as Color,
          argv.tipo as Tipo,
          argv.rareza as Rareza,
          argv.textoReglas,
          argv.valorMercado,
          argv.fuerzaResistencia,
          argv.marcasLealtad,
        );
        const info = JSON.stringify({ accion: 'actualizar',  carta: carta, usuario: argv.usuario, fin: 'FIN' });
        cliente.write(info);
      },
    )
  .help().argv;

  /**
   * Configuración yargs para el comando 'remove'.
   */
  argv = yargs(hideBin(process.argv))
    .command(
      'remove',
      'Elimina una carta',
      {
        usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
        id: { description: 'ID de la carta', type: 'number', demandOption: true },
      },
      (argv) => {
        const info = JSON.stringify({ accion: 'eliminar',  id: argv.id, usuario: argv.usuario, fin: 'FIN' });
        cliente.write(info);
      },
    )
  .help().argv;

  /**
   * Configuración yargs para el comando 'list'.
   */
  argv = yargs(hideBin(process.argv))
    .command(
      'list',
      'Lista las cartas de la coleccion',
      {
        usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
      },
      (argv) => {
        const info = JSON.stringify({ accion: 'listar', usuario: argv.usuario, fin: 'FIN' });
        cliente.write(info);
      },
    )
  .help().argv;

  /**
   * Configuración yargs para el comando 'show'.
   */
  argv = yargs(hideBin(process.argv))
    .command(
      'show',
      'Mostrar la info de una carta',
      {
        usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
        id: { description: 'ID de la carta', type: 'number', demandOption: true },
      },
      (argv) => {
        const info = JSON.stringify({ accion: 'mostrar',  id: argv.id, usuario: argv.usuario, fin: 'FIN' });
        cliente.write(info);
      },
    )
  .help().argv;

  let wholeData = '';
  cliente.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

cliente.on('end', () => {
  const respuesta = JSON.parse(wholeData);
  let receivedData: string[];
  switch (respuesta.tipo) {
    case 'Error':
      console.log(chalk.red(respuesta.respuesta));
      break;
    case 'Success':
      console.log(chalk.green(respuesta.respuesta));
      break;
    case 'SuccessCartas':
      receivedData = JSON.parse(respuesta.respuesta);
      receivedData.forEach((carta: string) => {
        console.log(`--------------------------------`);
        ImprimirConColor(carta);
      });
      console.log(`--------------------------------`);
      break;
    case 'SuccessCarta':
      receivedData = JSON.parse(respuesta.respuesta);
      console.log(`--------------------------------`);
      ImprimirConColor(receivedData.toString());
      console.log(`--------------------------------`);
      break;
  }
});
  
cliente.on('close', () => {
  console.log('Conexion cerrada');
});