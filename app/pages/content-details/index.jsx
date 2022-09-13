import React from 'react'
import fetch from 'cross-fetch'

import { HTTPError } from 'pwa-kit-react-sdk/ssr/universal/errors'

const ContentDetails = ({contentResult, error}) => {
    if (error) {
        return <div>{error.fault.message}</div>
    }
    if (!contentResult) {
        return <div>Loading...</div>
    }

    return <div dangerouslySetInnerHTML={{__html: contentResult.c_body}} />
}

ContentDetails.getProps = async ({params, res}) => {
    let contentResult, error
    const result = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/<Key Value: Site ID>/dw/shop/v20_2/content/${params.id}?client_id=<Key Value: Commerce API client ID>`
    )

    if (result.ok) {
        contentResult = await result.json()
    } else {
        error = await result.json()
        if (res) {
            res.status(result.status)
        }
    }
   return {contentResult, error}
}

ContentDetails.getTemplateName = () => 'content-details'

export default ContentDetails