import React from "react";

const Page = (props) => {
    return (
        <div className="flex justify-center" style={{backgroundColor: "#86C649"}}>
            <div className="w-[480px] bg-white h-screen">{props.children}</div>
        </div>
    )
}

export default Page