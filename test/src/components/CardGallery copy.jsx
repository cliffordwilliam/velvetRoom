import { Link } from "react-router-dom";


export default function CardGallery({ cardDataArray, customCardClass }) {
    return (
        <>
            <section>
                <div className="con card-gallery">
                    {cardDataArray.map((card, i) => (
                        <div className={customCardClass ? customCardClass : "card"} key={i}>
                            {card.imgSrc && <img className="card-img" src={card.imgSrc} alt={card.alt} />}
                            {card.title && <h3 className="card-title">{card.title}</h3>}
                            {card.description && <p className="card-description">{card.description}</p>}
                            {card.owner && <p className="card-description ma">Owner: {card.owner}</p>}
                            {card.buttons && card.buttons.length > 0 && (
                                <div className="card-btn-con mt">
                                    {card.buttons.map((button, buttonI) => (
                                        button.onClickFunc ? (
                                            <button onClick={button.onClickFunc} id={button.id} key={buttonI}>
                                                {button.name}
                                            </button>
                                        ) : (
                                            <Link className="btn" key={buttonI} to={button.target}>
                                                {button.name}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
