/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import DropDown from './DropDown'
import Label from './Label'
import Input from './Input'
import Button from './Button'


const Div = styled.div`
`;

const Hr = styled.hr`
`;

const Wrapper = styled.div`
    width: 100%;
    background-color: lemonchiffon;
    margin-bottom: 20px;
`;



const HTTPS = ({config}) => {
    let [mode, modeChange] = useState("")
    let [res, resChange] = useState([])
    let [req, reqChange] = useState([])
    let [status, stChange] = useState("")
    let [token, tkChange] = useState("")
    let [header_, hdChange] = useState([])
    let [result, rsChange] = useState("")
    let [token_info, setTokenInfo] = useState(
        {
            'username': '',
            'password': '',
            'component': true
        }
    )
    let [viss_data, setVISSInfo] = useState(
        {
            'action': '',
            'authorization': '',
            'path': '',
            'type': '',
            'value': ''
        }
    )

    let [message, setMessage] = useState(
        [
            'Select',
            'Read', 
            'Update',
            'Read (Authorized)', 
            'Update (Authorized)'
        ]
    )

    let [type, setType] = useState(
        [
            'Select',
            'paths',
            'history',
            'static-metadata',
            'dynamic-metadata'
        ]
    )

    let [dynamic_metadata, setDynamicMetadata] = useState(
        [
            'True',
            'False'
        ]
    )

    let [value_component, setValueComponent] = useState('')
    let [add_value_component, setAddValueComponent] = useState('')
    let [delete_value_component, setDeleteValueComponent] = useState('')

    const handleChange = (e) => {

        if (e.target.value === 'Select') {
            modeChange("")
          }
        else if (e.target.value === "Read") {
            modeChange("Read")
            viss_data.action = 'GET'
        } else if (e.target.value === "Update") {
            modeChange("Update")
            viss_data.action = 'POST'
        } else if (e.target.value === "Read (Authorized)") {
            modeChange("Read (Authorized)")
            viss_data.action = 'GET'
            // viss_data.request_id = Math.floor(Math.random() * 100000001);
        } else if (e.target.value === "Update (Authorized)") {
            modeChange("Update (Authorized)")
            viss_data.action = 'POST'
        } 

        setTokenInfo(
            {
                'username': '',
                'password': '',
                'component': true
            }
        )
        
        viss_data.authorization = ''
        viss_data.path = ''
        viss_data.type = ''
        viss_data.value = ''

        setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
        reqChange([])
        hdChange([])
        resChange([])
        stChange('')
        rsChange('')
    }

    const handleChangeType = (e) => {

        viss_data.type = e.target.value
        setValueComponent('')
        
        if (e.target.value === 'paths') {
            viss_data.value = ['']
        } else if (e.target.value === "history") {
            viss_data.value = {
                'day':'',
                'hour':'',
                'minute':'',
                'second':''
            }
        } else if (e.target.value === "static-metadata") {
            viss_data.value = ''
        } else if (e.target.value === "dynamic-metadata") {
            viss_data.value = {
                'samplerate': 'True',
                'availability': 'True',
                'validate': 'True'
            }
        } 

        setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
        reqChange([])
        hdChange([])
        resChange([])
        stChange('')
        rsChange('')
    }

    const handleChangeInput = (e) => {
        if (e.target.name === 'token_id') {
            token_info.username = e.target.value
            setTokenInfo(JSON.parse(JSON.stringify(token_info)))
        } else if (e.target.name === 'token_password') {
            token_info.password = e.target.value
            setTokenInfo(JSON.parse(JSON.stringify(token_info)))
        } else if (e.target.name === 'path') {
            viss_data.path = e.target.value
            setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
        } else if (e.target.name === 'value') {
            if (viss_data.type === 'paths') {
                viss_data.value[e.target.id] = e.target.value
            } else if (viss_data.type === 'history') {
                if (e.target.id === 'Value (Day)') {
                    viss_data.value['day'] = e.target.value
                } else if (e.target.id === 'Value (Hour)') {
                    viss_data.value['hour'] = e.target.value
                } else if (e.target.id === 'Value (Minute)') {
                    viss_data.value['minute'] = e.target.value
                } else if (e.target.id === 'Value (Second)') {
                    viss_data.value['second'] = e.target.value
                }
            } else {
                viss_data.value = e.target.value
            }
        } 
        console.log(viss_data)
        setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
    }

    const handleChangeDynamicMetadata = (e) => {
        viss_data.value[e.target.id] = e.target.value
        setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
    }

    useEffect(() => {
        // console.log("MODE CHANGED TO => ",mode)
        // mode가 바뀔 때 실행할 것을 지정 === mode가 바뀔 때는 재 렌더링이 안되도록 함 ! === mode가 바뀔 때는 
    }, [mode])

    useEffect(() => {
        let temp_value_component
        setAddValueComponent('')
        setDeleteValueComponent('')
        if (viss_data.type === 'paths') {
            temp_value_component = viss_data.value.map((k, i) => {
                return(
                    <Div>
                        <Input
                            key={i}
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id={i}
                            label={"Filter Value " + (i+1)}
                            onChange={handleChangeInput}
                        />
                    </Div>
                )
            })
            setAddValueComponent(                        
                <Div>
                    <Button 
                        label="Add Value"
                        onClick={function (e) {
                            viss_data.value.push('')
                            setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
                        }}>
                    </Button>
                </Div>
            )
            setDeleteValueComponent(                        
                <Div>
                    <Button 
                        label="Delete Value"
                        onClick={function (e) {
                            viss_data.value.pop()
                            setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
                        }}>
                    </Button>
                    <Hr />
                </Div>
            )
        } else if (viss_data.type === "history") {
            temp_value_component = () => {
                return(
                    <Div>
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id='Value (Day)'
                            label="Value (Day)"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id='Value (Hour)'
                            label="Value (Hour)"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id='Value (Minute)'
                            label="Value (Minute)"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id='Value (Second)'
                            label="Value (Second)"
                            onChange={handleChangeInput}
                        />
                    </Div>
                )
            }
        } else if (viss_data.type === "static-metadata") {

        } else if (viss_data.type === "dynamic-metadata") {
            temp_value_component = () => {
                return(
                    <Div>
                        <DropDown id="samplerate" label="Samplerate" options={dynamic_metadata} onChange={handleChangeDynamicMetadata} />
                        <DropDown id="availability" label="Availability" options={dynamic_metadata} onChange={handleChangeDynamicMetadata} />
                        <DropDown id="validate" label="Validate" options={dynamic_metadata} onChange={handleChangeDynamicMetadata} />
                    </Div>
                )
            }
        }
        setValueComponent(temp_value_component)
    }, [viss_data])

    const getResponseHeaderMap = (xhr) => {
        const headers = {};
        xhr.getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/)
            .map(value => value.split(/: /))
            .forEach(keyValue => {
                headers[keyValue[0].trim()] = keyValue[1].trim();
            });
        return headers;
    }

    const getAccessToken = (token_info) => {
        var xhttp = new XMLHttpRequest();
        // REST API 
        let request = "POST"
        let path = "api/token"
        let url = config.VISS_PROTOCOL + config.VISS_HOST + "/" + path
        // let url = "https://" + addr + "/" + path
        let data = new FormData();
        data.append('username', token_info.username);
        data.append('password', token_info.password);

        xhttp.open(request, url, false);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response_data = JSON.parse(this.response);
                // access_token = response_data['access']
                token = response_data['access']
                var header = getResponseHeaderMap(this)
                //header
                var header = getResponseHeaderMap(this)
                var tmp_hd = []
                for (var key in header) {
                    tmp_hd.push(key + " : " + header[key])
                }
                hdChange(tmp_hd)
                rsChange("SUCCESS")
                token_info.component = false
                viss_data.authorization = JSON.parse(this.response)['access']
                setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
                //header
            } else if (this.readyState == 4) {
                //status 자체가 404인 경우 
                console.log("status(404 expected) : ", this.status, ", error")
                var status_msg = "HTTP/1.1 " + this.status + " " + this.statusText
                stChange(status_msg)
                resChange([this.response])
                rsChange("FAILURE")
                console.log(result)
            }
        };
        xhttp.send(data);
    }


    const executeRestAPI = (button_name) => {
        var xhttp = new XMLHttpRequest();
        // REST API 
        let dict_data = {}
        let action = viss_data.action
        let path = viss_data.path
        let url = config.VISS_PROTOCOL + config.VISS_HOST + "/" + path
        // let url = "https://" + addr + "/" + path
        console.log(url)
        let header = {}
        let params = ""

        if (button_name == 'Get Data') {
            if (viss_data.type === 'paths') {
                if (viss_data.value.length == 1) {
                    params = {'type': viss_data.type, 'value': viss_data.value[0]}
                } else {
                    params = {'type': viss_data.type, 'value': viss_data.value}
                }
            } else if (viss_data.type === 'history') {
                let value = 'P'
                if (viss_data.value.day !== '') {
                    value += viss_data.value.day + 'D'
                }
                if (viss_data.value.hour !== '' || viss_data.value.minute !== '' || viss_data.value.second !== '') {
                    value += 'T'
                }
                if (viss_data.value.hour !== '') {
                    value += viss_data.value.hour + 'H'
                }
                if (viss_data.value.minute !== '') {
                    value += viss_data.value.minute + 'M'
                }
                if (viss_data.value.second !== '') {
                    value += viss_data.value.second + 'S'
                }
                params = {'type': viss_data.type, 'value': value}
            } else if (viss_data.type === 'static-metadata') {
                params = {'type': viss_data.type, 'value': ''}
            } else if (viss_data.type === 'dynamic-metadata') {
                console.log(viss_data.value)
                let value = []
                for (let dynamic_metadata_type in viss_data.value) {
                    console.log(dynamic_metadata_type)
                    if (viss_data.value[dynamic_metadata_type] == 'True'){
                        value.push(dynamic_metadata_type)
                    }
                }
                
                params = {'type': viss_data.type, 'value': value}
            }
        } 
        if (params !== '') {
            console.log(JSON.stringify(params))

            params = 'filter=' + JSON.stringify(params)
            console.log(params)
        }

        if (params.length > 0) {
            url = url + "?" + params
            path = path + "?" + params
        }
        var tmp = []
        tmp.push(action + " /" + path + " HTTP/1.1")
        tmp.push(config.VISS_HOST)

        console.log(params)
        xhttp.open(action, url, true);
        if (mode === "Read (Authorized)" || mode === "Update (Authorized)") {
            header['Authorization'] = 'Bearer ' + viss_data.authorization
            for (let key in header) {
                xhttp.setRequestHeader(key, header[key]);
            }
        }

        if (action === "GET") {
            xhttp.send();
            reqChange(tmp)
        } else if (action === "POST") {
            let data = new FormData();
            data.append('value', viss_data.value);
            dict_data = { 'value': viss_data.value }
            tmp.push(JSON.stringify(dict_data))
            reqChange(tmp)
            xhttp.send(data);
        }

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response_data = JSON.parse(this.response);
                console.log(response_data)
                //header
                var header = getResponseHeaderMap(this)
                var tmp_hd = []
                for (var key in header) {
                    tmp_hd.push(key + " : " + header[key])
                }
                hdChange(tmp_hd)
                //header

                var status_msg = "HTTP/1.1 " + this.status + " " + this.statusText
                if (JSON.stringify(response_data).includes("error") & !JSON.stringify(response_data).includes("\"availability\":\"error\"")) {
                    //status가 200인데 실제로 error인 상황
                    status_msg = "HTTP/1.1 " + response_data.data.error["Error Code"]
                    stChange(status_msg)
                    resChange([this.response])
                    rsChange("FAILURE")
                } else {
                    stChange(status_msg)
                    resChange([this.response])
                    rsChange("SUCCESS")
                }
            } else if (this.readyState == 4) {
                //status 자체가 404인 경우 
                console.log("status(404 expected) : ", this.status, ", error")
                var status_msg = "HTTP/1.1 " + this.status + " " + this.statusText
                stChange(status_msg)
                resChange([this.response])
                rsChange("FAILURE")
            }
        };
    }

    const retMode = () => {
        if (mode === "Read") {
            return (      
                <Div>
                    <Hr />
                    <Wrapper>
                        <Input
                            type="text" 
                            name="action"
                            placeholder="Action"
                            value={viss_data.action}
                            component={false}
                            label="Action"
                        />
                        <Input
                            type="text" 
                            name="path"
                            placeholder="Path"
                            value={viss_data.path}
                            component={true}
                            label="Path"
                            onChange={handleChangeInput}
                        />
                        <DropDown label="Type" options={type} onChange={handleChangeType} />
                        {value_component}
                        {add_value_component}
                        {delete_value_component}
                        <Button 
                            label="Get Data"
                            onClick={function (e) {
                                executeRestAPI(e.target.name)
                            }}>
                        </Button>
                    </Wrapper> 
                    <Hr /> 
                </Div>
            )
        } else if (mode === "Update") {
            return(
                <Div>
                    <Hr />
                    <Wrapper>
                        <Input
                            type="text" 
                            name="action"
                            placeholder="Action"
                            value={viss_data.action}
                            component={false}
                            label="Action"
                        />
                        <Input
                            type="text" 
                            name="path"
                            placeholder="Path"
                            value={viss_data.path}
                            component={true}
                            label="Path"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data.value}
                            component={true}
                            label="Value"
                            onChange={handleChangeInput}
                        />
                        <Button 
                            label="Set Data"
                            onClick={function (e) {
                                executeRestAPI(viss_data)
                            }}>
                        </Button>
                    </Wrapper>  
                    <Hr />
                </Div>
            )
        } else if (mode === "Read (Authorized)") {
            return (      
                <Div>
                    <Hr />
                    <Wrapper>
                        <Input
                            type="text" 
                            name="token_id"
                            placeholder="ID"
                            value={token_info.username}
                            component={token_info.component}
                            label="ID"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="token_password"
                            placeholder="Password"
                            value={token_info.password}
                            component={token_info.component}
                            label="Password"
                            onChange={handleChangeInput}
                        />
                        <Button 
                            label="Get Token"
                            onClick={function (e) {
                                getAccessToken(token_info)
                                resChange([token])
                            }}>
                        </Button>
                    </Wrapper>
                    <Hr />
                    <Wrapper>
                        <Input
                            type="text" 
                            name="action"
                            placeholder="Action"
                            value={viss_data.action}
                            component={false}
                            label="Action"
                        />
                        <Input
                            type="text" 
                            name="authorization"
                            placeholder="Authorization "
                            value={viss_data.authorization}
                            component={false}
                            label="Authorization"
                        />
                        <Input
                            type="text" 
                            name="path"
                            placeholder="Path"
                            value={viss_data.path}
                            component={true}
                            label="Path"
                            onChange={handleChangeInput}
                        />
                        <DropDown label="Type" options={type} onChange={handleChangeType} />
                        {value_component}
                        {add_value_component}
                        {delete_value_component}
                        <Button 
                            label="Get Data"
                            onClick={function (e) {
                                executeRestAPI(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>  
                    <Hr />
                </Div>
            )
        } else if (mode === "Update (Authorized)") {
            return (      
                <Div>
                    <Hr />
                    <Wrapper>
                        <Input
                            type="text" 
                            name="token_id"
                            placeholder="ID"
                            value={token_info.username}
                            component={token_info.component}
                            label="ID"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="token_password"
                            placeholder="Password"
                            value={token_info.password}
                            component={token_info.component}
                            label="Password"
                            onChange={handleChangeInput}
                        />
                        <Button 
                            label="Get Token"
                            onClick={function (e) {
                                getAccessToken(token_info)
                                resChange([token])
                            }}>
                        </Button>
                    </Wrapper>
                    <Hr />
                    <Wrapper>
                        <Input
                            type="text" 
                            name="action"
                            placeholder="Action"
                            value={viss_data.action}
                            component={false}
                            label="Action"
                        />
                        <Input
                            type="text" 
                            name="authorization"
                            placeholder="Authorization "
                            value={viss_data.authorization}
                            component={false}
                            label="Authorization"
                        />
                        <Input
                            type="text" 
                            name="path"
                            placeholder="Path"
                            value={viss_data.path}
                            component={true}
                            label="Path"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data.value}
                            component={true}
                            label="Value"
                            onChange={handleChangeInput}
                        />
                        <Button 
                            label="Set Data"
                            onClick={function (e) {
                                executeRestAPI(viss_data)
                            }}>
                        </Button>
                    </Wrapper>
                    <Hr />  
                </Div>
            )
        } else {
            return null
        }
    }


    return (
        <div>
            <h3>REST API</h3>
            <Label label="Transport Messages"/>
            <DropDown label="" options={message} onChange={handleChange} />
            {
                mode === ""
                    ? null
                    : retMode()
            }
            <div className="request">
                REQUEST
                <hr></hr>
                {
                    <div style={{ backgroundColor: "Chocolate", fontSize: "20px" }}>
                        {
                            req.map((i) => {
                                return <div key={i}>{i}</div>
                            })
                        }
                    </div>
                }
            </div>
            <div className="response">
                RESPONSE
                <hr></hr>
                <div>
                    {
                        result==="SUCCESS"
                            ? <div style={{ backgroundColor: "LightGreen", fontSize: "20px" }}>
                                <h2>{result}</h2>
                                <div>{status}</div>
                                {
                                    header_.map((i) => {
                                        return <div key={i}>{i}</div>
                                    })
                                }
                                {
                                    res.map((i) => {
                                        return (
                                            <div>
                                                <hr />
                                                <div key={i}>{i}</div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :  <div style={{ backgroundColor: "red", fontSize: "20px" }}>
                                <h2>{result}</h2>
                                <div>{status}</div>
                                {
                                    header_.map((i) => {
                                        return <div key={i}>{i}</div>
                                    })
                                }
                                {
                                    res.map((i) => {
                                        return (
                                            <div>
                                                <hr />
                                                <div key={i}>{i}</div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
        
    );
}

export default HTTPS