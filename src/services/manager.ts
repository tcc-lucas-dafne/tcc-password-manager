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

function deleteCredential(id: number) {
  try {
    return API.delete(`/credential/${id}`);
  } catch (err) {
    console.error("deleteCredential: ", err);
    throw err;
  }
}

const ManagerServices = {
  getSiteCredentials,
  storeSiteCredentials,
  deleteCredential
}

export default ManagerServices;