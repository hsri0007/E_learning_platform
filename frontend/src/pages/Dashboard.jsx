import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const handleClick = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const res = await axios.post(
      "http://localhost:5000/api/users/stripe",
      {},
      config
    );
    console.log(res);

    window.location.href = res.data;
  };

  return (
    <div>
      <button onClick={handleClick}>create stripe</button>
    </div>
  );
}

export default Dashboard;
