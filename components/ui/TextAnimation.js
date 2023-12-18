import { useEffect, useState } from "react";

function TextAnimation(props) {

    const [content, setContent] = useState("")

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setContent(props?.content?.substring(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex === props?.content?.length) {
                clearInterval(intervalId);
            }
        }, 10);
        return () => clearInterval(intervalId);
    }, [props]);

    return (
        < p className="overflow-y-auto">
            {content}
        </p>
    )
}

export default TextAnimation;
