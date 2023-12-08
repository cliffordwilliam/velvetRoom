import hero from "./src/assets/b.webp"


function Hero() {
    return (
        <>
            <section className="hero">
                <div className="con">    
                    <h1 className="hero-title">Rent Rooms | Hacktiv</h1>
                    <p className="hero-sub-title">Best lodging in town</p>
                </div>
                <img className="hero-img" src={hero} alt="Hero Image" />
            </section>
        </>
    )
}


export default Hero