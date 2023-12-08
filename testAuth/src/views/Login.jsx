/**##########
 * # BLOCKS #
 * ##########
 */
import placeholderUrl from "../components/placeholder.jpg"
import Modal from "../components/Modal" // modal
import Decorations from "../components/Decorations"


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
import AudioVisualizer from "../components/AudioVisualizer";


/**################
 * # PLACEHOLDERS #
 * ################
 */



/**########
 * # FUNC #
 * ########
 */
export default function Login() {
    /**#####################
     * # AXIOS: POST LOGIN #
     * #####################
     */
    // CONST + SETTERS + PARAMS + NAVIGATE
    const navigate = useNavigate()
    const baseUrl = "https://phase2-aio.vercel.app" // move to a js for const / .env
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState("") // modal
    // REQUESTER
    async function postLogin(){
        try {
            const body = {
                email: email,
                password: password,
            };
            const response = await axios.post(`${baseUrl}/apis/login`, body)
            localStorage.setItem("access_token", response?.data.data.access_token)
            navigate("/")
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
    function onEmailInputChange(event) {
        setEmail(event.target.value)
    }
    function onFormSubmit(event) {
        event.preventDefault()
        postLogin()
    }
    function onPasswordInputChange(event) {
        setPassword(event.target.value)
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
            <div className="sole-form-con con">
                <header className="bb">
                    <h1>Login</h1>
                </header>
                <p>Rent Rooms | Hacktiv</p>
                <form className="form sole-form" onSubmit={onFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <input onChange={onEmailInputChange} className="input-text full-flex-basis" type="text" id="email" name="email" />
                    <label className="mt" htmlFor="password">Password</label>
                    <input onChange={onPasswordInputChange} className="input-text full-flex-basis" type="password" id="password" name="password" />
                    <input className="btn mt" type="submit" value="Submit" />
                </form>
                {error && <p className="error">{error}</p>}
            </div>
            <Decorations/>
            {/* modal */}
            {error && (
                <Modal isOpen={error} onClose={onModalCloseButtonClicked}>
                    <p>{error}</p>
                </Modal>
            )}
        </>
    )
}