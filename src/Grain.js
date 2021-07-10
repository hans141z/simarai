import React from 'react';
import ThreeView from "./ThreeView.js";

class Grain extends React.Component{
	constructor(props){
		super(props);
		this.state={
			"message":"Submit Your Request", 
			"population": this.props.population,
			"mineral":[],
			"shape":[],
			"elongations":[],
			"total_grains":[],
			"size":[],
			"distribution":[],
			"theory":[]
		}

	}

	addGrains(){
		var  mineral = this.state.mineral.concat(document.getElementById("mineral").value);
		var  shape= this.state.shape.concat(document.getElementById("shape").value);
		var  elongation= this.state.elongations.concat(document.getElementById("elongation").value);
		var  total_grains= this.state.total_grains.concat(document.getElementById("total_grains").value);
		var  size= this.state.size.concat(document.getElementById("size").value);
		var  distribution =this.state.distribution.concat(document.getElementById("distribution").value);
		var  theory = this.state.theory.concat(document.getElementById("theory").value);

		this.setState({
			mineral:mineral,
			shape:shape,
			elongations:elongation,
			total_grains:total_grains,
			size:size,
			distribution:distribution,
			theory:theory
		});

		console.log(this.state);
	}


	removeGrains(){
		if (this.state.mineral.length>=1){
			var n = this.state.mineral.length-1;

			var mineral = this.state.mineral.slice(0,n)
			var shape= this.state.shape.slice(0,n) ;
			var elongation= this.state.elongations.slice(0,n) ;
			var total_grains= this.state.total_grains.slice(0,n) ;
			var size = this.state.size.slice(0,n) ;
			var distribution = this.state.distribution.slice(0,n) ;
			var theory = this.state.theory.slice(0, n);
		}
		this.setState({
			mineral:mineral,
			shape:shape,
			elongations:elongation,
			total_grains:total_grains,
			size:size,
			distribution:distribution,
			theory:theory
		});

		console.log(this.state);


	}

	valid_input(){
		var email = document.getElementById("email").value;
		var n = this.state.mineral.length;
		if ( email.length>5 && email.includes("@") && n >=1 ){
			this.send_job();
			this.success(email)
		} else{
			this.unsuccessful();
		}
	}


	success(email){
		var message = "Thank you, your results will be emailed to " + email + " shortly";
		this.setState({message: message});
	}

	unsuccessful(){
		var message =  "Input error, please add a population of grains and check that you entered a valid email"

		this.setState({message:message});
	}


	send_job(){
		var email = document.getElementById("email").value;
		//var temperature_steps= document.getElementById("temperature_steps").value;
		var temperature_start= document.getElementById("temperature_start").value;
		var temperature_end = document.getElementById("temperature_end").value;
		var field_strength= document.getElementById("field_strength").value;
		var field_direction_theta= document.getElementById("field_direction_theta").value;
		var field_direction_phi = document.getElementById("field_direction_phi").value;

			
		var fraction = new Array(this.state.mineral.length);
		for(var i  = 0; i < fraction.length; i++){
			fraction[i]=1;
		}

		var json = {
			"material":this.state.mineral,
			"size":{
				"list":[{"value":this.state.size, "fraction":fraction}],
				"unit":"nm"
			}, 
			"elongations":{
				"list":[{"value":this.state.elongations, "fraction":fraction}]
			} , 
			"directions":{
				"list":[
					{"value":[1,0,0], "fraction":1.0}
				]
			}, 
			"applied_field":{
				"strength":field_strength,
				"direction":[field_direction_theta, field_direction_phi],
				"unit":"um"
			}, 
			"cooling_regime":{
				"ambient_temperature":15.00, 
				"initial_temperature": temperature_end,
				"reference_time":0,
				"temperature_at_reference_time":15.15,
				"allowable_percentage_drop":0.01,
				"stopping_temperature":temperature_start
			}, 
			"outputs": {
				"email":email
			}

		}





		console.log(json);
	}

	handleSlider(){
		var elongation= document.getElementById("elongation").value;
		document.getElementById("elongation_text").value = elongation

		var total_grains= document.getElementById("total_grains").value;
		document.getElementById("total_grains_text").value = total_grains;

		var size = document.getElementById("size").value;
		document.getElementById("size_text").value = size; 

		var temperature_start = document.getElementById("temperature_start").value;
		document.getElementById("temperature_start_text").value = temperature_start;

		var temperature_end= document.getElementById("temperature_end").value;
		document.getElementById("temperature_end").value = temperature_end;


		var temperature_steps = document.getElementById("temperature_steps").value;
		document.getElementById("temperature_steps_text").value = temperature_steps;

		var strength = document.getElementById("field_strength").value;
		document.getElementById("field_strength_text").value = strength;
	}


	handleText(){
		var elongation_text = document.getElementById("elongation_text").value;
		document.getElementById("elongation").value = elongation_text;

		var total_grains_text= document.getElementById("total_grains_text").value;
		document.getElementById("total_grains").value = total_grains_text;

		var size_text= document.getElementById("size_text").value;
		document.getElementById("size").value = size_text;


		var temperature_start_text = document.getElementById("temperature_start_text").value;
		document.getElementById("temperature_start").value = temperature_start_text;

		var temperature_end_text = document.getElementById("temperature_end_text").value;
		document.getElementById("temperature_end").value = temperature_end_text;

		var temperature_steps_text = document.getElementById("temperature_steps_text").value;
		document.getElementById("temperature_steps").value = temperature_steps_text;

		var field_strength_text = document.getElementById("field_strength_text").value;
		document.getElementById("field_strength").value = field_strength_text;
	
	}


	toggleVisibility(e){
		var is_grain = e.target.innerHTML.includes("Grain");

		if (is_grain){
			var grain = document.getElementById("grain_setting");
			if (grain.classList.contains("hidden")){
				grain.classList.add("visible");
				grain.classList.remove("hidden")
				
				var exp = document.getElementById("experiment_setting");
				exp.classList.remove("visible")
				exp.classList.add("hidden");
			}
		}else{
			var exper = document.getElementById("experiment_setting");
			if(exper.classList.contains("hidden")){
				exper.classList.add("visible");
				exper.classList.remove("hidden");

				var grn = document.getElementById("grain_setting");
				grn.classList.add("hidden");
				grn.classList.remove("visible");
			}
		}
	}

	render(){
		return(
			<div>
				<p id="message"> {this.state.message}</p>
				<div className = "three"><ThreeView height="600" width="900" color="0xef6101" size = "5"/></div>
			     <div className = "sidebar">
				<form  className = "form">
				    <a className = "set" href="javascript:void(0)" onClick = {this.toggleVisibility.bind(this)}> 1. Grain</a>
				    <a className = "set" href="javascript:void(0)" onClick = {this.toggleVisibility.bind(this)}>  2. Experiment</a>
				    <div id = "grain_setting" className = "visible">
					<div className= "setting">
  					   <label> Mineral </label>
					   <select id = "mineral" name = "mineral">
						<option value = "magnetite"> Magnetite </option>
						<option value = "iron"> Iron </option>
						<option value = "hematite"> Hematite </option>
						<option value = "titanomagnetite"> Titanomagnetite </option>
					   </select>
					</div>

					<div className= "setting">
					   <label > Shape </label>
					   <select id = "shape" name = "shape">
						<option value = "ellipsoid"> Ellipsoid </option>
						<option value = "cube "> Cube </option>
						<option value = "octahedral"> Octahedral </option>
					   </select>
					</div>


					<div className= "setting">
					   <label for = "elongation"> Elongation</label><br/>
					   <input type = "range" min = "0" max = "100" defaultValue = "50" className = "slider slider-text" id ="elongation" onChange={this.handleSlider.bind(this)}/>
					   <input type = "text" name = "elongation" id = "elongation_text" className="slider-text text" onChange = {this.handleText.bind(this)} defaultValue = "50"/> 
					</div>

					<div className= "setting">
					   <label className = "setting" for = "total_grains"> Total Grains </label> <br/>
					   <input type = "range" min = "0" max = "100" defaultValue = "50" className = "slider slider-text" id ="total_grains" onChange={this.handleSlider.bind(this)}/>
					   <input type = "text" name = "total_grains" id = "total_grains_text" className="slider-text text" onChange = {this.handleText.bind(this)} defaultValue = "50"/> 
					</div>

					<div className= "setting">
					   <label for = "size"> Size (nm) </label> <br/>
					   <input type = "range" min = "0" max = "100" defaultValue = "50" className = "slider slider-text" id ="size" onChange={this.handleSlider.bind(this)}/>
					   <input type = "text" name = "size" id = "size_text" className="slider-text text" onChange={this.handleText.bind(this)} defaultValue ="50"/> 
					</div>

					<div className= "setting">
					   <label className = "distribution" for = "distribution"> Distribution</label> <br/>
					   <select id = "distribution" name = "distribution">
						<option value = "gaussian"> Gaussian </option>
						<option value = "log-normal"> Log-Normal</option>
						<option value = "uniform"> Uniform </option>
					   </select>
					</div>


					<div className= "setting">
					   <label className = "theory" for = "theory"> Theory </label> <br/>
					   <select id = "theory" name = "theory">
						<option value = "Neel"> Neel </option>
						<option value = "numerical_models "> Numerical Models</option>
					   </select>
					</div>




					<br/><input   type = "button" name = "add" className= "submit" value = "Add" onClick={this.addGrains.bind(this)}/>
					<input   type = "button" name = "remove" className= "submit" value = "Remove" onClick={this.removeGrains.bind(this)}/>


			    </div>
			    <div id = "experiment_setting" className = "hidden">
				<div className = "setting">
				   <label className= "experiment" for = "experiment"> Experiment </label><br/>
				   <select id = "experiment" name = "experiment">
					<option value = "izzi" className="opt"> IZZI</option>
					<option value = "thermal_demag" className= "opt">Thermal Demagnetization</option>
				   </select>
				</div>

				<div className = "setting">
				   <label for = "temperature_start"> Temperature Start (&#176;C)</label><br/>
				   <input type = "range" min = "0" max = "100" defaultValue = "10" className = "slider slider-text" id = "temperature_start" onChange = {this.handleSlider.bind(this)} />
				   <input type = "text"  name = "temperature_start" id = "temperature_start_text" className = "slider-text text" onChange = {this.handleText.bind(this)} defaultValue= "10"/>
				</div>

				<div className = "setting">
				   <label for = "temperature_end"> Temperature End (&#176;C)</label><br/>
				   <input type = "range" min = "0" max = "100" defaultValue = "10" className = "slider slider-text" id = "temperature_end" onChange = {this.handleSlider.bind(this)} />
				   <input type = "text"  name = "temperature_end" id = "temperature_end_text" className = "slider-text text" onChange = {this.handleText.bind(this)} defaultValue= "10"/>
				</div>


				<div className = "setting">
				   <label for = "temperature_steps"> Temperature Steps (&#176;C)</label><br/>
				   <input type = "range" min = "0" max = "100" defaultValue = "10" className = "slider slider-text" id = "temperature_steps" onChange = {this.handleSlider.bind(this)} />
				   <input type = "text"  name = "temperature_steps" id = "temperature_steps_text" className = "slider-text text" onChange = {this.handleText.bind(this)} defaultValue= "10"/>
				</div>

				<div className = "setting">
				   <label for = "field_strength"> Field Strength (&mu;T)</label><br/>
				   <input type = "range" min = "0" max = "100" defaultValue = "10" className = "slider slider-text" id = "field_strength"  onChange={this.handleSlider.bind(this)}/>
				   <input type = "text"  name = "field_strength" id = "field_strength_text" className = "slider-text text" onChange = {this.handleText.bind(this)} defaultValue = "10"/>
				</div>

				<div className = "setting">
					<label for = "field_direction">Field Direction (&#176;)</label><br/>
					<input type = "text" name = "field_direction_theta" id = "field_direction_theta" className = "text" defaultValue = "0" />
					<input type = "text" name = "field_direction_phi" id = "field_direction_phi" className = "text" defaultValue = "0" />
				</div><br/>




				<div className = "setting">
				   <input type = "text"  name = "email" id = "email" placeholder="email" className = "slider-text long_text"/>
				</div>

		    		<button type= "button" name = "request" id= "request" onClick={this.valid_input.bind(this)}> Request</button>

				
			    </div>

				</form>
			     </div>
			</div>
		)
	}
}

export default Grain;
