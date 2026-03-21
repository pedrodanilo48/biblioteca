export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  priority: 'baixa' | 'media' | 'alta'; // Union Types: limita as opções
  createdAt: Date;
}