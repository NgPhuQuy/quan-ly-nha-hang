import Apis, { endpoints } from "../configs/Apis";
import { useEffect, useState } from "react";

const Home = () => {
    const [chiNhanh, setChiNhanh] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChiNhanh = async () => {
            // setLoading(true);
            try {
                const response = await Apis.get(endpoints.chi_nhanh);
                setChiNhanh(response.data);
            } catch (error) {
                console.error('Error fetching chi nhánh:', error);
            } finally {
                // setLoading(false);
            }
        };
        fetchChiNhanh();
    }, []);

    return (
        <div>
            {/* {loading ? (
                <div>Loading...</div>
            ) : ( 
                chiNhanh.length > 0 ? (
                    
                ) : (
                    <div>Không có dữ liệu chi nhánh</div>
                )
            )} */}
            <h1>Danh sách chi nhánh</h1>
            <ul>
                {chiNhanh.map((branch) => (
                    <li key={branch.id}>
                        <h2>{branch.tenChiNhanh}</h2>
                        <p>{branch.diaChi}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Home;