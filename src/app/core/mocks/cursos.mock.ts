import { Curso } from '../models/curso.model';

export const CURSOS_MOCK: Curso[] = [
  {
    id: 1,
    nombre: 'Angular Inicial',
    descripcion: 'Curso básico de Angular',
    duracion: '8 semanas',
    fechaInicio: '2025-02-01',
    fechaFin: '2025-04-01'
  },
  {
    id: 2,
    nombre: 'React Avanzado',
    descripcion: 'Hooks, Context API, Router',
    duracion: '6 semanas',
    fechaInicio: '2025-03-15',
    fechaFin: '2025-05-01'
  }
];
