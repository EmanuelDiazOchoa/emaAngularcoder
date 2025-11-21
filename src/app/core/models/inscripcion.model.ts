// src/app/core/models/inscripcion.model.ts
export interface Inscripcion {
  id: string;                // ID de la inscripción (proporcionado por mockapi)
  alumnoId: string;          // ID del alumno
  cursoId: string;           // ID del curso
  fecha: string;             // Fecha de inscripción
  usuarioId: string;         // ID del usuario que registró la inscripción
}
