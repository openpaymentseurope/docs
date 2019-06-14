import React from 'react'
import { useCookies } from 'react-cookie';

function CookieConsent(props) {
    const [cookies, setCookie] = useCookies(['consent']);

    const hasConsent = () => {
        return cookies.consent === 'yes'
    }
    
    const consents = () => {
        setCookie('consent', 'yes')
    }
    
    if(hasConsent()) {
        return (<></>)
    }

    return (
        <div id="cookieConsent" className="alert alert-info alert-dismissible fade show" role="alert">
            We use cookies to increase your experience while visiting our site. <a href="/docs/cookies">Learn More</a>.
            <button type="button" className="accept-policy close" data-dismiss="alert" onClick={consents}>
                <span>Accept</span>
            </button>
        </div>
    )
}

export default CookieConsent
