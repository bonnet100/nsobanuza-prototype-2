import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserProvider } from './UserContext';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </LanguageProvider>
  );
}
