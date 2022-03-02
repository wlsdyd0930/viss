import oc from 'open-color';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 33px;
`;

const LeftDiv = styled.div`
    width: 12%;
    height: 100%;
    float: left;
`;
const RightDiv = styled.div`
    width: 85%;
    height: 100%;
    float: left;
`;
const LabelText = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    text-align: center;
    font-weight: 700;
`;
const InputEnabled = styled.input`
    width: 100%;
    height: 100%;
    padding: 0px;
    padding-left: 10px;
    font-size: 0.7rem;
    border: 1px solid;
    border-radius: 3px;
    box-sizing : border-box;
`;

const InputDisabled = styled.input`
    width: 100%;
    height: 100%;
    padding: 0px;
    padding-left: 10px;
    font-size: 0.7rem;
    border: 1px solid;
    border-radius: 3px;
    border-color: ${oc.gray[1]};
    background: ${oc.gray[1]};
    box-sizing : border-box;
`;



const Input = ({component, label, ...rest}) => {
    if (component === true) {
        return(
            <Wrapper>
                <LeftDiv>
                    <LabelText>{label}</LabelText>
                </LeftDiv>
                <RightDiv>
                    <InputEnabled {...rest} />
                </RightDiv>
            </Wrapper>
        )  
    } else {
        return(
            <Wrapper>
                <LeftDiv>
                    <LabelText>{label}</LabelText>
                </LeftDiv>
                <RightDiv>
                    <InputDisabled {...rest} disabled/>
                </RightDiv>
            </Wrapper>
        )  
    }
};


export default Input;