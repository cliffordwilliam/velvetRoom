import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Decorations from "./Decorations";
import AudioVisualizer from "./AudioVisualizer";


export default function MainLayout() {
    return (
        <>
            <Nav/>
                <main>
                    <AudioVisualizer/>
                    <Decorations/>
                    <Outlet/>
                </main>
            <Footer/>
        </>
    )
}