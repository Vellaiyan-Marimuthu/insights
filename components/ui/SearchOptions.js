import Cookies from "js-cookie"
import { useRouter } from "next/router";


function SearchOptions(props) {
    const router = useRouter();
    return (
        <div className="searchoptions_container flex gap-3 justify-center">
            <button className="border px-5 py-3 rounded-lg font-semibold hover:bg-purple-600 bg-purple-200 hover:text-white text-purple-600"
                onClick={() => {
                    if (props?.selectedCompany) {
                        Cookies.set("brandOne", props?.selectedCompany);
                        router.push("/compare")
                    }
                }}>Add to compare</button>
            <button className="border px-5 py-3 rounded-lg font-semibold hover:bg-purple-600 bg-purple-200 hover:text-white text-purple-600" onClick={() => {
                if (props.selectedCompany) {
                    props.setIsInsight(true)
                }
            }}>Insight!</button>
        </div>
    )
}

export default SearchOptions