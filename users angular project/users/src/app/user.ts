export interface User {
  id: number,
  name: string,
  email: string,
  gender?:string,
  status?: string
}

export interface Formdata {
  email: string,
  password: string
}
