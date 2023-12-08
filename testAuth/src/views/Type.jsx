/**##########
 * # BLOCKS #
 * ##########
 */
import placeholderUrl from "../components/placeholder.jpg"
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
const loadingCardDataArray = []
for (let i = 0; i < 12; i++) {
    loadingCardDataArray.push(
        {    
            title: "loading data",
        }
    )
}


/**########
 * # FUNC #
 * ########
 */
export default function Type() {
    /**####################
     * # AXIOS: GET TYPES #
     * ####################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [types, settypes] = useState([])
    const [error, seterror] = useState(false) // modal
    // REQUESTER
    async function get(){
        try {
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get(`${baseUrl}/apis/rent-room/types`, config)
            settypes(response?.data?.data) // array of types found, update data
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
        get()
    },[])
    
    // on any block change
    useEffect(()=>{
        
    },)

    // on queue free (refresh / re-request)
    useEffect(()=>{
        return ()=>{
            
        }
    },[])
    
    // on page change
    // useEffect(()=>{
    //     get()
    // },[page])

    
    /**#####################
     * # REFORMAT RESPONSE #
     * #####################
     */
    const cardDataArray = types.map(type=>{ // types may be empty (loading)
        return {
            // id: type.id,
            title: type.name,
            // createdAt: type.createdAt,
            // updatedAt: type.updatedAt,
        }
    })

    // loading? use placeholder
    let data = cardDataArray
    if (!cardDataArray.length) data = loadingCardDataArray
    

    /**##############
     * # RETURN DOM #
     * ##############
     */
    return(
        <>
            <header className="con bb text-center">
                <h1>Type</h1>
            </header>
            <CardGallery cardDataArray={data} customCardClass={"type-card"} />
            {/* modal */}
            {error && (
                <Modal isOpen={error} onClose={onModalCloseButtonClicked}>
                    <p>{error}</p>
                </Modal>
            )}
        </>
    )
}