import { Route, Routes, Navigate } from "react-router-dom";

import DefaultLayout from "./layouts/default";

import MemesPage from "@/pages/memes";
import MemesCardsPage from "@/pages/memes/cards";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />} path="/">
        <Route element={<Navigate to="/meme-table" />} path="/" />
        <Route element={<MemesPage />} path="/meme-table" />
        <Route element={<MemesCardsPage />} path="/meme-cards" />
      </Route>
    </Routes>
  );
}

export default App;
