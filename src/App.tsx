import { User } from './components/User';
import { useApp } from './AppContext';

export function App(): JSX.Element {
  const appContext = useApp();

  return (
    <>
      <p>app</p>
      <User />
    </>
  );
}
