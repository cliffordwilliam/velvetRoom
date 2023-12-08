/**##########
 * # BLOCKS #
 * ##########
 */
import placeholderUrl from "../assets/placeholder.jpg"


/**##########
 * # BLOCKS #
 * ##########
 */
import CardGallery from "../components/CardGallery";


/**###########################
 * # STATE | EFFECT | PARAMS #
 * ###########################
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


/**#########
 * # AXIOS #
 * #########
 */
import axios from "axios"


/**################
 * # PLACEHOLDERS #
 * ################
 */
const loadingCardData = {    
    imgSrc: placeholderUrl,
    alt: "loading placeholder",
    title: "loading data",
    description: "loading data",
    buttons: [
        {name: "Loading", id:`${1}`},
    ]
}


/**########
 * # FUNC #
 * ########
 */
export default function Detail() {
    /**##############################
     * # AXIOS: GET LODGINGS ID PUB #
     * ##############################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [lodging, setLodging] = useState({})
    const { id } = useParams()
    // REQUESTER
    async function getPubId(){
        try {
          const response = await axios.get(`${baseUrl}/apis/pub/rent-room/lodgings/${id}`)
          setLodging(response?.data.data) // one lodging found, update data
        } catch (error) {
          console.log(error)
        }
    }


    /**#############
     * # CALLBACKS #
     * #############
     */
    // function onCardDetailButtonClicked(event) {
    //     event.preventDefault()
    //     const lodgingId = event.target.getAttribute("id")
    //     console.log(lodgingId) // use this id as param to go to the detail page
    // }


    /**#########
     * # HOOKS #
     * #########
     */
    // ALL ARE CALLED ON 1ST LOAD
    // onready
    useEffect(()=>{
        getPubId()
    },[])
    
    // on any block change
    useEffect(()=>{
        
    },)

    // on queue free (refresh / re-request)
    useEffect(()=>{
        return ()=>{
            
        }
    },[])
    
    // on var change
    // useEffect(()=>{
        
    // },[var])

    
    /**#####################
     * # REFORMAT RESPONSE #
     * #####################
     */
    const cardData = { // lodging may be empty (loading)
            imgSrc: lodging.imgUrl,
            alt: lodging.name,
            title: lodging.name,
            description: lodging.facility,
            buttons: [
                {name: "Detail", id:`${lodging.id}`},
            ]
        }

    // loading? use placeholder
    let data = cardData
    if (!cardData) data = loadingCardData
    console.log(data)
    

    /**##############
     * # RETURN DOM #
     * ##############
     */
    return(
        <>
            <header>
                <h1 className="text-center">Detail</h1>
            </header>
            <div className="table-con">
                <table className="table">
                    <caption>Details for {data.title}</caption>
                    <thead className="hide">
                        <tr>
                            <th className="text-right">Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bb">
                            <th className="text-right">Image</th>
                            <td>
                                <figure>
                                    <img className="table-img" src={data.imgSrc} alt={data.alt} role="presentation" />
                                    <figcaption>{data.alt}</figcaption>
                                </figure>
                            </td>
                        </tr>
                        <tr className="bb">
                            <th className="text-right">Title</th>
                            <td>{data.title}</td>
                        </tr>
                        <tr>
                            <th className="text-right">Description</th>
                            <td>{data.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}