import { RouterProvider } from "react-router";
import { routes } from "./routes/Routes";
//context
import { CurrentUserProvider } from "./context";
function App() {
  return (
    <>
      <CurrentUserProvider>
        <RouterProvider router={routes} />
      </CurrentUserProvider>
    </>
  );
}

export default App;
