import { Card } from '../Card/Card'
import './Main.css'
import axios from 'axios'

export const Main = () => {

    const getTrending = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/mostPopular`)
    }

    return (
        <div className='main px-4'>
            <Card name={"Travis"} description={"yabadabadoo"} price={200} src={"https://altibrand.com/cdn/shop/files/tra2.png?v=1694010227&width=1445"}/>
        </div>
    )
}