import { Provider } from "react-redux";
import { store } from "./app/store";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import NavigationMenu from "./components/NavigationMenu";

function App() {
  return (
    <Provider store={store}>
      <div>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="favorites" element={<FavoritePage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
