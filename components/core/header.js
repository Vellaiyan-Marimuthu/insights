import { NAV_OPTIONS } from "@/constants/pageConstants";
import { useRouter } from "next/router";
import Terms from "../ui/Terms";


function Header(props) {
    const router = useRouter();
    return (
        <>
            <div className="header_container border px-5 flex items-center justify-between relative ">
                <div className="header__container appLogo_section">
                    <img src="/icons/nav-Logo.svg" />
                </div>
                <div className="header___container options_section">

                    <ul className="header____container  options__section options flex gap-5 ">
                        {
                            NAV_OPTIONS.map((option, index) => {
                                return (
                                    <li key={index} className="rounded-lg m-auto cursor-pointer" style={(props.navSelected === option?.name) ? { color: "black", fontWeight: 700 } : { color: "grey" }}
                                        onClick={() => router.push(option.goto)}>
                                        {option.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="header_____container user_profile">
                    <img width="60px" src="/images/default-profile.png"></img>
                </div>

                <Terms />


            </div >

            <style jsx>{`
            .header_container {
                width: 100%;
                height: 70px;
            }
            `
            }
            </style>

        </>
    )
}

export default Header