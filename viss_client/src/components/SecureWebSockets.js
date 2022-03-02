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


const SecureWebSockets = ({config}) => {
    let [mode, modeChange] = useState("")
    let [res, resChange] = useState([])
    let [req, reqChange] = useState([])
    let [token, tkChange] = useState("")
    let [header_, hdChange] = useState([])
    let [result, rsChange] = useState("")
    let [subscribe_button_enabled, setSubscribeButtonEnabled] = useState(true)
    let [token_info, setTokenInfo] = useState(
        {
            'username': '',
            'password': '',
            'component': true
        }
    )

    let [socket_info, setSocketInfo] = useState(
        {
            'auth_socket': null,
            'no_auth_socket': null
        }
    )
    let [viss_data, setVISSInfo] = useState(
        {
            'action': '',
            'authorization': '',
            'request_id': '',
            'unsubscribe_request_id': '',
            'subscription_id': '',
            'path': '',
            'type': '',
            'timebased_value': '',
            'value': ''
        }
    )

    let [message, setMessage] = useState(
        [
            'Select',
            'Get', 
            'Set',
            'Subscribe',
            'Get (Authorized)', 
            'Set (Authorized)',
            'Subscribe (Authorized)'
        ]
    )

    let [get_type, setGetType] = useState(
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

    let [subscribe_type, setSubscribeType] = useState(
        [
            'Select',
            'timebased', 
            'range',
            'change', 
            'curvelog'
        ]
    )

    let [logic_op, setLogicOP] = useState(
        [
            'Select',
            'eq', 
            'ne',
            'gt', 
            'gte',
            'lt', 
            'lte'
        ]
    )

    let [value_component, setValueComponent] = useState('')
    let [add_value_component, setAddValueComponent] = useState('')
    let [delete_value_component, setDeleteValueComponent] = useState('')

    const handleChange = (e) => {
        viss_data.request_id = Math.floor(Math.random() * 100000001);
        if (e.target.value === 'Select') {
            modeChange("")
          }
        else if (e.target.value === "Get") {
            modeChange("Get")
            viss_data.action = 'get'
        } else if (e.target.value === "Set") {
            modeChange("Set")
            viss_data.action = 'set'
        } else if (e.target.value === "Subscribe") {
            modeChange("Subscribe")
            viss_data.action = 'subscribe'
            viss_data.unsubscribe_request_id = Math.floor(Math.random() * 100000001);
        } else if (e.target.value === "Get (Authorized)") { 
            modeChange("Get (Authorized)")
            viss_data.action = 'get'
        } else if (e.target.value === "Set (Authorized)") {
            modeChange("Set (Authorized)")
            viss_data.action = 'set'
        } else if (e.target.value === "Subscribe (Authorized)") {
            modeChange("Subscribe (Authorized)")
            viss_data.action = 'subscribe'
            viss_data.unsubscribe_request_id = Math.floor(Math.random() * 100000001);
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
        } else if (e.target.value === "timebased") {
            viss_data.value = {'period':''}
        } else if (e.target.value === "range") {
            viss_data.value = [
                {
                    'logic-op': '',
                    'boundary': ''
                },
                {
                    'logic-op': '',
                    'boundary': ''
                }
            ]
        } else if (e.target.value === "change") {
            viss_data.value = 
                {
                    'logic-op': '',
                    'diff': ''
                }
        } else if (e.target.value === "curvelog") {
            viss_data.value = 
                {
                    'maxerr': '',
                    'bufsize': ''
                }
        }
        setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
        reqChange([])
        resChange([])
        rsChange('')
    }

    const handleChangeLogicOP = (e) => {
        console.log(e.target.id)
        console.log(e.target.type)
        if (viss_data.type  === 'range') {
        viss_data.value[e.target.id]['logic-op'] = e.target.value
        } else if (viss_data.type  === 'change') {
            viss_data.value['logic-op'] = e.target.value
        }
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
            } else if (viss_data.type === 'timebased') {
                viss_data.value.period = e.target.value
            } else if (viss_data.type === 'range') {
                viss_data.value[e.target.id].boundary = e.target.value
            } else if (viss_data.type === 'change') {
                viss_data.value.diff = e.target.value
            } else if (viss_data.type === 'curvelog') {
                if (e.target.id === 'Value (Maxerr)') {
                    viss_data.value.maxerr = e.target.value
                } else if (e.target.id === 'Value (Bufsize)') {
                    viss_data.value.bufsize = e.target.value
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
        } else if (viss_data.type === "timebased") {
            temp_value_component = () => {
                return(
                    <Input
                        type="text" 
                        name="value"
                        placeholder="Value"
                        value={viss_data[0]}
                        component={true}
                        id='Value (Period)'
                        label="Value (Period)"
                        onChange={handleChangeInput}
                    />
                )
            }
            

        } else if (viss_data.type === "range") {
            temp_value_component = viss_data.value.map((k, i) => {
                return(
                    <Div>
                        <DropDown 
                            id={i}
                            label={"Value " + (i+1) + " (Logic-op)"} 
                            options={logic_op} 
                            onChange={handleChangeLogicOP} 
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id={i}
                            label={"Value " + (i+1) + " (Boundary)"}
                            onChange={handleChangeInput}
                        />
                    </Div>
                )
            })
        } else if (viss_data.type === "change") {
            temp_value_component = () => {
                return(
                    <Div>
                        <DropDown
                            label={"Value (Logic-op)"} 
                            options={logic_op} 
                            onChange={handleChangeLogicOP} 
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            label="Value (Diff)"
                            onChange={handleChangeInput}
                        />
                    </Div>
                )
            }
        } else if (viss_data.type === "curvelog") {
            temp_value_component = () => {
                return(
                    <Div>
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id="Value (Maxerr)"
                            label="Value (Maxerr)"
                            onChange={handleChangeInput}
                        />
                        <Input
                            type="text" 
                            name="value"
                            placeholder="Value"
                            value={viss_data[0]}
                            component={true}
                            id="Value (Bufsize)"
                            label="Value (Bufsize)"
                            onChange={handleChangeInput}
                        />
                    </Div>
                )
            }
        }

        setValueComponent(temp_value_component)
    }, [viss_data])
    
    useEffect(() => {
        let auth_socket = new WebSocket(config.VISS_PROTOCOL_WS + config.VISS_HOST_SECURE_WS)
        let no_auth_socket = new WebSocket(config.VISS_PROTOCOL_WS + config.VISS_HOST_UNSECURE_WS)

        setSocketInfo(
            {
                'auth_socket': auth_socket,
                'no_auth_socket': no_auth_socket
            }
        )
    }, [])

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
                resChange([this.response])
                rsChange("FAILURE")
            }
        };
        xhttp.send(data);
    }

    const executeWebSocket = (button_name) => {
        let request_json = {}

        request_json['action'] = viss_data.action
        request_json['path'] = viss_data.path
        request_json['requestId'] = viss_data.request_id
        
        if (button_name == 'Get Data') {
            if (viss_data.type === 'paths') {
                if (viss_data.value.length == 1) {
                    request_json['filter'] = {'type': viss_data.type, 'value': viss_data.value[0]}
                } else {
                    request_json['filter'] = {'type': viss_data.type, 'value': viss_data.value}
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
                request_json['filter'] = {'type': viss_data.type, 'value': value}
            } else if (viss_data.type === 'static-metadata') {
                request_json['filter'] = {'type': viss_data.type, 'value': ''}
            } else if (viss_data.type === 'dynamic-metadata') {
                console.log(viss_data.value)
                let value = []
                for (let dynamic_metadata_type in viss_data.value) {
                    console.log(dynamic_metadata_type)
                    if (viss_data.value[dynamic_metadata_type] == 'True'){
                        value.push(dynamic_metadata_type)
                    }
                }
                request_json['filter'] = {'type': viss_data.type, 'value': value}
            }
        } else if (button_name == 'Set Data') {
            request_json['value'] = viss_data.value
        } else if (button_name == 'Subscribe') {
            res = []
            if (viss_data.type === 'timebased') {
                console.log(viss_data.value)
                request_json['filter'] = {'type': viss_data.type, 'value': {'period': viss_data.value.period}}
            } else if (viss_data.type === 'range') {
                console.log(viss_data.value)
                let viss_value = []
                for (let value of viss_data.value) {
                    if (value['logic-op'] !== 'Select' && value['boundary'] !== '') {
                        viss_value.push(value)
                    }
                }
                request_json['filter'] = {'type': viss_data.type, 'value': viss_value}
            } else if (viss_data.type === 'change') {
                request_json['filter'] = {'type': viss_data.type, 'value': viss_data.value}
            } else if (viss_data.type === 'curvelog') {
                request_json['filter'] = {'type': viss_data.type, 'value': viss_data.value}
            }
        } else if (button_name == 'Unsubscribe') {
            request_json = {}
            request_json['action'] = 'unsubscribe'
            request_json['subscriptionId'] = viss_data.subscription_id
            request_json['requestId'] = viss_data.unsubscribe_request_id
            res = []
        }
        
        let socket = null
        if (mode === "Get" || mode === "Set" || mode === "Subscribe") {
            socket = socket_info.no_auth_socket
            request_json = JSON.stringify(request_json)
            if (socket.readyState === socket.OPEN) {
                socket.send(request_json)
            } else {
                let auth_socket = new WebSocket(config.VISS_PROTOCOL_WS + config.VISS_HOST_SECURE_WS)
                let no_auth_socket = new WebSocket(config.VISS_PROTOCOL_WS + config.VISS_HOST_UNSECURE_WS)
                // let auth_socket = new WebSocket("wss://" + addr + ":3001")
                // let no_auth_socket = new WebSocket("wss://" + addr + ":3002")
                socket = no_auth_socket
                socket.onopen = function () {
                    socket.onmessage = function (event) {
                        console.log(event.data)
                        if (event.data.includes("error") & !event.data.includes("\"availability\": \"error\"")){
                            rsChange("FAILURE")
                        } else {
                            rsChange("SUCCESS")
                            if (mode === 'Subscribe' || mode === 'Subscribe (Authorized)') {
                                if (JSON.parse(event.data).action === 'subscribe' || JSON.parse(event.data).action === 'subscription' ) {
                                    setSubscribeButtonEnabled(false)
                                } else {
                                    setSubscribeButtonEnabled(true)
                                }
                            }
                        }
                        
                        if (JSON.parse(event.data).subscriptionId !== undefined) {
                            viss_data.subscription_id = JSON.parse(event.data).subscriptionId
                            setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
                        }
                        let temp_res = res
                        if (mode === 'Subscribe' || mode === 'Subscribe (Authorized)') {
                            temp_res.push(event.data)
                        } else {
                            temp_res = [event.data]
                        }
                        resChange(JSON.parse(JSON.stringify(temp_res)))
                    }
                    socket.send(request_json)
                }

                setSocketInfo(
                    {
                        'auth_socket': auth_socket,
                        'no_auth_socket': no_auth_socket
                    }
                )
            }
        } else {
            request_json['authorization'] = viss_data.authorization
            socket = socket_info.auth_socket
            request_json = JSON.stringify(request_json) 
            if (socket.readyState === socket.OPEN) {
                socket.send(request_json)
            } else {
                let auth_socket = new WebSocket(config.VISS_PROTOCOL_WS + config.VISS_HOST_SECURE_WS)
                let no_auth_socket = new WebSocket(config.VISS_PROTOCOL_WS + config.VISS_HOST_UNSECURE_WS)
                socket = auth_socket
                socket.onopen = function () {
                    socket.onmessage = function (event) {
                        console.log(event.data)
                        if (event.data.includes("error") & !event.data.includes("\"availability\": \"error\"")){
                            rsChange("FAILURE")
                        } else {
                            rsChange("SUCCESS")
                            if (mode === 'Subscribe' || mode === 'Subscribe (Authorized)') {
                                if (JSON.parse(event.data).action === 'subscribe' || JSON.parse(event.data).action === 'subscription' ) {
                                    setSubscribeButtonEnabled(false)
                                } else {
                                    setSubscribeButtonEnabled(true)
                                }
                            }
                        }
                        
                        if (JSON.parse(event.data).subscriptionId !== undefined) {
                            viss_data.subscription_id = JSON.parse(event.data).subscriptionId
                            setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
                        }
                        let temp_res = res
                        if (mode === 'Subscribe' || mode === 'Subscribe (Authorized)') {
                            temp_res.push(event.data)
                        } else {
                            temp_res = [event.data]
                        }
                        resChange(JSON.parse(JSON.stringify(temp_res)))
                    }
                    socket.send(request_json)
                }

                setSocketInfo(
                    {
                        'auth_socket': auth_socket,
                        'no_auth_socket': no_auth_socket
                    }
                )
            }
        }
        socket.onmessage = function (event) {
            console.log(event.data)
            if (event.data.includes("error") & !event.data.includes("\"availability\": \"error\"")){
                rsChange("FAILURE")
            } else {
                rsChange("SUCCESS")
                if (mode === 'Subscribe' || mode === 'Subscribe (Authorized)') {
                    if (JSON.parse(event.data).action === 'subscribe' || JSON.parse(event.data).action === 'subscription' ) {
                        setSubscribeButtonEnabled(false)
                    } else {
                        setSubscribeButtonEnabled(true)
                    }
                }
            }
            
            if (JSON.parse(event.data).subscriptionId !== undefined) {
                viss_data.subscription_id = JSON.parse(event.data).subscriptionId
                setVISSInfo(JSON.parse(JSON.stringify(viss_data)))
            }
            let temp_res = res
            if (mode === 'Subscribe' || mode === 'Subscribe (Authorized)') {
                temp_res.push(event.data)
            } else {
                temp_res = [event.data]
            }
            resChange(JSON.parse(JSON.stringify(temp_res)))
        }
        resChange(["FAILURE"])
        let tmp = []
        tmp.push(request_json)
        reqChange(tmp)

    }

    const retMode = () => {
        if (mode === "Get") {
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
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.request_id}
                            component={false}
                            label="Request ID"
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
                        <DropDown label="Type" options={get_type} onChange={handleChangeType} />
                        {value_component}
                        {add_value_component}
                        {delete_value_component}
                        <Button 
                            label="Get Data"
                            onClick={function (e) {
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>  
                    <Hr />
                </Div>
            )
        } else if (mode === "Set") {
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
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.request_id}
                            component={false}
                            label="Request ID"
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
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>
                    <Hr /> 
                </Div>
            )
        } else if (mode === "Subscribe") {
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
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.request_id}
                            component={false}
                            label="Request ID"
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
                        <DropDown label="Type" options={subscribe_type} onChange={handleChangeType} />
                        {value_component}
                        <Button 
                            component={subscribe_button_enabled}
                            label="Subscribe"
                            onClick={function (e) {
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>  
                    <Hr />
                    <Wrapper>
                    <Input
                            type="text" 
                            name="action"
                            placeholder="Action"
                            value='unsubscribe'
                            component={false}
                            label="Action"
                        />
                        <Input
                            type="text" 
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.unsubscribe_request_id}
                            component={false}
                            label="Request ID"
                        />
                        <Input
                            type="text" 
                            name="subscription_id"
                            placeholder="Subscription ID"
                            value={viss_data.subscription_id}
                            component={false}
                            label="Subscription ID"
                        />
                        <Button 
                            component={!subscribe_button_enabled}
                            label="Unsubscribe"
                            onClick={function (e) {
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>
                    <Hr />
                </Div>
            )
        } else if (mode === "Get (Authorized)") {
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
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.request_id}
                            component={false}
                            label="Request ID"
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
                        <DropDown label="Type" options={get_type} onChange={handleChangeType} />
                        {value_component}
                        {add_value_component}
                        {delete_value_component}
                        <Button 
                            label="Get Data"
                            onClick={function (e) {
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>
                    <Hr /> 
                </Div>
            )
        } else if (mode === "Set (Authorized)") {
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
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.request_id}
                            component={false}
                            label="Request ID"
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
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>  
                    <Hr />
                </Div>
            )
        } else if (mode === "Subscribe (Authorized)") {
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
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.request_id}
                            component={false}
                            label="Request ID"
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
                        <DropDown label="Type" options={subscribe_type} onChange={handleChangeType} />
                        {value_component}
                        <Button 
                            component={subscribe_button_enabled}
                            label="Subscribe"
                            onClick={function (e) {
                                executeWebSocket(e.target.name)
                            }}>
                        </Button>
                    </Wrapper>  
                    <Hr />
                    <Wrapper>
                    <Input
                            type="text" 
                            name="action"
                            placeholder="Action"
                            value='unsubscribe'
                            component={false}
                            label="Action"
                        />
                        <Input
                            type="text" 
                            name="request_id"
                            placeholder="Request ID"
                            value={viss_data.unsubscribe_request_id}
                            component={false}
                            label="Request ID"
                        />
                        <Input
                            type="text" 
                            name="subscription_id"
                            placeholder="Subscription ID"
                            value={viss_data.subscription_id}
                            component={false}
                            label="Subscription ID"
                        />
                        <Button 
                            component={!subscribe_button_enabled}
                            label="Unsubscribe"
                            onClick={function (e) {
                                executeWebSocket(e.target.name)
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
            <h3>Secure WebSockets</h3>

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
                            : <div style={{ backgroundColor: "red", fontSize: "20px" }}>
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

export default SecureWebSockets