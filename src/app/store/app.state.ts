import { AuthState } from './auth/auth.models';
import { AlumnosState } from './alumnos/alumnos.reducer';
import { CursosState } from './cursos/cursos.reducer';
import { InscripcionesState } from './inscripciones/inscripciones.reducer';
import { UsuariosState } from './usuarios/usuarios.reducer';

export interface AppState {
  auth: AuthState;
  alumnos: AlumnosState;
  cursos: CursosState;
  inscripciones: InscripcionesState;
  usuarios: UsuariosState;
}
