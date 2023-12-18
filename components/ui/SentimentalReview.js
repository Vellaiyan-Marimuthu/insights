import { memo, useEffect, useState } from "react";
import { RadialChart } from "react-vis";
import Loading from "./Loading";


const SentimentalReview = memo((props) => {
    const [sentimentalReview, setSentimentalReview] = useState(null);
    const [visualData, setVisualData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getSentiments()
    }, [props?.selectedCompany])


    const getSentiments = async (brand) => {
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
            const data = await fetch("http://127.0.0.1:2023/brand/sentimentAnalysis", requestOptions);
            if (data.status === 200) {
                const response = await data.json();
                const startIndex = response.data.indexOf('{');
                const endIndex = response.data.lastIndexOf('}');
                const result = response.data.substring(startIndex, endIndex + 1);
                const review = JSON.parse(result);
                props?.setSentimentalAnsReview(review);
                // const customEvent = new CustomEvent("sentimentalReview", { detail: review })
                // document.dispatchEvent(customEvent);
                setSentimentalReview(review);
            } else {
            }

        } catch (error) {
            console.log("Error occured while getting sentimental review", error)
        }


    }

    useEffect(() => {
        if (sentimentalReview !== null) {
            generateVisualData()
        }
    }, [sentimentalReview])

    const generateVisualData = () => {

        const positive = Math.round(parseFloat(sentimentalReview.positive));
        const negative = Math.round(parseFloat(sentimentalReview.negative));
        const neutral = Math.round(parseFloat(sentimentalReview.neutral));
        const data = [
            { quarter: 1, angle: positive, label: positive + "%" },
            { quarter: 2, angle: negative, label: negative + "%" },
            { quarter: 3, angle: neutral, label: neutral + "%" },
        ]
        setVisualData(data);
        setIsLoading(false);

    }
    return (
        <>
            {isLoading &&
                <Loading />
            }
            <div className="relative flex flex-col text-lg font-bold rounded-lg w-full " >
                <div className="p-3">
                    <h2>Sentiment Analysis</h2>
                    <div className="flex justify-center w-full " style={{ height: "300px" }}>
                        {visualData &&
                            <RadialChart data={visualData} width={300} className="mb-3"
                                animation
                                height={300}
                            />
                        }

                    </div>
                    <div className="flex justify-end">
                        <div className="text-sm px-2 py-1 legent-container">
                            <div className="flex items-center gap-2">
                                <div className="border  " style={{ background: "#79c7e3", width: "15px", height: "15px" }}></div>
                                <p>Positive - {sentimentalReview?.positive}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="border items-center gap-2" style={{ background: "#1a3177", width: "15px", height: "15px" }}></div>
                                <p>Negative - {sentimentalReview?.negative}</p>

                            </div>
                            <div className="flex items-center gap-2">
                                <div className="border " style={{ background: "#12939a", width: "15px", height: "15px" }}></div>
                                <p>Neutral - {sentimentalReview?.neutral}</p>

                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
})

export default SentimentalReview;