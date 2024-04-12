# Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic
# Leandro Armas

<p align="center">
  <a href="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-LeandroArmas/actions/workflows/node.js.yml">
    <img alt="Tests badge" src="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-LeandroArmas/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-LeandroArmas/actions/workflows/coveralls.yml">
    <img alt="Coveralls badge" src="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-LeandroArmas/actions/workflows/coveralls.yml/badge.svg">
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-LeandroArmas">
    <img alt="Sonar badge" src="https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-LeandroArmas&metric=alert_status">
  </a>
</p>

## Índice

- [Introducción](#introducción)
- [Antes de comenzar](#antes-de-comenzar)
- [Desarrollo de la aplicación](#desarrollo-de-la-aplicación)
- [Modificación](#modificación)
- [Conclusión y Aprendizajes](#conclusión-y-aprendizajes)

## Introducción

En esta práctica, hemos desarrollado una aplicación de gestión de cartas utilizando Node.js y TypeScript. 
La aplicación permite a los usuarios agregar, actualizar, eliminar, listar y mostrar información sobre cartas Magic. 
Además, la comunicación entre el cliente y el servidor se realiza a través de sockets TCP.

## Antes de comenzar
En esta práctica, hermos utilizado varios paquetes de npm para facilitar el desarrollo y las pruebas de nuestra aplicación. A continuación, se detallan los paquetes utilizados y cómo instalarlos:

`chalk`: Este paquete nos permite dar formato al texto en la consola utilizando colores. Lo utilizamos para resaltar la salida de nuestra aplicación.

```
npm install chalk
```

`yargs`: Yargs nos ayuda a construir interfaces de línea de comandos interactivas al analizar argumentos y opciones. Lo utilizamos para manejar los argumentos de línea de comandos de nuestra aplicación.

```
npm install yargs
```

`net`: Net es un módulo incorporado en Node.js que proporciona funciones de red. Lo utilizamos para establecer conexiones de socket TCP entre el servidor y los clientes.

```
npm install net
```

`mocha y chai`: Estos paquetes se utilizan en conjunto para realizar pruebas unitarias en Node.js. Mocha es un marco de pruebas y chai es una biblioteca de aserciones. Los utilizaremos para escribir y ejecutar nuestras pruebas.

```
npm install mocha chai --save-dev
```

Una vez instaladoa estos paquetes, estámos listo para comenzar con el desarrollo de la aplicación y las pruebas.

## Desarrollo de la aplicación

El proyecto consta de varios archivos y módulos que trabajan juntos para proporcionar la funcionalidad deseada. 
A continuación, se describe detalladamente cada componente del proyecto:

### 1. `carta.js`

Este archivo define la clase `Carta`, que representa una carta de juego con propiedades como ID, nombre, coste de maná, color, tipo, rareza, texto de reglas, valor de mercado, entre otras. 
```typescript
export class Carta {
  constructor(
    public id: number,
    public nombre: string,
    public costeMana: number,
    public color: Color,
    public tipo: Tipo,
    public rareza: Rareza,
    public textoReglas: string,
    public valorMercado: number,
    public fuerzaResistencia?: [number, number],
    public marcasLealtad?: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.costeMana = costeMana;
    this.color = color;
    this.tipo = tipo;
    this.rareza = rareza;
    this.textoReglas = textoReglas;
    this.valorMercado = valorMercado;
    if (tipo === Tipo.Criatura) {
      this.fuerzaResistencia = fuerzaResistencia;
    }
    if (tipo === Tipo.Planeswalker) {
      this.marcasLealtad = marcasLealtad;
    }
  }
}
```
Además, define enumeraciones para los colores, tipos y rarezas de las cartas.
```typescript
export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}
Por último se implementa la función ``
export enum Rareza {
  Comun = "Comun",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mitica"
}
```
Por último se implpemengta la función ImprimirConColor que imprime una carta en formato JSON con el correspondiente color.
```typescript
export function ImprimirConColor(carta: string): void {
  const CartaJson = JSON.parse(carta);
  let resultado = '';
  resultado += `ID: ${CartaJson.id}\n`;
  resultado += `Nombre: ${CartaJson.nombre}\n`;
  resultado += `Coste de maná: ${CartaJson.costeMana}\n`;
  resultado += `Color: ${CartaJson.color}\n`;
  resultado += `Linea de tipo: ${CartaJson.tipo}\n`;
  resultado += `Rareza: ${CartaJson.rareza}\n`;
  resultado += `Texto de reglas: ${CartaJson.textoReglas}\n`;
  if (CartaJson.tipo === 'Criatura') {
    resultado += `Fuerza/Resistencia: ${CartaJson.fuerzaResistencia}\n`;
  }
  if (CartaJson.tipo === 'Planeswalker') {
    resultado += `Marcas de lealtad: ${CartaJson.marcasLealtad}\n`;
  }
  resultado += `Valor de mercado: ${CartaJson.valorMercado}\n`;

  switch (CartaJson.color) {
    case 'Blanco':
      console.log(chalk.white(resultado));
      break;
    case 'Azul':
      console.log(chalk.blue(resultado));
      break;
    case 'Negro':
      console.log(chalk.black(resultado));
      break;
    case 'Rojo':
      console.log(chalk.red(resultado));
      break;
    case 'Verde':
      console.log(chalk.green(resultado));
      break;
    case 'Incoloro':
      console.log(chalk.gray(resultado));
      break;
    case 'Multicolor':
      console.log(chalk.magenta(resultado));
      break;
    default:
      console.log(chalk.magenta(resultado));

      console.log(chalk.red('No se reconoce el color!'));
      break;
  }
}
```

### 2. `coleccion.js`

En este archivo, se encuentra la clase `ColeccionCartas`, que representa la colección de cartas de un usuario. 
Esta clase proporciona métodos para agregar, actualizar, eliminar, listar y mostrar información sobre las cartas de la colección.
```typescript
export class ColeccionCartas {
	private coleccion: Carta[] = [];

	/**
   * Agrega una nueva carta a la colección.
   * @param carta La carta a agregar.
   * @param usuario El nombre del usuario.
   * @param callback Función de retorno que maneja errores y mensajes de éxito.
   */
	public agregarCarta(carta: Carta, usuario: string, 
		callback: (error: string | undefined, mensaje?: string) => void): void {

		const DirectorioUsuario = `./cartas/${usuario}`;
    const RutaCarta = `${DirectorioUsuario}/${carta.id}.json`;
		
    if (!fs.existsSync(DirectorioUsuario)) {
      fs.mkdirSync(DirectorioUsuario, { recursive: true });
    }

    if (fs.existsSync(RutaCarta)) {
      callback(`La carta ya existe en la colección de ${usuario}!`);
    } else {
      fs.writeFile(RutaCarta, JSON.stringify(carta, null, 2), (err) => {
        if (err) {
          callback(err.message);
        } else {
          callback(undefined, `Nueva carta añadida a la colección de ${usuario}!`);
        }
      });
    }

	}

	/**
   * Actualiza una carta existente en la colección.
   * @param carta La carta actualizada.
   * @param usuario El nombre del usuario.
   * @param callback Función de retorno que maneja errores y mensajes de éxito.
   */
  public actualizarCarta(carta: Carta, usuario: string, 
		callback: (error: string | undefined, mensaje?: string) => void): void {

    const DirectorioUsuario = `./cartas/${usuario}`;
    const RutaCarta = `${DirectorioUsuario}/${carta.id}.json`;

    if (!fs.existsSync(RutaCarta)) {
      callback(`La carta no existe en la colección de ${usuario}!`);
    } else {
      fs.writeFile(RutaCarta, JSON.stringify(carta, null, 2), (err) => {
        if (err) {
          callback(err.message);
        } else {
          callback(undefined, `Carta actualizada en la colección de ${usuario}!`);
        }
      });
    }
  }

  /**
   * Elimina una carta de la colección.
   * @param id El ID de la carta a eliminar.
   * @param usuario El nombre del usuario.
   * @param callback Función de retorno que maneja errores y mensajes de éxito.
   */
  public eliminarCarta(id: number, usuario: string, 
		callback: (error: string | undefined, mensaje?: string) => void): void {

    const DirectorioUsuario = `./cartas/${usuario}`;
    const RutaCarta = `${DirectorioUsuario}/${id}.json`;

    if (!fs.existsSync(RutaCarta)) {
      callback(`La carta no existe en la colección de ${usuario}!`);
    } else {
      fs.unlink(RutaCarta, (err) => {
        if (err) {
          callback(err.message);
        } else {
          callback(undefined, `Carta eliminada de la colección de ${usuario}!`);
        }
      });
    }
  }

	/**
   * Lista todas las cartas en la colección de un usuario.
   * @param usuario El nombre del usuario.
   * @param callback Función de retorno que maneja errores y mensajes de éxito.
   */
  public listarCartas(usuario: string, 
		callback: (error: string | undefined, mensaje?: string) => void): void {

    const DirectorioUsuario = `./cartas/${usuario}`;

    if (!fs.existsSync(DirectorioUsuario)) {
      callback(`${usuario} no tiene una colección de cartas`);
    } else {
      fs.readdir(DirectorioUsuario, (err, archivos) => {
        if (err) {
          callback(err.message);
        } else {
          const coleccion: string[] = [];
          archivos.forEach((archivo) => {
            const carta = fs.readFileSync(`${DirectorioUsuario}/${archivo}`).toString();
            coleccion.push(carta);
          });
          callback(undefined, JSON.stringify(coleccion));
        }
      });
    }
  }

	/**
   * Muestra la información de una carta específica en la colección de un usuario.
   * @param id El ID de la carta a mostrar.
   * @param usuario El nombre del usuario.
   * @param callback Función de retorno que maneja errores y mensajes de éxito.
   */
	public mostrarCarta(id: number, usuario: string, 
		callback: (error: string | undefined, mensaje?: string) => void): void {

    const DirectorioUsuario = `./cartas/${usuario}`;
    const RutaCarta = `${DirectorioUsuario}/${id}.json`;

    if (!fs.existsSync(RutaCarta)) {
      callback(`Carta no encontrada en la colección de ${usuario}`);
    } else {
      fs.readFile(RutaCarta, (err, data) => {
        if (err) {
          callback(err.message);
        } else {
          callback(undefined, JSON.stringify(data.toString()));
        }
      });
    }
  }
}
```

### 3. `cliente.js`

El archivo `cliente.js` contiene el código del cliente de la aplicación, que se comunica con el servidor a través de sockets TCP. 
Utiliza el módulo `yargs` para analizar los argumentos de la línea de comandos y ejecutar las operaciones requeridas, como agregar, actualizar, eliminar, listar y mostrar cartas.

```typescript
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
  console.log('Recibido del servidor:\n');
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
```

### 4. `servidor.js`

En este archivo, se encuentra la clase `eventEmitterSocket` define la clase `EventEmitterSocket`, que extiende la clase `EventEmitter` y maneja la recepción de datos a través de sockets TCP. Esta clase emite eventos cuando se completa la recepción de datos o se cierra la conexión.Utiliza el módulo `events` para extender la clase `EventEmitter` y manejar eventos.

```typescript
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
```
También se encuentra el código del servidor de la aplicación, que espera conexiones de clientes y maneja las solicitudes de operaciones de cartas. 
Utiliza el módulo `net` para crear un servidor TCP.
```typescript
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
```
## Modificación

En esta sección, se describe la modificación realizada para desarrollar una aplicación cliente-servidor que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero es un parámetro pasado al cliente desde la línea de comandos.

### Descripción de la Modificación

Para llevar a cabo esta modificación, se implementó una aplicación cliente-servidor utilizando Node.js y el módulo `net` para la comunicación entre ellos a través de sockets TCP. La funcionalidad de la aplicación se basa en dos enfoques diferentes:

1. **Uso del Método Pipe de un Stream**: Este enfoque implica redirigir la salida de un comando (como `cat`) hacia otro (como `wc`). Se utilizó el método `child_process.spawn()` para ejecutar los comandos de forma independiente y se estableció una tubería (`pipe`) entre ellos para transmitir los datos de salida del primer comando como entrada al segundo.

2. **Creación de Subprocesos sin Uso del Método Pipe**: En este enfoque, se crean los subprocesos necesarios para ambos comandos (como `cat` y `wc`) utilizando `child_process.spawn()`. Luego, se registraron manejadores de eventos para capturar los datos de salida de `cat` y enviarlos como entrada a `wc`. Esta opción proporciona un mayor control sobre la comunicación entre los procesos.

### Procesamiento Defensivo

Para garantizar un comportamiento robusto y prevenir posibles errores, se implementaron controles defensivos en la aplicación:

- Se verificó si la ruta del fichero proporcionada desde la línea de comandos existe y es válida antes de intentar acceder al contenido del fichero.
- Se manejaron los casos de errores potenciales, como ficheros no encontrados o opciones inválidas, mostrando mensajes informativos al usuario y finalizando adecuadamente la ejecución de la aplicación.

### Enlace al Repositorio GitHub

La implementación de esta modificación se encuentra disponible en el siguiente repositorio GitHub: [p10_LeandroArmas_PE101](https://github.com/LeandroArmas/p10_LeandroArmas_PE101)

Esta modificación permite a los usuarios obtener información sobre la cantidad de líneas, palabras y caracteres en un fichero de texto de manera eficiente y segura, utilizando una aplicación cliente-servidor desarrollada en Node.js.

## Conclusión y Aprendizajes

Durante el desarrollo de esta práctica, se ha adquirido una comprensión más profunda de la programación en Node.js y TypeScript, así como de los conceptos fundamentales de comunicación entre procesos a través de sockets TCP. Algunos de los aspectos destacados y aprendizajes clave de esta experiencia incluyen:

### Dominio de Node.js y TypeScript

Al trabajar en esta práctica, se ha consolidado el conocimiento sobre el entorno de ejecución de Node.js y cómo se puede utilizar para crear aplicaciones del lado del servidor de alto rendimiento. Además, se ha profundizado en el uso de TypeScript para agregar tipado estático a nuestro código, lo que ha facilitado la detección de errores y la escritura de código más robusto y mantenible.

### Comunicación Cliente-Servidor

La implementación de la comunicación entre cliente y servidor a través de sockets TCP ha proporcionado una comprensión más sólida de cómo se establece y gestiona la comunicación entre procesos en entornos distribuidos. Esto ha implicado aprender a configurar y administrar conexiones TCP, así como a manejar eventos y datos transmitidos entre el cliente y el servidor de manera eficiente.

### Manejo de Eventos y Asincronía

Se ha mejorado la habilidad para trabajar con eventos y callbacks en entornos asincrónicos, lo que ha sido fundamental para garantizar un flujo de ejecución fluido y eficiente en la aplicación. El uso de eventos ha permitido gestionar de manera efectiva la llegada de datos del cliente al servidor y viceversa, así como responder a ellos de manera apropiada.

### Pruebas y Depuración

La práctica también ha brindado la oportunidad de profundizar en las técnicas de prueba y depuración de aplicaciones en Node.js. Se ha aprendido a escribir pruebas unitarias con Mocha y Chai para verificar el comportamiento esperado de las funciones, así como a utilizar herramientas de depuración para identificar y corregir errores en el código.

### Desarrollo Defensivo y Control de Errores

Se ha enfatizado la importancia del desarrollo defensivo y el manejo adecuado de errores en la construcción de aplicaciones robustas y confiables. Se han implementado controles defensivos para validar entradas de usuario, manejar casos de error y garantizar un comportamiento predecible y seguro en la aplicación.

En resumen, esta práctica ha sido una oportunidad valiosa para aplicar y reforzar los conocimientos adquiridos en el desarrollo de aplicaciones web con Node.js y TypeScript, así como para adquirir nuevas habilidades en el manejo de comunicaciones entre procesos y el desarrollo defensivo de software. Estos aprendizajes serán de gran utilidad en futuros proyectos y en el desarrollo de aplicaciones más complejas en el futuro.

## Referencias

- [Documentación de events](https://nodejs.org/docs/latest/api/events.html)
- [Documentación de fs](https://nodejs.org/docs/latest/api/fs.html)
- [Documentación de net](https://nodejs.org/docs/latest/api/net.html)
- [Documentación de yargs](https://www.npmjs.com/package/yargs)
- [Documentación de chalk](https://www.npmjs.com/package/chalk)