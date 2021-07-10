import React from 'react';
import * as d3 from 'd3';

class Histogram extends React.Component{
	generatePlot(){
		d3.select("#histogram>svg").remove();

		var data = this.props.NRM.sort()
		var bins = d3.bin().thresholds(10)(data)
		var width = this.props.width;
		var height = this.props.height;
		var color = "steelblue";
		var margin = {"top":height/17.5, "right":width/25, "bottom":height/7, "left":width/12.5}
		

		var x = d3.scaleLinear().domain([bins[0].x0, bins[bins.length-1].x1]).range([margin.left, width-margin.right])
		var del = height - margin.bottom
		var xAxis = g => g.attr("transform", 'translate(0,'+del+')').call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0)).call(g=>g.append("text").attr("x", width-margin.right).attr("y", -4).attr("fill", "currentColor").attr("text-anchor", "end").text(data.x))

		var y = d3.scaleLinear().domain([d3.max(data),0]).nice().range([margin.top, height-margin.bottom])

		var yAxis = g => (
			g.attr("transform", 'translate('+margin.left +',0)')
			.call(d3.axisLeft(y).ticks(height/40))
			.call(g=>(
					g.select(".tick:last-of-type text").clone()
					.attr("x", 4)
					.attr("text-anchor", "start")
					.text(data.y)
				)
			)
		)



		const svg = d3.select("#histogram").append("svg").attr("viewBox", [0,0,width, height]).attr("className", "histogram visible");

			(svg.append("g")
				.attr("fill", color)
				.selectAll("rect")
				.data(bins)
				.join("rect")
				.attr("x", d=> x(d.x0)+1)
				.attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
				.attr("y", d=> y(d.length))
				.attr("height", d => y(0) - y(d.length))
			)

			svg.append("g").call(xAxis);
			svg.append("g").call(yAxis);

//label xaxis 
			svg.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", width/2)
				.attr("y", height-margin.bottom/2)
				.text("Sizes")
//label yaxis
			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("y", margin.left/2*.9)
				.attr("x", margin.bottom-height/2)
				.attr("transform", "rotate(-90)")
				.text("Frequency")
	}


	componentDidMount(){
		this.generatePlot();
	}

	componentDidUpdate(){
		this.generatePlot();
	}

	render(){
		return(
			<div>
			</div>
			
		)
	}

}

export default Histogram;

