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
const loadingCardDataArray = []
for (let i = 0; i < 12; i++) {
    loadingCardDataArray.push(
        {    
            imgSrc: placeholderUrl,
            alt: "loading placeholder",
            title: "loading data",
            description: "loading data",
            buttons: [
                {name: "Loading", id:`${i+1}`},
            ]
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
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState("ASC")
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    // REQUESTER
    async function getPub(){
        try {
          const response = await axios.get(`${baseUrl}/apis/pub/rent-room/lodgings?q=${search}&limit=12&page=${page}&sort=${order}`) // fix limit to 12 per page
          setTotalPage(response?.data.data.pagination.totalPage) // update total page
          setCurrentPage(response?.data.data.pagination.currentPage) // update current page
          setLodgings(response?.data.data.query) // array of lodgings found, update data
        } catch (error) {
          console.log(error)
        }
    }


    /**#############
     * # CALLBACKS #
     * #############
     */
    function onSeachInputChange(event) {
        setSearch(event.target.value)
    }
    function onFormSubmit(event) {
        event.preventDefault()
        getPub()
    }
    function onPrevPageButtonClicked(event) {
        event.preventDefault()
        setPage((prevPage) => Math.max(prevPage - 1, 1))
    }
    async function onNextPageButtonClicked(event) {
        event.preventDefault()
        setPage((prevPage) => Math.min(prevPage + 1, totalPage))
    }
    function onOrderRadioChange(event) {
        setOrder(event.target.value)
    }


    /**#########
     * # HOOKS #
     * #########
     */
    // ALL ARE CALLED ON 1ST LOAD
    // onready
    useEffect(()=>{
        getPub()
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
    useEffect(()=>{
        getPub()
    },[page])

    
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
            buttons: [
                {name: "Detail", id:`${lodging.id}`},
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
            <div className="sole-form-con">
                <header className="con bb">
                    <h1 className="text-center">Home</h1>
                </header>
                <form className="form sole-form" onSubmit={onFormSubmit}>
                    <label htmlFor="search">Search</label>
                    <input onChange={onSeachInputChange} className="input-text full-flex-basis" type="text" id="search" name="search" />
                    <div className="pad h-flex w-full">
                        <label htmlFor="ASC">Ascending</label>
                        <input className="ml" onChange={onOrderRadioChange} type="radio" id="ASC" name="order" value="ASC" />
                        <div className="flex-1"></div>
                        <input onChange={onOrderRadioChange} type="radio" id="DESC" name="order" value="DESC" />
                        <label className="ml" htmlFor="DESC">Descending</label>
                    </div>
                    <input className="btn full-flex-basis" type="submit" value="Submit" />
                </form>
            </div>
            <CardGallery cardDataArray={data} />
            <div className="page-btn-con">
                <button onClick={onPrevPageButtonClicked}>Prev page</button>
                <span className="page-number">{currentPage} / {totalPage}</span>
                <button onClick={onNextPageButtonClicked}>Next Page</button>
            </div>
        </>
    )
}