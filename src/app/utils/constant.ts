const HOST = "https://whizlabs-node-service.herokuapp.com";
//const HOST = "http://localhost:3020";

export const CONSTANT = {
  permissions: {},
  routes: {
    authorization: {
      login: HOST + "/user/admin/login",
      logout: HOST + "/admin/logout",
    },
    user: {
      list: HOST + "/user",
      delete: HOST + "/user/delete/:id",
      save: HOST + "/user/save",
      get: HOST + "/user/:id",
      update: HOST + "/user/edit/:id",
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
      delete: HOST + "/project-data/delete/:id",
      save: HOST + "/project-data/save",
      get: HOST + "/project-data/:id",
      update: HOST + "/project-data/edit/:id",
      get_by_userid: HOST + "/project-data/user/:id",
      get_form_field: HOST + "/project-data/form-field/:userId/:divisionId",
    },
  },
  ADD_DIVISION: "ADD_DIVISION",
  ADD_DIVISION_FIELD: "ADD_DIVISION_FIELD",
};
