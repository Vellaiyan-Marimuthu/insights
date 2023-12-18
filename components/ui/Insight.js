import { useState } from "react";
import About from "./About";
import Analysis from "./Analysis";
import Environment from "./Environment";
import Recommendation from "./Recommendation";
import SearchBar from "./SearchBar";
import SentimentalReview from "./SentimentalReview";
import YearlyReview from "./YearlyReview";

function Insight(props) {
    const [yearlyAnsReview, setYearlyAnsReview] = useState(null);
    const [sentimentalAnsReview, setSentimentalAnsReview] = useState(null);
    const [environmentalAnsReview, setEnvironmentalAnsReview] = useState(null);


    return (
        <div className="insight_container w-full h-full overflow-y-auto flex flex-col gap-9  ">
            <div className="insight__container  w-50 m-auto mt-9">
                <SearchBar selectedCompany={props?.selectedCompany} setSelectedCompany={props?.setSelectedCompany} setSelectedCompanyId={props?.setSelectedCompanyId} />
            </div>
            <div className="insight___container about_section m-auto w-70 flex flex-col gap-4 mb-3">
                <div className="relative border rounded-lg">
                    <About selectedCompany={props?.selectedCompany} />
                </div>

                <div className="w-full flex flex-col md:flex-row gap-3">
                    <div className="border relative rounded-lg w-full md:w-50 flex  ">
                        <YearlyReview setYearlyAnsReview={setYearlyAnsReview} selectedCompany={props?.selectedCompany} selectedCompanyId={props?.selectedCompanyId} />
                    </div>
                    <div className="border relative rounded-lg w-full md:w-50 flex  ">
                        <SentimentalReview setSentimentalAnsReview={setSentimentalAnsReview} selectedCompany={props?.selectedCompany} />
                    </div>

                </div>

                <div className="relative border rounded-lg">
                    <Analysis selectedCompany={props?.selectedCompany} yearlyAnsReview={yearlyAnsReview} sentimentalAnsReview={sentimentalAnsReview} environmentalAnsReview={environmentalAnsReview} />
                </div>

                <div className="w-full flex flex-col md:flex-row gap-3">
                    <div className="border relative rounded-lg w-full md:w-50 flex  ">
                        <Environment selectedCompany={props?.selectedCompany} setEnvironmentalAnsReview={setEnvironmentalAnsReview} />
                    </div>
                    <div className="border relative rounded-lg w-full md:w-50 flex  ">
                        <Recommendation selectedCompany={props?.selectedCompany} selectedCompanyId={props?.selectedCompanyId} />
                    </div>


                </div>


            </div>

        </div>
    )
}

export default Insight;