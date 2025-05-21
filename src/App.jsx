import { RouterProvider } from "react-router";
import { routes } from "./routes/Routes";
//context
import { CurrentUserProvider } from "./context";
import { MessageProvider } from "./context/message/Message.provider";
function App() {
  return (
    <>
      <CurrentUserProvider>
        <MessageProvider>
          <RouterProvider router={routes} />
        </MessageProvider>
      </CurrentUserProvider>
    </>
  );
}

export default App;
