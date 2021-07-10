import React from 'react';
import * as d3 from 'd3';

class ScatterPlot extends React.Component{
	generatePlot(){
		d3.select("#scatter_plot>svg").remove();
	
		var x_data = this.props.TRM
		var y_data = this.props.NRM

		var width= this.props.width
		var height= this.props.height
		var color= "steelblue"
		var margin = {"top":height/17.5, "right":width/25, "bottom":height/7, "left":width/12.5}
		//var arai_visible = document.getElementById("arai").checked? "visible":"hidden"


//x axis
		var x = d3.scaleLinear().domain([d3.min(x_data), d3.max(x_data)]).range([margin.left, width-margin.right])
		var del = height-margin.bottom
		var xAxis = g => (
			g.attr("transform", 'translate(0,'+del+ ')')
			.call(d3.axisBottom(x).ticks(width/40).tickSizeOuter(0))
		)

//y axis
		var y = d3.scaleLinear().domain([d3.max(y_data), 0]).nice().range([margin.top, height - margin.bottom])
		var yAxis = g=>(
			g.attr("transform","translate("+margin.left +",0)")
			.call(d3.axisLeft(y).ticks(height/40))
			)

//grid
		var grid = g=>(
			g.attr("stoke", "currentColor")
			.attr("stroke-opacity", .1)
			.call(g =>(
				g.append("g")
				.selectAll("line")
				.data(x.ticks())
				.join("line")
				.attr("x1", d=>.5+x(d))
				.attr("x2", d=>.5+x(d))
				.attr("y1", margin.top)
				.attr("y1", height-margin.bottom)
				)
			)
			.call(g=>(
				g.selectAll("line")
				.data(y.ticks())
				.join("line")
				.attr("y1", d=>.5+y(d))
				.attr("y2", d=>.5+y(d))
				.attr("x1", margin.left)
				.attr("x2", width-margin.right)
				)
			)
		)


		var index = new Array(x_data.length)
		for (var i = 0; i < x_data.length; i++){
			index[i]=i

		}

		const svg = d3.select("#scatter_plot").append("svg").attr("viewBox", [0,0,width, height]).attr("className", "scatter_plot visible");
			svg.append("g").call(xAxis)
			svg.append("g").call(yAxis)
			svg.append("g").call(grid)

//points
			svg.append("g")
				.attr("stroke", "steelblue")
				.attr("stroke-width", 1.5)
				.attr("fill", color)
			.selectAll("circle")
			.data(index)
			.join("circle")
				.attr("cx", d=> x(x_data[d]))
				.attr("cy", d=> y(y_data[d]))
				.attr("r", 3)
//labels x-axis
			svg.append("text")	
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", width/2)
				.attr("y", height-margin.bottom/2)
				.attr("dy", ".5em")
				.text("TRM")
//labels y-axis	
			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("y",margin.left/2*.9)
				.attr("x", -width/2+margin.bottom*2)
				.attr("transform", "rotate(-90)")
				.text("NRM");
	}

	componentDidMount(){
		this.generatePlot();
	}

	componentDidUpdate(){
		this.generatePlot()
	}


	render(){
		return(
			<div></div>
			
		)
	}

}

export default ScatterPlot;

