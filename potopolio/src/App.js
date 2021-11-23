import './App.css';
import './comcss/home.css';
import HeaderComponent from './component/header'
import HomeComponent from './component/home'
import SecondComponent from './component/second'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main>
        <HeaderComponent />
        <HomeComponent />
        <SecondComponent />
        </main>
      </header>
    </div>
  );
}

export default App;
