export interface IDivision {
  id?: number;
  name: string;
  department_id: number;
}

export interface IDivisionField {
  fieldId?: number;
  division_id: string;
  name: string;
  type: string;
  isDisplay: boolean;
}
