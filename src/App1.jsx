// // function
// import { useEffect, useRef, useState } from 'react';

// function App1() {


//   const [a,setA] = useState("a");
//   const [b,setB] = useState("b");


//   // useEffect(() => { // did mount
//   //   console.log("UEF empty array");
//   //   setLoading(false);
//   // }, []);

//   // useEffect(() => { // read on mounting and on loading state change
//   //   console.log("UEF loading inside array");
//   // }, [loading])

//   // useEffect(() => { // read on mounting and on each state change it runs
//   //   console.log("No array");
//   // });

//   return (
//     <>
    
//     {console.log("INSIDE RETURN")}
//     {console.log("A ", a)}
//     {console.log("B ", b)}

//     <div className="App">
//       <h2>
//         HOOKS
//       </h2>
//       <button
//       onClick={e => {
//         setA("aa");
//         console.log("BETWEEN SETSTATES")
//         setB("bb");
//       }}
//       >Sync update</button>

//             <button
//       onClick={e => {
//         Promise.resolve().then(response => {
//           setA("aa");
//           console.log("BETWEEN SETSTATES")
//           setB("bb");
//         });
//       }}
//       >Async update</button>
//     </div>
//     </>
//   );
// }

// export default App1;

// class
import React, { Component } from 'react'

class App1 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      a : "A",
      b : "B",
      loading : true
    };
  };



  promiseClick = (n) => { // number (n)
    return new Promise((resolve,reject) => {
      if(n > 10) {
        resolve({
          status : "SUCCESS",
          error : false
        });
      } else {
        reject({
          status : "FAILURE",
          error : true
        })
      };
    });
  }

  render() { 
    // virtual dom initializing (copy of the real dom)
    console.log("PARENT-INSIDE RENDER");
    console.log('a',this.state.a);
    console.log('b',this.state.b);
    return ( 
      <div>
        <h2>APP1 COMPONENT</h2>
        <button
            onClick={() => {
                this.setState({
                    a : "AA",
                    b : "BB"
                });
                console.log('a',this.state.a);
                console.log('b',this.state.b);
            }}
            >Change PARENT loading state (SYNCHRONOUS)
        </button>

        <button
            onClick={() => {
                this.promiseClick(19)
                    .then(response => {
                        if(!response.error) {
                            this.setState({
                                a : "AA",
                            });
                            console.log("BETWEEN SetStates");
                            this.setState({
                                b : "BB"
                            });
                        }
                    })
                    .catch(err => {
                        console.log("ERR",err);
                    })
            }}
            >Change PARENT loading state (PROMISE)
        </button>
      </div>
    );
  }
}

//3)
export default App1;
