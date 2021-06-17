import axios from "axios";
const baseUrl = "/api/contacts";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const contactService = {
  getAll,
  create,
  update,
  remove,
};

export default contactService;
