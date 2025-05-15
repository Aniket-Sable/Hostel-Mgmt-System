import React, {useEffct}from React;

function temp(){
    useEffct(() => {
        //side effect code
    }, []);

    return(
        <>
        <div>
        <h1>heloo</h1>
        </div>
        </>
    );
}