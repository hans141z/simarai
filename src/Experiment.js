import React from "react"
import "./style.css"
class Experiment extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			message:"Submit Your Request", 
			population:this.props.population,
			experiment:{
				"experiment":"",
				"max_temperature":"",
				"min_teperature":"", 
				"temperature_steps":"",
				"field_strength":"",
				"email":""
			}
		}
	}

	valid_input(){
		var experiment = document.getElementById("experiment").value;
		var temperature_steps= document.getElementById("temperature_steps").value;
		var field_strength= document.getElementById("field_strength").value;

		console.log(experiment, temperature_steps, field_strength);


		var email = document.getElementById("email").value;
		if ( email.length>5 && email.includes("@")){
			this.success(email)
		} else{
			this.unsuccessful();
		}
	}

	success(email){
		//get experiment, temperature, field, email


		var message = "Thank you, your results will be emailed to " + email + " shortly";
		this.setState({message: message});
	}

	unsuccessful(){
		var message =  "Input error, please check that you entered a valid email ";
		this.setState({message:message});
	}

	handleSlider(){
		var temperature_steps = document.getElementById("temperature_steps").value;
		document.getElementById("temperature_steps_text").value = temperature_steps;

		var strength = document.getElementById("field_strength").value;
		document.getElementById("field_strength_text").value = strength;
	}

	handleText(){
		var temperature_steps_text = document.getElementById("temperature_steps_text").value;
		document.getElementById("temperature_steps").value = temperature_steps_text;

		var field_strength_text = document.getElementById("field_strength_text").value;
		document.getElementById("field_strength").value = field_strength_text;
	}
	
	render(){
	    return(
	     <div>
		<div className = "sidebar">
			<form className = "form">
				<div className = "setting">
				   <label className= "experiment" for = "experiment"> Experiment </label><br/>
				   <select id = "experiment" name = "experiment">
					<option value = "izzi"> IZZI</option>
					<option value = "thermal_demag">Thermal Demagnetization</option>
				   </select>
				</div>



				<div className = "setting">
				   <label for = "temperature_steps"> Temperature Steps</label><br/>
				   <input type = "range" min = "0" max = "100" defaultValue = "10" className = "slider slider-text" id = "temperature_steps" onChange = {this.handleSlider.bind(this)} />
				   <input type = "text"  name = "temperature_steps" id = "temperature_steps_text" className = "slider-text text" onChange = {this.handleText.bind(this)} defaultValue= "10"/>
				</div>

				<div className = "setting">
				   <label for = "field_strength"> Field Strength</label><br/>
				   <input type = "range" min = "0" max = "100" defaultValue = "10" className = "slider slider-text" id = "field_strength"  onChange={this.handleSlider.bind(this)}/>
				   <input type = "text"  name = "field_strength" id = "field_strength_text" className = "slider-text text" onChange = {this.handleText.bind(this)} defaultValue = "10"/>
				</div><br/>



				<div className = "setting">
				   <input type = "text"  name = "email" id = "email" placeholder="email" className = "slider-text long_text"/>
				</div>

		    		<button type= "button" name = "request" id= "request" onClick={this.valid_input.bind(this)}> Request</button>

			</form>
		</div>


		<div className = "body">
			<div id = "response">
				{this.state.message}
			</div>
		</div>

   	      </div>
	)}
}

export default Experiment;
