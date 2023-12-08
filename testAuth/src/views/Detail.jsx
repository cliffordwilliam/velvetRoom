/**##########
 * # BLOCKS #
 * ##########
 */
import placeholderUrl from "../assets/placeholder.jpg"
import Modal from "../components/Modal" // modal


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
    id: "Loading",
    name: "Loading",
    facility: "Loading",
    roomCapacity: "Loading",
    imgUrl: placeholderUrl,
    location: "Loading",
    createdAt: "Loading",
    updatedAt: "Loading",
}


/**########
 * # FUNC #
 * ########
 */
export default function Detail() {
    /**#############################
     * # AXIOS: GET LODGING ID PUB #
     * #############################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [lodging, setLodging] = useState({})
    const { id } = useParams()
    const [error, seterror] = useState(false) // modal
    // REQUESTER
    async function getPubId(){
        try {
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get(`${baseUrl}/apis/rent-room/lodgings/${id}`, config)
            setLodging(response?.data.data) // one lodging found, update data
        } catch (error) {
            if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 401") navigate("/login") // wrong auth? auth expired? kick
            if (error.message) seterror(`${error.message}`) // modal
            console.log(error)
        }
    }


    /**#############
     * # CALLBACKS #
     * #############
     */
    // modal
    function onModalCloseButtonClicked(event) {
        event.preventDefault()
        seterror("")
    }


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
    // loading? use placeholder
    let data = lodging
    if (!Object.keys(data).length) data = loadingCardData
    console.log(data);
    

    /**##############
     * # RETURN DOM #
     * ##############
     */
    return(
        <>
            <header className="con bb">
                <h1>Detail</h1>
            </header>
            <div className="table-con">
                <table className="table">
                    <caption>Details for {data.title}</caption>
                    <thead>
                        <tr>
                            <th className="text-right">Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="text-right">Image</th>
                            <td>
                                <figure>
                                    <img className="table-img" src={data.imgUrl} alt={data.name} role="presentation" />
                                    <figcaption>{data.name}</figcaption>
                                </figure>
                            </td>
                        </tr>
                        <tr>
                            <th className="text-right">Name</th>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <th className="text-right">Facility</th>
                            <td>{data.facility}</td>
                        </tr>
                        <tr>
                            <th className="text-right">Room capacity</th>
                            <td>{data.roomCapacity}</td>
                        </tr>
                        <tr>
                            <th className="text-right">Location</th>
                            <td>{data.location}</td>
                        </tr>
                        <tr>
                            <th className="text-right">Created at</th>
                            <td>{data.createdAt}</td>
                        </tr>
                        <tr>
                            <th className="text-right">Updated at</th>
                            <td>{data.updatedAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* modal */}
            {error && (
                <Modal isOpen={error} onClose={onModalCloseButtonClicked}>
                    <p>{error}</p>
                </Modal>
            )}
        </>
    )
}