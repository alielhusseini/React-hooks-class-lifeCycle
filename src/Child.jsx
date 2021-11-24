// Child.jsx (for state changes)
import { Component } from "react";
import {isEqual} from 'lodash';

class Child extends Component{

    constructor(props){
        super(props);
        this.state= {
            value2 : true
        };
    }

    // initializes all functions & variables in the class

    componentDidMount(){ // if the child has a stateChange then the react listens to the componentDidMount of the parent to prevent it from useless re-renders 
        console.log('Where Am I: Child componentDidMount');
        this.setState({value2:false})
    }
    // react always upon mounting, mounts all of its children first, only then it mounts the container (App.jsx)
    // & if re-rendering needed for the child, it checks if there's any state/propsChanges in the componentDidMount of the parent so that it would trigger re-render once for all of the components

    shouldComponentUpdate(nextProps, nextState){ 
        if(!isEqual(nextProps,this.props) || this.state.value2 !== nextState.value2) { // !isEqual(nextState,this.state) usually that's how we compare all stateChanges
            console.log('Where Am I: Child shouldComponentUpdate true');
            return true
        }
        console.log('Where Am I: Child shouldComponentUpdate false');
        return false;
    }

    componentDidUpdate(prevProps, prevState){
        console.log('Where Am I: Child componentDidUpdate');
    }

    render(){
        console.log('Where Am I: Child render');
        return(
            <>
                <h2>Child</h2>
                <button onClick={() => this.setState({value2:false})}>Click Me Child</button>
            </>
        );
    }
}

export default Child;

// Child.jsx (for prop changes)
import { Component } from "react";
import {isEqual} from 'lodash';

class Child extends Component{

    constructor(props){
        super(props);
        this.state= {
            value2 : true
        };
    }

    // initializes all functions in the class

    componentDidMount(){ // if the child has a state/propsChange then the react listens to the componentDidMount of the parent to prevent it from useless re-renders 
        console.log('Where Am I: Child componentDidMount');
        // this.setState({value2:false})
    }
    // react always upon mounting, mounts all of its children first, only then it mounts the container (App.jsx)
    // & if re-rendering needed for the child, it checks if there's any state/propsChanges in the componentDidMount of the parent so that it would trigger re-render once for all of the components

    shouldComponentUpdate(nextProps, nextState){ 
        console.log('Next Props', nextProps);
        if(!isEqual(nextProps,this.props) || this.state.value2 !== nextState.value2) { // !isEqual(nextState,this.state) usually that's how we compare all stateChanges
            console.log('Where Am I: Child shouldComponentUpdate true');
            return true
        }
        console.log('Where Am I: Child shouldComponentUpdate false');
        return false;
    }

    componentDidUpdate(prevProps, prevState){
        console.log('Prev Props', prevProps);
        console.log('Where Am I: Child componentDidUpdate');
    }

    render(){
        console.log('Where Am I: Child render');
        return(
            <>
                <h2>{this.props.name}</h2>
                <button onClick={() => this.setState({value2:false})}>Click Me Child State Change</button>
                <button style={{'display': 'block', 'marginTop': '10px'}} onClick={() => this.props.setBooleanValue(true)}>Click Me Child Props Change</button>
            </>
        );
    }
}

export default Child;

// Child.jsx (function)
import { useState, useEffect } from "react";

const Child = ({setBooleanValue}) => {

    const[value2, setValue2] = useState(false);

    useEffect(() => { 
        console.log('CHILD, each render');
    }) 
    
    useEffect(() => { 
        console.log('CHILD, each \'value2 change\' render');
    }, [value2])
    
    useEffect(() => {        
         console.log('CHILD, render on componentDidMount');
         changeBooleanValue2(true)
    }, [])

    const changeBooleanValue2 = (param) => {
        setValue2(param);
    }

    return(
        <>
            <h2>Child</h2>
            <button onClick={() => setBooleanValue(false)}>Click Me Child State Change</button>
        </>
    );
}

export default Child;