import React, { useState } from "react";
import { Nav } from "./components/Nav";
import { ItemLayout } from "./components/Items/ItemLayout";
import { TransactionLayout } from "./components/Transactions/TransactionLayout";

const screens = ["item", "transaction"];

function App() {

    const [view, setView] = useState<string>(screens[0]);

    return (
        <>
            <div className="bg-gray-800 w-screen flex justify-center">
                <Nav view={view} setView={setView} screens={screens} />
            </div>

            <div className="flex w-screen justify-center">
                {view === screens[0] ? <ItemLayout/> : <TransactionLayout />}
            </div>
        </>
    );
}

export default App;
