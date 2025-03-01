import { useContext } from "react";
//context
import { UserContext } from "../../context";
const HomePage = () => {
  const { currentUser } = useContext(UserContext);

  console.log("HomePage", currentUser);

  return <div>Home.paP</div>;
};

export default HomePage;
