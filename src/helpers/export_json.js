import ReactFlow from "reactflow";


// {"id":"dndnode_2","type":"compartmentNode","position":{"x":339.75,"y":266.1875},"data":{"name":"Безымянный","counts_handles":{"handle_in":1,"handle_out":2},"population":0}}

function FormattingJsonCompartment(json_compartment){
    console.log(json_compartment);
    var compartment = new Object();
    compartment.id = json_compartment["id"];
    compartment.position = json_compartment["position"]
    compartment.name = json_compartment["data"]["name"]
    compartment.population = json_compartment["data"]["popolation"]
    return JSON.stringify(compartment);
}

function CompartmentsToJsonFormat(compartments){
    var compartments_jsons = []
    if(compartments != []){
        for(const id in compartments){
            compartments_jsons.push(FormattingJsonCompartment(compartments[id]));
        }
    }
    return compartments_jsons;
}

// function SaveCompartmentsJson(compartments_jsons){
//     var fs = require('fs');
//     fs.writeFile("test.json", compartments_jsons.join(" "));
// }

export default CompartmentsToJsonFormat;