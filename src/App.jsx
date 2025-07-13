import Form from './components/Form';
import './App.css';
import ParticleBackground from './components/ParticleBackground';
import ProfileCard from './components/ProfileCard';
import InfoSection from './components/Info';

function App() {
  return (
    <div className="app-container">
      <div className="particle-section">
        <ParticleBackground />
      </div>
      <div>
        <ProfileCard />
      </div>
      <div>
        <InfoSection/>
      </div>
      <div className="form-content">
          <Form />
      </div>
    </div>
  );
}

export default App;
