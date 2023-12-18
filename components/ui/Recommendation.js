import { memo, useEffect, useState } from "react";
import Loading from "./Loading";
import TextAnimation from "./TextAnimation";

const Recommendation = memo((props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendationContent, setRecommendationContent] = useState(null);

    useEffect(() => {
        setRecommendationContent(null)
        setIsLoading(true)
        getRecommendation()
    }, [props.selectedCompany])

    const getRecommendation = async (brand) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const params = {
            brand: props?.selectedCompany
        }

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(params),
            redirect: "follow",
        };
        try {
            const data = await fetch("http://127.0.0.1:2023/brand/recommendation", requestOptions);
            if (data.status === 200) {
                const response = await data.text();
                setRecommend(response);
            }
        } catch (error) {
            console.log("Error occured while getting recommendation ", error);
        }

    }

    const setRecommend = (response) => {
        const recommendedList = [];
        const feedbackLines = response.split('\n').slice(1) || [];
        for (const line of feedbackLines) {
            const index = parseInt(line.split('. ')[0]);
            const feedback = line.split('. ')[1];
            recommendedList[index - 1] = feedback;
        }
        setIsLoading(false)
        setRecommendationContent(recommendedList);
    }


    return (
        <>
            {isLoading &&
                <Loading />
            }

            <div className="about_container w-full">
                <h2 className="font-bold p-3 text-xl">Recommendations</h2>
                {isLoading ? (

                    <div role="status" className="max-w-sm animate-pulse px-5 w-full">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-90 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-70 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-50 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-90"></div>
                    </div>
                ) :
                    (
                        <ul className="list-disc pl-6  overflow-y-auto" style={{ maxHeight: "400px" }}>
                            {recommendationContent?.map((item, index) => (
                                <li key={index}><TextAnimation content={item} /></li>
                            ))}
                        </ul>
                    )
                }

            </div>
        </>
    )
})

export default Recommendation;