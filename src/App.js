import './App.css'
import Canvas from "./Pages/Canvas";
import {Provider} from "react-redux";
import {store} from "./StateMangement/store";



export default function App() {

    return (
        <Provider store={store}>
            <Canvas/>
        </Provider>
    );
}