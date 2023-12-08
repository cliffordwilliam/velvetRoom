/**##########
 * # BLOCKS #
 * ##########
 */
import placeholderUrl from ".placeholder.jpg"
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
            imgSrc: placeholderUrl,
            alt: "loading placeholder",
            title: "loading data",
            description: "loading data",
            owner: "loading data",
        }
    )
}


/**########
 * # FUNC #
 * ########
 */
export default function Home() {
    /**###########################
     * # AXIOS: GET LODGINGS PUB #
     * ###########################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [lodgings, setLodgings] = useState([])
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
            const response = await axios.get(`${baseUrl}/apis/rent-room/lodgings`, config)
            setLodgings(response?.data.data) // array of lodgings found, update data
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
    async function onCardDeleteButtonClicked(event) {
        try {
            event.preventDefault()
            const id = event.target.id
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            await axios.delete(`${baseUrl}/apis/rent-room/lodgings/${id}`, config)
            // success delete
            get()
        } catch (error) {
            if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 401") navigate("/login") // wrong auth? auth expired? kick
            if (error.message) seterror(`${error.message}`) // modal
            console.log(error)
        }
    }
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
        // const sectionElement = document.getElementById(1)
        // sectionElement.scrollIntoView({ behavior: 'smooth' })
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
    const cardDataArray = lodgings.map(lodging=>{ // lodgings may be empty (loading)
        return {
            imgSrc: lodging.imgUrl,
            alt: lodging.name,
            title: lodging.name,
            description: lodging.facility,
            owner: lodging.User.username,
            buttons: [
                {name: "Detail", target:`/lodging/${lodging.id}`},
                {name: "Edit", target:`/edit-lodging/${lodging.id}`},
                {name: "Patch", target:`/patch-lodging/${lodging.id}`},
                {name: "Delete", onClickFunc:onCardDeleteButtonClicked, id:lodging.id},
            ]
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
            {/* Id to scroll to - onready */}
            <header id="1" className="con bb text-center">
                <h1>Home</h1>
            </header>
            <CardGallery cardDataArray={data} />
            {error && (
                <Modal isOpen={error} onClose={onModalCloseButtonClicked}>
                    <p>{error}</p>
                </Modal>
            )}
        </>
    )
}