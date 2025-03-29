import Earth from "./components/Earth"; 
import { Helmet } from 'react-helmet';

const App = () => {
  const description = "Check out my personal portfolio built with React and Three.js!";
  const imageUrl = "https://hirakei1203.github.io/portfolio2/thumbnail.png";
  
  return (
    <div>
      <Helmet>
        <title>My Portfolio Site</title>
        <meta property="og:title" content="My Portfolio Site" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hirakei1203.github.io/portfolio2/" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="My Portfolio Site" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:description" content={description} />
        <meta name="description" content={description} />
      </Helmet>
      <Earth />
    </div>
  );
};

export default App;
