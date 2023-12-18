import { useState } from "react";
import { IoMdClose } from "react-icons/io"

function Terms() {
    const [isTerms, setIsTerms] = useState(true);


    return (
        <>
            {isTerms &&
                < div className="terms_container  absolute w-30 md:w-30  overflow-y-auto right-0 top-20 mx-6 flex flex-col gap-3 border rounded-lg p-2" style={{
                    background: "#E6F3F8", zIndex: 3
                }}>
                    <div className="terms__container terms_header flex justify-between items-center">
                        <h2 className="font-bold">Disclaimer</h2>
                        <IoMdClose className="mt-1 hover:rounded-full hover:bg-blue-200 cursor-pointer hover:border" size={20} onClick={() => setIsTerms(false)} />
                    </div>
                    <div className="terms___container overflow-y-auto" >
                        <p>
                            By using the website you agree that the data generated through AI is provided for informational purposes only and should not be relied upon as entirely accurate. Users of the data should exercise caution and evaluate the information before making any decisions.
                        </p>
                    </div>
                </div >
            }

        </>
    )
}

export default Terms