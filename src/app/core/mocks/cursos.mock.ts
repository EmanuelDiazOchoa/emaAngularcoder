import { Curso } from '../models/curso.model';

export const CURSOS_MOCK: Curso[] = [
  {
    id: 1,
    nombre: 'Angular Inicial',
    descripcion: 'Curso básico de Angular',
    duracion: '8 semanas',
    fechaInicio: '2024-01-01',
    fechaFin: '2024-02-26'
  },
  {
    id: 2,
    nombre: 'React Avanzado',
    descripcion: 'Hooks, Context API, Router',
    duracion: '6 semanas',
    fechaInicio: '2024-03-01',
    fechaFin: '2024-04-12'
  }
];
