/* eslint-disable @typescript-eslint/no-unused-vars */
import 'mocha';
import { expect } from 'chai';
import { Carta, Color, Tipo, Rareza, ImprimirConColor } from '../src/carta.js';
import { ColeccionCartas } from '../src/coleccion.js';
import { EventEmitterSocket } from '../src/servidor.js';
import net from 'net';


describe ('Carta tests', () => {
  it ('crear carta', () => {
    const carta = new Carta(666, 'Test', 50, "Blanco" as Color, 'Instantaneo' as Tipo, 'Comun' as Rareza, 'textoooo', 600);
    expect(carta.id).to.be.equal(666);
    expect(carta.nombre).to.be.equal('Test');
    expect(carta.costeMana).to.be.equal(50);
    expect(carta.color).to.be.equal('Blanco');
    expect(carta.tipo).to.be.equal('Instantaneo');
    expect(carta.rareza).to.be.equal('Comun');
    expect(carta.textoReglas).to.be.equal('textoooo');
    expect(carta.valorMercado).to.be.equal(600);
  });
  
  it('crear carta', () => {
    const carta = new Carta(123, 'Carta de ejemplo', 4, "Azul" as Color, 'Criatura' as Tipo, 'Rara' as Rareza, 'Texto de reglas', 10);
    expect(carta.id).to.equal(123);
    expect(carta.nombre).to.equal('Carta de ejemplo');
    expect(carta.costeMana).to.equal(4);
    expect(carta.color).to.equal('Azul');
    expect(carta.tipo).to.equal('Criatura');
    expect(carta.rareza).to.equal('Rara');
    expect(carta.textoReglas).to.equal('Texto de reglas');
    expect(carta.valorMercado).to.equal(10);
  });

  it('crear carta con fuerza y resistencia', () => {
    const carta = new Carta(456, 'Criatura poderosa', 5, "Rojo" as Color, 'Criatura' as Tipo, 'Mítica' as Rareza, 'Otra regla aquí', 20, [5, 5]);
    expect(carta.id).to.equal(456);
    expect(carta.nombre).to.equal('Criatura poderosa');
    expect(carta.costeMana).to.equal(5);
    expect(carta.color).to.equal('Rojo');
    expect(carta.tipo).to.equal('Criatura');
    expect(carta.rareza).to.equal('Mítica');
    expect(carta.textoReglas).to.equal('Otra regla aquí');
    expect(carta.valorMercado).to.equal(20);
    expect(carta.fuerzaResistencia).to.deep.equal([5, 5]);
  });

  it('crear carta de planeswalker', () => {
    const carta = new Carta(789, 'Planeswalker épico', 6, "Verde" as Color, 'Planeswalker' as Tipo, 'Rara' as Rareza, 'Texto de reglas especial', 30, undefined, 4);
    expect(carta.id).to.equal(789);
    expect(carta.nombre).to.equal('Planeswalker épico');
    expect(carta.costeMana).to.equal(6);
    expect(carta.color).to.equal('Verde');
    expect(carta.tipo).to.equal('Planeswalker');
    expect(carta.rareza).to.equal('Rara');
    expect(carta.textoReglas).to.equal('Texto de reglas especial');
    expect(carta.valorMercado).to.equal(30);
    expect(carta.marcasLealtad).to.equal(4);
  });

  it('crear carta con valores válidos', () => {
    const carta = new Carta(789, 'Carta de ejemplo', 3, "Rojo" as Color, 'Encantamiento' as Tipo, 'Poco común' as Rareza, 'Texto de reglas para el encantamiento', 15);
    expect(carta.id).to.equal(789);
    expect(carta.nombre).to.equal('Carta de ejemplo');
    expect(carta.costeMana).to.equal(3);
    expect(carta.color).to.equal('Rojo');
    expect(carta.tipo).to.equal('Encantamiento');
    expect(carta.rareza).to.equal('Poco común');
    expect(carta.textoReglas).to.equal('Texto de reglas para el encantamiento');
    expect(carta.valorMercado).to.equal(15);
  });

  it('crear carta con texto de reglas vacío', () => {
    const carta = new Carta(101, 'Carta sin reglas', 2, "Verde" as Color, 'Criatura' as Tipo, 'Común' as Rareza, '', 5);
    expect(carta.id).to.equal(101);
    expect(carta.nombre).to.equal('Carta sin reglas');
    expect(carta.costeMana).to.equal(2);
    expect(carta.color).to.equal('Verde');
    expect(carta.tipo).to.equal('Criatura');
    expect(carta.rareza).to.equal('Común');
    expect(carta.textoReglas).to.equal('');
    expect(carta.valorMercado).to.equal(5);
  });

  it('crear carta multicolor con fuerza y resistencia', () => {
    const carta = new Carta(202, 'Bestia Multicolor', 4, "Multicolor" as Color, 'Criatura' as Tipo, 'Rara' as Rareza, 'Texto de reglas para la bestia multicolor', 25, [4, 4]);
    expect(carta.id).to.equal(202);
    expect(carta.nombre).to.equal('Bestia Multicolor');
    expect(carta.costeMana).to.equal(4);
    expect(carta.color).to.equal('Multicolor');
    expect(carta.tipo).to.equal('Criatura');
    expect(carta.rareza).to.equal('Rara');
    expect(carta.textoReglas).to.equal('Texto de reglas para la bestia multicolor');
    expect(carta.valorMercado).to.equal(25);
    expect(carta.fuerzaResistencia).to.deep.equal([4, 4]);
  });

  it('crear carta de criatura con marcas de lealtad', () => {
    const carta = new Carta(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
    expect(carta.id).to.equal(303);
    expect(carta.nombre).to.equal('Planewalker Aliado');
    expect(carta.costeMana).to.equal(5);
    expect(carta.color).to.equal('Blanco');
    expect(carta.tipo).to.equal('Planeswalker');
    expect(carta.rareza).to.equal('Mítica');
    expect(carta.textoReglas).to.equal('Texto de reglas para el planeswalker aliado');
    expect(carta.valorMercado).to.equal(50);
    expect(carta.marcasLealtad).to.equal(5);
  });

  it('imprimir con color', () => {
    const carta = `{
      "id": 2,
      "nombre": "Arcangel",
      "costeMana": 1,
      "color": "Multicolor",
      "tipo": "Tierra",
      "rareza": "Comun",
      "textoReglas": "La maravilla",
      "valorMercado": 5
    }`
    ImprimirConColor(carta);
  });
});

describe ('Colección test', () => {
  const coleccion = new ColeccionCartas();
  const usuario = `leandro`
  it('agregar carta a colección', (done) => {
    const carta = new Carta(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
    coleccion.agregarCarta(carta, usuario, (error, mensaje) => {
      expect(error).to.be.undefined;
      expect(mensaje).to.equal(`Nueva carta añadida a la colección de ${usuario}!`);
      done();
    });
  });
  it('agregar carta existente a colección', (done) => {
    const carta = new Carta(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
    coleccion.agregarCarta(carta, usuario, (error, mensaje) => {
      expect(error).to.not.be.undefined;
      done();
    });
  });
  it('actualizar carta de una colección', (done) => {
    const carta = new Carta(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
    coleccion.actualizarCarta(carta, usuario, (error, mensaje) => {
      expect(error).to.be.undefined;
      expect(mensaje).to.equal(`Carta actualizada en la colección de ${usuario}!`);
      done();
    });
  });
  it('actualizar carta no existente de una colección', (done) => {
    const carta = new Carta(304, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
    coleccion.actualizarCarta(carta, usuario, (error, mensaje) => {
      expect(error).to.not.be.undefined;
      done();
    });
  });
  it('eliminar una carta de una colección', (done) => {
    coleccion.eliminarCarta(303, usuario, (error, mensaje) => {
      expect(error).to.be.undefined;
      expect(mensaje).to.equal(`Carta eliminada de la colección de ${usuario}!`);
      done();
    });
  });
  it('eliminar una crata no existente de una colección', (done) => {
    coleccion.eliminarCarta(304, usuario, (error, mensaje) => {
      expect(error).to.not.be.undefined;
      done();
    });
  });
  it('mostrar colección', (done) => {
    coleccion.listarCartas(usuario, (error, mensaje) => {
      expect(error).to.be.undefined;
      expect(mensaje).to.not.be.undefined;
      done();
    });
  });
  it('mostrar colección inexistente', (done) => {
    coleccion.listarCartas(`anuel`, (error, mensaje) => {
      expect(error).to.not.be.undefined;
      done();
    });
  });
  it('mostrar carta de una colección', (done) => {
    coleccion.mostrarCarta(1, usuario, (error, mensaje) => {
      expect(error).to.be.undefined;
      expect(mensaje).to.not.be.undefined;
      done();
    });
  });
  it('mostrar carta inexistente de una colección', (done) => {
    coleccion.mostrarCarta(27, usuario, (error, mensaje) => {
      expect(error).to.not.be.undefined;
      done();
    });
  });
});

describe ('Servidor test', () => {
  it('servidor', () => {
    const server = net.createServer((connection) => {
      const serverSocket = new EventEmitterSocket(connection);
    });
  });
});

