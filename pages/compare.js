import About from "@/components/ui/About";
import Analysis from "@/components/ui/Analysis";
import Environment from "@/components/ui/Environment";
import Recommendation from "@/components/ui/Recommendation";
import SearchBar from "@/components/ui/SearchBar";
import SentimentalReview from "@/components/ui/SentimentalReview";
import YearlyReview from "@/components/ui/YearlyReview";
import { useEffect, useState } from "react";

function Compare(props) {
  const [brandOne, setBrandOne] = useState(null);
  const [brandTwo, setBrandTwo] = useState(null);
  const [selectedBrandId1, setSelectedBrandId1] = useState(null);
  const [selectedBrandId2, setSelectedBrandId2] = useState(null);

  const [yearlyAnsOneReview, setYearlyAnsOneReview] = useState(null);
  const [sentimentalAnsOneReview, setSentimentalAnsOneReview] = useState(null);
  const [environmentalAnsOneReview, setEnvironmentalAnsOneReview] = useState(null);

  const [yearlyAnsTwoReview, setYearlyAnsTwoReview] = useState(null);
  const [sentimentalAnsTwoReview, setSentimentalAnsTwoReview] = useState(null);
  const [environmentalAnsTwoReview, setEnvironmentalAnsTwoReview] = useState(null);

  useEffect(() => {
    setBrandOne(props?.brandOne);
    setSelectedBrandId1(props?.selectedBrandId1);
  }, []);

  return (
    <div className="insight_container flex w-full h-full overflow-y-auto gap-9  ">
      <div className="flex w-90 md:w-70 gap-4 m-auto ">
        {/* brand 1 */}

        <div className="w-50">
          <div className="insight__container   m-auto mt-9">
            <SearchBar setSelectedCompany={setBrandOne} setSelectedCompanyId={setSelectedBrandId1} selectedCompany={brandOne} />
          </div>
          {brandOne ? (
            <div className="insight___container about_section m-auto w-full flex flex-col gap-4 mb-3">
              <div className="relative border rounded-lg mt-6">
                <About selectedCompany={brandOne} />
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="border relative rounded-lg w-full flex  ">
                  <YearlyReview selectedCompany={brandOne} selectedCompanyId={selectedBrandId1} setYearlyAnsReview={setYearlyAnsOneReview} />
                </div>
                <div className="border relative rounded-lg w-full  flex  ">
                  <SentimentalReview selectedCompany={brandOne} setSentimentalAnsReview={setSentimentalAnsOneReview} />
                </div>
              </div>

              <div className="relative border rounded-lg">
                <Analysis
                  selectedCompany={props?.selectedCompany}
                  yearlyAnsReview={yearlyAnsOneReview}
                  sentimentalAnsReview={sentimentalAnsOneReview}
                  environmentalAnsReview={environmentalAnsOneReview}
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="border relative rounded-lg w-full flex  ">
                  <Environment selectedCompany={brandOne} setEnvironmentalAnsReview={setEnvironmentalAnsOneReview} />
                </div>
                <div className="border relative rounded-lg w-full flex  ">
                  <Recommendation selectedCompany={brandOne} selectedCompanyId={selectedBrandId1} />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-screen"> </div>
          )}
        </div>
        {/* brand 2 */}

        <div className="w-50">
          <div className="insight__container   m-auto mt-9">
            <SearchBar setSelectedCompany={setBrandTwo} setSelectedCompanyId={setSelectedBrandId2} selectedCompany={brandTwo} />
          </div>
          {brandTwo ? (
            <div className="insight___container about_section m-auto w-full flex flex-col gap-4 mb-3">
              <div className="relative border rounded-lg mt-6">
                <About selectedCompany={brandTwo} />
              </div>

              <div className="w-full flex flex-col  gap-3">
                <div className="border relative rounded-lg w-full flex  ">
                  <YearlyReview selectedCompany={brandTwo} selectedCompanyId={selectedBrandId2} setYearlyAnsReview={setYearlyAnsTwoReview} />
                </div>
                <div className="border relative rounded-lg w-full  flex  ">
                  <SentimentalReview selectedCompany={brandTwo} setSentimentalAnsReview={setSentimentalAnsTwoReview} />
                </div>
              </div>

              <div className="relative border rounded-lg">
                <Analysis
                  selectedCompany={props?.selectedCompany}
                  yearlyAnsReview={yearlyAnsTwoReview}
                  sentimentalAnsReview={sentimentalAnsTwoReview}
                  environmentalAnsReview={environmentalAnsTwoReview}
                />
                {/* <Analysis selectedCompany={props?.selectedCompany} yearlyAnsReview={yearlyAnsOneReview} sentimentalAnsReview={sentimentalAnsOneReview} environmentalAnsReview={environmentalAnsOneReview} /> */}
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="border relative rounded-lg w-full flex  ">
                  <Environment selectedCompany={brandTwo} setEnvironmentalAnsReview={setEnvironmentalAnsTwoReview} />
                </div>
                <div className="border relative rounded-lg w-full flex  ">
                  <Recommendation selectedCompany={brandTwo} selectedCompanyId={selectedBrandId1} />
                </div>
              </div>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  let brandOne = null;
  let selectedBrandId1 = null;

  if (req.cookies?.brandOne && req.cookies?.selectedBrandId1) {
    brandOne = req.cookies?.brandOne;
    selectedBrandId1 = req.cookies?.selectedBrandId1;
  }

  return {
    props: {
      navSelected: "Compare",
      brandOne: brandOne,
      selectedBrandId1: selectedBrandId1,
    },
  };
}

export default Compare;
