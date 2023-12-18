import { memo, useEffect, useReducer, useState } from "react";
import { RadialChart } from "react-vis";
import Loading from "./Loading";
import { HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import { getApplicationInitialState, getApplicationReducer } from "@/context/applicationContext";



const Environment = memo((props) => {
    const [environmentalReview, setEnvironmentalReview] = useState(null);
    const [visualData, setVisualData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        getEnvironment();
    }, [props.selectedCompany])


    const getEnvironment = async (brand) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const params = {
            brand: props.selectedCompany
        }

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(params),
            redirect: "follow",
        };
        try {
            const data = await fetch("http://127.0.0.1:2023/brand/environment", requestOptions);
            if (data.status === 200) {
                const response = await data.json();
                const startIndex = response.data.indexOf('{');
                const endIndex = response.data.lastIndexOf('}');
                const result = await response.data.substring(startIndex, endIndex + 1);
                props?.setEnvironmentalAnsReview(result);
                setEnvironmentalReview(JSON.parse(result));
                // const customEvent = new CustomEvent("environmentalReview", { detail: JSON.parse(result) })
                // document.dispatchEvent(customEvent);
            } else {

            }
        } catch (error) {
            console.log("Error occured while getting environment", error);
        }


    }

    useEffect(() => {
        if (environmentalReview !== null) {
            generateVisualData()
        }
    }, [environmentalReview])

    const generateVisualData = () => {
        if (environmentalReview !== null) {
            const data =
                [
                    { x: 'JS', y: environmentalReview?.jobSatisfaction },
                    { x: 'JSec', y: environmentalReview?.jobSecurity },
                    { x: 'WC', y: environmentalReview?.workCulture },
                    { x: "SAB", y: environmentalReview?.salaryAndBenefits }
                ]
            setIsLoading(false);

            setVisualData(data);
        }
    }

    const findColor = (value) => {

        if (value <= 3 && value >= 2.5) {
            return "red"
        } else if (value > 3 && value < 3.5) {
            return "orange"
        } else {
            return "green"
        }

    }
    return (
        <>
            {isLoading &&
                <Loading />
            }

            <div className="relative  w-full flex flex-col text-lg font-bold   rounded-lg " >
                <div className="p-3">
                    <h2>Performance Metrics</h2>
                    <div className="flex justify-center" style={{ height: "300px" }}>
                        {visualData &&
                            <XYPlot xType="ordinal" width={300} height={300}>
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis tickSize={10} />
                                <YAxis tickSize={10} />
                                <VerticalBarSeries
                                    data={visualData}
                                    animation
                                />
                            </XYPlot>
                        }

                    </div>
                    <div className="flex  justify-end w-full">
                        <div className="text-sm right-0   bottom-0 px-2 py-1 legent-container">
                            <div className="flex items-center gap-2">
                                <div className="border  " style={{ background: "#12939a", width: "15px", height: "15px" }}></div>
                                <p style={{ color: findColor(environmentalReview?.jobSatisfaction) }}>JS - Job Satisfaction ({environmentalReview?.jobSatisfaction})</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="border items-center gap-2" style={{ background: "#12939a", width: "15px", height: "15px" }}></div>
                                <p style={{ color: findColor(environmentalReview?.jobSecurity) }}>JSec - Job Security ({environmentalReview?.jobSecurity})</p>

                            </div>
                            <div className="flex items-center gap-2">
                                <div className="border " style={{ background: "#12939a", width: "15px", height: "15px" }}></div>
                                <p style={{ color: findColor(environmentalReview?.workCulture) }}>WC - Work Culture ({environmentalReview?.workCulture})</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="border " style={{ background: "#12939a", width: "15px", height: "15px" }}></div>
                                <p style={{ color: findColor(environmentalReview?.salaryAndBenefits) }}>SAB - Salary & Benefits ({environmentalReview?.salaryAndBenefits})</p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
)
export default Environment;