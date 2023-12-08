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



/**########
 * # FUNC #
 * ########
 */
export default function LodgingForm() {
    /**#############################
     * # AXIOS: PUT / POST LODGING #
     * #############################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [name, setname] = useState("")
    const [imgUrl, setimgUrl] = useState("")
    const [facility, setfacility] = useState("")
    const [roomCapacity, setroomCapacity] = useState("")
    const [location, setlocation] = useState("")
    const [typeArray, settypeArray] = useState("")
    const [typeId, settypeId] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [error, seterror] = useState(false) // modal
    // TODO: handle error
    const { id } = useParams()
    // API REQUESTER
    async function updateLodging(){
        try {
            setErrorMessage("")
            setSuccessMessage("")
            // form check
            if (!name || !imgUrl || !facility || !roomCapacity || !location || !typeId) setErrorMessage("Please fill in all the fields")
            
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const body = {
                name: name,
                imgUrl: imgUrl,
                facility: facility,
                roomCapacity: +roomCapacity,
                location: location,
                typeId: +typeId,
            }
            if (id) {
                const response = await axios.put(`${baseUrl}/apis/rent-room/lodgings/${id}`, body, config)
                setSuccessMessage("Edited successful")
                response && console.log(response.data);
            } else {
                const response = await axios.post(`${baseUrl}/apis/rent-room/lodgings`, body, config)
                setSuccessMessage("Added successful")
                response && console.log(response.data);
            }
        } catch (error) {
            if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 401") navigate("/login") // wrong auth? auth expired? kick
            if (error.message) seterror(`${error.message}`) // modal
            console.log(error)
        }
    }
    /**#########################
     * # AXIOS: GET LODGING ID #
     * #########################
     */
    // API REQUESTER
    async function getId(){
        try {
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get(`${baseUrl}/apis/rent-room/lodgings/${id}`, config)
            //   setLodging(data.data) // one lodging found, update data
            // get the corresponding type
            setname(response?.data.data.name)
            setimgUrl(response?.data.data.imgUrl)
            setfacility(response?.data.data.facility)
            setroomCapacity(response?.data.data.roomCapacity)
            setlocation(response?.data.data.location)
            settypeId(response?.data.data.typeId)
            const typeResponse = await axios.get(`${baseUrl}/apis/rent-room/types`, config)
            settypeArray(typeResponse?.data.data)

        } catch (error) {
            if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 401") navigate("/login") // wrong auth? auth expired? kick
            if (error.message) seterror(`${error.message}`) // modal
            console.log(error)
        }
    }
    /**####################
     * # AXIOS: GET TYPES #
     * ####################
     */
    // API REQUESTER
    async function getTypes(){
        try {
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const typeResponse = await axios.get(`${baseUrl}/apis/rent-room/types`, config)
            settypeArray(typeResponse?.data.data)

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
    function onnameInputChange(event) {
        setname(event.target.value)
    }
    function onFormSubmit(event) {
        event.preventDefault()
        updateLodging()
    }
    function onimgUrlInputChange(event) {
        setimgUrl(event.target.value)
    }
    function onfacilityInputChange(event) {
        setfacility(event.target.value)
    }
    function onroomCapacityInputChange(event) {
        setroomCapacity(event.target.value)
    }
    function onlocationInputChange(event) {
        setlocation(event.target.value)
    }
    function ontypeArrayInputChange(event) { // drop down change
        settypeId(event.target.value)
        // let dropDown = document.getElementById("typeArray")
        // dropDown.value = event.target.value
        // console.log(dropDown);
    }
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
        getTypes()
        if (id) {
            getId()
        }
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    },[])
    
    // on any block change
    useEffect(()=>{
    },)

    // on queue free (refresh / re-request)
    useEffect(()=>{
        return ()=>{
        }
    },[])
    console.log(typeArray, typeId);
    // on var change
    // useEffect(()=>{
        
    // },[var])

    
    /**#####################
     * # REFORMAT RESPONSE #
     * #####################
     */
    

    /**##############
     * # RETURN DOM #
     * ##############
     */
    return(
        <>
            <div className="sole-form-con">
                <header className="con bb">
                    <h1 className="text-center">{id ? "Edit" : "Add"} lodging</h1>
                </header>
                <form className="form sole-form" onSubmit={onFormSubmit}>
                    <label htmlFor="name">name</label>
                    <input onChange={onnameInputChange} className="input-text full-flex-basis" type="text" id="name" name="name" value={name} />
                    <label className="mt" htmlFor="imgUrl">imgUrl</label>
                    <input onChange={onimgUrlInputChange} className="input-text full-flex-basis" type="text" id="imgUrl" name="imgUrl" value={imgUrl} />
                    <label className="mt" htmlFor="facility">facility</label>
                    <input onChange={onfacilityInputChange} className="input-text full-flex-basis" type="text" id="facility" name="facility" value={facility} />
                    <label className="mt" htmlFor="roomCapacity">roomCapacity</label>
                    <input onChange={onroomCapacityInputChange} className="input-text full-flex-basis" type="number" id="roomCapacity" name="roomCapacity" value={roomCapacity} />
                    <label className="mt" htmlFor="location">location</label>
                    <input onChange={onlocationInputChange} className="input-text full-flex-basis" type="text" id="location" name="location" value={location} />
                    <label className="mt" htmlFor="typeArray">Type</label>
                    <select onChange={ontypeArrayInputChange} className="input-text full-flex-basis" id="typeArray" name="typeArray" value={typeId}>
                        <option value="">Select Type</option>
                        {typeArray && typeArray.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    

                    <input className="btn mt" type="submit" value="Submit" />
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
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