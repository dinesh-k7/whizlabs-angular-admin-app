export interface IUser {
  id?: number;
  username: string;
  department_id?: string;
  password: string;
  created_at?: Date;
  active?: boolean;
  department_name?: string;
}

export interface IDepartment {
  id?: number;
  name: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
