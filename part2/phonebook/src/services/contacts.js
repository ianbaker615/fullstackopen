import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((res) => res.data);
};

// TODO update = (id, newObject) => {...}

const contactService = {
  getAll,
  create,
  // update
};

export default contactService;
