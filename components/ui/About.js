import { memo, useEffect, useState } from "react";
import Loading from "./Loading";
import TextAnimation from "./TextAnimation";


const About = memo((props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aboutContent, setAboutContent] = useState(null);

    useEffect(() => {
        setAboutContent(null)
        setIsLoading(true)
        getAbout()
    }, [props.selectedCompany])

    const getAbout = async () => {
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
            const data = await fetch("http://127.0.0.1:2023/brand/description", requestOptions);
            if (data.status === 200) {
                const response = await data.text();
                setAboutContent(response);
                setIsLoading(false);
            } else {
            }
        } catch (error) {
            console.log("Error occured while getting about", error);
        }
    }


    return (
        <>
            {isLoading &&
                <Loading />
            }

            <div className="about_container w-full">
                <h2 className="font-bold p-3 text-xl">About</h2>
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
                            <div style={{ maxHeight: "200px", height: "150px" }} >

                                <TextAnimation content={aboutContent} />
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
)
export default About;