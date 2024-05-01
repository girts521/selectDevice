import * as React from "react"

export default function Result() {
    const [params, setParams] = React.useState({})

    React.useEffect(() => {
        const newParams = JSON.parse(localStorage.getItem('params'));
        if (newParams) {
            setParams(newParams)
        }
    },[])

    React.useEffect(() => {
        console.log("params: ",params)
    },[params])

    return (
        <>
        <h1>result</h1>
        </>
    )
}