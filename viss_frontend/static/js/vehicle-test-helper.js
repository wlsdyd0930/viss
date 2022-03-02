/*
** Vehicle API Test helper/utility functions
*/


// === get helper ===
function isAuthorizeSuccessResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (
    _inJson.action === "authorize" &&
    _inJson.requestId &&
    _inJson.TTL &&                //'TTL' exists
    _inJson.error === undefined)  //'error' not exists
  {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function isAuthorizeErrorResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (
    _inJson.action === "authorize" &&
    _inJson.requestId &&
    _inJson.TTL === undefined &&  //'TTL' not exists
    _inJson.error)                //'error' exists
  {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isMetadataSuccessResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (
    _inJson.action === "getMetadata" &&
    _inJson.requestId &&
    _inJson.metadata &&                //'TTL' exists
    _inJson.error === undefined)  //'error' not exists
  {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function isMetadataErrorResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (
    _inJson.action === "getMetadata" &&
    _inJson.requestId &&
    _inJson.metadata === undefined &&  //'vss' not exists
    _inJson.error)                //'error' exists
  {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isGetSuccessResponseForDynamicMetadata(_inJson) {
  for (let [key, value] of Object.entries(_inJson.data.metadata)){
    if (Object.keys(value).length &&
      _inJson.error === undefined)           //'error' exists
    {
      return true;
    } else {
      return false;
    }
  }
}

function isGetSuccessResponseForServiceDiscoveryRead(_inJson) {
  if ('metadata' in _inJson &&
    'ts' in _inJson &&
    _inJson.error === undefined)           //'error' exists
  {
    return true;
  } else {
    return false;
  }
}

function isSetSuccessResponseForHTTPS(_inJson) {
  if ('ts' in _inJson &&
    _inJson.error === undefined)           //'error' exists
  {
    return true;
  } else {
    return false;
  }
}

////////////////////////////////////////////////////////////////////
function isGetSuccessResponseForHTTPS(_inJson) {
  // TODO: better to check with Json schema
  // getSuccessResponse has action?
  let success = true

  if ("metadata" in _inJson && "ts" in _inJson) {
    return true
  } else {
    if (Array.isArray(_inJson.dp) == false) {
      if ('path' in _inJson &&
        'ts' in _inJson.dp &&      //'timestamp' exists
        'value' in _inJson.dp &&          //'value' exists
        _inJson.error === undefined)           //'error' exists
      {
        return true;
      } else {
        return false;
      }
    } else {
      if ('path' in _inJson) {
        console.log('path success')
      } else {
        success = false
      }

      for (_inJson of _inJson.dp) {
        if ('ts' in _inJson &&      //'timestamp' exists
          'value' in _inJson &&          //'value' exists
          _inJson.error === undefined)           //'error' exists
        {
          console.log('success')
        } else {
          success = false
        }
      }
      return success
    }

  }



}
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
function isGetFailureResponseForHTTPS(_inJson) {
  // TODO: better to check with Json schema
  // getSuccessResponse has action?
  // console.log(_inJson)
  if ("Error Code" in _inJson) {
    return false
  } else {
    return true
  }
}
////////////////////////////////////////////////////////////////////


function isGetSuccessResponse(inJson) {
  // TODO: better to check with Json schema
  // getSuccessResponse has action?
  var ret = true
  _inJson = JSON.parse(inJson)

  if (Array.isArray(_inJson.data)) {
    if (_inJson.action == "get" && 'requestId' in _inJson) {
      for (var j in _inJson.data) {
        if ("path" in _inJson.data[j] && "value" in _inJson.data[j].dp && "ts" in _inJson.data[j].dp) {
          ret = true
        } else {
          ret = false
        }
      }
    } else {
      ret = false
    }
  } else {
    if ('error' in _inJson) {
      ret = false
    } else {
      if (_inJson.action === "get" &&
        'requestId' in _inJson &&
        ('data' in _inJson || 'metadata' in _inJson)) {
        ret = true
      } else {
        ret = false;
      }
    }
  }

  return ret
}
function isGetErrorResponse(inJson) {
  _inJson = JSON.parse(inJson)
  if (_inJson.action === "get" &&
    _inJson.requestId &&
    _inJson.error) {
    return true;
  } else {
    return false;
  }
}

// === set helper ===
function isSetSuccessResponse(inJson) {
  // TODO: better to check with Json schema
  var _inJson = JSON.parse(inJson)
  if (_inJson.action === "set" &&
    _inJson.requestId &&
    _inJson.ts) {
    return true
  } else {
    return false;
  }
}

function isSetErrorResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "set" &&
    _inJson.requestId &&
    _inJson.timestamp &&      //'timestamp' exists
    _inJson.error)            //'error' exists
  //_inJson.error.number &&   //'error.number' exists
  //_inJson.error.reason)     //'error.reason' exists
  {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// === subscribe helper ===
function isSubscribeSuccessResponse(inJson) {
  // TODO: better to check with Json schema
  // getSuccessResponse has action?
  var _inJson = JSON.parse(inJson)
  console.log(_inJson)
  if (_inJson.action === "subscribe" &&
    _inJson.requestId &&
    _inJson.subscriptionId &&   //'subId' exists
    _inJson.ts) {
    return true
  } else {
    return false;
  }
}

function isSubscribeErrorResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "subscribe" &&
    _inJson.requestId &&
    _inJson.subscriptionId === undefined &&   //'subId' exists
    _inJson.timestamp &&      //'timestamp' exists
    _inJson.error) {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isSubscriptionNotificationResponse(inJson) {
  // TODO: better to check with Json schema
  var _inJson = JSON.parse(inJson)
  if (_inJson.action === "subscription" &&
    _inJson.requestId &&
    _inJson.data) {
    return true
  } else {
    return false;
  }
}
function isSubscriptionNotificationErrorResponse(_subId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "subscription" &&
    _inJson.subscriptionId &&       //'subscriptionId' just exists
    _inJson.timestamp &&            //'timestamp' exists
    _inJson.value === undefined &&  //'value' not exist
    _inJson.error)                  //'error' exists
  {
    // if _subId is empty string, don't check subId matching
    if (_subId === "" || _subId === _inJson.subscriptionId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// === unsubscribe helper ===
function isUnsubscribeSuccessResponse(_reqId, _subId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "unsubscribe" &&
    _inJson.requestId &&
    _inJson.subscriptionId &&
    _inJson.error === undefined &&
    _inJson.timestamp)      //'timestamp' exists
  {
    if (_subId === "" || _subId === _inJson.subscriptionId) {
      if (_reqId === "" || _reqId === _inJson.requestId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function isUnsubscribeErrorResponse(_reqId, _subId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "unsubscribe" &&
    _inJson.requestId &&
    _inJson.subscriptionId &&
    _inJson.timestamp &&      //'timestamp' exists
    _inJson.error)          //'error' exists
  {
    if (_subId === "" || _subId === _inJson.subscriptionId) {
      if (_reqId === "" || _reqId === _inJson.requestId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isUnsubscribeAllSuccessResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "unsubscribeAll" &&
    _inJson.requestId &&
    _inJson.subscriptionId === undefined &&
    _inJson.timestamp &&     //'timestamp' exists
    _inJson.error === undefined) {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function isUnsubscribeAllErrorResponse(_reqId, _inJson) {
  // TODO: better to check with Json schema
  if (_inJson.action === "unsubscribeAll" &&
    _inJson.requestId &&
    _inJson.subscriptionId === undefined &&
    _inJson.timestamp &&      //'timestamp' exists
    _inJson.error)          //'error' exists
  {
    if (_reqId === "" || _reqId === _inJson.requestId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


// === utility ===
function getTimestamp() {
  var date = new Date();
  var unixTimeMsec = date.getTime();
  var unixTimeSec = Math.floor(date.getTime() / 1000);

  return unixTimeMsec;
}

function addLogMessage(_msg) {
  console.log(_msg)
  msg = document.getElementById('log').innerHTML;
  msg = msg + "<br>" + _msg;
  document.getElementById('log').innerHTML = msg;
}

function addLogRequestMessageForHTTPS(_request, _host, _header, _data) {
  msg = document.getElementById('result').innerHTML;
  // show message with green background
  msg = msg + "<br>"
    + '<div style="font-size:20px; background-color:#E56D29;">'
    + "Request: "
    + '</div>';

  msg = msg
    + '<div style="font-size:20px; background-color:#E56D29;">'
    + '<br>' + _request + '<br>'
    + 'Host: ' + _host
    + '</div>';

  for (var key in _header) {
    //console.log(key + ": " + _header[key])
    msg = msg
      + '<div style="font-size:20px; background-color:#E56D29;">'
      + key + ": " + _header[key]
      + '</div>';
  }

  if (_request.split(" ")[0] === "POST") {
    msg = msg
      + '<div style="font-size:20px; background-color:#E56D29;">'
      + JSON.stringify(_data)
      + '</div>';
  }

  document.getElementById('result').innerHTML = msg;
}

function addLogSuccessForHTTPS(_msg, _status_msg, _header, _data) {
  msg = document.getElementById('result').innerHTML;
  // show message with green background
  msg = msg + "<br>"
    + '<div style="font-size:20px; background-color:#00CC00;">'
    + "SUCCESS : " + _msg
    + '</div> <br>';

  msg = msg
    + '<div style="font-size:20px; background-color:#00CC00;">'
    + 'Response:' + '<br><br>'
    + _status_msg
    + '</div>';

  for (var key in _header) {
    //console.log(key + ": " + _header[key])
    msg = msg
      + '<div style="font-size:20px; background-color:#00CC00;">'
      + key + ": " + _header[key]
      + '</div>';
  }

  msg = msg
    + '<div style="font-size:20px; background-color:#00CC00;">'
    + JSON.stringify(_data)
    + '</div>';

  document.getElementById('result').innerHTML = msg;
}


function addLogFailureForHTTPS(_msg, _status_msg, _header, _data) {
  msg = document.getElementById('result').innerHTML;
  // show message with green background
  msg = msg + "<br>"
    + '<div style="font-size:20px; background-color:red;">'
    + "FAILURE : " + _msg
    + '<br></br></div>';

  msg = msg
    + '<div style="font-size:20px; background-color:red;">'
    + 'Response:' + '<br><br>'
    + _status_msg
    + '</div>';

  for (var key in _header) {
    //console.log(key + ": " + _header[key])
    msg = msg
      + '<div style="font-size:20px; background-color:red;">'
      + key + ": " + _header[key]
      + '</div>';
  }

  msg = msg
    + '<div style="font-size:20px; background-color:red;">'
    + JSON.stringify(_data)
    + '</div>';

  document.getElementById('result').innerHTML = msg;
}

function addLogSuccess(_msg, _data) {

  msg = document.getElementById('result').innerHTML;
  // show message with green background
  msg = msg + "<br>"
    + '<div style="font-size:20px; background-color:#00CC00;">'
    + "SUCCESS : " + _msg
    + '</div>'
    + '<br></br>';

  msg = msg
    + '<div style="font-size:20px; background-color:#00CC00;">'
    + 'Response:'
    + '</div>';

  msg = msg
    + '<div style="font-size:20px; background-color:#00CC00;">'
    + _data
    + '</div>';
  document.getElementById('result').innerHTML = msg;
}

function addLogFailure(_msg, _data) {
  msg = document.getElementById('result').innerHTML;
  // show message with red background
  msg = msg + "<br>"
    + '<div style="font-size:20px; background-color:red;">'
    + "FAILURE : " + _msg
    + "<br></br>"
    + '</div>';

  msg = msg
    + '<div style="font-size:20px; background-color:red;">'
    + _data
    + '</div>';
  document.getElementById('result').innerHTML = msg;
}

function getUniqueReqId() {
  // create semi-uniquID (for implementation easyness) as timestamp(milli sec)+random string
  // uniqueness is not 100% guaranteed.
  var strength = 1000;
  var uniq = new Date().getTime().toString(16) + Math.floor(strength * Math.random()).toString(16);
  return "reqid-" + uniq;
}

function createRequestJson(_action, _path, _val, _filter) {
  var reqJson = null;
  var reqId = getUniqueReqId();
  if (_action === 'get') {
    reqJson = '{"action":"get","path":"' + _path + '","requestId":"' + reqId + '"}';
  } else if (_action === 'set') {
    reqJson = '{"action":"set","path":"' + _path + '","value":"' + _val + '","requestId":"' + reqId + '"}';
  } else if (_action === 'subscribe') {
    var str_filter = JSON.stringify(_filter);
    reqJson = '{"action":"subscribe","path":"' + _path + '","filters":"' + str_filter + '","requestId":"' + reqId + '"}';
  }
  return reqJson;
}

// === test suite helper ===
function helper_terminate_normal(_msg, _wsconn1, _wsconn2) {
  addLogMessage(_msg);
  t.step_timeout(function () {
    if (_wsconn1)
      _wsconn1.close();
    if (_wsconn2)
      _wsconn2.close();

    //close websocket connection
    if (_wsconn1 == undefined && _wsconn2 == undefined && typeof (vehicle) != "undefined")
      vehicle.close();
    t.done();
  }, TIME_FINISH_WAIT); // wait time to let human read the result.
}

function helper_terminate_success_for_https(_msg, _status_msg, _header, _data) {
  addLogSuccessForHTTPS(_msg, _status_msg, _header, _data);
  t.step_timeout(function () {
    assert_true(true, _msg);
    t.done();
  }, TIME_FINISH_WAIT); // wait time to let human read the result.
}

function helper_terminate_success_for_https_test(_msg, _status_msg, _header, _data) {
  addLogSuccessForHTTPS(_msg, _status_msg, _header, _data);
 
}

function helper_terminate_failure_for_https(_msg, _status_msg, _header, _data) {
  addLogFailureForHTTPS(_msg, _status_msg, _header, _data);
  t.step_timeout(function () {
    assert_true(false, _msg);
    t.done();
  }, TIME_FINISH_WAIT); // wait time to let human read the result.
}

function helper_terminate_success(_msg, _data) {
  addLogSuccess(_msg, _data);
  t.step_timeout(function () {
    assert_true(true, _msg);
    t.done();
  }, TIME_FINISH_WAIT); // wait time to let human read the result.
}
function helper_terminate_failure(_msg, _data) {
  addLogFailure(_msg, _data);
  console.log(_data)
  t.step_timeout(function () {
    assert_true(false, _msg);
    t.done();
  }, TIME_FINISH_WAIT); // wait time to let human read the result.

}

