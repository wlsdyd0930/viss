import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';


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

// const Wrapper = styled.div`
//     width: 150px;
//     & + & {
//         margin-top: 1rem;
//     }
// `;

const Select = styled.select`
    width: 100%;
    height: 100%;
    padding: 0px;
    padding-left: 8px;
    font-size: 0.7rem;
    border: 1px solid;
    border-radius: 3px;
    line-height: 2.5rem;
    font-size: 0.8rem;
    ::placeholder {
        color: ${oc.gray[3]};
    }
`;


const Option = styled.option`
    width: 100%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 3px;
    line-height: 2.5rem;
    font-size: 0.8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placeholder {
        color: ${oc.gray[3]};
    }
`;

const DropDown = ({id, label, options, onChange}) => {
    let option_component = options.map((option) => {
        return (
            <Option key={option} value={option}>{option}</Option>
        )
    })
    if (label !== '') {
        return(
            <Wrapper>
                <LeftDiv>
                    <LabelText>{label}</LabelText>
                </LeftDiv>
                <RightDiv>
                    <Select id={id} onChange={onChange}>
                        {option_component}
                    </Select>
                </RightDiv>
            </Wrapper>
        )  
    } else {
        return(
            <Wrapper>
                <RightDiv style={{ width: "100%"}}>
                    <Select id={id} onChange={onChange}>
                        {option_component}
                    </Select>
                </RightDiv>
            </Wrapper>
        )  
    }
};

export default DropDown;