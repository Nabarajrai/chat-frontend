import { useCallback, useContext } from "react";
//context
import { UserContext } from "../../context";
//helpers
import { clearLocalStorage } from "../../helpers/LocatStorage.helper";
const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  console.log("HomePage", currentUser);
  const handleLogOut = useCallback(() => {
    clearLocalStorage();
    window.location.href = "/";
  }, []);
  return (
    <div>
      Home HomePage
      <button onClick={handleLogOut}>Loutout</button>
    </div>
  );
};

export default HomePage;
