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



/**########
 * # FUNC #
 * ########
 */
export default function UserForm() {
    /**####################
     * # AXIOS: POST USER #
     * ####################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [address, setaddress] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [error, seterror] = useState(false) // modal
    // TODO: handle error
    const { id } = useParams()
    // REQUESTER
    async function updateuser(){
        try {
            setErrorMessage("")
            setSuccessMessage("")
            // form check
            if (!username || !email || !password || !phoneNumber || !address) setErrorMessage("Please fill in all the fields")
            
            const token = localStorage.getItem('access_token')
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const body = {
                username: username,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                address: address,
            }
            const response = await axios.post(`${baseUrl}/apis/add-user`, body, config)
            setSuccessMessage("Added successful")
            response && console.log(response)
            
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
    function onusernameInputChange(event) {
        setusername(event.target.value)
    }
    function onFormSubmit(event) {
        event.preventDefault()
        updateuser()
    }
    function onemailInputChange(event) {
        setemail(event.target.value)
    }
    function onpasswordInputChange(event) {
        setpassword(event.target.value)
    }
    function onphoneNumberInputChange(event) {
        setphoneNumber(event.target.value)
    }
    function onaddressInputChange(event) {
        setaddress(event.target.value)
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
                    <h1 className="text-center">{id ? "Edit" : "Add"} user</h1>
                </header>
                <form className="form sole-form" onSubmit={onFormSubmit}>
                    <label htmlFor="username">username</label>
                    <input onChange={onusernameInputChange} className="input-text full-flex-basis" type="text" id="username" name="username" />
                    <label className="mt" htmlFor="email">email</label>
                    <input onChange={onemailInputChange} className="input-text full-flex-basis" type="text" id="email" name="email" />
                    <label className="mt" htmlFor="password">password</label>
                    <input onChange={onpasswordInputChange} className="input-text full-flex-basis" type="text" id="password" name="password" />
                    <label className="mt" htmlFor="phoneNumber">phoneNumber</label>
                    <input onChange={onphoneNumberInputChange} className="input-text full-flex-basis" type="text" id="phoneNumber" name="phoneNumber" />
                    <label className="mt" htmlFor="address">address</label>
                    <input onChange={onaddressInputChange} className="input-text full-flex-basis" type="text" id="address" name="address" />
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