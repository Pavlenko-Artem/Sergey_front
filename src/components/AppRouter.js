// import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
// import { Context } from "../index";
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  // const { user } = useContext(Context);

  const isAuth = true;
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
            exact
          />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component />}
          exact
        />
      ))}
      <Route element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
