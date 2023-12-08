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



/**########
 * # FUNC #
 * ########
 */
export default function LodgingPatchImageUrlForm() {
    /**########################
     * # AXIOS: PATCH LODGING #
     * ########################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [imgUrl, setimgUrl] = useState("")
    const [isUploading, setIsUploading] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [error, seterror] = useState(false) // modal
    // TODO: handle error
    const { id } = useParams()
    // API REQUESTER
    async function patchLodging(){
        try {
            setErrorMessage("")
            setSuccessMessage("")
            // form check
            if (!imgUrl) setErrorMessage("Please fill in all the fields")
            
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const formData = new FormData()
            formData.append("file", imgUrl)
            setIsUploading(true)
            console.log(formData.imgUrl, "<<<<"); // C:\fakepath\ken-kaneki.jpg
            const response = await axios.patch(`${baseUrl}/apis/rent-room/lodgings/${id}`, formData, config)
            setIsUploading(false)
            setSuccessMessage("Edited successful")
            
            console.log(response);
        } catch (error) {
            setIsUploading(false)
            if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 401") navigate("/login") // wrong auth? auth expired? kick
            if (error.message) seterror(`${error.message}`) // modal
            console.log(error)
        }
    }


    /**#############
     * # CALLBACKS #
     * #############
     */
    function onFormSubmit(event) {
        event.preventDefault()
        patchLodging()
    }
    function onimgUrlInputChange(event) {
        setimgUrl(event.target.files[0])
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
    
    // on var change
    useEffect(()=>{
        console.log(imgUrl); // Filled here!
    },[imgUrl])

    
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
                    <label className="mt" htmlFor="imgUrl">imgUrl</label>
                    <input onChange={onimgUrlInputChange} className="input-text full-flex-basis" type="file" id="imgUrl" name="imgUrl" />
                    <input className="btn mt" type="submit" value="Submit" />
                </form>
                {isUploading && <p>{"Uploading file..."}</p>}
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