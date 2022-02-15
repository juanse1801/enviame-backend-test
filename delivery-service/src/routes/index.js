import users from "./users.js";

const routesConfig = (app) => {
  const paths = {
    users: `/api/v1.0/users`,
  };

  app.use(paths.users, users);
};

export default routesConfig;
