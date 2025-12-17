import { useNavigate } from 'react-router-dom'
import { Plan } from './Plan';
import { Navbar } from './Navbar';
import { Plans } from './Plans';

export const Home = () => {

    const navigate = useNavigate();

    const navigateToScan = () => {
        navigate('/scan');
    }

    return (
        <>
        <div className="">
            <Navbar/>
            <Plans/>
            {/* <div className='bg-green-600 pt-8'>
                Plans
                <Plan/>
                <button className='bg-pink-200 border-2xl' onClick={navigateToScan}>Scan</button>
            </div>   */}
        </div>  
        </>
    )
}