//const HOST = "https://whizlabs-node-service.herokuapp.com";
const HOST = "http://localhost:3020";

export const CONSTANT = {
  permissions: {},
  routes: {
    authorization: {
      login: HOST + "/users/admin/login",
      logout: HOST + "/admin/logout",
    },
    user: {
      list: HOST + "/users",
      delete: HOST + "/users/delete/:id",
      save: HOST + "/users/save",
      get: HOST + "/users/:id",
      update: HOST + "/users/edit/:id",
    },

    department: {
      list: HOST + "/department",
      delete: HOST + "/department/delete/:id",
      save: HOST + "/department/save",
      get: HOST + "/department/:id",
      filter: HOST + "/department/findByFilter",
      update: HOST + "/department/edit/:id",
    },

    division: {
      list: HOST + "/department/division/:id",
      delete: HOST + "/division/delete/:id",
      save: HOST + "/division/save",
      get: HOST + "/division/:id",
      update: HOST + "/division/edit/:id",
    },

    division_field: {
      list: HOST + "/division-field/division/:id",
      delete: HOST + "/division-field/delete/:id",
      save: HOST + "/division-field/save",
      get: HOST + "/division-field/:id",
      update: HOST + "/division-field/edit/:id",
    },

    project_data: {
      list: HOST + "/project-data",
      get: HOST + "/project-data/:id",
    },
  },
  ADD_DIVISION: "ADD_DIVISION",
  ADD_DIVISION_FIELD: "ADD_DIVISION_FIELD",
};
