import { memo, useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import TextAnimation from "./TextAnimation";
import { ApplicationContext } from "@/context/applicationContext";


const Analysis = memo((props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (props.yearlyAnsReview && props.sentimentalAnsReview && props.environmentalAnsReview) {
            setIsLoading(false);
        }

    }, [props.yearlyAnsReview, props.sentimentalAnsReview, props.environmentalAnsReview])

    useEffect(() => {
        setIsLoading(true);
    }, [props?.selectedCompany])

    const fresherAnalysis = () => {
        if (Math.round(parseFloat((props?.sentimentalAnsReview.positive)) > 70)) {
            return true
        } else {
            return false;
        }

    }

    const cultureAnalysis = () => {
        if ((JSON.parse(props.environmentalAnsReview).workCulture) > 3.5) {
            return true;
        } else {
            return false;
        }
    }

    const jobSatisfactionAndSalaryBenefitsAnalysis = () => {
        if ((JSON.parse(props.environmentalAnsReview).salaryAndBenefits) > 3.5 && ((JSON.parse(props.environmentalAnsReview).jobSatisfaction) > 3.5)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            {isLoading &&
                <Loading />
            }
            <div className="about_container w-full">
                <h2 className="font-bold p-3 text-xl">Insights to the Prospects</h2>
                {isLoading ? (

                    <div role="status" className="max-w-sm animate-pulse px-5 w-full mt-3">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-90 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-70 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-50 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-90"></div>
                    </div>
                ) :
                    (
                        <div className="about__container about_content px-4 overflow-y-auto">
                            <div style={{ maxHeight: "200px", height: "150px" }} className="flex flex-col gap-3" >
                                <div><p className="font-semibold">Based on the above analysis:</p></div>
                                <div className=" w-full gap-2 px-4"><p>If you are a fresher then {fresherAnalysis() ? (<span>You can choose this company</span>) : (<span>it's better to choose another company</span>)}</p> </div>
                                <div className=" w-full gap-2 px-4"><p>If you are looking for better work culture then {cultureAnalysis() ? (<span>You can choose this company</span>) : (<span>it's better to choose another company</span>)}</p> </div>
                                <div className=" w-full gap-2 px-4"><p>If you looking for better salary and job satisfaction then  {jobSatisfactionAndSalaryBenefitsAnalysis() ? (<span>You can choose this company</span>) : (<span>it's better to choose another company</span>)}</p> </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
})
export default Analysis;