import Earth from "./components/Earth"; 
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div>
      <Helmet>
        <meta property="og:title" content="My Portfolio Site" />
        <meta property="og:description" content="Check out my personal portfolio built with React and Three.js!" />
        <meta property="og:image" content="https://hirakei1203.github.io/portfolio2/thumbnail.png" />
        <meta property="og:url" content="https://hirakei1203.github.io/portfolio2/" />
      </Helmet>
      <Earth />
    </div>
  );
};

export default App;
