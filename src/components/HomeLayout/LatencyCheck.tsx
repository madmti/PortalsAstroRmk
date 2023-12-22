
export default function LatencyCheck(){

    return(
        <>
            <small style={{display:'grid', placeItems:'center',width:'2rem', height:'2rem', borderRadius:'0.5rem'}}>
                <img src="/wifi.svg" height='15' width='15' alt="" />
            </small>
            <small style={{fontSize:'0.8rem'}} className="ms">
                0ms
            </small>
        </>
    )
}