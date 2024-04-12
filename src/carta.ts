import chalk from 'chalk';

/**
 * Enumeración que representa los colores de las cartas.
 */
export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

/**
 * Enumeración que representa los tipos de las cartas.
 */
export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración que representa las rarezas de las cartas.
 */
export enum Rareza {
  Comun = "Comun",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mitica"
}

/**
 * Clase que representa una carta del juego.
 */
export class Carta {
  /**
   * Constructor de la clase Carta.
   * @param id El ID de la carta.
   * @param nombre El nombre de la carta.
   * @param costeMana El coste de mana de la carta.
   * @param color El color de la carta.
   * @param tipo El tipo de la carta.
   * @param rareza La rareza de la carta.
   * @param textoReglas El texto de reglas de la carta.
   * @param valorMercado El valor de mercado de la carta.
   * @param fuerzaResistencia (Opcional) La fuerza y resistencia de la carta (solo para criaturas).
   * @param marcasLealtad (Opcional) Las marcas de lealtad de la carta (solo para planeswalkers).
   */
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

/**
 * Imprime la información de una carta con color.
 * @param carta La información de la carta en formato JSON.
 */
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