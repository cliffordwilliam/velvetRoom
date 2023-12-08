import { Link, useNavigate } from "react-router-dom"
import Hero from "./Hero"


export default function Nav() {
    const navigate = useNavigate()

    function onLogoutButtonClicked(e) {
        e.preventDefault()
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <>
            <header>
                <div className="nav-logo-nav-con-con">
                    <div className="con nav-logo-nav-con">
                        <span className="nav-logo">Rent Rooms | Hacktiv</span>
                        <nav className="nav">
                            <ul className="nav-ul">
                                <li className="nav-li"><Link className="nav-li-content" to='/'>Home</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Hero/>
            </header>
        </>
    )
}