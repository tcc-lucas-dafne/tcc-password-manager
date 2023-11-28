type Login = {
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