import { ColeccionCartas } from './coleccion.js';
import { Carta } from './carta.js';
import { EventEmitter } from 'events';
import net from 'net';

/**
 * Clase que extiende EventEmitter para manejar eventos de socket.
 */
export class EventEmitterSocket extends EventEmitter {
   /**
   * Constructor de la clase EventEmitterSocket.
   * @param connection La conexión EventEmitter asociada.
   */
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      if (wholeData.includes('FIN"}')) {
        this.emit('peticion', JSON.parse(wholeData), connection);
      }
    });

    connection.on('close', () => {
      this.emit('close');
    });
  }
}

const coleccion = new ColeccionCartas();

const server = net.createServer((connection) => {
  console.log('Un cliente se ha conectado.');

  const serverSocket = new EventEmitterSocket(connection);

  serverSocket.on('peticion', (peticion, connection) => {
    let carta: Carta;
    if (peticion.accion === 'añadir' || peticion.accion === 'actualizar') {
      carta = new Carta (
        peticion.carta.id,
        peticion.carta.nombre,
        peticion.carta.costeMana,
        peticion.carta.color,
        peticion.carta.tipo,
        peticion.carta.rareza,
        peticion.carta.textoReglas,
        peticion.carta.valorMercado,
        peticion.carta.fuerzaResistencia,
        peticion.carta.marcasLealtad,
      );
    }

    console.log('Solicitud recibida: ', peticion.accion);
    switch (peticion.accion) {
      case 'añadir':
        coleccion.agregarCarta( carta!, peticion.usuario, (error, resultado) => {
          if (error) {
            connection.write(JSON.stringify({ tipo: 'Error', respuesta: error }));
          } else {
            connection.write(JSON.stringify({ tipo: 'Success', respuesta: resultado }));
          }
          connection.end();
        });
        break;
      case 'actualizar':
        coleccion.actualizarCarta( carta!, peticion.usuario, (error, resultado) => {
          if (error) {
            connection.write(JSON.stringify({ tipo: 'Error', respuesta: error }));
          } else {
            connection.write(JSON.stringify({ tipo: 'Success', respuesta: resultado }));
          }
          connection.end();
        });
        break;
      case 'eliminar':
        coleccion.eliminarCarta(peticion.id, peticion.usuario, (error, resultado) => {
          if (error) {
            connection.write(JSON.stringify({ tipo: 'Error', respuesta: error }));
          } else {
            connection.write(JSON.stringify({ tipo: 'Success', respuesta: resultado }));
          }
          connection.end();
        });
        break;
      case 'listar':
        coleccion.listarCartas(peticion.usuario, (error, resultado) => {
          if (error) {
            connection.write(JSON.stringify({ tipo: 'Error', respuesta: error }));
          } else {
            connection.write(JSON.stringify({ tipo: 'SuccessCartas', respuesta: resultado }));
          }
          connection.end();
        });
        break;
      case 'mostrar':
        coleccion.mostrarCarta(peticion.id, peticion.usuario, (error, resultado) => {
          if (error) {
            connection.write(JSON.stringify({ tipo: 'Error', respuesta: error }));
          } else {
            connection.write(JSON.stringify({ tipo: 'SuccessCarta', respuesta: resultado }));
          }
          connection.end();
        });
        break;
      default:
        connection.write(console.log('Accion invalida'));
        connection.end();
    }
  });

  serverSocket.on('close', () => {
    console.log('Un cliente se ha desconectado');
  });
});

server.listen(60300, () => {
  console.log('Esperando que los clientes se conecten.');
});