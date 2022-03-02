import oc from 'open-color';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 33px;
`;

const ButtonEnable = styled.button`
    width: 100%;
    height: 100%;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    text-align: center;
    font-weight: 700;
`;

const ButtonDisabled = styled.button`
    width: 100%;
    height: 100%;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    text-align: center;
    font-weight: 700;
    background: ${oc.gray[1]};
`;


const Button = ({component, label, onClick}) => {
    if (component === false) {
        return(
            <Wrapper>
                <ButtonDisabled name={label} onClick={onClick} disabled>{label}</ButtonDisabled>
            </Wrapper>
        )
    } else {
        return(
            <Wrapper>
                <ButtonEnable name={label} onClick={onClick}>{label}</ButtonEnable>
            </Wrapper>
        )
    }
};


export default Button;