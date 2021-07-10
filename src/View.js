import React from 'react';
import ScatterPlot from "./ScatterPlot";
import Histogram from "./Histogram.js";

class View extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			NRM: [1,2,3,4,45,6,7,8,8,2,3,4,5,6,7,8,9,12,13,15,5,6,7,7,7,7,3,6,7,8,34,23,14,15,19,20, 12,23,31,2,2,3,4,5,6],
			TRM: [2,4,13,24,15,7,9,8,18,2,13,4,15,6,27,8,9,22,13,35,15,6,18,17,27,17,3,6,7,8,34,23,14,15,19,29, 18,23,11,2,14,2,8,12,6]
		}

	}

	get_file(e){
		e.preventDefault();
		var input_file = document.getElementById("file").files[0];
		var file_reader = new FileReader()
		var _this = this;
		file_reader.onload = function(e){
			var json = JSON.parse(e.target.result);

			_this.setState({
				NRM: json['NRM'], 
				TRM: json['TRM']
			})
			
		}	
		file_reader.readAsText(input_file);

	}

	change_view(selection){
		var arai_selected = document.getElementById("arai").checked
		if (arai_selected){
			var scatter_plot = document.getElementById("scatter_plot");
			scatter_plot.classList.remove("hidden")
			scatter_plot.classList.add("visible")

			var histogram = document.getElementById("histogram");
			histogram.classList.remove("visible")
			histogram.classList.add("hidden")
		} else{
			var scat_plot= document.getElementById("scatter_plot");
			scat_plot.classList.remove("visible")
			scat_plot.classList.add("hidden")

			var hist = document.getElementById("histogram");
			hist.classList.remove("hidden")
			hist.classList.add("visible")
		}

	}
	display_info(){
		var info = document.getElementById("info")
		info.classList.remove("hidden");
		info.classList.add("visible");
	}

	hide_info(){
		var inf= document.getElementById("info");
		inf.classList.remove("visible");
		inf.classList.add("hidden");
	}


	render(){
		return(	
			<div> 
				<div className = "sidebar"> 
					<form id = "input">
						<input type = "file" id = "file" name ="file" accept= ".csv, text/plain" />
						<button onClick={this.get_file.bind(this)}> Submit </button>

						<button id="i" onMouseEnter= {this.display_info.bind(this)} onMouseLeave={this.hide_info.bind(this)}>i </button>
						<div id="info" className="hidden"> 
								Submit a json file with the format &#123;"NRM" &#x3a; [ ], "TRM"&#x3a; [] &#125;
						</div>
					</form>
				</div>



				<div id = "display_setting">
				    <div className = "pref">
					<input type = "radio" id = "visual" name = "opts" value = "Visual" onChange={this.change_view.bind(this)}/>
					<label for = "arai"> Visual</label> 
				    </div>

			
				    <div className = "pref">
					<input type = "radio" id = "arai" name = "opts" value = "Arai" onChange={this.change_view.bind(this)}/>
					<label for = "arai"> Arai </label> 
				    </div>
				</div>

				<div id= "body">
					<div id="scatter_plot" className="visible"><ScatterPlot NRM={this.state.NRM} TRM={this.state.TRM} height="350" width="500"/></div>
					<div id= "histogram" className="hidden">
						<Histogram NRM={this.state.NRM} height="350" width="500" />
					</div>
				</div>
			</div>
		)
	}
}

export default View;
