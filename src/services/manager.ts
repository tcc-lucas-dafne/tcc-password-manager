import { API } from "./index";

function getSiteCredentials(id: string) {
  try {
    return API.get(`/credential/${id}`)
  } catch (err) {
    console.error("getSiteCredentials: ", err);
    throw err;
  }
};

function storeSiteCredentials(data: CreateSiteCredential) {
  try {
    return API.post("/credential", data)
  } catch (err) {
    console.error("storeSiteCredentials: ", err);
    throw err;
  }
}

const ManagerServices = {
  getSiteCredentials,
  storeSiteCredentials
}

export default ManagerServices;