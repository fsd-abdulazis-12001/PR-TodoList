import   {useEffect , useState} from 'react'
import axios from 'axios'

const index = () => {

    const [data , setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)    
    const [isError, setIsError] = useState(true)    


    const getData = async () => {
       try {
        setIsLoading(true)
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setData(res.data)
        console.log(res.data)
       } catch (error) {
        setIsError(true)
        console.log(error)
       } finally {
        setIsLoading(false)
       }
    }

    useEffect(() => {
        getData()
        
    }, [])
    
    return (
        <div>
            {isLoading ? 'loading' : data.length > 0 ? data.map(item => (
                <div key={item.id}>
                    <div>{item.title}</div>
                   
                    <div>{item.body}</div>
                    <div>---------------------------------</div>
                </div>
            )) : 'No data'}
            {isError ? 'error' : null}
        </div>
    )
}

export default index
