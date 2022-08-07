import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getServerSideProps } from "../pages/creator/[creator]"


const Page = ({ data }) => {
    const router = useRouter()
    const [sortByAsc, setSortByAsc] = useState(false)

    useEffect(() => {
        router.push({
            pathname: router.asPath,
            query: {
                sortby: sortByAsc
            }
        })
    }, [sortByAsc])

    useEffect(() => {
        // make api call to get specific data related to query
    }, [router.query])

    return (
        <>
            <button onClick={() => setSortByAsc(!sortByAsc)}>Toggle</button>
        {
            data.map(d => <Comp data={d} />)
        }
        </>
    )
}


export default function getServerSideProps(context) {
    // get default data
}


//----------------------------
const Comp = ({ data }) => {
    return (
        <div>
            {data}
        </div>
    )
}