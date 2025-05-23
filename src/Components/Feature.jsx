import { useEffect, useState } from "react";
import FeatureDetails from "./FeatureDetails";


const Feature = () => {
    const [features, setFeatures] = useState([]);

    useEffect(()=>{
        fetch('./feature.json')
        .then(res=>res.json())
        .then(data=>setFeatures(data))
    
    },[]);
    return (
         <div className="min-h-[400px] bg-[#0f1f60] ">
                <h2 className="text-4xl font-bold text-center text-white p-6">The best Beneficial Feature For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
    {
        features.map( feature=> <FeatureDetails feature={feature} key = {feature.featureId}></FeatureDetails>)
    }
    
    
                </div>
            </div>
    );
};

export default Feature;