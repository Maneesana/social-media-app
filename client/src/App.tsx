import { Suspense, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { privateRoute, publicRoute } from './routes';
import { AuthContext } from './context';
import { GuestLayout, UserLayout } from './components'; // import required component from the components "index.ts" file which will further import different components from further nested folders inside components folder

export default function App() {
  const { authToken } = useContext(AuthContext);
  const routes = authToken ? privateRoute : publicRoute;

  const mainContent = routes.map((route) => {
    return route.component ? (
      <Route path={route.path} element={<route.component />} key={crypto.randomUUID()} />
    ) : (
      route.redirectRoute && (
        <Route path='*' key={crypto.randomUUID()} element={<Navigate to={route.path} />} />
      )
    );
  });

  if (!authToken) {
    return (
      <GuestLayout>
        <Suspense /* fallback={<Loader />} */>
          <Routes>{mainContent}</Routes>
        </Suspense>
      </GuestLayout>
    );
  }

  return (
    <UserLayout>
      <Suspense /* fallback={<Loader />} */>
        <Routes>{mainContent}</Routes>
      </Suspense>
    </UserLayout>
  );
}
