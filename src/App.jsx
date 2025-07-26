import { RouterProvider } from "react-router";
import { routes } from "./routes/Routes";
//context
import { CurrentUserProvider } from "./context";
import { MessageProvider } from "./context/message/Message.provider";
import TabsProvider from "./context/tabs/Tabs.provider";
import React from "react";
function App() {
  return (
    <React.StrictMode>
      <CurrentUserProvider>
        <MessageProvider>
          <TabsProvider>
            <RouterProvider router={routes} />
          </TabsProvider>
        </MessageProvider>
      </CurrentUserProvider>
    </React.StrictMode>
  );
}

export default App;
