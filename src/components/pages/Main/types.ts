export interface IDefect {
  id: string;
  name: string;
  date: string;
  deletedAt?: string;
  photo?: string;
}

export interface ICamera {
  id: string;
  online: boolean;
  title: string;
  uptime: string;
  defects: IDefect[];
  link: string;
  deletedAt?: string;
  maxDefects: number;
}
