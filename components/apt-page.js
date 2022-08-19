import { useEffect, useState } from "react";

const AptPage = ({ page, results, setPage }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    const [pageOffset, setPageOffset] = useState(0)

    useEffect(() => {
        const maxpages = Math.floor(results/10) + 1
        const maxoffset = maxpages - 10
        var offset = 0;
        console.log('mo: ', maxoffset)
        if(page < 5) {
            offset = 0
        } else {
            offset = page - 5
        }
        if(offset > maxoffset) offset = maxoffset
        setPageOffset(offset)
    }, [page])
    
    useEffect(() => {
        var pns = Math.floor(results / 10)
        if (pns > 10) pns = 10
        var atp = Array.from(Array(pns).keys())
        const toadd = atp.map(p => p += pageOffset)
        setPageNumbers([...toadd])
    }, [pageOffset])

    if(pageNumbers) return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <button onClick={() => setPage(page-1)} className="button is-small" disabled={page === 1 ? true : false}>Prev</button>
            </div>
            <div className="column is-narrow mx-auto">
                {
                    pageNumbers ? pageNumbers.map(pn => 
                        <a onClick={() => setPage(pn+1)} className={`mx-5 ${pn+1 === page ? 'is-underlined' : ''}`}>{pn + 1}</a>) 
                        : ''
                }
            </div>
            <div className="column is-narrow">
                <button onClick={() => setPage(page+1)} className="button is-small" disabled={page === pageNumbers.length ? true : false}>Next</button>
            </div>

        </div>
    )
}

export default AptPage;