type Login = {
  email: string;
  password: string;
}

type Register = {
  email: string;
  password: string;
}

type ResponseError = {
  error: string;
}

type SiteCredentials = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  url?: string;
}

type CreateSiteCredential = SiteCredentials & {
  id: string;
}

type SiteCredential = {
  id: number;
  user_id: number; 
  email: string;
  name: string;
  password: string;
  url?: string;
  username?: string;
}

type User = {
  id: string;
  email: string;
}