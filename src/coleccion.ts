import * as fs from 'fs';
import { Carta } from './carta.js';

/**
 * Clase que representa una colección de cartas.
 */
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