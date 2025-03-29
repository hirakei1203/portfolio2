import Earth from "./components/Earth"; 
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div>
      <Helmet>
        <title>My Portfolio Site</title>
      </Helmet>
      <Earth />
    </div>
  );
};

export default App;
