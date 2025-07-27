import React, { useState } from "react";
import CreateAccount from "../components/modals/CreateAccount";

function Home() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  return (
    <div>
      Home
      <CreateAccount />
    </div>
  );
}

export default Home;
