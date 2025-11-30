export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: string; 
  cantidadClases: number;
  profesor: string;
  fechaInicio?: string;
  fechaFin?: string;
}