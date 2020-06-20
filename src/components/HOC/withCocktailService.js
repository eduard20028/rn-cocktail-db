import React from 'react';
import CocktailServiceContext from '../../service/CocktailServiceContext';

const withCocktailService = (mapMethodsToProps) => (Wrapped) => {
    return(props) => {
        return(
            <CocktailServiceContext.Consumer>
                {
                    (CocktailService) => {
                        const serviceProps = mapMethodsToProps(CocktailService);
                        return(
                            <Wrapped {...props} {...serviceProps}/>
                        )
                    }
                }
            </CocktailServiceContext.Consumer>
        )
    };
}

export default withCocktailService;