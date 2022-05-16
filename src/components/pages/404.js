import React from 'react'
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 
                            'fontSize': '24px', 'margin': '0 auto', 'backgroundColor':'red',
                            'padding': '8px', 'width': '242px'}} to="/">Back to main MainPage</Link>
        </div>
    )
}

export default Page404;