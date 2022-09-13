import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'

const ContentSearch = ({contentResult}) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }

    const {hits = []} = contentResult
    return (
        <div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`/content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    //Make a call to the URL substituting Key Values from table
    const res = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/<Key Value: Site ID>/dw/shop/v20_2/content_search?q=about&client_id=<Key Value: Commerce API client ID>`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch


// import React from 'react'
// import fetch from 'cross-fetch'
// import {List, ListItem} from '@chakra-ui/react'
// import Link from '../../components/link'


// const ContentSearch = ({contentResult}) => {
//     if(!contentResult){
//         return <div>Loading...</div>
//     }
//     // return <div>Content Search</div>
//     return (
//         <div>
//             <h1>SearchResults</h1>
//             {hits.length ?(
//                 <List>
//                     {hits.map(({id, name})=>(
//                         <ListItem key={id}>
//                             <Link to={`/content/${id}`}>{name}</Link>
//                         </ListItem>
//                     ))}
//                 </List>
//             ):(
//                 <div>NoContentItemsFound!</div>
//             )}
//         </div>
//     )
// }
// const { hits = [] } = contentResult

// ContentSearch.getTemplateName = () => 'content-search'

// ContentSearch.getProps = async () => {

//     let contentResult
//     const res = await fetch(`http://localhost:3000/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content_search?q=about&client_id=${clientId}`)

//     if (res.ok) {
//         contentResult =await res.json()
//         console.log(contentResult)
//     }if (process.env.NODE_ENV !=='production') {
//         console.log(contentResult)
//     }
//     return {
//         contentResult
//     }
// }

// export default ContentSearch