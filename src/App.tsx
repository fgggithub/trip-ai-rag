import { Routes, Route } from "react-router-dom";
import { Authenticator, View } from "@aws-amplify/ui-react";
import {ThemeStyle} from '@aws-amplify/ui-react/server'
import Hero from "./pages/Hero";
import Story from "./pages/Story";
import Chat from "./pages/Chat";
import "@aws-amplify/ui-react/styles/reset.css";
import "@aws-amplify/ui-react/styles.css";
import { theme } from "./theme";

function App() {
  console.log("App component start");
  return (
    <View {...theme.containerProps()} color="font.primary">
      <Authenticator>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/story/:id" element={<Story />} />
        </Routes>
      </Authenticator>
      <ThemeStyle theme={theme} />
    </View>
  );
}

export default App;
