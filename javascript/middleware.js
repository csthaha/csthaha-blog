class Log {
    LogName(name) {
        console.log('your name is: ', name);
    }
}
const cstLog = new Log()
cstLog.LogName('cst')

function desLog1() {
    let raw = cstLog.LogName
    return function(arg) {
        console.log('desLog1 start');
        raw(arg)
        console.log('desLog1 end');
    }
}

function desLog2() {
    let raw = cstLog.LogName
    return function(arg) {
        console.log('desLog2 start');
        raw(arg)
        console.log('desLog2 end');
    }
}

function desLog3() {
    let raw = cstLog.LogName
    return function(arg) {
        console.log('desLog3 start');
        raw(arg)
        console.log('desLog3 end');
    }
}

function chain(desLogs) {
    desLogs.forEach(desLog => cstLog.LogName = desLog());
}

chain([desLog1,desLog2,desLog3])

cstLog.LogName('fh')