import { COMPANIES } from "@/constants/pageConstants";
import Cookies from "js-cookie";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

function SearchBar(props) {

    const [isDropDown, setIsDropDown] = useState(false);


    const setDropDown = () => {
        if (isDropDown) {
            setIsDropDown(false);
        } else {
            setIsDropDown(true);
        }
    }


    return (
        <>
            <div className="flex gap-3 w-full relative " onClick={setDropDown} >
                <button onClick={setDropDown} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="w-full flex justify-between py-3 text-gray bg-gray-300 hover:bg-gray-400  focus:outline-none font-medium rounded-full text-sm px-4  text-center inline-flex items-center" type="button">
                    <div className="flex items-center gap-3">
                        <BiSearch size={25} color="grey" className="mt-1" />
                        {props?.selectedCompany ? props?.selectedCompany : "Select Company"}
                    </div><svg className="h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>
                {/* Dropdown */}
                {isDropDown &&
                    <div id="dropdownDelay" className="absolute w-full mt-14 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 overflow-y-auto" style={{ height: "200px", zIndex: 100 }}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 overflow-y-auto" aria-labelledby="dropdownDelayButton">
                            {
                                COMPANIES.map((company, index) => {
                                    return (
                                        <li className="px-2" key={index} onClick={() => {
                                            props?.setSelectedCompany(company.name);
                                            props?.setSelectedCompanyId(company.id);
                                            Cookies.set("brandOne", company.name);
                                            Cookies.set("selectedBrandId1", company.id);
                                            setIsDropDown(false)
                                        }} >
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-400 rounded-lg dark:hover:text-white" style={props?.selectedCompany === company.name ? { background: "gray" } : { background: "" }}
                                            >{company.name}</a>
                                        </li>
                                    )


                                })
                            }

                        </ul>
                    </div>
                }
            </div>

        </>
    )
}


export default SearchBar;