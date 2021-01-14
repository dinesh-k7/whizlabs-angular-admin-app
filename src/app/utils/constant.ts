const HOST = "https://whizlabs-node-service.herokuapp.com";

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

    project_data: {
      list: HOST + "/project-data",
      get: HOST + "/project-data/:id",
    },
  },
};
