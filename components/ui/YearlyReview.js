import { Hint, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import Loading from "./Loading";
import { memo, useContext, useEffect, useReducer, useState } from "react";
import { getApplicationInitialState, getApplicationReducer } from "@/context/applicationContext";

const YearlyReview = memo((props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [yearlyReview, setYearlyReview] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getYearlyReview();
  }, [props.selectedCompanyId]);

  const getYearlyReview = async (id) => {
    try {
      const data = await fetch(`https://www.ambitionbox.com/api/v2/reviews/ratings-trend/${props.selectedCompanyId}`, {});
      if (data.status === 200) {
        const result = await data.json();
        const yearlyReview = await result.data.Trend;
        props?.setYearlyAnsReview(yearlyReview);
        setTimeout(() => {
          setIsLoading(false);
          const review = [
            { x: 2019, y: result.data.Trend["2019"] },
            { x: 2020, y: result.data.Trend["2020"] },
            { x: 2021, y: result.data.Trend["2021"] },
            { x: 2022, y: result.data.Trend["2022"] },
            { x: 2023, y: result.data.Trend["2023"] },
            { x: 2023, y: result.data.Trend["2023"] },
          ];

          setYearlyReview(review);
        }, 3000);
      }
    } catch (e) {
      console.log("Error occured while fetching yearly review", e);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className=" flex flex-col text-lg font-bold rounded-lg w-full " style={{ height: "370px" }}>
        <h2 className="font-bold p-3 text-xl">Yearly Review</h2>
        {yearlyReview !== null && (
          <div className="flex justify-center w-full">
            <XYPlot width={300} height={300} xDomain={[2019, 2024]}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <LineSeries animation data={yearlyReview} />
            </XYPlot>
          </div>
        )}
      </div>
    </>
  );
});

export default YearlyReview;
