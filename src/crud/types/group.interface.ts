export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface GroupDbFields {
  id: string;
  name: string;
  permissions: string[];
}
export interface GroupInput extends GroupDbFields {}
export interface GroupOutput extends GroupDbFields {}
